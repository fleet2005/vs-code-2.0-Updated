// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	clipboardManager = new ClipboardManager(3);
	
	// Create status bar item
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.text = `Storage: ${clipboardManager.getCurrentType()}`;
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);

	// Register copy command
	let copyDisposable = vscode.commands.registerCommand('vscode-copypaste.copy', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			if (!selection.isEmpty) {
				const text = editor.document.getText(selection);
				const message = clipboardManager.copy(text);
				vscode.window.showInformationMessage(message);
			}
		}
	});

	// Register paste command
	let pasteDisposable = vscode.commands.registerCommand('vscode-copypaste.paste', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const text = clipboardManager.paste();
			if (text) {
				editor.edit(editBuilder => {
					editBuilder.replace(editor.selection, text);
				});
			}
		}
	});

	// Register display content command
	let displayDisposable = vscode.commands.registerCommand('vscode-copypaste.displayContent', (args) => {
		const index = args ? args.index : 0;
		const content = clipboardManager.getContent(index);
		if (content) {
			vscode.window.showInformationMessage(`Content at index ${index}: ${content}`);
		} else {
			vscode.window.showInformationMessage(`No content at index ${index}`);
		}
	});

	// Register switch data structure command
	let switchDisposable = vscode.commands.registerCommand('vscode-copypaste.switchDataStructure', () => {
		const message = clipboardManager.switchDataStructure();
		statusBarItem.text = `Storage: ${clipboardManager.getCurrentType()}`;
		vscode.window.showInformationMessage(message);
	});

	// Register clear content command
	let clearDisposable = vscode.commands.registerCommand('vscode-copypaste.clearContent', () => {
		const message = clipboardManager.clear();
		vscode.window.showInformationMessage(message);
	});

	context.subscriptions.push(copyDisposable);
	context.subscriptions.push(pasteDisposable);
	context.subscriptions.push(displayDisposable);
	context.subscriptions.push(switchDisposable);
	context.subscriptions.push(clearDisposable);
}

// This method is called when your extension is deactivated
function deactivate() {
	if (statusBarItem) {
		statusBarItem.dispose();
	}
}

// Data structure implementations
class ClipboardManager {
	constructor(maxSize = 3) {
		this.array = new Array(maxSize).fill('');
		this.stack = [];
		this.queue = [];
		this.currentType = 'array';
		this.maxSize = maxSize;
		this.copyCount = 0;
		this.pasteCount = 0;
	}

	copy(text) {
		switch (this.currentType) {
			case 'array':
				this.copyCount = (this.copyCount + 1) % this.maxSize;
				this.array[this.copyCount - 1] = text;
				return `Copied to array[${this.copyCount - 1}]`;

			case 'stack':
				this.stack.push(text);
				return 'Pushed to stack';

			case 'queue':
				this.queue.push(text);
				return 'Added to queue';
		}
	}

	paste() {
		switch (this.currentType) {
			case 'array':
				if (this.copyCount > 0) {
					this.pasteCount = (this.pasteCount + 1) % this.maxSize;
					return this.array[this.pasteCount - 1];
				}
				return undefined;

			case 'stack':
				return this.stack.pop();

			case 'queue':
				return this.queue.shift();
		}
	}

	switchDataStructure() {
		switch (this.currentType) {
			case 'array':
				this.currentType = 'stack';
				break;
			case 'stack':
				this.currentType = 'queue';
				break;
			case 'queue':
				this.currentType = 'array';
				break;
		}
		this.copyCount = 0;
		this.pasteCount = 0;
		return `Switched to ${this.currentType} mode`;
	}

	clear() {
		switch (this.currentType) {
			case 'array':
				this.array = new Array(this.maxSize).fill('');
				this.copyCount = 0;
				this.pasteCount = 0;
				break;
			case 'stack':
				this.stack = [];
				break;
			case 'queue':
				this.queue = [];
				break;
		}
		return `Cleared ${this.currentType} storage`;
	}

	getContent(index) {
		if (this.currentType === 'array' && index < this.maxSize) {
			return this.array[index];
		}
		return undefined;
	}

	getCurrentType() {
		return this.currentType;
	}
}

let clipboardManager;
let statusBarItem;

module.exports = {
	activate,
	deactivate
}
