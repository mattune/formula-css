const { src, dest, watch, series, parallel } = require("gulp")
const plumber = require("gulp-plumber")
const sass = require("gulp-sass")
const packageImporter = require("node-sass-package-importer")
const autoprefixer = require("gulp-autoprefixer")

/**************************************************
 * path
 *************************************************/
const paths = {
  scss: "develop/**/*.scss",
  exScss: "!develop/**/_*.scss",
  css: "release/",
}

/**************************************************
 * tasks
 *************************************************/
// sass
const compileSass = (done) => {
  src([paths.scss, paths.exScss])
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "compressed",
        importer: packageImporter({
          extensions: [".scss", ".css"],
        }),
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(dest(paths.css))
  done() // 終了宣言
}

const watchFiles = () => {
  watch(paths.scss, series(compileSass))
}

exports.sass = compileSass
exports.default = watchFiles
