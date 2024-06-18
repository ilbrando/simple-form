export const hasValue = <T>(value: T | undefined | null): value is T => {
  return (value as T) !== undefined && (value as T) !== null;
};

export const nameof = <T>(key: keyof T) => key;
