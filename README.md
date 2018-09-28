# KBase UI Plugin - Public Data Search

This repo contains a public data search plugin for the KBase UI.

## Building

By hand:

```
cd build
npm install
./node_modules/.bin/bower-installer
./node_modules/.bin/grunt copy
```

## Dev Notes

- need to use this knockout for now: http://bestware.us/knockout/2414-binding-updates/knockout-latest.debug.js, until the knockout project finalizes and merges that fix.