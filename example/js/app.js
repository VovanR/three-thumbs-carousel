/**
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
    'jquery',
    '../../index',

    // nothing returns
], function (
    $,
    Foo
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

            this.Foo = new Foo();
        },
    };

    return App;

});
