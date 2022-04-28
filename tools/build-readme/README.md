# build-readme

The build-readme utility semi-intelligently combines several markdown documents into one document, suitable for publishing to npm. This tool is designed with component-based architecture in mind: with this tool, you can bundle a README.md alongside your code and tests, and then compile it into one giant readme when ready.

It is used to support `@my-ul/ng-porcelain`.

# Features

-   automatic image handling (include gifs and jpegs)
-   automatic re-leveling of heading levels (ex, # nested three sections deep becomes ###)
-   automatic generation of `npm install` section

# Installation

```bash
npm install -g @my-ul/build-readme
```

# Usage

## Arguments

```
OPTIONS
  -a, --assets=assets
  		[default: doc-assets] Name of the assets directory; if blank, `doc-assets` is used.
  -c, --configFile=configFile
  		(required) A JSON file that provides the TOC structure.
  -o, --outFile=outFile
  		[default: README.md] Output path, including filename.
  -p, --packageFile=packageFile
  		[default: package.json] The distribution package.json file.  Used for generating the installation command.
  -t, --title=title
  		(required) Root title for the output document
  -x, --excludePackages=excludePackages
  		(required) [default: ^(@angular/.*)$] A regular expression string used to exclude packages from the generated installation command.
```

## Example

Let's create a README.md file using three source documents: `INSTALL.md` and `components/dropdown/README.md` and `components/checkbox/README.MD`.

```text
contoso/
├─ components/
│  ├─ checkbox/
│  │  ├─ README.md
│  ├─ dropdown/
│  │  ├─ README.md
│  ├─ README.md
├─ INSTALL.md
├─ package.json
```

### Organize your output document..

If you want to include an introduction to a section, you can add that introduction by using the `__` (two underscores) key in your README.json index.

```json
{
    "Installation": "./INSTALL.md",
    "Components": {
        "__": "./components/README.md",
        "Dropdown": "./components/dropdown/README.md",
        "Checkbox": "./components/checkbox/README.md"
    }
}
```

Run the generator command...

```bash
npx build-readme \
	-t "Contoso Components" \
	-c "readme.json" \
	-o "dist/README.md" \
	-p "package.json"
```

Once run, this will output a document such as... Heading levels will be adjusted automatically.

```markdown
# Contoso Components

## Installation

This is the content of `./INSTALL.md`.

## Components

This is the content of `./components/README.md`. It is included as a section introduction using `__` as the tag.

### Dropdown

This is the content of `./components/dropdown/README.md`. Since it is nested, it has a heading level 3.

### Checkbox

This is the content of `./components/checkbox/README.md`. Since it is nested, it has heading level 3.
```
