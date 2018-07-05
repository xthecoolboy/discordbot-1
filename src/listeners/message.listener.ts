import { Client } from "discord.js";
import { IBot, IBotListener } from "../domains";
import { BotMessage } from "../message";

export default class MessageListener implements IBotListener {

  public init(bot: IBot, client: Client) {
    client.on("message", async (message) => {

      if (message.author.bot) return;
      if (message.content.indexOf(bot.config.prefix) !== 0) return;

      bot.logger.debug(`[${message.author.tag}] ${message.cleanContent}`);

      for (const cmd of bot.commands) {
        try {
          if (cmd.isValid(message)) {

            const answer = new BotMessage(message.author);
            if (!bot.config.idiots || !bot.config.idiots.indexOf(message.author.id)) {
              await cmd.process(message, answer);
            } else {
              if (bot.config.idiotAnswer) {
                answer.setTextOnly(bot.config.idiotAnswer);
              }
            }

            if (answer.isValid()) {
              message.reply(answer.text || { embed: answer.richText });
            }

            break;
          }
        } catch (ex) {

          bot.logger.error(ex);
          return;
        }
      }
    });
  }
}