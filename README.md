# three-thumbs-carousel

[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

> Carousel for one specific project. RequireJS module ([Demo](http://jsfiddle.net/VovanR/8t4by4ru/))

![](preview.png)

## Usage

```html
<div class="carousel js-carousel">
    <div class="carousel__image js-carousel__image"></div>
    <div class="carousel__thumbs js-carousel__thumbs">
        <span class="carousel__item js-carousel__item _state_current">
            <span class="carousel__image">0</span>
            <span class="carousel__thumb js-carousel__thumb">0</span>
        </span><!--
        --><span class="carousel__item js-carousel__item">
            <span class="carousel__image">1</span>
            <span class="carousel__thumb js-carousel__thumb">1</span>
        </span><!--
        --><span class="carousel__item js-carousel__item">
            <span class="carousel__image">2</span>
            <span class="carousel__thumb js-carousel__thumb">2</span>
        </span><!--
        --><span class="carousel__item js-carousel__item">
            <span class="carousel__image">3</span>
            <span class="carousel__thumb js-carousel__thumb">3</span>
        </span><!--
        --><span class="carousel__item js-carousel__item">
            <span class="carousel__image">4</span>
            <span class="carousel__thumb js-carousel__thumb">4</span>
        </span>
    </div>
    <div class="carousel__dots js-carousel__dots">
        <span class="carousel__dot _state_current js-carousel__dot"></span><!--
        --><span class="carousel__dot js-carousel__dot"></span><!--
        --><span class="carousel__dot js-carousel__dot"></span><!--
        --><span class="carousel__dot js-carousel__dot"></span><!--
        --><span class="carousel__dot js-carousel__dot"></span>
    </div>
</div>
```

```javascript
var carousel = new ThreeThumbsCarousel({
    name: $('.js-carousel'),
});
```

## Development

### Initialize
```sh
npm i
```

### Test
*In console*
```sh
npm run test
```

*In browser*
```sh
open ./text/index-test.html
```

### Lint
```sh
npm run lint
```

## License
MIT © [Vladimir Rodkin](https://github.com/VovanR)

[travis-url]: https://travis-ci.org/VovanR/three-thumbs-carousel
[travis-image]: http://img.shields.io/travis/VovanR/three-thumbs-carousel.svg

[depstat-url]: https://david-dm.org/VovanR/three-thumbs-carousel
[depstat-image]: https://david-dm.org/VovanR/three-thumbs-carousel.svg

[depstat-dev-url]: https://david-dm.org/VovanR/three-thumbs-carousel
[depstat-dev-image]: https://david-dm.org/VovanR/three-thumbs-carousel/dev-status.svg
