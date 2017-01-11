Package.describe({
  name: 'onokumus:metismenu',
  version: '2.5.2',
  summary: 'A jQuery menu plugin',
  git: 'https://github.com/onokumus/metisMenu',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use(['jquery@1.11.4']);
  api.addFiles([
    "dist/metisMenu.css",
    "dist/metisMenu.js"
  ], 'client');
});
