requirejs([
    'jquery',
    'chai',
    'sinon',
    'lodash',
    '../index',
], function (
    $,
    chai,
    sinon,
    _,
    ThreeThumbsCarousel
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('ThreeThumbsCarousel module', function () {
        /**
         */
        var module = function (o, previewsLength) {
            var $fixtures = $('#fixtures');
            o = _.extend(
                {
                    block: $fixtures.find('.js-carousel'),
                },
                o
            );

            var template;
            if (_.isNumber(previewsLength) && previewsLength > 0) {
                template = _.template($('#preview-template').html());
                _.times(previewsLength, function (pk) {
                    $fixtures.find('.js-carousel__previews').append(template({
                        pk: pk,
                    }));
                });
            }

            var m = new ThreeThumbsCarousel(o);

            return m;
        };

        var _bFixtureTemplate = $('#fixture-template');
        var _fixtureTemplate = _bFixtureTemplate.html();
        _bFixtureTemplate.empty();

        beforeEach(function () {
            $('#fixtures').html(_fixtureTemplate);
        });

        afterEach(function () {
        });

        describe('constructor', function () {
            it('should initialize', function () {
                var m = module();
                assert.isDefined(m);
            });

            it('should have block', function () {
                var m = module();
                assert.isDefined(m._$block[0]);
            });
        });

        describe('_init', function () {
            it('should add `data` attribute with link to this instance', function () {
                var m = module();
                assert.isDefined(m._$block.data('three-thumbs-carousel'));
                assert.equal(m._$block.data('three-thumbs-carousel'), m);
            });

            it('should have `_$carousel`', function () {
                var m = module();
                assert.isDefined(m._$carousel[0]);
                assert.isTrue(m._$carousel.hasClass('carousel__previews'));
            });
        });

        describe('_bindThumbs', function () {
            it('should bind click on thumbs', function () {
                var m = module({}, 5);
                sinon.spy(m, 'switchThumb');
                var $previews = $('#fixtures').find('.js-carousel__preview');
                $($previews[3]).find('.js-carousel__thumb').trigger('click');
                assert.isTrue(m.switchThumb.calledOnce);
                assert.equal(m.switchThumb.getCall(0).args[0], 3);
            });
        });

        describe('#switchThumb', function () {
            it('should fire `_selectThumb` with index attribute', function () {
                var m = module({}, 2);
                sinon.spy(m, '_selectThumb');
                m.switchThumb(1);
                assert.isTrue(m._selectThumb.calledOnce);
                assert.equal(m._selectThumb.getCall(0).args[0], 1);
            });

            it('should fire `_moveThumbs`', function () {
                var m = module({}, 2);
                sinon.spy(m, '_moveThumbs');
                m.switchThumb(1);
                assert.isTrue(m._moveThumbs.calledOnce);
            });

            it('should not throw error if no `index` item', function () {
                var m = module();
                assert.doesNotThrow(function () {
                    return m.switchThumb(1);
                });
            });
        });

        describe('_selectThumb', function () {
            it('should select thumb with `index` from attribute', function () {
                var m = module({}, 2);
                m.switchThumb(1);
                var $el = $(m._$carousel.find('.js-carousel__preview')[1]);
                assert.isTrue($el.hasClass('_state_current'));
            });

            it('should deselect other thumbs', function () {
                var m = module({}, 2);
                m._$carousel.find('.js-carousel__preview').addClass('_state_current');
                m.switchThumb(1);
                var $el = m._$carousel.find('.js-carousel__preview._state_current');
                assert.equal($el.length, 1);
            });

        });

        describe('_moveThumbs', function () {
            it('should move thumbs to current thumb', function () {
                var m = module({}, 5);
                m._moveThumbs(3);
                assert.equal(m._$carousel.css('margin-left'), -(68 * 2) + 'px');
                m._moveThumbs(1);
                assert.equal(m._$carousel.css('margin-left'), '0px');
            });

            it('should show first at the left', function () {
                var m = module({}, 5);
                m._moveThumbs(0);
                assert.equal(m._$carousel.css('margin-left'), '0px');
            });

            it('should show last at the right', function () {
                var m = module({}, 5);
                m._moveThumbs(4);
                assert.equal(m._$carousel.css('margin-left'), -(68 * 2) + 'px');
            });

            it('should show align center if items count < 3', function () {
                var m = module({}, 1);
                var $fixtures = $('#fixtures');
                assert.equal(m._$carousel.css('margin-left'), '0px');
                $fixtures.find('.js-carousel__previews').append(_.template($('#preview-template').html())({pk: 1}));
                m._moveThumbs(1);
                assert.equal(m._$carousel.css('margin-left'), '0px');
            });

            it('should not throw error if no `index` item', function () {
                var m = module();
                assert.doesNotThrow(function () {
                    return m._moveThumbs(1);
                });
            });
        });

        describe('#update', function () {
            it('should select first item if previous selected has been removed', function () {
                var m = module();
                var $fixtures = $('#fixtures');
                $fixtures.find('.js-carousel__previews').append(_.template($('#preview-template').html())({pk: 0}));
                m.update();
                assert.equal($fixtures.find('.js-carousel__preview._state_current').length, 1);
            });
        });

        describe('#destroy', function () {
            it('should be `function`', function () {
                var m = module();
                assert.isFunction(m.destroy);
            });

            it('should clear `data` attribute', function () {
                var m = module();
                m.destroy();
                assert.isUndefined(m._$block.data('three-thumbs-carousel'));
            });

            it('should reset carousel margin', function () {
                var m = module({}, 5);
                var $carousel = $('#fixtures .js-carousel__previews');
                $carousel.css('margin-left', '-100500px');
                assert.equal($carousel.css('margin-left'), '-100500px');
                m.destroy();
                assert.equal($carousel.css('margin-left'), '0px');
            });

            it('should reset carousel margin when items centered', function () {
                var m = module({}, 2);
                var $carousel = $('#fixtures .js-carousel__previews');
                m.destroy();
                assert.equal($carousel.css('margin-left'), '0px');
            });

            it('should select first thumb', function () {
                var m = module({}, 5);
                var $previews = $('#fixtures').find('.js-carousel__preview');
                $previews.addClass('_state_current');
                assert.equal($('#fixtures').find('.js-carousel__preview._state_current').length, 5);
                m.destroy();
                assert.equal($('#fixtures').find('.js-carousel__preview._state_current').length, 1);
                assert.isTrue($($('#fixtures').find('.js-carousel__preview')[0]).hasClass('_state_current'));
            });

            it('should unbind click event', function () {
                var m = module({}, 5);
                m.destroy();
                sinon.spy(m, 'switchThumb');
                var $previews = $('#fixtures').find('.js-carousel__preview');
                $($previews[3]).find('.js-carousel__thumb').trigger('click');
                assert.isFalse(m.switchThumb.called);
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});
