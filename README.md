

# CodeBackuper

**CodeBackuper** is a command-line utility that simplifies the process of backing up files and directories. It allows users to specify source and destination paths with customizable flags, ensuring efficient and hassle-free backups.

---

## Features
- Backs up files and directories from a source to a destination.
- Skips unnecessary directories (e.g., `node_modules`).
- Displays a spinner to indicate progress.
- Easy to use with a single command.

---

## Installation

1. Install the package globally via npm:
   ```bash
   npm install -g codebackuper
   ```

2. Ensure Node.js (v14 or higher) is installed.

---

## Usage

### Command
```bash
codebackuper --source <source_path> --destination <destination_path>
```

### Example
```bash
codebackuper --source "C:/Users/YourUser/Desktop/myfiles" --destination "D:/Backups/mybackup"
```

### Flags
- `--source` (required): Path to the source directory or file you want to back up.
- `--destination` (required): Path to the destination directory where backups will be stored.

---

## How It Works
1. Reads the files and directories in the specified source path.
2. Creates a backup in the destination path, maintaining the original folder structure.
3. Skips directories like `node_modules` to save time and space.
4. Displays progress with a spinner using the `ora` package.

---

## Developer Notes

### Local Development
To test the package locally:
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Link the package globally:
   ```bash
   npm link
   ```
4. Run the CLI:
   ```bash
   codebackuper --source <source_path> --destination <destination_path>
   ```

### Publishing to NPM
1. Ensure the project is ready for publishing:
   ```bash
   npm publish
   ```

---

## Dependencies
- [ora](https://www.npmjs.com/package/ora) for the spinner.
- [fs/promises](https://nodejs.org/api/fs.html#fs_promises_api) for file system operations.
- [path](https://nodejs.org/api/path.html) for path manipulations.

---

## Contributing
Contributions are welcome! Feel free to fork the project and create a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

