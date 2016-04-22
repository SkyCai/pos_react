// npm install [-g] fis3-hook-amd
//fis.set('project.files','**.{html}');
fis.set('build', '/build'); //buildĿ¼ 

fis.match(/^\/src\/images\/(.*\.(?:png|gif|jpg))/i,{
      release: '${build}/assets/images/$1'
});

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // ���� __RESOURCE_MAP__ �ṹ���������Դ��������
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        useInlineMap: true // ��Դӳ�����Ƕ
    })
});

//�ϲ�

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



//����
fis.set('project.ignore', [
  'node_modules/**',
  'webpack**',
  'build/**',
  'src/{js,sass,images}/**',
  'fis-conf.js',
  'package.json',
  '.svn/**'
]);
