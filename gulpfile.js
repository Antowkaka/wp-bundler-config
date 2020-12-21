const { src, dest, watch, parallel } = require('gulp');

const pathes = require('./pathes.json');

const scss   = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');


const styles = () => (
    src('assets/scss/style.scss')
    .pipe(scss({outputStyle: 'compressed'})).on('error', scss.logError)
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 3 version']
    }))
    .pipe(dest(pathes.css))
    .pipe(browserSync.stream())
    );
    
    const watcher = () => {
        watch(pathes.wathing.css, styles);
        watch(pathes.wathing.php).on('change', browserSync.reload)
    };
    
const sync = () => browserSync.init({proxy: pathes.localhost});
    
exports.styles = styles;
exports.watcher = watcher;
exports.sync = sync;

exports.default = parallel(sync, watcher);

