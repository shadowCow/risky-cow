export type Fst<I, O> = {
  onInput: (i: I) => Array<O>;
};
