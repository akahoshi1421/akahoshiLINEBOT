const getValidationKeyName = (key: string) => {
  switch (key) {
    case "種類":
      return "various";
    case "イベント名":
      return "eventName";
    case "集合時間":
      return "eventDate";
    case "参加者":
      return "participants";
    case "備考":
      return "remarks";
    case "参加者追加":
      return "participantAdd";
    case "参加者削除":
      return "participantRemove";
    default:
      return "";
  }
};

export const changeToArrayData = (stringData: string[]) => {
  const allData = stringData.map((oneData) => {
    const oneDataArray = oneData.split(": ");
    if (oneDataArray.length < 2) return null;

    const validationKeyName = getValidationKeyName(oneDataArray[0]);

    return [validationKeyName, oneDataArray.slice(1).join("")];
  });

  return allData.filter((oneData) => oneData !== null);
};
