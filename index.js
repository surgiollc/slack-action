const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

const errorMsg = fs.readFileSync(path.join(__dirname, '..', 'messages', 'failed.json'), 'utf8');

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
  const script = process.env.GITHUB_WORKFLOW;

  console.log(`Author: ${author}`);
  console.log(`Message: ${commit_message}`);
  console.log(`commit: ${commit_url}`);
  console.log(`branch: ${branch}`);
  console.log(`branch url: ${branch_url}`);
  console.log(`run_url: ${run_url}`);
  console.log(`error: ${error}`);
  console.log(`script: ${script}`);
  //console.log(event);
  console.log(process.env);

  errorMsg.replace('{author}', author);
  console.log(errorMsg);
} catch (error) {
  core.setFailed(error.message);
}