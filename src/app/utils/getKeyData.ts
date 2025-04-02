export const getKeyData = (
  arrayData: string[][],
  keyName: string,
  isNotFind: "" | null
) => {
  const findedKey = arrayData.find(
    (oneArrayData) => oneArrayData[0] === keyName
  );

  return { [keyName]: findedKey ? findedKey[1] : isNotFind };
};
