Package.describe({
  name: 'onokumus:metismenu',
  version: '3.0.0',
  summary: 'A menu plugin',
  git: 'https://github.com/onokumus/metisMenu',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.addFiles([
    "dist/metisMenu.css",
    "dist/metisMenu.js"
  ], 'client');
});
