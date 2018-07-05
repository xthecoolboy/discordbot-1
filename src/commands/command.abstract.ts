import { IBotCommand, IBot, IBotHelp, IBotMessage } from "../domains";
import { Message } from "discord.js";

/**
 * @api {GET} /commands/abstract Abstract Command
 * @apiName Abstract Bot Command
 * @apiGroup Commands
 * @apiVersion 0.1.0
 */
export abstract class BotCommand implements IBotCommand {

  public prefix: string;

  public bot: IBot;

  public aliases: string[];

  public helpDesc: string;

  public getHelp(): IBotHelp {
    return { caption: this.aliases.join(", "), description: this.helpDesc };
  }

  public init(bot: IBot, prefix: string, dataPath: string): void {
    this.prefix = prefix;
    this.bot = bot;
  }

  public isValid(msg: Message): boolean {
    const args = msg.cleanContent.slice(this.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    return this.aliases.indexOf(cmd) > -1;
  }

  public async process(msg: Message, answer: IBotMessage): Promise<void> {
    answer.setTitle("Command Process");
    answer.addField("Command: ", msg.cleanContent);
  }
}