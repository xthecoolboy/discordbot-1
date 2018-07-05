import { Client } from "discord.js";
import { IBotListener, IBot } from "../domains";

export default class GuildDeleteListener implements IBotListener {

  public init(bot: IBot, client: Client) {
    client.on("guildDelete", (guild) => {
      bot.logger.info(`I have been removed from ${guild.name} (id: ${guild.id}).`);
    });
  }
}