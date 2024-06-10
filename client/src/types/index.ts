export type TMSG = {
  sender: string;
  reciever: string;
  msg: string | number | readonly string[] | undefined;
  msgType: string;
  createdat: string;
  id: string;
};
