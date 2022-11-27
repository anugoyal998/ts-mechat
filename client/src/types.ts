export type ILoginState = {
  email: string;
  password: string;
  repeat_password?: string;
};

export type IRegisterState = {
  email: string;
  password: string;
};


// base class -> login state 