var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create();
var wiredep = require('wiredep').stream;

gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('inject', function () {
  var target = gulp.src('app/src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./app/**/*.js', './app/**/*.css'], {read: false});
 
  return target.pipe(inject(sources,{relative: true, addRootSlash: false}))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', ['browserSync', 'sass'], function (){
gulp.watch('app/scss/**/*.scss', ['sass','injectall']); 
  gulp.watch('app/js/**/*.js', ['injectall']);
  // Other watchers
});

gulp.task('injectall', function () {
  var target = gulp.src('app/src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./app/**/*.js', './app/**/*.css'], {read: false});
 
  return target.pipe(wiredep({
      optional: 'configuration',
	  ignorePath: '../../'
    }))
	.pipe(inject(sources,{relative: false, addRootSlash: false}))
	.pipe(gulp.dest('./'));
  

});
gulp.task('bower', function () {
  gulp.src('app/src/index.html')
    .pipe(wiredep({
      optional: 'configuration',
	  ignorePath: '../../'
    }))
    .pipe(gulp.dest('./'));
});
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})