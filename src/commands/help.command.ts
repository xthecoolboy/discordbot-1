import { IBot, IBotMessage } from "../domains";
import { BotCommand } from "./command.abstract";
import { Message } from "discord.js";

/**
 * @api {GET} /commands/help Help Command
 * @apiName Help Command
 * @apiGroup Commands
 * @apiVersion 0.1.0
 */
export default class HelpCommand extends BotCommand {

  prefix: string = super.prefix;
  bot: IBot = super.bot;

  aliases: string[] = [
    "help", "helpme"
  ];

  helpDesc: string = `Shows this 'help' message.\n`;

  public async process(msg: Message, answer: IBotMessage): Promise<void> {
    answer.setTitle("Bot Commands");
    for (const cmd of this.bot.commands) {
      const help = cmd.getHelp();
      if (help.caption) {
        answer.addField(help.caption, help.description);
      }
    }
  }
}