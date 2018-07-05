import * as env from "dotenv";

import { DiscordBot } from "./bot";
import { ILogger, IBotConfig } from "./domains";
import { isEmpty } from "./utils";

const logger: ILogger = console;

env.config();
const discordToken = process.env.TOKEN;
const commandPrefix = process.env.PREFIX;
const allowedGuilds = isEmpty(process.env.ALLOWED_GUILDS) ? [] : process.env.ALLOWED_GUILDS.split("|");

const config: IBotConfig = {
  token: discordToken,
  allowed_guilds: allowedGuilds,
  prefix: commandPrefix ? commandPrefix : "/",
  listeners: [
    "ready", "guildCreate", "guildDelete", "message"
  ],
  commands: [
    "help", "ping", "echo"
  ],
  game: "The Game",
  username: "Discord Bot"
};

const bot = new DiscordBot().start(
  logger, config,
  `${__dirname}/commands`,
  `${__dirname}/listeners`,
  `${__dirname}/../data`
);

