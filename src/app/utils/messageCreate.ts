export class MessageCreate {
  public static getEventNameMessage(eventName: string) {
    return `イベント名: ${eventName}\n`;
  }

  public static getDateMessage(date: Date | null) {
    return date
      ? `集合時間 : ${Utilities.formatDate(date, "JST", "yyyy-MM-dd HH:mm")}\n`
      : "";
  }

  public static getParticipantsMessage(participants: string[]) {
    return participants.length ? `参加者: ${participants.join(",")}\n` : "";
  }

  public static getRemakrsMessage(remarks: string | null) {
    return remarks ? `備考: ${remarks}\n` : "";
  }
}
