const flick = (() => {
  let i;
  return ((a, n = 1) => {
    // TODO: refactor
    /* eslint-disable-next-line no-nested-ternary */
    i = (typeof i === 'undefined') ? ((n > 0) ? 0 : a.length + (n * -1)) : i;

    const current = i % (a.length - 1);
    i += n;

    return a[current];
  });
}
)();

class Flick extends Array {
  next(n = 1) {
    return flick(this, n);
  }

  prev(n = 1) {
    return flick(this, -1 * n);
  }
}

export default Flick;
