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

  public static changeSchedule(data: ChangeSchedule) {
    gassma.sheets.スケジュール一覧.updateMany({
      where: {
        イベント名: data.eventName,
      },
      data: {
        イベント名: data.eventName,
        集合時間: data.eventDate || undefined,
        備考: data.remarks || undefined,
      },
    });

    if (data.participantAdd) {
      const participantsArray = data.participantAdd
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

    if (data.participantRemove) {
      const participantsArray = data.participantRemove.split(",");

      gassma.sheets.参加者.deleteMany({
        where: {
          イベント名: data.eventName,
          参加者名: {
            in: participantsArray,
          },
        },
      });
    }
  }

  public static deleteSchedule(data: DeleteSchedule) {
    gassma.sheets.スケジュール一覧.deleteMany({
      where: {
        イベント名: data.eventName,
      },
    });

    gassma.sheets.参加者.deleteMany({
      where: {
        イベント名: data.eventName,
      },
    });
  }

  public static getData(eventName: string) {
    const schedule = gassma.sheets.スケジュール一覧.findFirst({
      where: {
        イベント名: eventName,
      },
    });

    const participants = gassma.sheets.参加者.findMany({
      where: {
        イベント名: eventName,
      },
      select: {
        参加者名: true,
      },
    });

    const participantsStringArray = participants.map(
      (participant) => participant.参加者名
    );

    return { schedule, participantsStringArray };
  }
}
