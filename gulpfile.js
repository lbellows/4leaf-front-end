// Gulp Requires
var gulp = require('gulp'),
    bundle = require('gulp-concat'),
    clean = require('gulp-clean'),
    minifycss = require('gulp-clean-css'),
    minifyjs = require('gulp-uglify'),
    minifyimg = require('gulp-imagemin'),
    runSequence = require('gulp-run-sequence'),
    flatten = require('gulp-flatten');

// Directories
var jsSrc = 'build/js',
    dest = './dist/',
    bowerSrc = 'bower_components',
    cssSrc = [bowerSrc + '/bxslider/bx_styles/bx_styles.css',
        'build/css/*.css'],
    imgSrc = ['build/img/*.{png,jpg}',
        'build/img/4leaf/*.{png,jpg}',
        bowerSrc + '/bxslider/bx_styles/*.png'],
    slideshowImgSrc = 'build/img/slideshow/*.{png,jpg}',
    allJs = [bowerSrc + '/jquery/dist/jquery.min.js',
        bowerSrc + '/bxslider/jquery.bxSlider.min.js',
        jsSrc + '/4leaf.js'];


// js
gulp.task('handle-js', function () {
    return gulp.src(allJs)
        .pipe(bundle('4leaf.bundle.js'))
        .pipe(minifyjs())
      .pipe(gulp.dest(dest + 'js'));
});

// css
gulp.task('handle-css', function () {
    return gulp.src(cssSrc)
        .pipe(bundle('4leaf.bundle.css'))
        .pipe(minifycss())
      .pipe(gulp.dest(dest + 'css'));
});

// img
gulp.task('handle-img', function () {
    return gulp.src(imgSrc)
        .pipe(minifyimg())
        .pipe(flatten())
      .pipe(gulp.dest(dest + 'images'));
});

gulp.task('handle-img-ss', function () {
    return gulp.src(slideshowImgSrc)
        .pipe(minifyimg())
        .pipe(flatten())
      .pipe(gulp.dest(dest + 'images/slideshow'));
});

// clean
gulp.task('clean', function () {
    //return gulp.src(dest, { read: false })
    //    .pipe(clean());
});

gulp.task('default', function () {
    runSequence('clean', ['handle-img-ss', 'handle-img', 'handle-css', 'handle-js'])
});