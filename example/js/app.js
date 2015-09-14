/**
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
    'jquery',
    'three-thumbs-carousel',

    // nothing returns
], function (
    $,
    ThreeThumbsCarousel
) {

    'use strict';

    var App;

    App = function () {
        this._initialize();
    };

    App.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _initialize: function () {
            console.info('App init');

            this._threeThumbsCarousel = new ThreeThumbsCarousel({
                block: $('.js-carousel'),
            });
        },
    };

    return new App();

});
