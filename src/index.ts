import { doPost, testFunc } from "./app/getMessage";
import { notify } from "./app/notify";

declare const global: {
  [x: string]: unknown;
};

global.doPost = doPost;
global.testFunc = testFunc;
global.notify = notify;
