import { Message } from "discord.js";

import { BotCommand } from "./command.abstract";
import { IBotMessage, IBot } from "../domains";

/**
 * @api {GET} /commands/echo Echo Command
 * @apiName Echo Command
 * @apiGroup Commands
 * @apiVersion 0.1.0
 */
export default class PingCommand extends BotCommand {

  prefix: string = super.prefix;
  bot: IBot = super.bot;

  aliases: string[] = [
    "echo", "say"
  ];

  helpDesc: string = `Ping will tell you how the API is responding.\n`;

  public async process(msg: Message, answer: IBotMessage): Promise<void> {
    answer.setTextOnly(msg.content);
  }
}