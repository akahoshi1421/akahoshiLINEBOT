import { GassmaClient } from "../../generated/gassma/schemaClient";
import type {
  ScheduleRecord,
  ScheduleWithParticipants,
} from "../types/gassma";

const gassma = new GassmaClient();

// スケジュール作成・更新で受け取る値
export type ScheduleInput = {
  eventName: string;
  eventDate?: Date | null;
  remarks?: string | null;
};

export class SheetController {
  // 日程未定 + 未来のスケジュール（トップページ用）
  public static getFutureSchedules(): ScheduleRecord[] {
    return gassma.Schedule.findMany({
      where: {
        OR: [{ eventDate: { gte: new Date() } }, { eventDate: null }],
      },
      orderBy: { eventDate: { sort: "asc", nulls: "last" } },
    });
  }

  // 過去のスケジュール（過去一覧ページ用）
  public static getPastSchedules(): ScheduleRecord[] {
    return gassma.Schedule.findMany({
      where: { eventDate: { lt: new Date() } },
      orderBy: { eventDate: "desc" },
    });
  }

  // id でスケジュールを取得（参加者を含む。詳細ページ用）
  public static getById(id: number): ScheduleWithParticipants | null {
    return gassma.Schedule.findFirst({
      where: { id },
      include: { participants: true },
    }) as ScheduleWithParticipants | null;
  }

  public static createSchedule(input: ScheduleInput): ScheduleRecord {
    return gassma.Schedule.create({
      data: {
        eventName: input.eventName,
        eventDate: input.eventDate || undefined,
        remarks: input.remarks || undefined,
      },
    });
  }

  // 指定フィールドのみ更新する（onBlur 編集用）
  public static updateById(id: number, patch: Partial<ScheduleInput>) {
    const data: Record<string, string | Date | null> = {};

    if (patch.eventName !== undefined) data.eventName = patch.eventName;
    if (patch.eventDate !== undefined) data.eventDate = patch.eventDate;
    if (patch.remarks !== undefined) data.remarks = patch.remarks;

    if (Object.keys(data).length === 0) return;

    // gassma の更新型は null 非対応だが、ランタイムでは null で空セルにできるためキャストする
    gassma.Schedule.updateMany({
      where: { id },
      data: data as Parameters<typeof gassma.Schedule.updateMany>[0]["data"],
    });
  }

  public static deleteById(id: number) {
    // onDelete: Cascade により、紐づく参加者(scheduleId)も同時に削除される
    gassma.Schedule.deleteMany({ where: { id } });
  }

  public static addParticipant(scheduleId: number, name: string) {
    gassma.Participant.create({ data: { scheduleId, name } });
  }

  public static removeParticipant(scheduleId: number, name: string) {
    gassma.Participant.deleteMany({ where: { scheduleId, name } });
  }

  public static getParticipants(scheduleId: number | null): string[] {
    if (scheduleId === null) return [];

    const participants = gassma.Participant.findMany({
      where: { scheduleId },
      select: { name: true },
    });

    return participants.map((participant) => participant.name);
  }

  // 通知フィルタ(scheduleFilter)用に全スケジュールを返す
  public static getAllData(): ScheduleRecord[] {
    return gassma.Schedule.findMany({});
  }
}
