import { Client } from "discord.js";
import { IBotListener, IBot } from "../domains";
import { isEmpty, existsIn, Logger } from "../utils";

const logger = new Logger();

export default class GuildCreateListener implements IBotListener {

  public init(bot: IBot, client: Client) {
    client.on("guildCreate", (guild) => {

      logger.info(`New guild joined ${guild.name} (id: ${guild.id}).`);

      if (!isEmpty(bot.config.allowedGuilds)) {
        if (existsIn(guild.id, bot.config.allowedGuilds)) {
          guild.leave()
            .then(() => {
              logger.info("Guild not allowed, I have left.");
            })
            .catch(rejected => {
              logger.info("Guild not allowed, but I was unable to leave :: ", rejected);
            });
        }
      }
    });
  }
}