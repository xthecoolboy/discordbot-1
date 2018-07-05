import { IBotHelp } from "./bot-help.domain";
import { IBot } from "./bot.domain";
import { IBotMessage } from "./bot-message.domain";
import { Message } from "discord.js";

export interface IBotCommand {
  init(bot: IBot, prefix: string, dataPath: string): void;
  getHelp(): IBotHelp;
  isValid(msg: Message): boolean;
  process(msg: Message, answer: IBotMessage): Promise<void>;
}