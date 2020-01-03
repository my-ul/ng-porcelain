/**
 * A type that allows typed use of Object.entries(subj).
 *
 * @example
 * let myEntries = collection.entries() as Entry<CollectionItem>[];
 */
export type Entry<ValueType> = [string, ValueType];
