import dotenv from "dotenv";
dotenv.config();

type IEnv = {
  APP_PORT: string | number;
  DB_URL: string;
  JWT_REFRESH_SECRET: string;
};

const envConfig: IEnv = {
  APP_PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL || "",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
};

export default envConfig;
