#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title TS
// @raycast.mode compact

// Optional parameters:
// @raycast.icon 🤖
// @raycast.argument1 { "type": "text", "placeholder": "Placeholder" }

// Documentation:
// @raycast.description 通过 JSON 生成 interface

const ncp = require('copy-paste')

const input = process.argv.slice(2)[0]

function genInterface(data) {
  let result = ''
  let list = [{
    entry: Array.isArray(data) ? data[0] : data,
    type: 'IModel'
  }]
  function createInterface(body) {
    const entry = body.entry
    const type = body.type
    result += `export interface ${type} { \n`
    Object.keys(entry).forEach((item) => {
      const thisValue = entry[item]
      const thisType = typeof thisValue
      if (thisType !== 'object') {
        result += `  ${item}: ${thisType}\n`
      } else {
        let newType = item.replace(/\_(\w)/g, (m, l) => l.toUpperCase())
        newType = newType.replace(/\w/, (m) => m.toUpperCase())
        if (Array.isArray(thisValue)) {
          if (thisValue.length === 0) {
            result += `  ${item}: any[]\n`
            return
          }
          result += `  ${item}: I${newType}[]\n`
          list.push({
            entry: thisValue[0],
            type: `I${newType}`
          })
        } else {
          result += `  ${item}: I${newType}\n`
          list.push({
            entry: thisValue,
            type: `I${newType}`
          })
        }
      }
    })
    result += '}\n\n'
  }
  while (list.length > 0) {
    createInterface(list.shift())
  }
  ncp.copy(result, function() {
    console.log('已复制到剪贴板')
  })
}

let params
try {
  params = JSON.parse(input.trim())
  if (typeof params !== 'object') {
    throw new Error('不是合法的 json')
  }
  genInterface(params)
} catch (error) {
  console.log('error: 只能解析 json 字符串', error)
}
