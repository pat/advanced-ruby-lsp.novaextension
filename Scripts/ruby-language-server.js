const Config = require('./config');

class RubyLanguageServer {
  constructor() {
    var self = this;

    [
      'com.freelancing-gods.ruby-lsp.paths',
      'com.freelancing-gods.ruby-lsp.bundler'
    ].forEach(function (path, _index) {
      nova.config.observe(path, function(_value) { self.start() });
      nova.workspace.config.observe(path, function(_value) { self.start() });
    });
  }

  deactivate() {
    this.stop();
  }

  start() {
    if (this.languageClient) {
      this.languageClient.stop();
      nova.subscriptions.remove(this.languageClient);
    }

    var config = new Config();
    var path = 'bin/ruby-lsp';
    var cwd = '/';
    if (nova.workspace) {
      cwd = nova.workspace.path;
    }

    const serverOptions = {
      path,
      cwd,
      env: {
        'ADDITIONAL_PATHS': config.additionalPathsString(),
        'USE_BUNDLER': config.useBundler.toString()
      }
    };
    const clientOptions = {
      // The set of document syntaxes for which the server is valid
      syntaxes: ['ruby'],
    };
    const client = new LanguageClient(
      'ruby-lsp',
      'Ruby Language Server',
      serverOptions,
      clientOptions
    );

    try {
      // Start the client
      client.start();

      // Add the client to the subscriptions to be cleaned up
      nova.subscriptions.add(client);
      this.languageClient = client;
    }
    catch (err) {
      if (nova.inDevMode()) {
        console.error(err);
      }
    }
  }

  stop() {
    if (this.languageClient) {
      this.languageClient.stop();
      nova.subscriptions.remove(this.languageClient);
      this.languageClient = null;
    }
  }
}

module.exports = RubyLanguageServer;
