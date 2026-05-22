import { defineConfig } from "gassma/config";

export default defineConfig({
  schema: "gassma/schema.prisma",
  datasource: {
    // 空の場合はアクティブなスプレッドシートを利用する
    url: "",
  },
});
