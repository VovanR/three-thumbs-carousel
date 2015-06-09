/**
 * @module ThreeThumbsCarousel
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
    'jquery',

    // nothing returns
], function (
    $
) {

    'use strict';

    var ThreeThumbsCarousel;

    /**
     * @param {Object} o Options
     * @param {jQuery} o.block
     * @constructor
     * @alias module:ThreeThumbsCarousel
     */
    ThreeThumbsCarousel = function (o) {
        this._$block = o.block;

        this._$image = null;
        this._$carousel = null;
        this._$dots = null;

        this._init();
    };

    ThreeThumbsCarousel.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _init: function () {
            console.info('RoutesThumbsCarousel init');

            this._$block.data('three-thumbs-carousel', this);

            this._$image = this._$block.find('.js-carousel__image');
            this._$carousel = this._$block.find('.js-carousel__thumbs');
            this._$dots = this._$block.find('.js-carousel__dots');

            this.update();

            this._bindControls();
        },

        /**
         * Bindings
         *
         * @private
         */
        _bindControls: function () {
            this._bindThumbs();
            this._bindDots();
        },

        /**
         * @private
         */
        _bindThumbs: function () {
            var _this = this;

            this._$carousel.on('click.threeThumbsCarousel', '.js-carousel__thumb', function (e) {
                var $this = $(this);
                var $preview = $this.closest('.js-carousel__item');
                var index = $preview.index();
                _this.switchThumb(index);

                e.preventDefault();
            });
        },

        /**
         * @private
         */
        _bindDots: function () {
            var _this = this;

            this._$dots.on('click.threeThumbsCarousel', '.js-carousel__dot', function () {
                var index = $(this).index();
                _this.switchThumb(index);
            });
        },

        /**
         * @param {Number} count
         * @private
         */
        _buildDots: function (count) {
            var $dots = this._$dots;
            var dotsLength = $dots.find('.js-carousel__dot').length;
            if (dotsLength === count) {
                return;
            }

            var dots;
            var dotTemplate = '<span class="carousel__dot js-carousel__dot"></span>';
            this._$dots.empty();
            dots = '';
            var i = count;
            while (i--) {
                dots += dotTemplate;
            }
            $dots.html(dots);
        },

        /**
         * @param {Number} index
         * @public
         */
        switchThumb: function (index) {
            this._selectThumb(index);
            this._moveThumbs(index);
            this._setImage(index);
            this._selectDot(index);
        },

        /**
         * @param {Number} index
         * @private
         */
        _selectThumb: function (index) {
            var $previews = this._$carousel.find('.js-carousel__item');

            if ($previews.length > 0) {
                $previews.removeClass('_state_current');
                $($previews[index]).addClass('_state_current');
            }
        },

        /**
         * @param {String} image
         * @private
         */
        _setImageBackground: function (image) {
            var url = 'url(' + image + ')';
            this._$image[0].style.backgroundImage = url;
        },

        /**
         * @param {Number} index
         * @private
         */
        _setImage: function (index) {
            var $previews = this._$carousel.find('.js-carousel__thumb');
            var image = $($previews[index]).attr('href');

            this._setImageBackground(image);
        },

        /**
         * @param {Number} index
         * @private
         */
        _selectDot: function (index) {
            var $dots = this._$dots.find('.js-carousel__dot');

            if ($dots.length > 0) {
                $dots.removeClass('_state_current');
                $($dots[index]).addClass('_state_current');
            }
        },

        /**
         * @param {Number} index
         * @private
         */
        _moveThumbs: function (index) {
            var margin;
            var width;
            var $carousel = this._$carousel;
            var $previews = $carousel.find('.js-carousel__item');
            var previewsLength = $previews.length;

            if (
                previewsLength <= 3 ||
                index === 0
            ) {
                margin = 0;
            } else {
                width = $previews[0].offsetWidth;

                if (previewsLength > 3) {
                    if (index < (previewsLength - 1)) {
                        // Thumb at the center
                        index -= 1;
                    } else {
                        // Last at the right
                        index -= 2;
                    }
                    margin = -(width * index);
                } else {
                    // Aligh center
                    margin = (width * (3 - previewsLength)) / 2;
                }
            }

            $carousel.css('margin-left', margin + 'px');
        },

        /**
         * @public
         */
        update: function () {
            var $previews = this._$carousel.find('.js-carousel__item');
            var previewsLength = $previews.length;

            this._buildDots(previewsLength);

            if (previewsLength > 0) {
                this.switchThumb(0);
            }
        },

        /**
         * @public
         */
        destroy: function () {
            this._$block.removeData('three-thumbs-carousel');

            // Select first item
            this.switchThumb(0);

            // Reset carousel position
            var $carousel = this._$carousel;
            $carousel[0].style.marginLeft = 0;

            // Unbind click
            this._$carousel.off('click.threeThumbsCarousel');
            this._$dots.off('click.threeThumbsCarousel');
        },
    };

    return ThreeThumbsCarousel;

});
