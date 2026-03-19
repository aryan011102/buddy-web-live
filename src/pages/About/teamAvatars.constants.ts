import ankur from "../../assets/img/ankur.png";
import aryan from "../../assets/img/aryan.png";
import devansh from "../../assets/img/devansh.png";
import pritika from "../../assets/img/pritika.png";
import roshan from "../../assets/img/roshan.jpeg";
import sakshi from "../../assets/img/sakshi.jpeg";
import yash from "../../assets/img/yash.png";

export const TEAM_AVATARS = {
  ankur,
  aryan,
  devansh,
  pritika,
  roshan,
  sakshi,
  yash,
} as const;

export type TeamAvatarKey = keyof typeof TEAM_AVATARS;
