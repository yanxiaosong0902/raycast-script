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
  }, {
    name: '插入文档',
    title: 'db.collection.insert() 或者 save(), 以及 insertOne(), insertMany()'
  }, {
    name: '更新文档',
    title: 'db.collection.update({name: {$type: 2}}, {$set: {name: 20}}, {multi: true})'
  }, {
    name: '删除文档',
    title: 'db.collection.remove()'
  }, {
    name: '查询文档',
    title: 'db.collection.find({gender: 1},{"name.$":1}), 只返回name字段'
  }, {
    name: '条件操作符',
    title: '大于=$gt, 小于=$lt, 大于等于=$gte, 小于等于$lte,不等于&ne, 例如：db.col.find({age: {$gt: 30}})'
  }, {
    name: '$type',
    title: 'db.col.find({"title" : {$type : 2}})或 db.col.find({"title" : {$type : "string"}})'
  }, {
    name: '$skip or $limit',
    title: 'db.col.find().limit(1).skip(10)'
  }, {
    name: '$or',
    title: 'db.col.find({"likes": {$gt:50}, $or: [{"by": "菜鸟教程"},{"title": "MongoDB 教程"}]})'
  }, {
    name: 'aggregate',
    title: `db.notice_log.aggregate(
      [
        {$match: {"type": 2, "operation_type": 2}},
        {
          $facet: {
            data: [{$skip:2},{$limit: 2}],
            total: [{$count: "total"}]
          }
        }
      ]
    )`
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