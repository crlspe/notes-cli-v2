# notes-cli-v2
Create and Manage Notes and Tasks 
Options:
      --help       Show help                                           [boolean]
      --version    Show version number                                 [boolean]
      --clear      Clear the console                   [boolean] [default: true]
  -d, --debug      Print debug info                                    [boolean]
  -n, --note       Note Item                                           [boolean]
  -t, --task       Task Item                                           [boolean]
  -c, --clip       Use Clipboard as Input             [boolean] [default: false]
  -a, --add        Add an Item                                         [boolean]
  -A, --append     Append content                                      [boolean]
  -R, --replace    Replace content                                     [boolean]
  -r, --remove     Remove Item(s)                                      [boolean]
  -s, --search     Search text in Item(s)                              [boolean]
  -i, --selectId   Select Items by Id(s)                               [boolean]
  -u, --update     Change Item Type                                    [boolean]
  -X, --check      Set a task as completed                             [boolean]
  -O, --uncheck    Set a task as not completed                         [boolean]
  -h, --chain      Chain to a Command
   [choices: "append", "add", "replace", "remove", "toTask", "toNote", "update","check", "uncheck"]
      --console    Console Out Results                 [boolean] [default: true]
  -C, --clipboard  Paste Results to Clipboard                          [boolean]
  -o, --output     Output content to File                              [boolean]
  -f, --fileName   Set File Name
