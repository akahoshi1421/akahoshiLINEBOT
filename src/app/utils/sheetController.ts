import { GassmaClient } from "../../generated/gassma/schemaClient";
import type {
  ScheduleRecord,
  ScheduleWithParticipants,
} from "../types/gassma";
import type {
  ChangeSchedule,
  DeleteSchedule,
  NewSchedule,
} from "../types/schema";

const gassma = new GassmaClient();

// 参加者名のカンマ区切り文字列を Participant の nested write 用配列へ変換する。
// FK の eventName はランタイムでは自動設定されるが、生成型が必須としているため明示する。
const toParticipantCreateData = (eventName: string, participants: string) =>
  participants.split(",").map((name) => ({ eventName, name }));

export class SheetController {
  public static addSchedule(data: NewSchedule) {
    // nested write でスケジュールと参加者を 1 度に作成する
    gassma.Schedule.create({
      data: {
        eventName: data.eventName,
        eventDate: data.eventDate || undefined,
        remarks: data.remarks || undefined,
        ...(data.participants
          ? {
              participants: {
                create: toParticipantCreateData(
                  data.eventName,
                  data.participants
                ),
              },
            }
          : {}),
      },
    });
  }

  public static changeSchedule(data: ChangeSchedule) {
    const updateData: {
      eventDate?: Date;
      remarks?: string;
    } = {};

    if (data.eventDate) updateData.eventDate = data.eventDate;
    if (data.remarks) updateData.remarks = data.remarks;

    // 参加者の追加・削除をリレーションの nested write で表現する
    const participantsWrite: {
      create?: { eventName: string; name: string }[];
      deleteMany?: { name: { in: string[] } };
    } = {};

    if (data.participantAdd) {
      participantsWrite.create = toParticipantCreateData(
        data.eventName,
        data.participantAdd
      );
    }

    if (data.participantRemove) {
      participantsWrite.deleteMany = {
        name: { in: data.participantRemove.split(",") },
      };
    }

    gassma.Schedule.update({
      where: { eventName: data.eventName },
      data: {
        ...updateData,
        ...(Object.keys(participantsWrite).length
          ? { participants: participantsWrite }
          : {}),
      },
    });
  }

  public static deleteSchedule(data: DeleteSchedule) {
    // onDelete: Cascade により参加者も同時に削除される
    gassma.Schedule.deleteMany({
      where: { eventName: data.eventName },
    });
  }

  public static getData(eventName: string) {
    const schedule = gassma.Schedule.findFirst({
      where: { eventName },
      include: { participants: true },
    }) as ScheduleWithParticipants | null;

    const participantsStringArray =
      schedule?.participants.map((participant) => participant.name) ?? [];

    return { schedule, participantsStringArray };
  }

  public static getParticipants(eventName: string) {
    const participants = gassma.Participant.findMany({
      where: { eventName },
      select: { name: true },
    });

    return participants.map((participant) => participant.name);
  }

  public static getAllData(): ScheduleRecord[] {
    return gassma.Schedule.findMany({});
  }

  public static getAllFutureScheduleData(): ScheduleRecord[] {
    return gassma.Schedule.findMany({
      where: {
        OR: [{ eventDate: { gte: new Date() } }, { eventDate: null }],
      },
    });
  }
}
