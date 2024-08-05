import { Router } from "express";
import { DiscordPassport } from "../../auth/auth";
import { mongo_db } from "../../../main";
import { UserDto } from "../../auth/UserDto";

const router: Router = Router();

router.get(
  "/discord/redirect",
  DiscordPassport.authenticate("discord", { failureRedirect: "/" }),
  (req, res) => {
    const { discordId, username } = req.user as {
      discordId: string;
      username: string;
    };
    if (mongo_db.findUserById(discordId)) {
      const cookie = { discordId, username };
      res
        .cookie("user_data", cookie, {
          signed: true,
          // httpOnly: true, // DE PUS IN PRODUCTIE
          secure: true,
        })
        .redirect(`http://localhost:4001/home`);
    } else res.status(401).send("User not found");
  },
);

router.get("/discord/user", (req, res) => {
  if (req.signedCookies.user_data) {
    const { discordId, username, factions, highestRole } =
      req.signedCookies.user_data;
    const user: UserDto = { discordId, username, factions, highestRole };
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

export const AuthRouter: Router = router;
