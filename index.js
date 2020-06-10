const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

// const payload = JSON.parse(fs.readFileSync('sample.json', 'utf8'));

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = github.context.payload;
  //const payload = JSON.parse(input);
  const lastCommit = payload.head_commit;
  const author = lastCommit.author.name;
  const commit_message = lastCommit.message;
  const commit_url = lastCommit.url;
  const branch = payload.ref.replace("refs/heads/", "");
  const branch_url = payload.repository.html_url + "/tree/" + branch;
  const run_url = payload.repository.html_url + "/runs/" + process.env.GITHUB_RUN_ID;
  const error = "";
  const script = github.action;

  console.log(`Author: ${author}`);
  console.log(`Message: ${commit_message}`);
  console.log(`commit: ${commit_url}`);
  console.log(`branch: ${branch}`);
  console.log(`branch url: ${branch_url}`);
  console.log(`run_url: ${run_url}`);
  console.log(`error: ${error}`);
  console.log(`script: ${script}`);
  //console.log(event);
  console.log(process.env.GITHUB_RUN_ID);

  const payload2 = JSON.stringify(github, undefined, 2);
  console.log(`The event payload: ${payload2}`);
} catch (error) {
  core.setFailed(error.message);
}