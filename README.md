
##功能

生成使用微信JSSDK的页面所需的配置信息。支持多个不同的微信appId同时使用,会自动缓存appId对应的token和ticket直到失效时间。

##安装
```
  npm install weixin-node-jssdk --save
```  

##使用

```
  var weixinJsConfig = require('weixin-node-jssdk');
  
  var options = {};
  options.appId = 'weixin appId';
  options.appSecret = 'weixin appSecret'
  options.url = 'http://www.example.com/test';
  
  weixinJsConfig(options,function(error,config){
  		//config
  });
  
  
  //config example:
  
  /*
  { nonceStr: 'qw9daikerfmexxxd',
  	 timestamp: 1457675573,
    signature: '8beb309515ca4fd6271a32de0e9732004094b07d',
    appId: 'wxec0751e82f5dde2d' 
  }
  */
```	
