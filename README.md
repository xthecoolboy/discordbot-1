# Generic Discord Bot
This is a generic [Discord](https://discordapp.com) bot, a starting point for any developer that plans to use [Discord.js](https://discord.js.org) as part of their architecture.

-------------------------

## The Step-By-Step Guide

### Environment Setup
- Clone the project

  > `git clone git@github.com:nickjpanella/discordbot.git`

- Create the .env (dotenv) file :: https://www.npmjs.com/package/dotenv
  - This allows us to store our private keys in a location thats safe and easy to access. It can also serve as a properties file for other variables that we want to use accross the application. 
  
  - For this project, we use three in particular.
  
    KEY | Description
    ----|------
    TOKEN | This is the value of your Discord bot token.
    PREFIX | The symbol you want to use for bot commands. (Default if not provide is a `/` )
    ALLOWED_GUILDS | This is a `|` (bar) delimited list that is optional but can be used if you want to restrict the bot to specific Discord Servers.

- Package Manager ( I suggest [Yarn](https://yarnpkg.com/en/) )

  > `npm install -g yarn`

- Install the Node Modules ( There is a `postinstall` script that will build the project from Typescript into JavaScript )

  > `yarn install` | `npm install`

### File Management 
When working with this project, keep in mind the file management

``` text
| -- dist/
|     this is generated when you build the project, includes the 
|     JavaScript files. 
| -- src/
      | -- bot-message.ts 
      |     `BotMessage class` sets up a message you want to relay
      | -- discord-bot.ts 
      |     `DiscordBot class` initializes all of your commands
      |     and listeners
      | -- express-app.ts
      |     `expressApp module` creates and exports it to be used
      |     in the main 'src/bin/index.ts' file
      | -- bin/
            | -- index.ts
            |     This is your main "runnable" file, includes the
            |     setup for `DiscordBot` and `expressApp`
      | -- commands/
            | -- command.abstract.ts
            |     `BotCommand class` The abstract command class
            | -- *.command.ts
            |     `ExampleCommand class` This extends BotCommand 
            |     and includes your definitions of each command
            | -- index.ts
            |     Exports all of the classes bound together, this 
            |     isn't mandatory, but keeps things organized.
      | -- domains/
            | -- *.domain.ts
            |     These are your domain models (interfaces)
      | -- listeners/
            | -- *.listener.ts
            |     Here are you listeners, necessary components for 
            |     your bot to observe what's going on on your server.
      | -- routes/
            | -- public.ts
            |     These are your public APIs for Express to serve.
      | -- utils/
            | -- *.util.ts
            |     Creating utils allows you to keep your code clean
            |     and help reduce redundant code.
```

### Development
When developing using this project I implemented a "watch" script that will keep an eye on your local changes and will rebuild the application with every change (generating the dist/*.js) 

> `yarn watch` | `npm run watch`

Set up your `src/bin/index.ts` file to configure your bot.
```JavaScript
  const botConfig: IBotConfig = {
    discordToken: token,
    allowedGuilds: guilds,
    botListeners: [
      "ready", "guildCreate", "guildDelete", "message"
    ],
    botCommands: [
      "help", "ping", "echo"
    ],
    botActivity: "The Game",
    botUsername: "Discord Bot",
    cmdPrefix: prefix ? prefix : "/"
  };

  new Bot().start(
    botConfig,
    `${__dirname}/../commands`,
    `${__dirname}/../listeners`,
    `${__dirname}/../data`
  );
```


### Deployment
I chose [Heroku](https://heroku.com) because its only $7.00 /month to run a container indefinitely. 
- Download the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).
- > heroku login (with your email and password)
- > heroku create `discord-bot` -b `heroku/nodejs`
- > heroku config:set --app=`discord-bot` TOKEN=%replacewithyourtoken%
- > heroku config:set --app=`discord-bot` PREFIX=%replacewithyourprefix%
- > heroku config:set --app=`discord-bot` ALLOWED_GUILDS=%replacewithyourguilds%
- > heorku git:remote --app=`discord-bot`
- > git push heroku HEAD:master


-------------------------
## Support
If you find a bug in this project, report it:
> https://github.com/nickjpanella/discordbot/issues/new


-------------------------
## MIT Lisence
This is not legal advice. Learn more about repository licenses.

Copyright (c) 2018 Nicholas J. Panella

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
