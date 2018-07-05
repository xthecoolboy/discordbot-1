import { Client } from "discord.js";
import { IBotListener, IBot } from "../domains";
import { Logger } from "../utils";

const logger = new Logger();

export default class ReadyListener implements IBotListener {

  public init(bot: IBot, client: Client) {
    client.on("ready", () => {

      if (bot.config.botActivity) {
        client.user.setActivity(bot.config.botActivity);
      }
      if (bot.config.botUsername && client.user.username !== bot.config.botUsername) {
        client.user.setUsername(bot.config.botUsername);
      }

      client.user.setStatus("online");
      logger.info("\nDiscord Bot Started...\n");
    });
  }
}