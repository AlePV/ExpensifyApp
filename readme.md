# Git Commands

git init --> create a new git repo
git status --> view the changes to your project code
git add --> add files to staging area
git commit --> creates a new commit with files from staging area
git log --> view recent commits

GITHUB INSTALLATION (WITH SSH):

ssh-keygen -t rsa -b 4096 -C "marialepestana@gmail.com"
--> where file : the default --> just click enter
--> no passphrase --> just click enter twice

to check for existing keys --> ls -a ~/.ssh

to check if the ssh-agent is running --> eval "$(ssh-agent -s)"

to add the new key, the identity, (which you have to provide the private key's path) --> ssh-add ~/.ssh/id_rsa

to copy to clipboard --> pbcopy < ~/.ssh/id_rsa.pub

to make ssh connection to GitHub servers --> ssh -T git@github.com

to provide remote name and remote url --> git remote add origin git@github.com:AlePV/ExpensifyApp.git

to view ouptut after ^^^ --> git remote --> "origin" should appear when entering
                        '--> git remote -v --> to view verbose output --> two urls should appear (fetch & push, which are usually the same)

to push code up --> git push -u origin master
'--> (the -u creates connection between my local code and the upstreamed repository), then the remote (which is origin) and the branch (which is always going to be master)