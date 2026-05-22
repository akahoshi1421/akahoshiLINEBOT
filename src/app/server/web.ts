import type { ScheduleRecord } from "../types/gassma";
import { SheetController } from "../utils/sheetController";

// クライアント(google.script.run)とやり取りする DTO。
// Date は JSON シリアライズの都合上 ISO 文字列で受け渡しする。
export type ScheduleDTO = {
  id: number;
  eventName: string;
  eventDate: string | null;
  remarks: string;
};

export type ScheduleDetailDTO = ScheduleDTO & {
  participants: string[];
};

export type ScheduleInputDTO = {
  eventName: string;
  eventDate: string | null;
  remarks: string;
};

const toScheduleDTO = (schedule: ScheduleRecord): ScheduleDTO => ({
  id: schedule.id ?? 0,
  eventName: schedule.eventName,
  eventDate: schedule.eventDate ? schedule.eventDate.toISOString() : null,
  remarks: schedule.remarks ?? "",
});

const parseEventDate = (iso: string | null): Date | null =>
  iso ? new Date(iso) : null;

// Web アプリ(React)を配信する
export function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("スケジュール管理")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

export function apiGetFutureSchedules(): ScheduleDTO[] {
  return SheetController.getFutureSchedules().map(toScheduleDTO);
}

export function apiGetPastSchedules(): ScheduleDTO[] {
  return SheetController.getPastSchedules().map(toScheduleDTO);
}

export function apiGetSchedule(id: number): ScheduleDetailDTO | null {
  const schedule = SheetController.getById(id);
  if (!schedule) return null;

  return {
    ...toScheduleDTO(schedule),
    participants: schedule.participants.map((participant) => participant.name),
  };
}

export function apiCreateSchedule(input: ScheduleInputDTO): ScheduleDTO {
  if (!input.eventName.trim()) {
    throw new Error("イベント名は必須です");
  }

  const created = SheetController.createSchedule({
    eventName: input.eventName,
    eventDate: parseEventDate(input.eventDate),
    remarks: input.remarks,
  });

  return toScheduleDTO(created);
}

export function apiUpdateSchedule(
  id: number,
  patch: Partial<ScheduleInputDTO>
): void {
  const next: { eventName?: string; eventDate?: Date | null; remarks?: string } =
    {};

  if (patch.eventName !== undefined) next.eventName = patch.eventName;
  if (patch.eventDate !== undefined) next.eventDate = parseEventDate(patch.eventDate);
  if (patch.remarks !== undefined) next.remarks = patch.remarks;

  SheetController.updateById(id, next);
}

export function apiDeleteSchedule(id: number): void {
  SheetController.deleteById(id);
}

export function apiAddParticipant(scheduleId: number, name: string): void {
  if (!name.trim()) return;
  SheetController.addParticipant(scheduleId, name);
}

export function apiRemoveParticipant(scheduleId: number, name: string): void {
  SheetController.removeParticipant(scheduleId, name);
}
