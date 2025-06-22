The **Advanced Ruby LSP** extension integrates with the `ruby-lsp` gem, with advanced configuration options to manage PATHs and bundler invocation, as well as the ability to auto-format Ruby documents when they're saved.

## Requirements

You will need [the `ruby-lsp` gem](https://shopify.github.io/ruby-lsp/) installed on your machine, and the appropriate path (or paths) configured.

## Configuration

There are three settings available to configure, which can all be managed both at a global level, and at a project/workspace level.

* Run the Ruby LSP either directly or via bundler.
* Set additional PATH directories to reliably detect the `ruby-lsp` executable.
* Auto-formatting of Ruby files when they're saved.

To configure global preferences, open **Extensions → Extension Library...** then select Advanced Ruby LSP's **Preferences** tab.

You can also configure preferences on a per-project basis in **Project → Project Settings...**

Currently on my own machine, I am using `mise` to manage Ruby versions, so I have the following path added to the extension settings:

```
/Users/[username]/.local/share/mise/shims
```

I also have the `ruby-lsp` gem in each project's Gemfile, so I can use Bundler as part of the boot process.

## Usage

Ideally, the LSP should just run in the background and provide help where it can (to the best of Nova's abilities). Sometimes it can crash, though - so there is a command to restart the LSP via the command palette: `Restart Ruby LSP`

### Credits

I have learned a great deal from the code of other Ruby LSP extensions:

* https://github.com/edwardloveall/ruby-lsp.novaextension for the format-on-save functionality
* https://github.com/Roguelazer/ruby-lsp.novaextension/ for using the ruby-lsp gem
* https://github.com/tdegrunt/ruby.novaextension for general Ruby LSP integration

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/pat/advanced-ruby-lsp.novaextension. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/pat/advanced-ruby-lsp.novaextension/blob/main/CODE_OF_CONDUCT.md).

## License

The extension is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in this extension's codebase, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/pat/advanced-ruby-lsp.novaextension/blob/main/CODE_OF_CONDUCT.md).
