import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { JwtService, RefreshModel, UserModel } from "ts-auth-express";
import { IPayload } from "ts-auth-express/lib/types";
import ENV from "../config";

const { JWT_REFRESH_SECRET } = ENV;

export const updateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateProfileSchema = Joi.object({
      name: Joi.string().required(),
      providers: Joi.array().items(
        Joi.object({
          provider: Joi.string()
            .valid("emailPassword", "google", "github")
            .required(),
          profilePhotoURL: Joi.string().uri().required(),
        })
      ),
    });

    const { error } = updateProfileSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const userDetails = await UserModel.findOne({
      username: req.user?.username,
    });
    let updatedUserDetails = {
      username: req.user?.username,
      providers: userDetails?.providers.map((provider, index) => ({
        provider: provider.provider,
        profilePhotoURL: req.body.providers.find(
          (e: any) => e.provider === provider.provider
        ).profilePhotoURL,
        name: index === 0 ? req.body.name : provider.name,
        password: provider.password,
        isEmailPassword: provider.isEmailPassword,
      })),
    };
    await UserModel.updateOne(
      { username: req.user?.username },
      updatedUserDetails
    );
    let accessToken;
    let refreshToken;
    const payload: IPayload = {
      name: req.body.name,
      profilePhotoURL: req.body.providers[0].profilePhotoURL,
      username: req.user?.username as string,
    };
    accessToken = JwtService.createToken(payload);
    refreshToken = JwtService.createToken(
      payload,
      JwtService.EXPIRY,
      JWT_REFRESH_SECRET
    );
    await RefreshModel.create({ token: refreshToken });
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    return next(err);
  }
};
