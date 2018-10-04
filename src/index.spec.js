import Flick from './index';

describe('Flick', () => {
  it('should extend Array', () => {
    expect(Flick.prototype.constructor.isArray).toBeFunction();
  });
  describe('#next', () => {
    it('steps through by +1', () => {
      const names = new Flick('Jim', 'Jil', 'Joe', 'Bob');
      expect(names.next()).toEqual('Jim');
      expect(names.next()).toEqual('Jil');
      expect(names.next()).toEqual('Joe');
      expect(names.next()).toEqual('Bob');
      expect(names.next()).toEqual('Jim');
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
      expect(Array(...names)).toEqual(['Bob', 'Joe', 'Jil', 'Jim']);
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
      expect(Array(...names)).toEqual(['Jim', 'Jil']);
    });

    it('works with step size === 0', () => {
      const names = new Flick('Jim', 'Jil');
      expect(names.next(0)).toEqual('Jim');
      expect(names.next(0)).toEqual('Jim');
      expect(Array(...names)).toEqual(['Jim', 'Jil']);
    });

    it('works with step sizes > array length', () => {
      const names = new Flick('Jim', 'Jil');
      expect(names.next(7)).toEqual('Jim');
      expect(names.next(7)).toEqual('Jil');
      expect(names.next(7)).toEqual('Jim');
      expect(Array(...names)).toEqual(['Jim', 'Jil']);
    });
  });

  describe('#prev with custom step size', () => {
    it('steps through given size', () => {
      const names = new Flick('Jim', 'Jil', 'Joe', 'Bob');
      expect(names.prev(2)).toEqual('Joe');
      expect(names.prev(2)).toEqual('Jim');
      expect(names.prev(2)).toEqual('Joe');
      expect(names.prev(9)).toEqual('Jil');
      expect(Array(...names)).toEqual(['Jim', 'Jil', 'Joe', 'Bob']);
    });

    it('works with step sizes < array length * -1', () => {
      const names = new Flick('Jim', 'Jil');
      expect(names.prev(-7)).toEqual('Jim');
      expect(names.prev(-7)).toEqual('Jil');
      expect(names.prev(-7)).toEqual('Jim');
      expect(Array(...names)).toEqual(['Jim', 'Jil']);
    });

    it('works with step sizes > array length', () => {
      const names = new Flick('Jim', 'Jil');
      expect(names.prev(7)).toEqual('Jil');
      expect(names.prev(7)).toEqual('Jim');
      expect(names.prev(7)).toEqual('Jil');
      expect(Array(...names)).toEqual(['Jim', 'Jil']);
    });

    it('works with step size === 0', () => {
      const names = new Flick('Jim', 'Jil');
      expect(names.prev(0)).toEqual('Jim');
      expect(names.prev(0)).toEqual('Jim');
      expect(Array(...names)).toEqual(['Jim', 'Jil']);
    });
  });

  describe('#random', () => {
    it('returns one of the given elements', () => {
      const names = new Flick('Jim', 'Jil');
      expect(names.random()).toBeOneOf(['Jim', 'Jil']);
    });

    describe('with `randomFn` set', () => {
      const manyOptions = Array(48).fill('x').concat('-').concat('o')
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
