const sync = require("browser-sync").create();
const rename = require("gulp-rename");
const changed = require("gulp-changed");
const del = require("del");

const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");

const terser = require("gulp-terser");

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");

const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");


// ---


const clean = () => {
  return del("build");
};

exports.clean = clean;

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
};

const html = () => {
  return gulp.src(["source/**/*.html"], {base: "source"})
  .pipe(posthtml( [include()] ))
  .pipe(gulp.dest("build"))
}
exports.html = html;

const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"))
}

exports.sprite = sprite;

const js = () => {
  return gulp.src(["source/js/**/*.js"], {base: "source"})
  .pipe(terser())
  .pipe(rename("script.min.js"))
  .pipe(gulp.dest("build/js"))
}

const css = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())

    .pipe(sourcemap.init())

    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css"))

    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))

    .pipe(sync.stream());
}

const img = () => {
  return gulp.src(["source/img/**/*.{jpg,jpeg,png,svg}"],  {base: "source/img"})
  .pipe(changed("build/img"))
  .pipe(gulp.dest("build/img"))
  .pipe(webp())
  .pipe(gulp.dest("build/img"))
}


const serve = (done) => {
  sync.init({server: {baseDir: 'build'}});

  gulp.watch("source/img/**/*.svg").on("change", gulp.series(sprite, html, sync.reload));
  gulp.watch("source/*.html").on("change", gulp.series(html, sync.reload));

  gulp.watch("source/less/**/*.less").on("change", gulp.series(css));
  gulp.watch("source/js/**/*.js").on("change", gulp.series(js, sync.reload));

  gulp.watch("source/img/**/*.*").on("add", gulp.series(img, sync.reload));
  gulp.watch("source/img/**/*.*").on("change", gulp.series(img, sync.reload));

  done();
}

const build = gulp.series(clean, copy, gulp.parallel(img, css, js, sprite, html));
const dev = gulp.series(gulp.parallel(css, html), serve)


// ---


exports.default = dev;
exports.build = build;
