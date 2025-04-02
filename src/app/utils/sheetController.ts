import { Gassma } from "gassma";
import type {
  ChangeSchedule,
  DeleteSchedule,
  NewSchedule,
} from "../types/schema";

const gassma = new Gassma.GassmaClient();

export class SheetController {
  public static addSchedule(data: NewSchedule) {
    gassma.sheets.スケジュール一覧.create({
      data: {
        イベント名: data.eventName,
        集合時間: data.eventDate || undefined,
        備考: data.remarks || undefined,
      },
    });

    if (!data.participants) return;

    const participantsArray = data.participants
      .split(",")
      .map((participant) => {
        return {
          イベント名: data.eventName,
          参加者名: participant,
        };
      });

    gassma.sheets.参加者.createMany({
      data: participantsArray,
    });
  }

  public static changeSchedule(data: ChangeSchedule) {}

  public static deleteSchedule(data: DeleteSchedule) {}
}
