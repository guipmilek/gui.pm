const git = require('isomorphic-git');
const fs = require('fs');
const path = require('path');

async function run() {
  const dir = process.cwd();
  
  try {
    // Initialize if .git doesn't exist
    if (!fs.existsSync(path.join(dir, '.git'))) {
      console.log('Initializing git repository...');
      await git.init({ fs, dir });
    }

    // Add all files
    console.log('Staging files...');
    const files = await git.listFiles({ fs, dir });
    // We want to add everything that is not gitignored
    // Isomorphic-git doesn't automatically respect .gitignore on add unless we use status
    // For simplicity in this environment, we'll just add everything except node_modules etc manually or use status
    
    const statuses = await git.statusMatrix({ fs, dir });
    for (const [filepath, head, workdir, stage] of statuses) {
      if (workdir !== 0 && !filepath.startsWith('node_modules') && !filepath.startsWith('.next')) {
        await git.add({ fs, dir, filepath });
      }
    }

    // Commit
    console.log('Committing changes...');
    const sha = await git.commit({
      fs,
      dir,
      author: {
        name: 'Guipmilek',
        email: 'guipmilek@users.noreply.github.com',
      },
      message: 'chore: migrate to AI Studio environment',
    });

    console.log(`Commit successful: ${sha}`);
    
    // Push
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      console.log('Pushing to GitHub...');
      await git.push({
        fs,
        http: require('isomorphic-git/http/node'),
        dir,
        remote: 'origin',
        ref: 'main',
        onAuth: () => ({ username: token }),
      });
      console.log('Push successful');
    } else {
      console.log('GITHUB_TOKEN not found, skipping push');
    }

  } catch (err) {
    console.error('Git error:', err);
    process.exit(1);
  }
}

run();
