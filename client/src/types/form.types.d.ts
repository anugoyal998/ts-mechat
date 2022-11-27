export type IForm = {
    username: string;
    password: string;
    name?: string;
    repeat_password?: string;
}

export type IFormData = {
    type: string;
    placeholder: string;
    name: string;
  }