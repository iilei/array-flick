class Flick extends Array {
  constructor(...items) {
    super(...items);

    // workaround for issues since babel 7
    // see https://github.com/babel/babel/issues/4485#issuecomment-315569892
    this.constructor = Flick;
    Object.setPrototypeOf(this, Flick.prototype);

    const flick = (() => {
      let i;
      return ((a, n = 1) => {
        // TODO: refactor
        /* eslint-disable-next-line no-nested-ternary */
        i = (typeof i === 'undefined') ? ((n > 0) ? -1 : a.length) : i;
        const capStep = n % a.length;
        const current = (a.length + ((i += capStep) % a.length)) % a.length;

        return a[current];
      });
    }
    )();
    this.flick = flick;
  }

  next(n = 1) {
    return this.flick(this, n);
  }

  prev(n = 1) {
    return this.flick(this, -1 * n);
  }
}

export default Flick;
