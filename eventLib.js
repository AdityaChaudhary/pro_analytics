function PiStatsGlobal() {
  this.kinesis = new AWS.Kinesis({
    accessKeyId: 'AKIAJ2BVNFSEZFGXCRGA',
    secretAccessKey: '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',
    region: 'us-east-1'
  });
  this.pageVisitTimeStamp = new Date();
  this.screenAlias = screen,
    this.documentAlias = document,
    this.navigatorAlias = navigator,
    this.windowAlias = window;
  this.referrerUrl;
  this.prevUrl;

  this.ip ;
  var parent = this;

  this.piStats = {
    getIp:function(url) {
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
          var status = xhr.status;
          if (status == 200) {
            resolve(xhr.response);
            parent.ip = xhr.response.ip;
          } else {
            reject(status);
          }
        };
        xhr.send();
      });
    },

    /**
     description: Assigns a user with GUID to non existing User.Should be called when site loads.
     return: GUID
     */
    identify: function () {
      /*jQuery.post('http://localhost:3000/api/GUIDUserMappings', {'GUID': localStorage.getItem("GUID")}, function (result) {
       if (result) {
       localStorage.setItem("GUID", result.id);
       }
       });*/

      var GUID = localStorage.getItem("GUID");
      if (!GUID) {
        var data = {'guid': GUID};
        var params = {
          Data: JSON.stringify(data),
          PartitionKey: 'pi-stats',
          StreamName: 'pi-stats-guid-stream'

        };
        parent.kinesis.putRecord(params, function (err, data) {
          if (err) console.log("error", err, err.stack); // an error occurred
          else {

            localStorage.setItem("GUID", data.SequenceNumber);
            piStats.init();
          }           // successful response
        });
      }
      else {
        piStats.init();
      }


    },
    init: function () {

      parent.referrerUrl = parent.documentAlias.referrer;
      parent.prevUrl = parent.windowAlias.location.href;

      piStats.load("Page Visit");
      window.addEventListener("hashchange", function (event) {
        var angularAppType = true;
        window.onscroll = function () {
          angularAppType = false;
        };

        if (angularAppType) {
          parent.referrerUrl = parent.prevUrl;
          parent.prevUrl = parent.windowAlias.location.href;
          piStats.unload("Page Exit");
          piStats.load("Page Visit");
        }

      });

      window.addEventListener("beforeunload", function (event) {
        piStats.unload("Page Exit");
      });
    },
    /**
     description: This method will get invoked when a user logs in.
     input: userId
     externalInfo can contain fields $email,$first_name,$last_name,$name,$username.
     */
    user: function (externalId, externalInfo) {
      /*jQuery.post('http://localhost:3000/api/ExternalUsers', {
       "GUID": localStorage.getItem("GUID"),
       "externalId": externalId,
       "externalInfo": externalInfo
       }, function (result) {
       });*/if(externalId){
      var guidObject = {};
      guidObject.guid =localStorage.getItem("GUID");
      guidObject.user = {};
      guidObject.user.externalId = externalId;
      guidObject.user.externalInfo = externalInfo;
      var data = guidObject;
      var params = {
        Data: JSON.stringify(data),
        PartitionKey: 'pi-stats',
        StreamName: 'pi-stats-guid-stream'

      };
      parent.kinesis.putRecord(params, function (err, data) {
        if (err) console.log("error", err, err.stack); // an error occurred
        else {
          console.log("success", data);
        }           // successful response
      });
      }
      else {
        console.log("ExternalId is mandatory");
      }
    },

    /**
     description: This method will get invoked when a user fires any event.
     input: eventName, customAttributes
     */
    event: function (eventName, customAttributes) {
      var GUID = localStorage.getItem("GUID");
      var eventUrl = parent.windowAlias.location.href;
      //var eventId = Math.random() * 10000;
      var eventId = localStorage.getItem("loadEventId");
      var flashVersion = piStats.getFlashVersion();
      var browserInfo = piStats.getBrowserInfo();
      var quickTimeEnabled = piStats.featuresQuickTime();
      var browserLang = navigator.language || navigator.userLanguage;
      var isMobile = piStats.mobileAndTabletCheck();
      var eventProperties = {
        "eventName": eventName,
        "loadEventId": eventId,
        "guid": GUID,
        "ip": parent.ip,
        "browserName": browserInfo.browser,
        "browserLanguage": browserLang,
        "browserVersion": browserInfo.browserVersion,
        "os": parent.navigatorAlias.platform,
        "pageTitle":parent.documentAlias.title,
        "viewHeight": parent.windowAlias.innerHeight,
        "viewWidth": parent.windowAlias.innerWidth,
        "screenHeight": parent.windowAlias.screen.height,
        "screenWidth": parent.windowAlias.screen.width,
        "colorDepth": parent.screenAlias.colorDepth,
        "cookieEnabled": parent.navigatorAlias.cookieEnabled,
        "flashVersion": flashVersion,
        "supportsPdf": browserInfo.acrobat,
        "quickTimeEnabled": quickTimeEnabled,
        "userAgent": parent.navigatorAlias.userAgent,
        "isMobile": isMobile,
        "javaEnabled": navigator.javaEnabled(),
        "pageVisitTimeStamp": parent.pageVisitTimeStamp,
        "url": eventUrl,
        "referrer": parent.referrerUrl,
        "customAttributes": customAttributes

      };
      //jQuery.post('http://localhost:3000/api/Events', eventProperties);

      var params = {
        Data: JSON.stringify(eventProperties),
        PartitionKey: 'pi-stats',
        StreamName: 'pi-stats-stream'

      };
      parent.kinesis.putRecord(params, function (err, data) {
        if (err) console.log("error", err, err.stack); // an error occurred
        else {
          console.log("success Event", data);
          /*localStorage.setItem("SequenceNumber", data.SequenceNumber);*/
        }           // successful response
      });

    },
    load: function (eventName) {
      var GUID = localStorage.getItem("GUID");
      var eventUrl = parent.windowAlias.location.href;
      var flashVersion = piStats.getFlashVersion();
      var browserInfo = piStats.getBrowserInfo();
      var quickTimeEnabled = piStats.featuresQuickTime();
      var browserLang = navigator.language || navigator.userLanguage;
      var isMobile = piStats.mobileAndTabletCheck();
      localStorage.setItem("EventUrl", eventUrl);
      var eventProperties = {
        "eventName": eventName,
        "guid": GUID,
        "ip": parent.ip,
        "browserName": browserInfo.browser,
        "browserLanguage": browserLang,
        "browserVersion": browserInfo.browserVersion,
        "os": parent.navigatorAlias.platform,
        "pageTitle":parent.documentAlias.title,
        "viewHeight": parent.windowAlias.innerHeight,
        "viewWidth": parent.windowAlias.innerWidth,
        "screenHeight": parent.windowAlias.screen.height,
        "screenWidth": parent.windowAlias.screen.width,
        "colorDepth": parent.screenAlias.colorDepth,
        "cookieEnabled": parent.navigatorAlias.cookieEnabled,
        "flashVersion": flashVersion,
        "supportsPdf": browserInfo.acrobat,
        "quickTimeEnabled": quickTimeEnabled,
        "userAgent": parent.navigatorAlias.userAgent,
        "isMobile": isMobile,
        "javaEnabled": navigator.javaEnabled(),
        "pageVisitTimeStamp": parent.pageVisitTimeStamp,
        "url": eventUrl,
        "referrer": parent.referrerUrl

      };
      console.log("!!",eventProperties);
      //jQuery.post('http://localhost:3000/api/Events', eventProperties);
      var params = {
        Data: JSON.stringify(eventProperties),
        PartitionKey: 'pi-stats',
        StreamName: 'pi-stats-stream'

      };
      parent.kinesis.putRecord(params, function (err, data) {
        if (err) console.log("error", err, err.stack); // an error occurred
        else {
          console.log("success Load", data);
          localStorage.setItem("loadEventId", data.SequenceNumber);
        }           // successful response
      });

    },
    unload: function (eventName) {
      var GUID = localStorage.getItem("GUID");
      //var eventId = localStorage.getItem("EventId");
      var eventId = localStorage.getItem("loadEventId");
      var eventUrl = localStorage.getItem("EventUrl");
      var flashVersion = piStats.getFlashVersion();
      var browserInfo = piStats.getBrowserInfo();
      var quickTimeEnabled = piStats.featuresQuickTime();
      var browserLang = navigator.language || navigator.userLanguage;
      var isMobile = piStats.mobileAndTabletCheck();
      var eventProperties = {
        "eventName": eventName,
        "loadEventId": eventId,
        "guid": GUID,
        "ip": parent.ip,
        "browserName": browserInfo.browser,
        "browserLanguage": browserLang,
        "browserVersion": browserInfo.browserVersion,
        "os": parent.navigatorAlias.platform,
        "pageTitle":parent.documentAlias.title,
        "viewHeight": parent.windowAlias.screen.height,
        "viewWidth": parent.windowAlias.screen.width,
        "screenHeight": parent.windowAlias.innerHeight,
        "screenWidth": parent.windowAlias.innerWidth,
        "colorDepth": parent.screenAlias.colorDepth,
        "cookieEnabled": parent.navigatorAlias.cookieEnabled,
        "flashVersion": flashVersion,
        "supportsPdf": browserInfo.acrobat,
        "quickTimeEnabled": quickTimeEnabled,
        "userAgent": parent.navigatorAlias.userAgent,
        "isMobile": isMobile,
        "javaEnabled": navigator.javaEnabled(),
        "pageVisitTimeStamp": parent.pageVisitTimeStamp,
        "url": eventUrl,
        "referrer": parent.referrerUrl


      };
      console.log("!!",eventProperties);
      //jQuery.post('http://localhost:3000/api/Events', eventProperties);

      var params = {
        Data: JSON.stringify(eventProperties),
        PartitionKey: 'test',
        StreamName: 'pi-stats-stream'

      };
      parent.kinesis.putRecord(params, function (err, data) {
        if (err) console.log("error", err, err.stack); // an error occurred
        else {
          console.log("success Unload", data)

        }           // successful response
      });

    },
    getBrowserInfo: function () {

      var getBrowserVersionAndName = function () {
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browserName = navigator.appName;
        var fullVersion = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

// In Opera 15+, the true version is after "OPR/"
        if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
          browserName = "Opera";
          fullVersion = nAgt.substring(verOffset + 4);
        }
// In older Opera, the true version is after "Opera" or after "Version"
        else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
          browserName = "Opera";
          fullVersion = nAgt.substring(verOffset + 6);
          if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
        }
// In MSIE, the true version is after "MSIE" in userAgent
        else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
          browserName = "Microsoft Internet Explorer";
          fullVersion = nAgt.substring(verOffset + 5);
        }
// In Chrome, the true version is after "Chrome"
        else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
          browserName = "Chrome";
          fullVersion = nAgt.substring(verOffset + 7);
        }
// In Safari, the true version is after "Safari" or after "Version"
        else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
          browserName = "Safari";
          fullVersion = nAgt.substring(verOffset + 7);
          if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
        }
// In Firefox, the true version is after "Firefox"
        else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
          browserName = "Firefox";
          fullVersion = nAgt.substring(verOffset + 8);
        }
// In most other browsers, "name/version" is at the end of userAgent
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
          (verOffset = nAgt.lastIndexOf('/'))) {
          browserName = nAgt.substring(nameOffset, verOffset);
          fullVersion = nAgt.substring(verOffset + 1);
          if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
          }
        }
// trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(";")) != -1)
          fullVersion = fullVersion.substring(0, ix);
        if ((ix = fullVersion.indexOf(" ")) != -1)
          fullVersion = fullVersion.substring(0, ix);

        majorVersion = parseInt('' + fullVersion, 10);
        if (isNaN(majorVersion)) {
          fullVersion = '' + parseFloat(navigator.appVersion);
          majorVersion = parseInt(navigator.appVersion, 10);
        }
        return {
          "browserName": browserName,
          "version": fullVersion
        };
      };

      var getBrowserName = function () {
        return this.name = this.name || function () {
            var userAgent = navigator ? navigator.userAgent.toLowerCase() : "other";

            if (userAgent.indexOf("chrome") > -1)        return "Chrome";
            else if (userAgent.indexOf("safari") > -1)   return "Safari";
            else if (userAgent.indexOf("msie") > -1)     return "Internet Explorer";
            else if (userAgent.indexOf("firefox") > -1)  return "Firefox";
            return userAgent;
          }();
      };
      var getActiveXObject = function (name) {
        try {
          return new ActiveXObject(name);
        } catch (e) {
        }
      };

      var getNavigatorPlugin = function (name) {
        for (key in navigator.plugins) {
          var plugin = navigator.plugins[key];
          if (plugin.name == name) return plugin;
        }
      };

      var getPDFPlugin = function () {
        return this.plugin = this.plugin || function () {
            if (getBrowserName() == 'ie') {
              //
              // load the activeX control
              // AcroPDF.PDF is used by version 7 and later
              // PDF.PdfCtrl is used by version 6 and earlier
              return getActiveXObject('AcroPDF.PDF') || getActiveXObject('PDF.PdfCtrl');
            }
            else {
              return getNavigatorPlugin('Adobe Acrobat') || getNavigatorPlugin('Chrome PDF Viewer') || getNavigatorPlugin('WebKit built-in PDF');
            }
          }();
      };

      var isAcrobatInstalled = function () {
        return !!getPDFPlugin();
      };

      var getAcrobatVersion = function () {
        try {
          var plugin = getPDFPlugin();

          if (getBrowserName() == 'ie') {
            var versions = plugin.GetVersions().split(',');
            var latest = versions[0].split('=');
            return parseFloat(latest[1]);
          }

          if (plugin.version) return parseInt(plugin.version);
          return plugin.name

        }
        catch (e) {
          return null;
        }
      };

      //
      // The returned object
      //
      return {
        browser: getBrowserVersionAndName().browserName,
        browserVersion: getBrowserVersionAndName().version,
        acrobat: isAcrobatInstalled() ? true : false,
        acrobatVersion: getAcrobatVersion()
      };
    },
    getFlashVersion: function () {
      var a, b, c, y = 'length', v = "name", t = "indexOf", m = "match";
      if (c = window.navigator.plugins)
        for (var d = 0; d < c[y] && !b; d++) {
          var e = c[d];
          -1 < e[v][t]("Shockwave Flash") && (b = e.description)
        }
      if (!b) try {
        a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), b = a.GetVariable("$version")
      } catch (g) {
      }
      if (!b) try {
        a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), b = "WIN 6,0,21,0", a.AllowScriptAccess = "always", b = a.GetVariable("$version")
      } catch (ca) {
      }
      if (!b) try {
        a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), b = a.GetVariable("$version")
      } catch (l) {
      }
      b &&
      (a = b[m](/[\d]+/g)) && 3 <= a[y] && (b = a[0] + "." + a[1] + " r" + a[2]);
      return b || void 0
    },
    featuresQuickTime: function () {
      var haveqt = false;

      if (navigator.plugins) {
        for (i = 0; i < navigator.plugins.length; i++) {
          if (navigator.plugins[i].name.indexOf
            ("QuickTime") >= 0) {
            haveqt = true;
          }
        }
      }

      if ((navigator.appVersion.indexOf("Mac") > 0)
        && (navigator.appName.substring(0, 9) == "Microsoft")
        && (parseInt(navigator.appVersion) < 5)) {
        haveqt = true;
      }
      return haveqt;
    },
    mobileAndTabletCheck: function () {
      var check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    },
    logout: function () {
      localStorage.removeItem("GUID");
    }
  }


}


var piStats = new PiStatsGlobal().piStats;

/**
 description : This method gets the ip and then calls the Identify for piStats.
 **/
piStats.getIp('https://mathiasbynens.be/demo/ip').then(function(data) {
  piStats.identify();
}, function(status) {
  console.log('Something went wrong.');
});

