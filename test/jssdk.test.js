var should = require('should');
var jssdkConfig = require("../index");

describe("test weixin jssdk",function(){

    var appConfig = {
        appId:'',
        appSecret:''
    };
    var options = {
        appConfig:appConfig,
        url:''
    }

    before(function(done) {
        appConfig.appId = 'appId';
        appConfig.appSecret = 'secrect';
        options.url = 'http://www.example.com/test';
        done();

    })

    describe("test index.js",function(){

        it("should  generate jssdk success",function(done){

            jssdkConfig(options,function(error,config){

                console.log(error,config);
                should.not.exists(error);
                config.should.be.ok;
                config.nonceStr.length.should.be.above(0);
                config.timestamp.should.be.above(0);
                config.url.should.not.be.empty();
                config.signature.length.should.be.above(0);
                done(error);
            });
        });

    });

    after(function(done){
        done();
    })
});