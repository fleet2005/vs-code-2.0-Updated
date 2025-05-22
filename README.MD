# Advanced Copy Paste Extension

A powerful VS Code extension that enhances your copy-paste experience with multiple data structure support. Store and manage your clipboard content using arrays, stacks, or queues.

# Author
Vishal Srinivasan
vishalsrinivasancontact@gmail.com 

## Features

- Multiple data structure support:
  - Array (with indexed access)
  - Stack (LIFO - Last In, First Out)
  - Queue (FIFO - First In, First Out)
- Easy switching between data structures
- Display stored content
- Clear storage functionality
- Status bar indicator showing current data structure

## Keybindings

### Array Mode
- `Ctrl+C` (press once) - Copy to array[0]
- `Ctrl+C` (press twice) - Copy to array[1]
- `Ctrl+C` (press thrice) - Copy to array[2]
- `Ctrl+V` (press once) - Paste from array[0]
- `Ctrl+V` (press twice) - Paste from array[1]
- `Ctrl+V` (press thrice) - Paste from array[2]

### Stack Mode
- `Ctrl+C` - Push selected text to stack
- `Ctrl+V` - Pop and paste from stack

### Queue Mode
- `Ctrl+C` - Enqueue selected text
- `Ctrl+V` - Dequeue and paste

### Generic Commands
- `Ctrl+0` - Display content at index 0
- `Ctrl+1` - Display content at index 1
- `Ctrl+2` - Display content at index 2
- `Ctrl+4` - Switch between data structures (Array → Stack → Queue)
- `Ctrl+5` - Clear current storage

## Extension Settings

This extension contributes the following settings:

* `vscode-copypaste.dataStructure`: Choose the default data structure (array/stack/queue)
* `vscode-copypaste.maxArraySize`: Maximum size for array storage (default: 3)

## Requirements

- Visual Studio Code version 1.85.0 or higher

## Installation

1. Open VS Code
2. Press `Ctrl+P` to open the Quick Open dialog
3. Type `ext install vscode-copypaste`
4. Press Enter

## Usage

1. Select text in the editor
2. Use the appropriate keyboard shortcuts based on your needs:
   - For array storage: Use multiple Ctrl+C presses to store at different indices
   - For stack: Use Ctrl+C to push and Ctrl+V to pop
   - For queue: Use Ctrl+C to enqueue and Ctrl+V to dequeue
3. Switch between data structures using Ctrl+4
4. Clear storage using Ctrl+5
5. View stored content using Ctrl+0, Ctrl+1, or Ctrl+2

## Known Issues

None at the moment.

## Release Notes

### 0.0.1

Initial release of Advanced Copy Paste extension with:
- Multiple data structure support
- Customizable keyboard shortcuts
- Status bar integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This extension is licensed under the [MIT License](LICENSE).
