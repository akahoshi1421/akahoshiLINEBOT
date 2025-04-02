import { SheetController } from "./sheetController";

const getNotifyBefore = (
  notifyBefore: "2weeks" | "1weeks" | "3days" | "1day"
) => {
  switch (notifyBefore) {
    case "2weeks":
      return 1209600000;
    case "1weeks":
      return 604800000;
    case "3days":
      return 259200000;
    case "1day":
      return 86400000;
  }
};

export const getScheduleFilter = (
  notifyBefore: "2weeks" | "1weeks" | "3days" | "1day"
) => {
  const allScheudlesData = SheetController.getAllData();
  const notifyTimeDiff = getNotifyBefore(notifyBefore);

  const now = new Date();
  const dateOnly = new Date(Utilities.formatDate(now, "JST", "yyyy-MM-dd"));

  const result = allScheudlesData.filter((schedule) => {
    if (!schedule.集合時間) return false;

    const dateOnlyTheSchedule = new Date(
      Utilities.formatDate(schedule.集合時間, "JST", "yyyy-MM-dd")
    );

    return (
      dateOnlyTheSchedule.getTime() - dateOnly.getTime() === notifyTimeDiff
    );
  });

  return result;
};
