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

flick.random() // one of 1,2,3

```

Note there is also a setter for randomFn. again, useful for testing / seeding. Look at
[the specs](src/index.spec.js) to learn more.


## API

### new Flick(...values)

Behaves like an Array with `next` and `prev` methods added.

When writing database seeders and tests this expressiveness-sugar helps to make the
intentions of the program easily recognizable.

#### next()

Type: `Integer`
Default: `1`


How many steps to flick forward. Defaults to `1`.

```js
const names = new Flick('Jim', 'Fin', 'Lin');

names.next()  // Jim
names.next(2) // Lin
names.next(2) // Fin
```

#### prev()

Type: `Integer`
Default: `1`

How many steps to flick backwards. Defaults to `1`.

```js
const names = new Flick('Jim', 'Fin', 'Lin');

names.prev()  // Lin
names.prev(2) // Jim
names.prev(2) // Fin
```
#### random()

```js
const xos = new Flick(...(Array(99).fill('x').concat('o')));
xos.randomFn = () => 0.999; // generate your own (seeded) random floats 0..1 here
xos.random() // 'o'
```
Returns a random entry

##### randomFn (setter)

Useful for reproducible random return values, for example with the help of
[seedrandom](https://www.npmjs.com/package/seedrandom)


## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

## License

MIT © [iilei • Jochen Preusche](https://github.com/iilei)
