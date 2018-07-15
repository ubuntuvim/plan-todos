var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: '.',
  outputDirectory: './electron-out/win',
    authors: 'ubuntuvim.',
    exe: 'plan-todos.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
