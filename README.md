# Slack javascript action

This action sends slack messages upon failed builds. 

## Inputs

### `SLACK_WEBHOOK`

**Required** The url of your slack webhook.

## Example usage

```
- name: Broadcast failure
  if: ${{ failure() }}
  uses: surgiollc/slack-action@v1
  with:
    SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
```