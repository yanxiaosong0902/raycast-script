import { List, ActionPanel, Action } from "@raycast/api"

export default function Mongo() {
  const mongoList = [{
    name: '链接数据库',
    title: 'mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]'
  }, {
    name: '创建和使用数据库',
    title: 'use DATABASE_NAME'
  }, {
    name: '查看数据库',
    title: 'show dbs'
  }, {
    name: '删除数据库',
    title: 'db.dropDatabase()'
  }, {
    name: '删除集合',
    title: 'db.collection.drop()'
  }]
  return (
    <List>
      {
        mongoList.map((item, index) => (
          <List.Item key={index} title={item.name + ': ' + item.title} actions={<Actions item={item} />} />
        ))
      }
    </List>
  )
}

function Actions(props: {
  item: any
}) {
  return (
    <ActionPanel title={props.item.title}>
      {/* <ActionPanel.Section>
        {props.item.link && <Action.OpenInBrowser url={props.item.link} />}
        {props.item.guid && <Action.OpenInBrowser url={props.item.guid} title="Open Comments in Browser" />}
      </ActionPanel.Section> */}
      <ActionPanel.Section>
        {props.item.title && (
          <Action.CopyToClipboard
            content={props.item.title}
            title="Copy Link"
            shortcut={{ modifiers: ["cmd"], key: "." }}
          />
        )}
      </ActionPanel.Section>
    </ActionPanel>
  );
}