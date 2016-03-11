var should = require('should');
var jssdkConfig = require("../index");

describe("test weixin jssdk",function(){

    var options = {
    };


    before(function(done) {
        options.appId = 'wxec0751e82f5d6b2d';
        options.appSecret = 'cdd37a88d3219564582145532ac8d114';
        options.url = 'http://test.aggior.com/mall';
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
                config.signature.length.should.be.above(0);
                done(error);
            });
        });

    });

    after(function(done){
        done();
    })
});