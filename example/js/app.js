/**
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
    'jquery',
    '../../index',

    // nothing returns
], function (
    $,
    ThreeThumbsCarousel
) {

    'use strict';

    var App;

    App = function () {
        this._threeThumbsCarousel = null;

        this._init();
    };

    App.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _init: function () {
            console.info('App init');

            this._threeThumbsCarousel = new ThreeThumbsCarousel({
                block: $('.js-carousel'),
            });
        },
    };

    return App;

});
