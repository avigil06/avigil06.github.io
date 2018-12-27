const { exec } = require('child_process');
const repo = "git@github.com:avigil06/avigil06.github.io.git";

class Git {
  run(stop = () => {}) {
    this.init()
      .then(this.addRemote)
      .then(this.stageFiles)
      .then(this.unstageBuildFile)
      //.then(this.commit)
      //.then(this.push)
      .then((response) => {
        console.log(response);
        console.log('build pipeline complete');
        stop();
      })
      .catch(e => {
        console.log(e);
      });
  }

  init() {
    return new Promise(resolve => exec('git init', resolve));
  }

  addRemote() {
    return new Promise(resolve => exec(`git remote add origin ${repo}`, resolve));
  }

  stageFiles() {
    return new Promise(resolve => exec('git add *', resolve));
  }

  unstageBuildFile() {
    return new Promise(resolve => exec('git reset build.js', resolve));
  }

  commit() {
    return new Promise(resolve => exec('git commit -m "Update blog content"', resolve));
  }

  push() {
    console.log('pushing to remote');
    return new Promise(resolve => exec('git push --force origin master', resolve));
  }
}
const client = new Git();
client.run();

