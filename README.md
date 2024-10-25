# Frida universal mod menu

Available for use in any android application, only if the application is not protected from frida itself.

## Usage

Termux:

```bash
frida -H localhost -l mod_menu.js -f package
```

Via usb:

```bash
frida -U -l mod_menu.js -f package
```

## Based on [EngModMobileModMenu](https://github.com/Zunzz/EngModMobileModMenu)

Thanks for the original code, I added support for new elements: RadioGroup, RadioButton, Button, TextInput, Toggle, Dropdown, DestroyButton, as well as the ability to change the text
