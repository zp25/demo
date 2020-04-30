# demo

[![Build Status](https://travis-ci.org/zp25/demo.svg?branch=master)](https://travis-ci.org/zp25/demo)

zp25's demo

<https://demo.zp25.ninja>

主要路径

~~~
+-- app
|   +-- public
|   |   +-- manifest.json
|   |   +-- sw.js
|   |   +-- worker.js
|   +-- scripts
|   |   +-- main.js
|   +-- styles
+-- pages
|   +-- css
|   +-- html5
|   +-- more
|   +-- 404.js
|   +-- index.js
|   +-- wrap.js
+-- config.json
+-- writeFiles.js
~~~

## config.json

页面配置

分类，`style, script`保留字，不要用做分类名

+ `index`，配置index.html
+ `404`，配置404.html
+ `html5`，HTML5 APIs
+ `css`，CSS3
+ `more`，其它

信息

+ `name`，页面title
+ `template`，模版路径
+ `file`，html导出路径
+ `link`，array，参考的文章列表
  + `title`，标题
  + `href`，URI
+ `script`，boolean，是否包含js文件
+ `style`，boolean，是否包含样式文件(scss)
+ `useref`，array，可添加第三方依赖
  + `remove`，bool，是否remove
  + `type`，可选`"script", "style"`
  + `src`，路径
  + `dest`，useref导出路径

新建文件夹在分类目录中，文件夹名同于配置的template，文件夹中包含

+ index.js，模版
+ script.js，可选，添加js文件
+ style.scss，可选，添加样式文件

例如新建demo: canvas，配置config.js

~~~json
{
  "html5": [
    {
      "name": "Canvas",
      "template": "canvas",
      "style": true,
      "script": true,
      "file": "canvas.html"
    }
  ]
}
~~~

在`pages/html5`目录新建`canvas`目录，添加`index.js, style.scss, scripts.js`并编辑

运行`npm run writeFiles`导出html文件

## 缓存和service worker

缓存

+ index.html，不定期更新，例如添加或删除demo，使用`no-cache`总询问是否更新
+ 其它html文件，长期不变
+ scripts, styles，长期不变，Cache Busting应对更新
+ images，长期不变，可能删除图片但不可能更新同名图片，使用相对scripts/styles较短的缓存时间
+ 其它静态资源，无法确定，默认使用`no-cache`

service worker

+ index.html，不定期更新，Network falling back to the cache
+ 其它静态资源，可跟随service worker更新，Cache falling back to the network

首次访问即可离线，cache添加`index.html`，首页使用的scripts/styles文件名有hash不容易写入sw.js，但有较长browser cache缓存时间，sw.js可通过browser cache获取

## 资源

+ [Smaller HTML Payloads with Service Workers](https://philipwalton.com/articles/smaller-html-payloads-with-service-workers/ "Smaller HTML Payloads with Service Workers")
