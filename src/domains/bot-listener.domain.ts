import { Client } from "discord.js";
import { IBot } from "src/domains";

export interface IBotListener {
  init(bot: IBot, client: Client): void;
}