import { List, LaunchProps, Action, ActionPanel } from "@raycast/api";
import moment from 'moment'

export default function Command(props: any) {
  let { input } = props.arguments
  const numReg = /^([1-9])([0-9]{12})$/
  if (numReg.test(input)) {
    input = Number(input)
  }
  const result = moment(input)
  const maps = [
    result.format(),
    result.format('YYYY-MM-DD'),
    result.format('YYYY-MM-DD HH:mm:ss'),
    result.unix()
  ]
  return (
    <List>
      {
        maps.map((item, index) => (
          <List.Item
            key={index}
            title={item.toString()}
            actions={
              <ActionPanel>
                <ActionPanel.Section>
                  <Action.CopyToClipboard
                    content={item}
                    title="Copy Link"
                    shortcut={{ modifiers: ["cmd"], key: "." }}
                  />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        ))
      }
    </List>
  );
}
