# Slack javascript action

This action sends slack messages upon failed builds. 

## Inputs

### `SLACK_WEBHOOK`

**Required** The url of your slack webhook.

### `STEPS_CONTEXT`

**Required** A variable for accessing information about the job that's being run.

_This is required for broadcasting what step id failed. Note: You will need to assign ids to your steps_

## Example usage

```
- name: Broadcast failure
  if: ${{ failure() }}
  uses: surgiollc/slack-action@v1.1.0
  with:
    SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
    STEPS_CONTEXT: ${{ toJson(steps) }}
```