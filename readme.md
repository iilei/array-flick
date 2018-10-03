# array-flick [![Build Status](https://travis-ci.org/iilei/flick.svg?branch=master)](https://travis-ci.org/iilei/flick)

> Never ending flick though arrays by using next() / prev()


## Install

```
$ npm install array-flick
```


## Usage

```js
const Flick = require('array-flick');

const flick = new Flick(1,2,3)

flick.next(); // 1
flick.next(); // 2
flick.next(); // 3
flick.next(); // 1
flick.next(); // 2
flick.prev(); // 1
flick.prev(); // 3
flick.prev(); // 2

```

## API

### new Flick(...values)

Behaves like an Array with `next` and `prev` methods added.

When writing database seeders and tests this expressiveness-sugar helps to make the
intentions of the program easily recognizable.

#### next()

Type: `Integer`
Default: `1`

How many steps to flick backwards. Defaults to `1`.

#### prev()

Type: `Integer`
Default: `1`

How many steps to flick backwards. Defaults to `1`.

## License

MIT © [iilei • Jochen Preusche](https://github.com/iilei)
