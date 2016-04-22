// npm install [-g] fis3-hook-amd
//fis.set('project.files','**.{html}');
fis.set('build', '/build'); //build目录 

fis.match(/^\/src\/images\/(.*\.(?:png|gif|jpg))/i,{
      release: '${build}/assets/images/$1'
});

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        useInlineMap: true // 资源映射表内嵌
    })
});

//合并

fis.match(/^\/src\/js\/lib\/(.*\.(?:js))/i, {
    optimizer: fis.plugin('uglify-js'),
    packTo: '${build}/pkg/global.js',
    release: '${build}/pkg/$1'
});

fis.match('${build}/pkg/global.js', {
    useHash: true
}); 

fis.match('src/sass/commons.scss', {
    rExt: '.css', // from .scss to .css
    useSprite: true,
    useHash: true,
    optimizer: fis.plugin('clean-css'),
    release: '${build}/pkg/global',
    parser: fis.plugin('node-sass', {
        //fis-parser-sass option
    })
});

fis.match('src/templates/**', {
    release: '${build}/pkg/index'
});



//过滤
fis.set('project.ignore', [
  'node_modules/**',
  'webpack**',
  'build/**',
  'src/{js,sass,images}/**',
  'fis-conf.js',
  'package.json',
  '.svn/**'
]);
