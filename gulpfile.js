const gulp = require('gulp');
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');


/**************************************************
 * path
 *************************************************/
const paths = {
  'scss': 'develop/**/*.scss',
  'exScss': '!develop/**/_*.scss',
  'css': 'release/'
};



/**************************************************
 * tasks
 *************************************************/
// sass
gulp.task('sass-compile', () => {
  gulp.src([paths.scss, paths.exScss])
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 version'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.css));
});


// watch
gulp.task('watch', () => {
  gulp.watch(paths.scss, ['sass-compile']);
});


// default
gulp.task('default', ['watch']);