export class MessageCreate {
  public getEventNameMessage(eventName: string) {
    return `イベント名: ${eventName}\n`;
  }

  public getDateMessage(date: Date | null) {
    return date
      ? `集合時間 : ${Utilities.formatDate(date, "JST", "yyyy-MM-dd HH:mm")}\n`
      : "";
  }

  public getParticipantsMessage(participants: string[]) {
    return participants.length ? `参加者: ${participants.join(",")}\n` : "";
  }

  public getParticipantsStringMessage(participants: string | null) {
    return participants ? `参加者: ${participants}\n` : "";
  }

  public getRemakrsMessage(remarks: string | null) {
    return remarks ? `備考: ${remarks}\n` : "";
  }
}
