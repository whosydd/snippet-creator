import * as vscode from 'vscode'
import format from './utils/format'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('snippet-creator.format', format)

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
