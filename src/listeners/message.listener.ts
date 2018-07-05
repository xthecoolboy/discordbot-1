import { Client } from "discord.js";
import { IBot, IBotListener } from "../domains";
import { BotMessage } from "../bot-message";
import { Logger } from "../utils";

const logger = new Logger();

export default class MessageListener implements IBotListener {

  public init(bot: IBot, client: Client) {
    client.on("message", async (message) => {

      if (message.author.bot) return;
      if (message.content.indexOf(bot.config.cmdPrefix) !== 0) return;

      logger.info(`[${message.author.tag}] ${message.cleanContent}`);

      for (const cmd of bot.commands) {
        try {
          if (cmd.isValid(message)) {

            const answer = new BotMessage(message.author);

            await cmd.process(message, answer);

            if (answer.isValid()) {
              message.reply(answer.text || { embed: answer.richText });
            }

            break;
          }
        } catch (ex) {

          logger.error(ex);
          return;
        }
      }
    });
  }
}