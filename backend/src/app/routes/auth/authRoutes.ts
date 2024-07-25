import { Router } from "express";
import { discordPassport } from "../../auth/auth";

const router: Router = Router();

router.get(
  "/discord/redirect",
  discordPassport.authenticate("discord", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(
      `http://localhost:4001?user=${encodeURIComponent(JSON.stringify(req.user))}`,
    );
  },
);

export const AuthRouter: Router = router;
