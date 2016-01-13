Package.describe({
  name: 'lyuzashi:retransform',
  version: '0.0.1',
  summary: 'Apply multiple transforms to a collection any time after definition',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('retransform.js');
  api.export('Retransform');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('make:retransform');
  api.addFiles('retransform-tests.js');
});
