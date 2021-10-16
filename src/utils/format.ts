import * as vscode from 'vscode'

export default () => {
  // 获取选中代码块
  const editor = vscode.window.activeTextEditor
  if (!editor) throw new Error('hello world!')
  const {
    document: { lineAt, getText },
    selection: { start, end, active },
  } = editor
  const code = (
    start.isEqual(end) ? lineAt(active.line).text : getText(new vscode.Range(start, end))
  ).trim()

  // 判断选中区域中有没有代码
  if (!code.match(/\w+/)) throw new Error(`Selected code is empty.`)

  // 格式化
  const format = code.replace(/\n/g, '\\n')

  // 写入剪切板
  vscode.env.clipboard
    .writeText(`"body": "${format}"`)
    .then(() =>
      vscode.window
        .showInformationMessage(
          'Copied, now you can paste it in snippets.',
          'Open user snippets',
          'Later'
        )
        .then(value =>
          value === 'Open user snippets'
            ? vscode.commands.executeCommand('workbench.action.openSnippets')
            : null
        )
    )
}
