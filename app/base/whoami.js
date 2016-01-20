'use strict';

var parser = require("ua-parser-js");
var locale = require("locale")
var path = process.cwd();

module.exports = function (app) {
    app.route('/api/whoami')
        .get(function(req,res){
            
        // get user-agent header
        var ua = parser(req.headers['user-agent']);
        
        //get OS Name and OS Version from user-agent header
        var osname = ua.os["name"];
        var osversion = ua.os["version"];
        
        //get ip address from x-forwarded-for
        var ip = req.headers['x-forwarded-for'];
        
        //get browser language from accept-lamguage
        var locales = new locale.Locales(req.headers["accept-language"]);
        var localesLang = locales[0]["code"];
        
        //create the data object
        var dataObj = {
            "ipaddress": ip,
            "language": localesLang,
            "software": osname + "; " + osversion 
        }
        
        res.end(JSON.stringify(dataObj, null, '  '));
            
        });
}