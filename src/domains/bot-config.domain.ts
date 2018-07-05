export interface IBotConfig {
  token: string;
  allowed_guilds: string[];
  listeners: string[];
  commands: string[];
  prefix?: string;
  game?: string;
  username?: string;
  idiots?: string[];
  idiotAnswer?: string;
}