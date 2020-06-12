const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const errorMsg = fs.readFileSync(path.join(__dirname, 'messages', 'failed.json'), 'utf8');

try {
  const payload = github.context.payload;
  const lastCommit = payload.head_commit;

  const author = lastCommit.author.name;
  const commit_message = lastCommit.message;
  const commit_url = lastCommit.url;
  const branch = payload.ref.replace("refs/heads/", "");
  const branch_url = payload.repository.html_url + "/tree/" + branch;
  const run_url = payload.repository.html_url + "/actions/runs/" + process.env.GITHUB_RUN_ID;
  const script = process.env.GITHUB_WORKFLOW || "Build";
  const webhook = core.getInput("SLACK_WEBHOOK") || null;

  if (!webhook) {
    core.setFailed("No webhook provided. Please add the env variable: SLACK_WEBHOOK");
  }

  message = errorMsg
    .replace(/{script}/g,  script)
    .replace(/{author}/g, author)
    .replace(/{branch}/g, branch)
    .replace(/{branch_url}/g, branch_url)
    .replace(/{commit_message}/, commit_message)
    .replace(/{run_url}/g, run_url)
    .replace(/{commit_url}/g, commit_url);

  msg = {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": github.context
        }
      }
    ]
  }

  axios.post(webhook, JSON.stringify(msg)).catch((error) => {
    core.setFailed(error);
  })

} catch (error) {
  core.setFailed(error.message);
}