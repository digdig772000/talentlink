lumesse.require([
        "jquery",
        "TalentPortalEventBus"
    ],
    function ($, talentPortalEventBus) {
        "use strict";

        var searchAgentBtn = '<a href="searchagent.html">' +
                '<div class="job_agent btn-primary">' +
                '<i class="fa fa-bell-o" aria-hidden="true"></i>' +
                '<span data-translation="searchAgentBtn"></span>' +
                '</div></a>',
            backBtn = '<a href="index.html">' +
                '<div class="job_agent btn-primary back_b">' +
                '<i class="fa fa-angle-left" aria-hidden="true"></i>' +
                '<span data-translation="backToSearch"></span>' +
                '</div></a>';

        talentPortalEventBus.subscribe("jobs-list", "rendered", function () {
            var listComponent = $('#lumesseJobsListWidget');
            listComponent.append(backBtn);
            listComponent.append(searchAgentBtn);
        })

        talentPortalEventBus.subscribe("search-agent", "rendered", function () {
            var buttonsArea = $('.search-agent-submit-btn').parent();
            buttonsArea.append(backBtn);
        })

        talentPortalEventBus.subscribe("job-detail", "rendered", function () {
            var strapline = $('span.strapLine'),
                imageContainer = $('#lumesseJobDetailWidget > .col-xs-12:has(.lumesse-image-library)'),
                dasKannIchBei = '<span data-translation="dasKannIchBei" class="dasKannIchBei"></span>',
                sindSieDas = '<h2 data-translation="sindSieDas" class="sindSieDas"></h2>';
            //imageContainer.append(strapline);
            //imageContainer.append(dasKannIchBei);
            //imageContainer.append(sindSieDas);
            /*
             FOR LIVE ONLY - IT'S BETTER TO LEAVE IT COMMENTED ALSO ON SANDBOX

             var sendFrfiendURL = $('a[data-lumesse-jd-action="send2friend"]').attr('href');
             var beginParam = sendFrfiendURL.search("\\?jobId");
             var parameter = sendFrfiendURL.slice(beginParam, sendFrfiendURL.length);
             sendFrfiendURL = "/web2/de/unternehmen/karriere/jobboerse/stellenangebot/empfehlung" + parameter;
             $('a[data-lumesse-jd-action="send2friend"]').attr('href', sendFrfiendURL);

             */
        })


    }
);

$(document).ready(function () {
    var pageUrl = window.location.href,
        langWrap = $(".listPage");

    if (langWrap.hasClass('listPage')) {
        var criteriaSelected = pageUrl.search("searchCriteria");
        if (criteriaSelected == -1) {
            langWrap.addClass("no_criteria");
        }
    }

});