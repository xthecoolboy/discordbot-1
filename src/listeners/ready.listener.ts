import { Client } from "discord.js";
import { IBotListener, IBot } from "../domains";

export default class ReadyListener implements IBotListener {

  public init(bot: IBot, client: Client) {
    client.on("ready", () => {

      if (bot.config.game) {
        client.user.setActivity(bot.config.game);
      }
      if (bot.config.username && client.user.username !== bot.config.username) {
        client.user.setUsername(bot.config.username);
      }

      client.user.setStatus("online");
      bot.logger.info("bot started...");
    });
  }
}