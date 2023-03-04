#!/bin/bash

# Delete Android, iOS, and node_modules folders
echo 'Delete Android, iOS, and node_modules folders'
rm -rf android
rm -rf ios
rm -rf node_modules

# Install dependencies
echo 'Installing dependencies'
yarn

# Rebuild Android and iOS folders
echo 'Rebuild Android and iOS folders'
npx react-native eject

# Install iOS dependencies
echo 'Installing pods'
cd ios && pod install && cd ..