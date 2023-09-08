#!/bin/bash

version="^9.0.0"

# if argument is passed, use that as the version
if [ $# -eq 1 ]
then
  version=$1
fi

echo "Setting @angular/* version to $version..."

# use jq to open package.json and get the dependencies...
dependencies=$(jq -r '.dependencies | keys | .[]' package.json)
devDependencies=$(jq -r '.devDependencies | keys | .[]' package.json)

echo "Updating dependencies..."
# create dependencyInstallStrings array
dependencyInstallStrings=()
# ...and loop through them
for dependency in $dependencies
do
  # if the dependency starts with @angular, then update it
  if [[ $dependency == @angular/* ]]
  then
    dependency=$(echo $dependency | xargs);
    selector="$dependency@$version"

    echo "  + $selector"
    
    # add the dependency to the install string
    dependencyInstallStrings+=("$selector")
  fi
done

# run npm install, applying the array of deps
npm install --force --save ${dependencyInstallStrings[@]}

# ----------------------------------------------------------------------

echo "Updating devDependencies..."

# create devDependencyInstallString array
devDependencyInstallString=()
for dependency in $devDependencies
do
  # if the dependency starts with @angular, then update it
  if [[ $dependency == @angular/* ]]
  then
    dependency=$(echo $dependency | xargs);
    selector="$dependency@$version"
    echo "  + $selector"
    
    # add the dependency to the install string array
    devDependencyInstallString+=("$selector")
  fi
done

# run npm install, applying the array of dev deps
npm install --force --save-dev ${devDependencyInstallString[@]}

