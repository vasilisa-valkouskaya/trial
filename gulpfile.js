let project_folder = 'dist';
let source_folder = 'src';

let path = {
    build: {
        css: project_folder + '/css/',
        js: project_folder + '/scripts/',
    },
    src: {
        css: source_folder + '/scss/main.scss',
        js: source_folder + '/scripts/*.js',
    },
    watch: {
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/scripts/**/*.js',
    },
    clean: './' + project_folder + '/'
}

let {
    src,
    dest
} = require('gulp'),
    gulp = require('gulp'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename');




function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: 'expanded'
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 versions'],
                cascade: false
            })
        )
        .pipe(clean_css())
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(path.build.css))

}

function js() {
    return src(path.src.js)
        .pipe(
            babel({
                presets: [
                    '@babel/preset-env',
                    'minify'
                ],

            })
        )
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(path.build.js))
}

function watchFiles() {
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);

}

let build = gulp.series(gulp.parallel(js, css));
let watch = gulp.parallel(build, watchFiles);


exports.js = js;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;