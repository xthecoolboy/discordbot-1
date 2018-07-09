import { Message } from "discord.js";

import { BotCommand } from "./command.abstract";
import { IBotMessage, IBot } from "../domains";

/**
 * @api {GET} /commands/echo Echo Command
 * @apiName Echo Command
 * @apiGroup Commands
 * @apiVersion 0.1.0
 */
export default class EchoCommand extends BotCommand {

  prefix: string = super.prefix;
  bot: IBot = super.bot;

  aliases: string[] = [
    "echo", "say"
  ];

  helpDesc: string = `This repeats what you said.\n`;

  public async process(msg: Message, answer: IBotMessage): Promise<void> {
    const args = msg.cleanContent.slice(this.prefix.length).trim().split(/ +/g);
    args.shift();
    answer.setTextOnly(args.join(" "));
  }
}