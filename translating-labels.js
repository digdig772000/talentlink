lumesse.require([
        "jquery",
        "TalentPortalEventBus"
    ],
    function ($, talentPortalEventBus) {
        "use strict";

        var transTool = {
            settings: {
                defaultLang: 'EN',
                dataSelector: 'data-translation',
                translationDirectory: 'translations/'
            },
            lang: undefined,
            translations: {},
            preventLoop: false,
            init: function (options) {
                this.settings = $.extend(this.settings, options);
                this.lang = localStorage.getItem("local_language");

                if (this.lang === null) {
                    this.lang = this.settings.defaultLang;
                }

                this.loadTranslation();
            },
            loadTranslation: function () {
                var url = this.settings.translationDirectory + this.lang;
                if (url.indexOf('.json') == -1) {
                    url += '.json';
                }
                $.getJSON(url, this.addTranslation.bind(this)).fail(this.failLoading.bind(this));
            },
            addTranslation: function (data) {
                this.translations = data;
                this.initTranslate();
            },
            failLoading: function () {
                if (!this.preventLoop) {
                    this.preventLoop = true;
                    this.lang = this.settings.defaultLang;
                    this.loadTranslation();
                }
            },
            initTranslate: function () {
                $.each(this.translations, this.translate.bind(this));
            },
            translate: function (index, val) {
                $('[' + this.settings.dataSelector + '=' + index + ']').text(val);
            }
        };

        talentPortalEventBus.subscribe("jobs-list", "rendered", function () {
            transTool.init({
                defaultLang: 'default.json',
                translationDirectory: 'talentlink/trans/'
            });
        });

        talentPortalEventBus.subscribe("job-detail", "rendered", function () {
            transTool.init({
                defaultLang: 'default.json',
                translationDirectory: 'talentlink/trans/'
            });
        });

        talentPortalEventBus.subscribe("search-agent", "rendered", function () {
            transTool.init({
                defaultLang: 'default.json',
                translationDirectory: 'talentlink/trans/'
            });
        });
    }
);