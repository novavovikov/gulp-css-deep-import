gulp-css-deep-import
=====================

gulp task to allow importing directories in your CSS

## installation

```
npm install --save-dev gulp-css-deep-import
```


## usage


#### in your .css file

```css

@import "some/path/*";

// becomes
// @import "some/path/file1.css";
// @import "some/path/file2.css";
// ...

```

#### in your gulpfile

```js
var importCss = require('gulp-css-deep-import');

gulp.task('css', function() {
    return gulp
            .src(srcDir + 'stylesheets/app.css')
            .pipe(importCss())
            .pipe(
                sass({
                    includePaths: ['src/stylesheets']
                }))
            .pipe( gulp.dest('./public/css/') );
});
```
