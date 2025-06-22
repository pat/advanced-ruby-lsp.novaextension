const PATHS_KEY = 'com.freelancing-gods.ruby-lsp.paths';
const BUNDLER_KEY = 'com.freelancing-gods.ruby-lsp.bundler';
const FORMAT_KEY = 'com.freelancing-gods.ruby-lsp.format-on-save';

class Config {
  additionalPaths() {
    var paths = nova.config.get(PATHS_KEY);
    if (nova.workspace) {
      paths = paths.concat(nova.workspace.config.get(PATHS_KEY));
    }

    return paths;
  }

  additionalPathsString() {
    var paths = this.additionalPaths();
    if (paths.length > 0) {
      return `${paths.join(':')}:`;
    } else {
      return '';
    }
  }

  useBundler() {
    return this.booleanValue(BUNDLER_KEY);
  }

  formatOnSave() {
    return this.booleanValue(FORMAT_KEY);
  }

  booleanValue(key) {
    var global = nova.config.get(key);

    if (nova.workspace) {
      if (nova.workspace.config.get(key) === 'enabled') {
        return true;
      }

      if (nova.workspace.config.get(key) === 'disabled') {
        return false;
      }
    }

    return global;
  }
};

module.exports = Config
