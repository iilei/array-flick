import Flick from './index';

describe('Flick', () => {
  it('should extend Array', () => {
    expect(Flick.prototype.constructor.isArray).toBeFunction();
  });
  describe('#next', () => {
    const names = new Flick('Jim', 'Jil', 'Joe', 'Bob');
    expect(names.next()).toEqual('Jim');
    expect(names.next()).toEqual('Jil');
    expect(names.next()).toEqual('Joe');
    expect(names.next()).toEqual('Bob');
    expect(names.next()).toEqual('Jim');
    expect(Array(...names)).toEqual(['Jim', 'Jil', 'Joe', 'Bob']);
  });
  describe('#prev', () => {
    const names = new Flick('Bob', 'Joe', 'Jil', 'Jim');
    expect(names.prev()).toEqual('Jim');
    expect(names.prev()).toEqual('Jil');
    expect(names.prev()).toEqual('Joe');
    expect(names.prev()).toEqual('Bob');
    expect(names.prev()).toEqual('Jim');
    expect(Array(...names)).toEqual(['Bob', 'Joe', 'Jil', 'Jim']);
  });

  describe('#next with custom step size', () => {
    const names = new Flick('Bob', 'Joe', 'Jil', 'Jim');
    expect(names.next(2)).toEqual('Joe');
    expect(names.next(2)).toEqual('Jim');
    expect(names.next(2)).toEqual('Joe');
    expect(names.next(9)).toEqual('Jil');
  });

  describe('#next with custom step size', () => {
    const names = new Flick('Jim', 'Jil', 'Joe', 'Bob');
    expect(names.prev(2)).toEqual('Joe');
    expect(names.prev(2)).toEqual('Jim');
    expect(names.prev(2)).toEqual('Joe');
    expect(names.prev(9)).toEqual('Jil');
    expect(Array(...names)).toEqual(['Jim', 'Jil', 'Joe', 'Bob']);
  });
});
