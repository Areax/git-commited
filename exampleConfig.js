module.exports = {
	// usernames to track
	'githubUsernames' : ['username1', 'username2'],
	// webhook to connect the bot with
	'slackWebhook' : "https://hooks.slack.com/services/xxxx",
	// project to track
	'githubProject' : "gitHubRepoName",
	// slack Channels to post to
	'slackChannels' : ['#general'],
	// what type of github events to listen for (PushEvent is most common for commits)
	'typeofGitHubEvents' : ["PushEvent"],
	// the number of days needed to trigger a certain response by the bot; index 0 to have no response if they have committed recently
	// -- Here, the responses will be triggered when the users forget to commit after 3, 6, and 9 days, respectively
	'daysAtLeastSinceLastCommit' : [0, 3, 6, 9, 14],
	// bot responses
	// -- Currently, /daysSinceCommit/ and /gitHubUsername/ become replaced with the amount of days the user hasn't committed in and
	// -- their username, respectively (seen in the code).  Currently, the @ in slack currently does not work
	'botReminder' : {
		3 : {
			username: "Commit_Reminder_Bot",
			text: "You haven't made any public commits in the past /daysSinceCommit/ days @/gitHubUsername/. I'll check back tomorrow."
		},
		6 : {
			username: "Confused_Commit_Reminder_Bot",
			text: "We're getting to the /daysSinceCommit/ day mark @/gitHubUsername/ since your last public commit. Do you need an ambulance?"
		},
		9 : {
			username: "Angry_Commit_Reminder_Bot",
			text: "HEY! It's been /daysSinceCommit/ days @/gitHubUsername/ since your last public commit. Get publicly shunned :("
		},			  
		14 : {
			username: "Depressed_Commit_Reminder_Bot",
			text: "I've stopped keeping track. It's been at least two weeks @/gitHubUsername/."
		}
	}
}