import { Command, flags } from '@oclif/command';
import * as path from 'path';
import * as fs from 'fs';

interface SectionIndex {
    [title: string]: string | SectionIndex;
}

interface PackageDependencies {
    [packageName: string]: string;
}

type DependencyGroup = 'dependencies' | 'peerDependencies' | 'devDependencies';

type IPackage = {
    name: string;
    version: string;
    dependencies?: PackageDependencies;
    peerDependencies?: PackageDependencies;
    devDependencies?: PackageDependencies;
};

type SectionProcessor = (
    path: string,
    content: string,
    level: number,
    pwd: string
) => string;

class BuildReadme extends Command {
    static description = 'describe the command here';

    static flags = {
        title: flags.string({
            required: true,
            description: 'Root title for the output document',
            char: 't'
        }),
        configFile: flags.string({
            required: true,
            char: 'c',
            description: 'A JSON file that provides the TOC structure.',
            parse: configFile => path.resolve(configFile)
        }),
        outFile: flags.string({
            required: false,
            char: 'o',
            default: 'README.md',
            description: 'Output path, including filename.',
            parse: outFile => path.resolve(outFile)
        }),
        assets: flags.string({
            required: false,
            char: 'a',
            default: 'doc-assets',
            description:
                'Name of the assets directory; if blank, `doc-assets` is used.',
            parse: assets => path.resolve(assets)
        }),
        packageFile: flags.string({
            required: false,
            char: 'p',
            default: 'package.json',
            description:
                'The distribution package.json file.  Used for generating the installation command.',
            parse: packageFile => path.resolve(packageFile)
        }),
        excludePackages: flags.string({
            default: '^(@angular/.*)$',
            required: true,
            char: 'x',
            description:
                'A regular expression string used to exclude packages from the generated installation command.'
        })
    };

    static args = [];

    /**
     * Opens a JSON document and returns the parsed document with type T.
     * @param {string} path Path to a valid json file
     * @returns {T} typed object
     */
    openJson<T>(path: string): T {
        if (fs.existsSync(path)) {
            const fileStr = fs.readFileSync(path).toString();
            return (JSON.parse(fileStr) as unknown) as T;
        }
        throw new Error(
            `File '${path}' does not exist and could not be opened.`
        );
    }

    /**
     * Naive test to determine if a node is a nested SectionIndex.
     * @param {string|SectionIndex} subject String or SectionIndex
     * @returns {boolean} true when subject is an object.
     */
    isNode(subject: any): subject is SectionIndex {
        return typeof subject !== 'string' && typeof subject === 'object';
    }

    /**
     * Processes a multi-line string to adjust heading levels to match the new document.
     * @param {string} input A multi-line string that may contain markdown headings
     * @param {number} level Number of levels to increase/decrease the heading levels
     * @returns {string} Returns a processed section with its headings increased by `level` heading levels.
     */
    processHeadings(input: string, level = 0): string {
        return input
            .replace(/^(#+)\s*(.*)$/gm, (match, headingChars, headingText) => {
                const newLevel = headingChars.length + level;
                if (newLevel > 6) {
                    console.warn(
                        `Heading level of ${newLevel} may not display correctly in final document:\n\t'${match}'`
                    );
                }
                return `${'#'.repeat(newLevel)} ${headingText.trim()}`;
            })
            .replace(/\r\n/gm, '\n')
            .trim();
    }

    assets: Record<string, string> = {};

    /**
     * Scans for image references, and builds a dictionary that will be used to move the finished result.
     * @param {string} input Multi-line string that will be scanned for images
     * @param {string} pwd The directory of the current
     * @returns {string} Modified `input` containing references to the copied images.
     */
    processImages(input: string, pwd: string): string {
        return input.replace(
            /^!\[(.*?)\]\((.*?)\)$/m,
            (match, imageAlt, imageSrc) => {
                if (imageSrc.indexOf('..') > -1) {
                    console.warn(
                        'Relative directory may attempt to navigate outside project: ',
                        imageSrc
                    );
                }
                const fullPath = path.resolve(pwd, imageSrc);

                const ext = path.extname(imageSrc);
                const idx = Object.keys(this.assets).length;
                const newPath = `images-${idx}${ext}`;

                if (['.jpg', '.jpeg', '.gif'].indexOf(ext) > -1) {
                    // extension is allowed
                    // add to assets dictionary
                    this.assets[newPath] = fullPath;

                    // this is NOT using path.join, because these need to be web paths
                    return `![${imageAlt}](./${this.assetsPath}/${newPath})`;
                }
                console.warn(
                    `Not marking image for move to assets folder; filetype (${ext}) not allowed.`
                );
                return match;
            }
        );
    }

    /**
     * Recursively assembles sections for inclusion in the finished document.
     * @param {SectionIndex} section A SectionIndex dictionary for Title => filename of document or another nested SectionIndex
     * @param {number} level Base heading level to add to any discovered headings.  Managed recursively.
     * @returns {string[]} Array of strings to be considered complete sections.
     */
    buildSections(section: SectionIndex, level = 1): string[] {
        return Object.keys(section).reduce(
            (allChunks: string[], sectionTitle: string) => {
                const nodeOrFilename = section[sectionTitle];
                let newChunks: string[] = [];

                if (sectionTitle !== '__') {
                    newChunks.push(`${'#'.repeat(level)} ${sectionTitle}`);
                }

                if (this.isNode(nodeOrFilename)) {
                    newChunks = newChunks.concat(
                        this.buildSections(nodeOrFilename, level + 1)
                    );
                } else {
                    const pwd = path.dirname(nodeOrFilename);

                    const pipeline: SectionProcessor[] = [
                        (filename, _contents, _level, _pwd) =>
                            fs.readFileSync(filename, 'utf8').toString(),
                        (_filepath, contents, level, _pwd) =>
                            this.processHeadings(contents, level),
                        (_filename, contents, _level, pwd) =>
                            this.processImages(contents, pwd)
                    ];
                    newChunks.push(
                        pipeline.reduce(
                            (lastContent, processor) =>
                                processor(
                                    nodeOrFilename,
                                    lastContent,
                                    level,
                                    pwd
                                ),
                            ''
                        )
                    );
                }

                return allChunks.concat(newChunks);
            },
            []
        );
    }

    /**
     * Builds an npm install command from a package.json file's dependencies.
     * @param {string} packageJsonPath Path to package.json file
     * @param {RegExp} excludeRegex RegExp object that will match files to exclude
     * @param {DependencyGroup[]} dependencyGroups At least one group of dependencies from the package.json (dependencies, peerDependencies, devDependencies)
     * @returns {string} Returns a string section of the command that can be used to install a package.
     */
    buildInstallationCommand(
        packageJsonPath: string,
        excludeRegex: RegExp | null = null,
        dependencyGroups: DependencyGroup[] = ['peerDependencies']
    ): string {
        const pkg = this.openJson<IPackage>(packageJsonPath);

        const escapeVersion = (version: string): string => {
            // if <, >, or || exist, we need to quote the value, or this may cause problems
            // when the user tries to install, since it would accidentally cause piping, or stdin/out redirection
            if (
                version.indexOf('>') > -1 ||
                version.indexOf('<') > -1 ||
                version.indexOf('||') > -1
            ) {
                return `"${version}"`;
            }
            return version;
        };

        const packageSelectors: string[] = [];
        for (const group of dependencyGroups) {
            if (pkg[group]) {
                const grp = pkg[group] as PackageDependencies;
                packageSelectors.push(
                    ...Object.keys(grp)
                        .filter(dependencyName =>
                            excludeRegex
                                ? !dependencyName.match(excludeRegex)
                                : true
                        )
                        .map((dependencyName: string) => {
                            const dependencyVersion = grp[dependencyName];
                            return `${dependencyName}@${escapeVersion(
                                dependencyVersion
                            )}`;
                        })
                        .sort()
                );
            }
        }

        // prettier-ignore
        return [
            '```bash',
            `npm install --save ${pkg.name}@${escapeVersion(pkg.version)} \\`,
            packageSelectors.map(s => `\t${s}`).join(' \\\n'),
            '```',
        ].join('\n');
    }

    assetsPath = 'assets';

    async run() {
        const { flags } = this.parse(BuildReadme);
        this.assetsPath = flags.assets;

        try {
            const rootIndex = this.openJson<SectionIndex>(flags.configFile);

            const output = this.buildSections({ [flags.title]: rootIndex })
                .map(section => section.trim())
                .join('\n\n')
                .replace(
                    '{{install-command}}',
                    this.buildInstallationCommand(
                        flags.packageFile,
                        new RegExp(flags.excludePackages)
                    )
                );

            // Since we are processing paths provided by user inputs, we need to make sure
            // the user does not provide paths to copy malicious things into the output dir.
            const cwd = process.cwd();
            const resolvedAssetsPath = path.resolve(
                path.dirname(flags.outFile),
                this.assetsPath
            );
            const resolvedOutputFile = path.resolve(flags.outFile);

            // If there are assets to copy, do it.
            if (Object.keys(this.assets).length > 0) {
                if (!fs.existsSync(resolvedAssetsPath)) {
                    console.log(
                        `Creating assets directory at ${resolvedAssetsPath}.`
                    );
                    fs.mkdirSync(resolvedAssetsPath, { recursive: true });
                }

                if (fs.lstatSync(resolvedAssetsPath).isDirectory()) {
                    console.log('Copying assets.');

                    Object.keys(this.assets).forEach(
                        (destFilename, _idx, _assets) => {
                            const srcPath = this.assets[destFilename];
                            const destPath = path.resolve(
                                resolvedAssetsPath,
                                destFilename
                            );
                            console.log(`\t${srcPath} => ${destPath}`);
                            // These paths need to start with the cwd, or else the MD files
                            // might be trying to copy malicious files to/from these paths.
                            if (
                                srcPath.indexOf(cwd) === 0 &&
                                destPath.indexOf(cwd) === 0
                            ) {
                                if (
                                    fs.existsSync(srcPath) &&
                                    fs.lstatSync(srcPath).isFile()
                                ) {
                                    fs.copyFileSync(srcPath, destPath);
                                } else {
                                    console.error(
                                        `\t\tUnable to copy file from path (${srcPath}); path is not a file, doesn't exist, or may not be readable.`
                                    );
                                }
                            } else {
                                console.warn(
                                    `\t\tSECURITY: Refusing to operate outside cwd, ${process.cwd()}`
                                );
                            }
                        }
                    );
                } else {
                    console.log(
                        `Unable to copy assets to ${resolvedAssetsPath}; Destination exists and is not a directory.`
                    );
                }
            }

            // Write the compiled MD file to disk
            fs.writeFileSync(resolvedOutputFile, output);
            this.exit(0);
        } catch (error) {
            console.error(error);
            this.exit(1);
        }
    }
}

export = BuildReadme;
