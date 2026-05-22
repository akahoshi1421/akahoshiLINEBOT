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

export class SheetController {
  public static addSchedule(data: NewSchedule) {
    // autoincrement の id は作成後に確定するため、スケジュールを先に作成して
    // 採番された id を参加者の外部キー(scheduleId)に利用する
    const schedule = gassma.Schedule.create({
      data: {
        eventName: data.eventName,
        eventDate: data.eventDate || undefined,
        remarks: data.remarks || undefined,
      },
    });

    if (data.participants && schedule.id !== null) {
      const scheduleId = schedule.id;
      gassma.Participant.createMany({
        data: data.participants
          .split(",")
          .map((name) => ({ scheduleId, name })),
      });
    }
  }

  public static changeSchedule(data: ChangeSchedule) {
    const schedule = gassma.Schedule.findFirst({
      where: { eventName: data.eventName },
    });

    if (!schedule || schedule.id === null) return;
    const scheduleId = schedule.id;

    const updateData: { eventDate?: Date; remarks?: string } = {};
    if (data.eventDate) updateData.eventDate = data.eventDate;
    if (data.remarks) updateData.remarks = data.remarks;

    if (Object.keys(updateData).length) {
      gassma.Schedule.updateMany({ where: { id: scheduleId }, data: updateData });
    }

    if (data.participantRemove) {
      gassma.Participant.deleteMany({
        where: { scheduleId, name: { in: data.participantRemove.split(",") } },
      });
    }

    if (data.participantAdd) {
      gassma.Participant.createMany({
        data: data.participantAdd
          .split(",")
          .map((name) => ({ scheduleId, name })),
      });
    }
  }

  public static deleteSchedule(data: DeleteSchedule) {
    // onDelete: Cascade により、紐づく参加者(scheduleId)も同時に削除される
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

  public static getParticipants(scheduleId: number | null) {
    if (scheduleId === null) return [];

    const participants = gassma.Participant.findMany({
      where: { scheduleId },
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
