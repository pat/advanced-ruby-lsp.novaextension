const Config = require('./config');

class Formatter {
  constructor(langserver) {
    this.langserver = langserver;
  }

  replaceDocument(editor, text) {
    const documentSpan = new Range(0, editor.document.length);

    editor.edit((edit) => {
      edit.replace(documentSpan, text);
    });
  }

  notifyError(message) {
    let notification = new NotificationRequest("Ruby LSP Error");

    notification.title = nova.localize("Ruby LSP Error");
    notification.body = nova.localize(message);

    nova.notifications.add(notification);
    console.error(message);
  }

  formatDocument(workspace, editor) {
    const filePath = editor.document.path;

    return this.langserver.languageClient
      .sendRequest("textDocument/formatting", {
          textDocument: { uri: `file://${filePath}` },
          options: { tabSize: 2, insertSpaces: true },
      })
      .then((result) => {
          const { newText } = result[0];
          this.replaceDocument(editor, newText);
      })
      .catch(this.notifyError);
  }

  onDidAddTextEditor(editor) {
    if (editor.document.syntax != "ruby") return;

    editor.onWillSave((editor) => {
      if (new Config().formatOnSave()) {
        return this.formatDocument(nova.workspace, editor);
      }
    });
  }
}

module.exports = Formatter;
