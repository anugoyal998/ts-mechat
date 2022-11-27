import express, { Request, Response } from "express";
import { auth, registerController, loginController, whoAmIController, logoutController, refreshController } from "ts-auth-express";
const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("<h1> Test </h1>");
});

router.post("/register", registerController);
router.post("/login",loginController)
router.get("/whoAmI", auth, whoAmIController);
router.post("/logout",auth,logoutController);
router.post("/refresh",refreshController);

export default router;
