import { Client } from "discord.js";
import { IBotListener, IBot } from "../domains";
import { isEmpty, existsIn } from "../utils";

export default class GuildCreateListener implements IBotListener {

  public init(bot: IBot, client: Client) {
    client.on("guildCreate", (guild) => {

      bot.logger.info(`New guild joined ${guild.name} (id: ${guild.id}).`);

      if (!isEmpty(bot.config.allowed_guilds)) {
        if (existsIn(guild.id, bot.config.allowed_guilds)) {
          guild.leave()
            .then(() => {
              bot.logger.info("Guild not allowed, I have left.");
            })
            .catch(rejected => {
              bot.logger.info("Guild not allowed, but I was unable to leave :: ", rejected);
            });
        }
      }
    });
  }
}