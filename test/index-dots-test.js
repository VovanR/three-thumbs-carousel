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

            if (_.isNumber(previewsLength) && previewsLength > 0) {
                _.times(previewsLength, function (pk) {
                    $fixtures.find('.js-previews__dots').append(_.template($('#dot-template').html()));
                    $fixtures.find('.js-previews').append(_.template($('#preview-template').html()));
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

        describe('_init', function () {
            it('should have `_$dots`', function () {
                var m = module();
                assert.isDefined(m._$dots[0]);
                assert.isTrue(m._$dots.hasClass('b-previews__dots'));
            });
        });

        describe('_buildDots', function () {
            it('should build dots blocks', function () {
                var m = module();
                var $fixtures = $('#fixtures');
                assert.equal($fixtures.find('.b-previews__dot').length, 0);
                m._buildDots(5);
                assert.equal($fixtures.find('.b-previews__dot').length, 5);
                m._buildDots(3);
                assert.equal($fixtures.find('.b-previews__dot').length, 3);
            });
        });

        describe('_bindDots', function () {
            it('should bind click on dots', function () {
                var m = module({}, 5);
                sinon.spy(m, 'switchThumb');
                var $dots = $('#fixtures').find('.js-previews__dot');
                $($dots[3]).trigger('click');
                assert.isTrue(m.switchThumb.calledOnce);
                assert.equal(m.switchThumb.getCall(0).args[0], 3);
            });
        });

        describe('#switchThumb', function () {
            it('should fire `_selectDot` with index attribute', function () {
                var m = module({}, 2);
                sinon.spy(m, '_selectDot');
                m.switchThumb(1);
                assert.isTrue(m._selectDot.calledOnce);
                assert.equal(m._selectDot.getCall(0).args[0], 1);
            });
        });

        describe('#update', function () {
            it('should select first dot if previous selected has been removed', function () {
                var m = module({}, 5);
                var $fixtures = $('#fixtures');
                $fixtures.find('.js-previews__dots').append(_.template($('#dot-template').html()));
                m.update();
                assert.equal($fixtures.find('.js-previews__dot._state_current').length, 1);
            });

            it('should actualize dots count, equals thumbs count', function () {
                var m = module({}, 5);
                var $fixtures = $('#fixtures');
                assert.equal($fixtures.find('.js-previews__dot').length, 5);
                m.update();
                assert.equal($fixtures.find('.js-previews__dot').length, 5);
                $fixtures.find('.js-previews').append(_.template($('#preview-template').html()));
                m.update();
                assert.equal($fixtures.find('.js-previews__dot').length, 6);
            });
        });

        describe('_selectDot', function () {
            it('should add `_state_current` class to selected dot', function () {
                var m = module({}, 5);
                var $fixtures = $('#fixtures');
                $fixtures.find('.js-previews__dot').removeClass('_state_current');
                m._selectDot(3);
                assert.isTrue($($fixtures.find('.js-previews__dot')[3]).hasClass('_state_current'));
            });

            it('should deselect other dots', function () {
                var m = module({}, 5);
                var $fixtures = $('#fixtures');
                $fixtures.find('.js-previews__dot').addClass('_state_current');
                m._selectDot(3);
                assert.equal($fixtures.find('.js-previews__dot._state_current').length, 1);
            });
        });

        describe('#destroy', function () {
            it('should select first dot', function () {
                var m = module({}, 5);
                var $previews = $('#fixtures').find('.js-previews__dot');
                $previews.addClass('_state_current');
                assert.equal($('#fixtures').find('.js-previews__dot._state_current').length, 5);
                m.destroy();
                assert.equal($('#fixtures').find('.js-previews__dot._state_current').length, 1);
                assert.isTrue($($('#fixtures').find('.js-previews__dot')[0]).hasClass('_state_current'));
            });

            it('should unbind click event', function () {
                var m = module({}, 5);
                m.destroy();
                sinon.spy(m, 'switchThumb');
                var $dots = $('#fixtures').find('.js-previews__dot');
                $($dots[3]).trigger('click');
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
