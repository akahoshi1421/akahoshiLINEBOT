type MessageData = {
  message: {
    text: string;
  };
};

export type LineMessageData = {
  events: MessageData[];
};
