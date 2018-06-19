let gulp = require('gulp'),
	del = require('del'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify'); 

let path = {
	source: {
		html: 'source/*.html',
		css: 'source/css/*.css',
		js: 'source/js/*.js',
		img: 'source/img/*.*'
	},
	build: {
		html: 'build/',
		css: 'build/css/',
		js: 'build/js/',
		img: 'build/img/'
	},
	watch: {
		html: 'source/*.html',
		css: 'source/css/*.css',
		js: 'source/js/*.js',
		img: 'source/img/*.*'
	},
	clean: {
		all: './build'
	}
}

gulp.task('clean', () => {
	return del(path.clean.all);
})

gulp.task('css', () => {
	return gulp.src(path.source.css)
				.pipe(autoprefixer({
					browsers: ['cover 95%']
				}))
				.pipe(csso())
				.pipe(gulp.dest(path.build.css));
})

gulp.task('css-watch', ['css'], (done) => {
	browserSync.reload();
	done();
})

gulp.task('js', () => {
	return gulp.src(path.source.js)
				.pipe(babel({
					'presets': ['env']
				}))
				.pipe(uglify())
				.pipe(gulp.dest(path.build.js));
})

gulp.task('js-watch', ['js'], (done) => {
	browserSync.reload();
	done();
})

gulp.task('copy', () => {
	gulp.src(path.source.html)
			.pipe(gulp.dest(path.build.html));
	gulp.src(path.source.img)
			.pipe(gulp.dest(path.build.img));
	return true;
})

gulp.task('copy-watch', ['copy'], (done) => {
	browserSync.reload();
	done();
})

gulp.task('run', ['copy', 'css', 'js'], () => {
	browserSync.init({
	    server: {
	        baseDir: './build'
	    }
    });
    gulp.watch(path.watch.html, ['copy-watch']);
    gulp.watch(path.watch.img, ['copy-watch']);
    gulp.watch(path.watch.css, ['css-watch']);
    gulp.watch(path.watch.js, ['js-watch']);
})

gulp.task('default', ['run']);