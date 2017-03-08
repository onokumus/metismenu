'use strict';

var path = require('path');
var assemble = require('assemble');
var extname = require('gulp-extname');
var markdown = require('helper-markdown');
var pkg = require('./package.json');
var app = assemble();

app.task('init', function(cb) {
    app.data('github', app.options.github);
    app.helper('markdown', markdown);
    app.data('pkg', pkg);
    app.layouts(path.join(__dirname, './templates/layouts/*.hbs'));
    app.partials(path.join(__dirname, './templates/partials/**/*.hbs'));
    app.pages(path.join(__dirname, './templates/pages/*.hbs'));
    app.option('layout', 'default');
    cb();
});

app.task('default', ['init'], function() {
    return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(extname())
    .pipe(app.dest('test'));
});

module.exports = app;
