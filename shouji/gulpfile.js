/**
 * Created by YY on 2017/3/1.
 */
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');

//默认执行任务
gulp.task('default', function () {
    //找到src目录下app.css，为其补全浏览器兼容的css
    return gulp.src('index.css')
        .pipe(autoprefixer({
            /*browsers: ['last 2 versions'],*/
            "Major Browsers":['iOS','Chrome ','Firefox ','Explorer ','Edge ','Opera ','Safari ','ExplorerMobile '],
            cascade: false
        }))
        //输出到dist文件夹
        .pipe(gulp.dest('dist'));
});
