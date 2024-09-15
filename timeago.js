(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        root.timeago = factory(root.jQuery);
    }
}(this, function ($) {
    var $el;
    var locales = {};

    function timeago() {
        if (!$el) {
            $el = $('<div></div>').hide().appendTo(document.body);
        }
        return $el;
    }

    function getTime() {
        return Math.floor(Date.now() / 1000);
    }

    function getLocale(locale) {
        if (locales[locale]) {
            return locales[locale];
        }
        return locales.en;
    }

    function timeagoLocale(locale, obj) {
        locales[locale] = obj;
    }

    function inWords(time) {
        var prefix = '';
        var suffix = 'ago';
        var seconds = time / 1000;
        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + ' years';
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + ' months';
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + ' days';
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + ' hours';
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + ' minutes';
        }
        return Math.floor(seconds) + ' seconds';
    }

    function updateTime() {
        var elements = document.querySelectorAll('abbr.timeago');
        elements.forEach(function (element) {
            var timestamp = element.getAttribute('title');
            var date = new Date(timestamp);
            var now = getTime();
            var then = Math.floor(date.getTime() / 1000);
            var time = (now - then) * 1000;
            var locale = getLocale(element.getAttribute('data-locale') || 'en');
            var timeString = inWords(time);
            element.innerHTML = timeString;
        });
    }

    $.fn.timeago = function () {
        updateTime();
        setInterval(updateTime, 60000);
        return this;
    };

    return {
        locale: timeagoLocale,
        settings: {
            locale: 'en',
        }
    };
}));


//hshshs kasian arlina ketauan yya ngumpetin script redirect ke template blog gratisan wakawokaokok  creditnya di delete dah ga bisa redirect deh orang gw dah bikin time ago sendiri awkawkaok
