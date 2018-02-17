# git-committed

A simple slack bot inspired by https://github.com/adymitruk/keep-me-commiting to keep project coders committed to the project by providing messages telling the user they haven't committed in x days.
See the example config file for all customized options, including amount of days a user hasn't committed before a reminder is sent, custom messages, specified projects, and more!

TO DO list: 
* Run on public or private repos, depending on project specifications.
* ~~Specify a project~~
* Specify how often the bot checks using Cron in the config file
* Specify the bot's ~~username~~ and picture
* Specify messages the bot tells users [half complete]
* ~~Specify number of days before the bot tells users they haven't committed (along with the messages)~~
* Make it usable for discord/fb messenger as well!

* Update config file so that it's less messy / variables are auto-included
* Update readability of the config file
* Ensure that the config file is modular enough to where if unnecessary values aren't specified, the script still runs
* NOTE: the bot does not currently PM the user when sending the reminders through slack (although it should)

# To Use

Make sure you input all values in `exampleConfig.js` and rename it `config.js`.  Also make sure that you have npm and node installed.
Run `npm install` to make sure you have all up-to-date dependencies before running the project.

# To Run

`node index.js`