import Flick from './index';

describe('Flick', () => {
  it('should extend Array', () => {
    expect(Flick.prototype.constructor.isArray).toBeFunction();
  });

  it('can deal with mutations', () => {
    const names = new Flick('Jim', 'Jil', 'Joe');
    expect(names.next()).toEqual('Jim');
    expect(names.pop()).toEqual('Joe');
    expect(names.next()).toEqual('Jil');
    expect(names.reverse().pop()).toEqual('Jim');
    expect(names.next()).toEqual('Jil');
    expect(names.prev(2)).toEqual('Jil');
    expect(Array(...names)).toEqual(['Jil']);
  });

  describe('#next', () => {
    it('steps through by +1', () => {
      const names = new Flick('Jim', 'Jil', 'Joe', 'Bob');
      expect(names.next()).toEqual('Jim');
      expect(names.next()).toEqual('Jil');
      expect(names.next()).toEqual('Joe');
      expect(names.next()).toEqual('Bob');
      expect(names.next()).toEqual('Jim');
    });
    it('keeps the original unmodified', () => {
      const names = new Flick('Jim', 'Jil', 'Joe', 'Bob');
      names.next();
      expect(Array(...names)).toEqual(['Jim', 'Jil', 'Joe', 'Bob']);
    });
  });


  describe('#prev', () => {
    it('steps through by -1', () => {
      const names = new Flick('Bob', 'Joe', 'Jil', 'Jim');
      expect(names.prev()).toEqual('Jim');
      expect(names.prev()).toEqual('Jil');
      expect(names.prev()).toEqual('Joe');
      expect(names.prev()).toEqual('Bob');
      expect(names.prev()).toEqual('Jim');
    });
    it('keeps the original unmodified', () => {
      const names = new Flick('Jim', 'Jil', 'Joe', 'Bob');
      names.prev();
      expect(Array(...names)).toEqual(['Jim', 'Jil', 'Joe', 'Bob']);
    });
  });

  describe('#next with custom step size', () => {
    it('steps through given size', () => {
      const names = new Flick('Bob', 'Joe', 'Jil', 'Jim');
      expect(names.next(2)).toEqual('Joe');
      expect(names.next(2)).toEqual('Jim');
      expect(names.next(2)).toEqual('Joe');
      expect(names.next(9)).toEqual('Jil');
    });

    it('works with step sizes < array length * -1', () => {
      const names = new Flick('Jim', 'Jil');
      expect(names.next(-7)).toEqual('Jil');
      expect(names.next(-7)).toEqual('Jim');
      expect(names.next(-7)).toEqual('Jil');
    });

    it('works with step size === 0', () => {
      const names = new Flick('Jim', 'Jil');
      expect(names.next(0)).toEqual('Jim');
      expect(names.next(0)).toEqual('Jim');
    });

    it('works with step sizes > array length', () => {
      const names = new Flick('Jim', 'Jil');
      expect(names.next(7)).toEqual('Jim');
      expect(names.next(7)).toEqual('Jil');
      expect(names.next(7)).toEqual('Jim');
    });
  });

  describe('#prev with custom step size', () => {
    it('steps through given size', () => {
      const names = new Flick('Jim', 'Jil', 'Joe', 'Bob');
      expect(names.prev(2)).toEqual('Joe');
      expect(names.prev(2)).toEqual('Jim');
      expect(names.prev(2)).toEqual('Joe');
      expect(names.prev(9)).toEqual('Jil');
    });

    it('works with step sizes < array length * -1', () => {
      const names = new Flick('Jim', 'Jil');
      expect(names.prev(-7)).toEqual('Jim');
      expect(names.prev(-7)).toEqual('Jil');
      expect(names.prev(-7)).toEqual('Jim');
    });

    it('works with step sizes > array length', () => {
      const names = new Flick('Jim', 'Jil');
      expect(names.prev(7)).toEqual('Jil');
      expect(names.prev(7)).toEqual('Jim');
      expect(names.prev(7)).toEqual('Jil');
    });

    it('works with step size === 0', () => {
      const names = new Flick('Jim', 'Jil');
      expect(names.prev(0)).toEqual('Jim');
      expect(names.prev(0)).toEqual('Jim');
    });
  });

  describe('#random', () => {
    it('returns one of the given elements', () => {
      const names = new Flick('Jim', 'Jil');
      expect(names.random()).toBeOneOf(['Jim', 'Jil']);
    });

    it('keeps the original unmodified', () => {
      const names = new Flick('Jim', 'Jil', 'Joe', 'Bob');
      names.random();
      expect(Array(...names)).toEqual(['Jim', 'Jil', 'Joe', 'Bob']);
    });

    it('plays nicely with #next', () => {
      const names = new Flick('Jim', 'Jil', 'Joe');
      names.randomFn = () => 0.5;
      expect([names.random(), names.next()]).toEqual(['Jil', 'Joe']);
    });

    it('plays nicely with #prev', () => {
      const names = new Flick('Jim', 'Jil', 'Joe');
      names.randomFn = () => 0.5;
      expect([names.random(), names.prev()]).toEqual(['Jil', 'Jim']);
    });

    describe('with `randomFn` set', () => {
      const manyOptions = Array(48)
        .fill('x')
        .concat('-')
        .concat('o')
        .concat('+')
        .concat(...Array(48).fill('x'));

      it('returns the expected element', () => {
        const options = new Flick(...manyOptions);
        const randomNumbers = [0.5, 1, 1, 0.49, 0.99];
        options.randomFn = () => randomNumbers.pop();
        expect(options.random()).toEqual('x');
        expect(options.random()).toEqual('-');
        expect(options.random()).toEqual('o');
        expect(options.random()).toEqual('+');
        expect(options.random()).toEqual('x');
      });
    });
  });
});
