/**
 * Interface to create a key-value dictionary. Value type is templated as ValueType, and can be any TypeScript type.
 */
export type IDictionary<ValueType> = Record<string, ValueType>;
