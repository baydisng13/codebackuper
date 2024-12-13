#!/usr/bin/env node

// const fs = require('fs');
// const path = require('path');
// const os = require('os');
// const ora = require('ora');
// const yargs = require('yargs/yargs');
// const { hideBin } = require('yargs/helpers');

import fs from 'fs';
import path from 'path';
import os from 'os';
import ora from 'ora';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';


async function copyFile(source, target) {
  return new Promise((resolve, reject) => {
    const rd = fs.createReadStream(source);
    rd.on('error', rejectCleanup);
    const wr = fs.createWriteStream(target);
    wr.on('error', rejectCleanup);
    wr.on('finish', resolve);
    rd.pipe(wr);

    function rejectCleanup(err) {
      rd.destroy();
      wr.end();
      reject(err);
    }
  });
}

async function backupFolder(folderPath, backupPath, spinner) {
  const files = await fs.promises.readdir(folderPath);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory() && file !== 'node_modules') {
      const backupDir = path.join(backupPath, file);
      try {
        await fs.promises.mkdir(backupDir, { recursive: true });
        await backupFolder(filePath, backupDir, spinner);
      } catch (err) {
        spinner.fail(`Error backing up folder ${filePath}: ${err.message}`);
      }
    } else if (stats.isFile()) {
      const backupFile = path.join(backupPath, file);
      try {
        await copyFile(filePath, backupFile);
      } catch (err) {
        spinner.fail(`Error backing up file ${filePath}: ${err.message}`);
      }
    }
  }
}

async function backupDesktop(source, destination) {
  const spinner = ora(`Backing up from ${source} to ${destination}`).start();

  try {
    const files = await fs.promises.readdir(source);
    for (const file of files) {
      const filePath = path.join(source, file);
      const stats = await fs.promises.stat(filePath);
      if (stats.isDirectory() && file !== 'node_modules') {
        const backupDir = path.join(destination, file);
        await fs.promises.mkdir(backupDir, { recursive: true });
        await backupFolder(filePath, backupDir, spinner);
      } else if (stats.isFile()) {
        const backupFile = path.join(destination, file);
        await copyFile(filePath, backupFile);
      }
    }
    spinner.succeed('Backup complete!');
  } catch (err) {
    spinner.fail(`Backup failed: ${err.message}`);
    process.exit(1);
  }
}

// CLI Handling
const argv = yargs(hideBin(process.argv))
  .option('source', {
    alias: 's',
    type: 'string',
    description: 'Source folder path to backup',
    default: path.join(os.homedir(), 'Desktop'),
  })
  .option('destination', {
    alias: 'd',
    type: 'string',
    description: 'Destination folder path for backup',
    demandOption: true,
  })
  .help()
  .alias('help', 'h')
  .argv;

backupDesktop(argv.source, argv.destination);
