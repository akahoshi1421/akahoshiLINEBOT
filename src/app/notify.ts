// NOTE: 2週間前, 1週間前, 3日前, 1日前に通知

import { getScheduleFilter } from "./utils/scheduleFilter";

export function notify() {
  const twoWeeksSchedules = getScheduleFilter("2weeks");
  const oneWeekSchedules = getScheduleFilter("1weeks");
  const threeDaysSchedules = getScheduleFilter("3days");
  const oneDaySchedules = getScheduleFilter("1day");
}
