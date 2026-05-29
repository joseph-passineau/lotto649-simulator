type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number

type ArrayItems<T extends readonly unknown[]> =
  T extends readonly (infer TItems)[] ? TItems : never;

export type FixedLengthArray<T extends readonly unknown[]> =
  Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
  & { [Symbol.iterator]: () => IterableIterator< ArrayItems<T> > }
