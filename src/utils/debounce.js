export default function (fn, delay) {
  let timer;
  return () => {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context);
    }, delay);
  };
}
