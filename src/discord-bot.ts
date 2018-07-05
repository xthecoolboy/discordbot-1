import { Client } from "discord.js";
import { IBot, IBotCommand, IBotConfig, IBotListener } from "./domains";

import * as path from "path";
import { isEmpty, Logger } from "./utils";

const logger = new Logger();

export class Bot implements IBot {

  public get commands(): IBotCommand[] { return this._commands; }
  public get listeners(): IBotListener[] { return this._listeners; }
  public get config(): IBotConfig { return this._config; }
  public get allUsers() { return this._client ? this._client.users.array().filter((i: any) => i.id !== "1") : []; }
  public get onlineUsers() { return this.allUsers.filter((i: any) => i.presence.status !== "offline"); }

  private readonly _commands: IBotCommand[] = [];
  private readonly _listeners: IBotListener[] = [];
  private _client: Client;
  private _config: IBotConfig;

  public getPing(): number {
    return this._client ? this._client.ping : 0;
  }

  public start(config: IBotConfig, commandsPath: string, listenersPath: string, dataPath: string) {

    this._config = config;

    this.loadCommands(commandsPath, dataPath);

    if (!this._config.discordToken) { throw new Error("invalid discord token"); }

    this._client = new Client();

    this.loadListeners(listenersPath, dataPath);

    this._client.login(this._config.discordToken);
  }

  private loadCommands(commandsPath: string, dataPath: string) {
    if (isEmpty(this._config.botCommands)) {
      throw new Error("Invalid / Empty Commands List");
    }
    for (const cmdName of this._config.botCommands) {
      const cmdClass = require(`${commandsPath}/${cmdName}.command`).default;
      const command = new cmdClass() as IBotCommand;
      command.init(this, this._config.cmdPrefix, path.resolve(`${dataPath}/${cmdName}.command`));
      this._commands.push(command);
      logger.info(`Command "${cmdName}" Loaded...`);
    }
  }

  private loadListeners(listenersPath: string, dataPath: string) {
    if (isEmpty(this._config.botListeners)) {
      throw new Error("Invalid / Empty Listeners List");
    }
    for (const listenerName of this._config.botListeners) {
      const listenerClass = require(`${listenersPath}/${listenerName}.listener`).default;
      const listener = new listenerClass() as IBotListener;
      listener.init(this, this._client);
      this._listeners.push(listener);
      logger.info(`Listener "${listenerName}" initialized.`);
    }
  }
}
