export interface IBotConfig {
  discordToken: string;
  allowedGuilds: string[];
  botListeners: string[];
  botCommands: string[];
  botActivity?: string;
  botUsername?: string;
  cmdPrefix?: string;
}