import { notify } from "./app/notify";
import { doPost } from "./app/server/lineWebhook";
import {
  apiAddParticipant,
  apiCreateSchedule,
  apiDeleteSchedule,
  apiGetFutureSchedules,
  apiGetPastSchedules,
  apiGetSchedule,
  apiRemoveParticipant,
  apiUpdateSchedule,
  doGet,
} from "./app/server/web";

declare const global: {
  [x: string]: unknown;
};

// Web アプリ配信 + LINE 定期通知 + LINE Webhook(「BOT」で Web アプリ URL を返信)
global.doGet = doGet;
global.notify = notify;
global.doPost = doPost;

// google.script.run から呼ぶ API
global.apiGetFutureSchedules = apiGetFutureSchedules;
global.apiGetPastSchedules = apiGetPastSchedules;
global.apiGetSchedule = apiGetSchedule;
global.apiCreateSchedule = apiCreateSchedule;
global.apiUpdateSchedule = apiUpdateSchedule;
global.apiDeleteSchedule = apiDeleteSchedule;
global.apiAddParticipant = apiAddParticipant;
global.apiRemoveParticipant = apiRemoveParticipant;
