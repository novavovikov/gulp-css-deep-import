var expect = require('expect.js');
var vinyl = require('vinyl-fs');
var importCss = require('..');


describe('gulp-css-deep-import', function() {

    it('should parse a single directory', function(done) {
        var equalString = '@import "' + __dirname + '/test-css/import-folder/f1.css' + '";\n';
        equalString += '@import "' + __dirname + '/test-css/import-folder/f2.css' + '";\n';

        vinyl
            .src(__dirname + '/test-css/app.css')
            .pipe(importCss())
            .on('data', function(file) {
                expect(file.contents.toString('utf-8').trim()).to.equal(equalString.trim());
            })
            .on('end', function() {
                done();
            });
    });


    it('should parse a directory recursively', function(done) {
        var equalString = '@import "' + __dirname + '/test-css/recursive-folder/f1.css' + '";\n';
        equalString += '@import "' + __dirname + '/test-css/recursive-folder/f2.css' + '";\n';
        equalString += '@import "' + __dirname + '/test-css/recursive-folder/nested-folder/f3.css' + '";\n';

        vinyl
            .src(__dirname + '/test-css/recursive.css')
            .pipe(importCss())
            .on('data', function(file) {
                expect(file.contents.toString('utf-8').trim()).to.equal(equalString.trim());
            })
            .on('end', function() {
                done();
            });
    });


    it('should handle single and double quotes', function(done) {
        var equalString = '@import "' + __dirname + '/test-css/import-folder/f1.css' + '";\n';
        equalString += '@import "' + __dirname + '/test-css/import-folder/f2.css' + '";\n\n';
        equalString += '@import "' + __dirname + '/test-css/recursive-folder/nested-folder/f3.css' + '";\n';

        
        vinyl
            .src(__dirname + '/test-css/single-double-quotes.css')
            .pipe(importCss())
            .on('data', function(file) {
                expect(file.contents.toString('utf-8').trim()).to.equal(equalString.trim());
            })
            .on('end', function() {
                done();
            });
    });

    it('should not include a stylesheet more than once', function(done){
      var equalString = '@import "duplicate-folder/f1";\n';
      equalString +=    '@import "' + __dirname + '/test-css/duplicate-folder/f2.css";\n';
      equalString +=    '@import "' + __dirname + '/test-css/duplicate-folder/f3.css";\n';

      vinyl
          .src(__dirname + '/test-css/duplicates.css')
          .pipe(importCss())
          .on('data', function(file){
            expect(file.contents.toString('utf-8').trim()).to.equal(equalString.trim());
          })
          .on('end', function(){
            done();
          });
    });

    it('alternate: should not include a stylesheet more than once', function(done){
      var equalString = '@import "duplicate-folder/f1"' + ';\n';
      equalString +=    '@import "duplicate-folder/f2"' + ';\n';
      equalString +=    '@import "' + __dirname + '/test-css/duplicate-folder/f3.css' + '";\n';

      vinyl
          .src(__dirname + '/test-css/duplicates2.css')
          .pipe(importCss())
          .on('data', function(file){
            expect(file.contents.toString('utf-8').trim()).to.equal(equalString.trim());
          })
          .on('end', function(){
            done();
          });
    });

});
