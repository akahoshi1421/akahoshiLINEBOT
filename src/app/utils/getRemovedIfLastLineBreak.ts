export const getRemovedIfLastLineBreak = (message: string) => {
  if (message[message.length - 1] !== "\n") return message;

  return message.slice(0, -1);
};
