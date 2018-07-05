import { ILogger } from "./logger.domain";
import { IBotCommand } from "./bot-command.domain";
import { IUser } from "./user.domain";
import { IBotConfig } from "./bot-config.domain";
import { IBotListener } from "./bot-listener.domain";

export interface IBot {
  readonly commands: IBotCommand[];
  readonly listeners: IBotListener[];
  readonly config: IBotConfig;
  readonly logger: ILogger;
  readonly allUsers: IUser[];
  readonly onlineUsers: IUser[];
  getPing(): number;
  start(logger: ILogger, config: IBotConfig, commandsPath: string, listenersPath: string, dataPath: string): void;
}