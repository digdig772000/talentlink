var backtoList = {
    regex: /([?&].*)/,
    previous: document.referrer,
    matches: undefined,
    current: undefined,
    addToUrl: function () {
        if (this.previous.length > 0) {
            this.current = this.regex.exec(window.location.href);
            if(this.current){
                var link = this.current[1];
                if (link.charAt(0) !== '&') {
                    $('a[data-lumesse-jl-jobid]').each(function () {
                        var href = $(this).attr('href');
                        href += '&' + link.substring(1);
                        $(this).attr('href', href);
                    });

                }
            }

        }
    },
    getFromUrl: function () {
        this.regex = /([&].*)/;
        this.matches = this.regex.exec(window.location.href);
        if (this.matches !== null) {
            var link = this.matches[0]
            var previous = $('a[data-lumesse-jd-action="back"]');
            var href = previous.attr('href');
            if (link.charAt(0) === '&'){
                href += '?' + link.substring(1);
            }
            $('a[data-lumesse-jd-action="back"]').attr('href', href);

        }
    }
};

lumesse.require([
        "jquery",
        "TalentPortalEventBus"
    ],
    function ($, talentPortalEventBus) {
        "use strict";

        talentPortalEventBus.subscribe("jobs-list", "rendered", function () {
            backtoList.addToUrl();
        });
        talentPortalEventBus.subscribe("job-detail", "rendered", function () {
            backtoList.getFromUrl();
        });
    }
);