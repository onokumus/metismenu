;(function ($, window, document, undefined) {

    var pluginName = "metisMenu",
        defaults = {
            toggle: true,
            cookieName: "MetisMenuState",
            cookieExpiration: 1 //Number of days
        };
        
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {

            var $this = $(this.element),
                $toggle = this.settings.toggle,
                $cookieName = this.settings.cookieName,
                $cookieExpiration = this.settings.cookieExpiration;

            //Restores the menu state from cookies
            var documentCookie = document.cookie;
            $this.find("li").has("ul").each(function (i) {
                var pos = documentCookie.indexOf($cookieName + "_" + i + "=");
                if (pos > -1) {
                    documentCookie.substr(pos).split("=")[1].indexOf("false") ? $(this).addClass("active") : $(this).removeClass("active");
                }
            });

            if (this.isIE() <= 9) {
                $this.find("li.active").has("ul").children("ul").collapse("show");
                $this.find("li").not(".active").has("ul").children("ul").collapse("hide");
            } else {
                $this.find("li.active").has("ul").children("ul").addClass("collapse in");
                $this.find("li").not(".active").has("ul").children("ul").addClass("collapse");
            }

            $this.find("li").has("ul").children("a").on("click", function (e) {
                e.preventDefault();

                $(this).parent("li").toggleClass("active").children("ul").collapse("toggle");

                if ($toggle) {
                    $(this).parent("li").siblings().removeClass("active").children("ul.in").collapse("hide");
                }
                
                //Deletes all cookies
                var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    var eqPos = cookie.indexOf("=");
                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    if (name.trim().slice(0, $cookieName.length) === $cookieName) {
                        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                    }
                }
                //Stores the menu state in cookies
                var date = new Date();
                date.setTime(date.getTime() + ($cookieExpiration * 24 * 60 * 60 * 1000));
                $this.find("li").has("ul").each(function (i) {
                    document.cookie = $cookieName + "_" + i + "=" + $(this).hasClass("active") + ";expires=" + date.toGMTString() + ";path=/";
                });
            });
        },

        isIE: function() {//https://gist.github.com/padolsey/527683
            var undef,
                v = 3,
                div = document.createElement("div"),
                all = div.getElementsByTagName("i");

            while (
                div.innerHTML = "<!--[if gt IE " + (++v) + "]><i></i><![endif]-->",
                all[0]
            ) {
                return v > 4 ? v : undef;
            }
        }
    };

    $.fn[ pluginName ] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
