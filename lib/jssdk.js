'use strict';
var request = require('request');
var crypto = require('crypto');
var jssdk = {
    weixinUrls:{
        tokenBaseUrl:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
        ticketBaseUrl:'https://api.weixin.qq.com/cgi-bin/ticket/getticket'
    },
    cache:{},
    createNonceStr:function(){
        return Math.random().toString(36).substr(2, 15);
    },
    createTimestamp:function(){
        return parseInt(new Date().getTime() / 1000);
    },
    raw:function(args) {

        var keys = Object.keys(args),
            newArgs = [],
            result;

        keys = keys.sort();
        keys.forEach(function (key) {
            newArgs.push([key.toLowerCase(),args[key]].join('='));
        });

        result = newArgs.join('&');
        return result;
    },
    getAccessToken:function(appConfig,callback) {
        var appCache = jssdk.cache[appConfig.appId],
            now = new Date();
        if(appCache == null) {
            jssdk.cache[appConfig.appId] = appCache = {};
        }

        if(appCache.tokenExpireTime && appCache.accessToken && now.getTime() /1000 < appCache.tokenExpireTime){
           return callback(null,appCache.accessToken);
        }

        var url = jssdk.weixinUrls.tokenBaseUrl+"&appid=" + appConfig.appId + "&secret=" + appConfig.appSecret;

        request.get(url,function(error,response,body){

            if(error){
               return callback(error);
            }
            var data = JSON.parse(body);
            appCache.accessToken = data['access_token'];
            var d = new Date();
            appCache.tokenExpireTime = d.getTime()/1000 + data['expires_in'] - 30;
            callback(null,appCache.accessToken);
        });
    },
    getJsApiTicket:function(appConfig,callback) {
        var appCache = jssdk.cache[appConfig.appId],
            now = new Date();
        if(appCache == null) {
            jssdk.cache[appConfig.appId] = appCache = {};
        }

        if(appCache.ticketExpireTime && appCache.jsApiTicket && now.getTime() /1000 < appCache.ticketExpireTime){
            return callback(null,appCache.jsApiTicket);
        }

        this.getAccessToken(appConfig,function(err,accessToken){

            var url = jssdk.weixinUrls.ticketBaseUrl+'?access_token=' + accessToken + '&type=jsapi';
            request.get(url,function(error,response,body){
                if(error) {
                    return callback(error);
                }
                var data = JSON.parse(body);
                appCache.jsApiTicket = data['ticket'];
                var d = new Date();
                appCache.ticketExpireTime = d.getTime()/1000 + data['expires_in'] - 30;
                callback(null,appCache.jsApiTicket);
            });

        });
    },
    createSha1Sign:function(jsApiTicket,url) {

        var data = {
            jsapi_ticket: jsApiTicket,
            nonceStr: jssdk.createNonceStr(),
            timestamp: jssdk.createTimestamp(),
            url: url
        };
        var str = jssdk.raw(data);
        var sha1 = crypto.createHash('sha1');
        sha1.update(str);
        data.signature = sha1.digest('hex');
        delete data.jsapi_ticket;
        delete data.url;
        return data;
    }
};

module.exports = jssdk;