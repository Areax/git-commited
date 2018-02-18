var config = require('./config.js');
const request = require('request');
var slackBot = require('slack-bot')(config.slackWebhook);
const CronJob = require('cron').CronJob;

function closestValue(goal, list) {
    return list.reduce((prev, curr) => Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
}

// Currently, run the function every day at 3:00pm EST
new CronJob('0 15 * * *', function() {
	(function checkCommits() {
		config['githubUsernames'].forEach(function(gitHubUsername) {
			request({
			  url: `https://api.github.com/users/${gitHubUsername}/events`,
			  headers: {
				'User-Agent': 'git-committed'
			  }
			}, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
				var ele = 0;
				var found = false;
				var githubEvents = JSON.parse(body);
				
				// find out the last time the user committed to the specific project 
				while(githubEvents[ele]) {
					if(githubEvents[ele]["repo"]["name"].includes(config["gitHubProject"]) && config["typeofGitHubEvents"].indexOf(githubEvents[ele]["type"]) > -1) {
						found = true;
						break;
					}
					ele++;
				}
				
				// the last commit was not found
				if(!found) {
					
					// have the commit bot remind people on slack
					slackBot.send({
					  text: "It's been so long GitHub's tracker doesn't even know how long it's been since you've last committed @" + gitHubUsername + "!",
					  channel: config["slackChannels"].concat([gitHubUsername]),
					  username: 'Commit_Reminder_Bot'
					});

				}
				else {
					
					const now = new Date(Date.now()).toISOString();
					const lastCommitTime = githubEvents[ele]["created_at"];

					var daysSinceCommit = parseInt(now.split('-')[2].split('T')[0]) - parseInt(lastCommitTime.split('-')[2].split('T')[0]);
					var accessValue = closestValue(daysSinceCommit, config["daysAtLeastSinceLastCommit"]);
					
					// the user has committed before the bot was requested to start reminding the user
					if(accessValue == 0) {
					  return;
					}
					
					// replace the current string parts with their respective actual values
					const mapObj = {
						"/daysSinceCommit/" : daysSinceCommit,
						"/gitHubUsername/" : gitHubUsername
					};

					var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
					var txt = config["botReminder"][accessValue]["text"].replace(re, function(matched){
					  return mapObj[matched];
					});
					
					// have the commit bot remind people on slack
					slackBot.send({
					  text: txt,
					  channel: config["slackChannels"].concat([gitHubUsername]),
					  username: config["botReminder"][accessValue]["username"]
					});
				}
			  }
			});
		});
    })();
}, null, true, 'America/New_York');