/**
 * Created by aditya on 18/7/15.
 */

function ProAnalytics() {

    function Technology() {


        //var parent = this;

        this.getBrowserInfo = function () {


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
                "browserVersion": fullVersion
            };

        };

        this.checkQuickTime = function () {
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
        };

        this.checkMobileAndTablet = function () {
            var check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        };

        this.getFlashVersion = function () {
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
        };


        this.browserInfo = this.getBrowserInfo();
        this.browserLanguage = navigator.language || navigator.userLanguage;
        this.flashVersion = this.getFlashVersion();
        this.quickTimeEnabled = this.checkQuickTime();
        this.isMobile = this.checkMobileAndTablet();


        //console.log(parent.browserInfo);
        //debugger;
        this.response = {
            "browserName": this.browserInfo.browserName,
            "browserVersion": this.browserInfo.browserVersion,
            "browserLanguage": this.browserLanguage,
            "systemOS": navigator.platform,
            "viewHeight": window.innerHeight,
            "viewWidth": window.innerWidth,
            "screenHeight": window.screen.height,
            "screenWidth": window.screen.width,
            "colorDepth": screen.colorDepth,
            "cookieEnabled": navigator.cookieEnabled,
            "flashVersion": this.flashVersion,
            "quickTimeEnabled": this.quickTimeEnabled,
            "isMobile": this.isMobile,
            "javaEnabled": navigator.javaEnabled(),
            "userAgent": navigator.userAgent

        };

        this.getTechology = function () {
            return this.response;
        }


    }

    function Referrer() {
        this.referrerUrl = document.referrer;

        this.getReferrer = function () {
            return {
                "referrerUrl": this.referrerUrl
            };
        };
    }

    function Page() {
        this.url = window.location.href;
        this.pageTitle = document.title;
        var loadTimeCal = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        this.loadTime = loadTimeCal > 0 ? loadTimeCal : 0;
        this.pageVisitTimeStamp = (new Date()).getTime();

        this.getPage = function () {
            return {
                "url": this.url,
                "pageTitle": this.pageTitle,
                "loadTime": this.loadTime,
                "pageVisitTimeStamp": this.pageVisitTimeStamp
            };
        }
    }

    function GUID() {

        this.generateUUID = function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };

        if (localStorage.getItem("pro_analytics_guid") == null) {
            var tmp_guid = this.generateUUID();
            localStorage.setItem("pro_analytics_guid", tmp_guid);
            this.guid = tmp_guid;
        }
        else {
            this.guid = localStorage.getItem("pro_analytics_guid");
        }


        this.getGuid = function() {
            return {
                "guid": this.guid
            };
        }

    }

    function EventStory() {
        this.technology = new Technology();
        this.referrer = new Referrer();
        this.page = new Page();
        this.guid = new GUID();

        this.getEventStory = function () {
            return {
                "technology": this.technology.getTechology(),
                "referrer": this.referrer.getReferrer(),
                "page": this.page.getPage(),
                "guid": this.guid.getGuid()
            };
        };
    }

    this.trackEvent = function (eventName) {

        this.eventName = eventName;

        var event = new EventStory();
        this.eventStory = event.getEventStory();

        return {
            "eventName": this.eventName,
            "eventStory": this.eventStory
        };
    };


    this.init = function () {
        console.log(this.trackEvent("page load"));
    };


}

var proAnalytics = new ProAnalytics();
proAnalytics.init();