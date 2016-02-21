var gulp = require('gulp'),
    del = require('del'),
    babel = require('gulp-babel');
    uglify = require('gulp-uglify');
    watch = require('gulp-watch');

gulp.task('clean-server', function(){
    return del(['../server/api'], {force: true});
});

gulp.task('build-server-dev', ['clean-server'], function() {
    return gulp.src('../src/server/**/*.js')
        .pipe(watch('../src/server/**/*.js'))
        .pipe(babel())
        .pipe(gulp.dest('../server/api'));
});

gulp.task('build-server', ['clean-server'], function() {
    return gulp.src('../src/server/**/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('../server/api'));
});


