export const getKeyData = <
  K extends string,
  D extends boolean | undefined,
  N extends "" | null = null
>(
  arrayData: string[][],
  keyName: K,
  isNotFind: N,
  isDate: D
): {
  [P in K]: D extends true
    ? Date | (N extends "" ? never : null)
    : string | (N extends "" ? never : null);
} => {
  const findedKey = arrayData.find(
    (oneArrayData) => oneArrayData[0] === keyName
  );

  const value = findedKey ? findedKey[1] : isNotFind;

  return { [keyName]: isDate && value ? new Date(value) : value } as {
    [P in K]: D extends true
      ? Date | (N extends "" ? never : null)
      : string | (N extends "" ? never : null);
  };
};
