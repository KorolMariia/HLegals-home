const gulp = require ('gulp');
const sass = require ('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');


function sassTask() {
 return gulp.src(['src/styles/font.scss', 
                  'src/styles/global.scss',
                  'src/styles/DesktopHD.scss',
                  'src/styles/DesktopSD.scss',
                  'src/styles/TabletHD.scss',
                  'src/styles/TabletSD.scss',
                  'src/styles/Mobile.scss',])
            .pipe(sass({outputStyle:'compressed'}))
            .pipe(concat('styles/style.min.css'))
            .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: 'autoplace'}))
            .pipe(gulp.dest('dist'));
 }

 function htmlTask() {
    return gulp.src('src/**/*.html', { base: 'src' })
               .pipe(htmlmin({ collapseWhitespace: true }))
               .pipe(gulp.dest('dist'));
  }

  function imageTask() {
    return gulp.src('src/images/**/*.+(jpg|jpeg|png|svg|gif)', { base: 'src' })
      .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
      ]))
          .pipe(gulp.dest('dist'))
  }

 function watchTask() {
    gulp.watch('src/**/*.scss', sassTask);
    gulp.watch('src/**/*.html', htmlTask);
  }

  function cleanTask() {
    return gulp.src('dist', {allowEmpty: true, read: false})
      .pipe(clean());
  }


exports.sass = sassTask;
exports.html = htmlTask;
exports.images = imageTask;
exports.watch = watchTask;
exports.clean = cleanTask;
exports.default = gulp.series(
    cleanTask,
    htmlTask,
    sassTask,
    imageTask,
    watchTask
  );