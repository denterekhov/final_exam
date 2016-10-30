var gulp = require('gulp');
    concatCss = require('gulp-concat-css');
    cleanCSS = require('gulp-clean-css');
    sass = require('gulp-sass');
    concat = require('gulp-concat');
    uglify = require('gulp-uglify');
    imagemin = require('gulp-imagemin');
    pngquant = require('imagemin-pngquant');
    plumber = require('gulp-plumber');
    autoprefixer = require('gulp-autoprefixer');
    spritesmith = require('gulp.spritesmith');
    watch = require('gulp-watch');

var path = {
  build: {
    root: 'build/',
    css: 'build/css/',
    js: 'build/js/',
    img: 'build/img/',
    sprite: 'build/sprite',
  },
  src: {
    sass: 'src/sass/*.scss',
    js: 'src/js/*.js',
    img: 'src/img/*.*',
    sprite: 'src/sprite/*.*',
  },
  watch: {
    sass: 'src/sass/*.scss',
    js: 'src/js/*.js',
    img: 'src/img/*.*',
    sprite: 'src/sprite/*.*',
  }
};

//CSS
gulp.task('style:build', function() {
  gulp.src(path.src.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 30 versions']
    }))
    // .pipe(concatCss())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.build.css));
});

//JS
gulp.task('js:build', function() {
  gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js));
});

//images
gulp.task('image:build', function() {
  gulp.src(path.src.img)
    .pipe(plumber())
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img));
});

//sprites
gulp.task('sprite:build', function () {
  var spriteData = gulp.src(path.src.sprite)
    .pipe(plumber())
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css',
      imgPath: '../sprite/sprite.png',
    }));
  spriteData.img.pipe(gulp.dest(path.build.sprite)); 
  spriteData.css.pipe(gulp.dest(path.build.css));
});


gulp.task('build', [
  'style:build',
  'js:build',
  'image:build',
  'sprite:build'
]);


gulp.task('watch', function() {

  watch([path.watch.sass], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.sprite], function(event, cb) {
    gulp.start('sprite:build');
  });
});

gulp.task('default', ['build', 'watch']);