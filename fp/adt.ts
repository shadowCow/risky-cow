export type AdtVariant<K extends string, V> = {
  kind: K
  value: V
}

export type AdtVariantConstructor<K extends string, V> = (
  v: V,
) => AdtVariant<K, V>

export function adt<K extends string, V>(kind: K): AdtVariantConstructor<K, V> {
  return (value: V) => {
    return {
      kind,
      value,
    }
  }
}
