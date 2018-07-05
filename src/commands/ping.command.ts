import { BotCommand } from "./command.abstract";
import { IBotMessage, IBot } from "../domains";
import { Message } from "discord.js";

/**
 * @api {GET} /commands/ping Ping Command
 * @apiName Ping Command
 * @apiGroup Commands
 * @apiVersion 0.1.0
 */
export default class PingCommand extends BotCommand {

  prefix: string = super.prefix;
  bot: IBot = super.bot;

  aliases: string[] = [
    "ping"
  ];

  helpDesc: string = `Ping will tell you how the API is responding.\n`;

  public async process(msg: Message, answer: IBotMessage): Promise<void> {
    const m = await msg.channel.send("Ping?") as Message;
    m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(this.bot.getPing())}ms`);
  }
}