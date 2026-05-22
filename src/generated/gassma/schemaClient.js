const schemaRelations = {
  "Participant": {
    "schedule": {
      "type": "manyToOne",
      "to": "Schedule",
      "field": "eventName",
      "reference": "eventName"
    }
  },
  "Schedule": {
    "participants": {
      "type": "oneToMany",
      "to": "Participant",
      "field": "eventName",
      "reference": "eventName",
      "onDelete": "Cascade"
    }
  }
};

const schemaMap = {
    "Schedule": {
      "eventName": "イベント名",
      "eventDate": "集合時間",
      "remarks": "備考"
    },
    "Participant": {
      "eventName": "イベント名",
      "name": "参加者名"
    }
  };

const schemaMapSheets = {
    "Schedule": "スケジュール一覧",
    "Participant": "参加者"
  };

class GassmaClient {
  constructor(options) {
    const mergedOptions = Object.assign({}, options, { relations: schemaRelations, map: schemaMap, mapSheets: schemaMapSheets });
    const client = new Gassma.GassmaClient(mergedOptions);
    Object.assign(this, client);
  }
}

exports.GassmaClient = GassmaClient;
