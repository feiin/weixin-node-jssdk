'use strict';

var jssdk = require('./lib/jssdk');

function getJssdkConfig(options,callback) {

    jssdk.getJsApiTicket(options.appConfig,function(err,ticket) {
        if(err) {
            return callback(err);
        }
        var result = jssdk.createSha1Sign(ticket, options.url);
        result.appId = options.appConfig.appId;
        callback(null, result);
    });
}

module.exports = getJssdkConfig;