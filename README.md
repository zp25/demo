# demo

zp25's demo

<https://demo.zp25.ninja>

主要路径

~~~
+-- app
|   +-- assets
|   |   +-- manifest.json
|   |   +-- sw.js
|   +-- scripts
|   |   +-- worker.js
+-- pages
|   +-- node_modules
|   |   +-- templater.js
|   +-- public
|   |   +-- header.js
|   |   +-- link.js
|   |   +-- pre.js
|   |   +-- script.js
|   |   +-- style.js
|   +-- 404.js
|   +-- index.js
|   +-- wrap.js
+-- config.js
+-- server.js
+-- writeFiles.js
~~~

## config.json
页面配置

分类

+ `index`，配置index.html
+ `404`，配置404.html
+ `javascript`，HTML5 APIs
+ `css`，CSS3
+ `more`，其它

信息

+ `name`，页面title
+ `template`，模版路径
+ `file`，html导出路径
+ `link`，参考的文章列表
  + `title`，标题
  + `href`，URI
+ `script`，js路径，用于导出js文件和源码显示
+ `style`，scss路径，现在只用于源码显示
+ `useref`，useref配置，例如添加js依赖
  + `remove`，bool，是否remove
  + `type`，可选`"script", "style"`
  + `src`，路径
  + `dest`，useref导出路径
