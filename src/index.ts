import { doPost, testFunc } from "./app/getMessage";

declare const global: {
  [x: string]: unknown;
};

global.doPost = doPost;
global.testFunc = testFunc;
