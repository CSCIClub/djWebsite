Contributing
============

Thank you wanting to make the SCSU CSCI Club better!  Please see the
[wiki](https://github.com/CSCIClub/djWebsite/wiki) for things that need to done or
simply add something that you think will be awesome.

Quick Start - ubuntu-16.04
--------------------

```
sudo apt-get update
sudo apt-get install git python3 python3-pip python3-virtualenv redis-server
sudo service redis-server start
git clone https://github.com/CSCIClub/djWebsite
cd djWebsite

# setup virtualenv
python3 -m virtualenv --python=python3 venv
source venv/bin/activate

# install dependencies
pip install -r requirements

# create a secrets file
echo "SECRET_KEY = \"PUT_A_RANDOM_STRING_HERE\"" > secret_settings.py
echo "DEBUG = True" >> secret_settings.py

# create the table in database
python manage.py migrate

# run the server
python manage.py runserver 0.0.0.0:8000
```

Setting up a dev environment
----------------------------

Linux, Windows, OSX, or any Unix variant should work for developing in python,
however, I recommend any Unix variant such as Linux or OSX.

### Installing [Python](https://www.python.org/)

Install [python 3](https://www.python.org/) either from the website or through
your distributions package manager.  I recommend the most recent stable release.
Currently as of writing this python 3.5.2 is the stable release.

- windows: Install through the [python](https://www.python.org/) website.  Make
  sure the installer sets up the correct paths. You can verify if the paths are
  setup correctly after installation is by opening a terminal/shell and running
  python.  If everything went well you should get the python *read eval print
  loop* (repl).  It is also preferable to install as a local user instead of
  globally so pip may be run with out opening a terminal as an administrator.
- Linux:
    - Ubuntu or Debian: `sudo apt-get install python3`
    - Fedora: `sudo yum install python3`
    - Arch: `sudo pacman -S python`
- Mac
    - Install from [python](https://www.python.org/) website
    - brew: `brew install python3`

### Installing [virtualenv](https://virtualenv.pypa.io/en/stable/)

Install virtualenv by running the command.  You may need to run it as root by
prepending sudo or running it with escalated privileges.  Some distributions
have virtualenv included in their repositories and should be preferred over
installing through pip.  For windows you may need to open your shell with admin
rights.

```bash
pip install virtualenv
```

### Installing [Git](https://git-scm.com/)

Git is the version control system that we use and is highly recommended to learn
for just about any other project

- Windows: Install with the
  [git-for-windows](https://git-for-windows.github.io/) installer.  This will
  include a bash emulator that comes with git and other Unix goodies as well as
  a graphical user interface that will help you get started.
- Linux
    - Ubuntu or Debian: `sudo apt-get install git`
    - Fedora: `sudo yum install git`
    - Arch: `sudo pacman -S git`
- Mac
    - Install with the [git-osx-installer](https://code.google.com/archive/p/git-osx-installer/downloads)
    - brew: `brew install git`

### Setting up a text editor

Recommended text editors to get you started, however any text editor or IDE that
is able to edit python code will work.

- [notepad++](https://notepad-plus-plus.org/) for windows only
- [gedit](https://wiki.gnome.org/Apps/Gedit#Download)
- [atom](https://atom.io/)
- [sublime text](https://www.sublimetext.com/)
- [Eclipse](https://www.eclipse.org/downloads/) with the
  [PyDev](http://www.pydev.org/download.html) addon
- These are if you don't mind a large learning curve.  Not recommended if your
  just starting to learn programming.
    - [vim](http://www.vim.org/) is better than emacs
    - [emacs](https://www.gnu.org/software/emacs/) is better than vim
- A comprehensive list of
  [IDEs](https://wiki.python.org/moin/IntegratedDevelopmentEnvironments) and
  [editors](https://wiki.python.org/moin/PythonEditors).


Getting the Code and Setting Up
----------------

Create a fork of the project by logging in to GitHub and navigating to
[djWebsite](https://github.com/CSCIClub/djWebsite).  then simply click the
*Fork* button.

Clone your fork by using cd to navigate to were you want to put the project.
Then run the following command were the $username is your GitHub account.

```bash
git clone https://github.com/$username/djWebsite
cd djWebsite
```

Installing django and dependencies into a virtualenv and activate it.

```bash
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

Setting up the django project. Place a random sequence for the SECRET_KEY.

```bash
# This creates a secrets file this is used for security reasons
echo 'SECRET_KEY = `PUT_A_RANDOM_STRING_HERE`
      DEBUG = True' > secret_settings.py

python manage.py migrate # this builds the database
python manage.py runserver # this starts the server
django-admin runserver
```

Work Flow
---------

```Bash
git checkout -b $feature_x # feature should be the name feature you intend to add
# make your edits/additions related to your feature
git add [files] # add all files that will be committed
git checkout dev # switch back to the dev branch
git merge $feature_x # merge your new feature into the dev branch
git push origin dev # push dev branch to your fork
```

Make a [pull request](https://github.com/CSCIClub/djWebsite/pull/new/dev)
for your dev branch

Rinse and repeat.

Style
-----
Please follow the coding standard of [PEP8](https://www.python.org/dev/peps/pep-0008/)

Also please remove trailing white space as it produces noise in version control.


Other things that may be helpful for new contributors
-----------------------------------------------------

If you have never used the django or a mvc framework before
[django get started](https://www.djangoproject.com/start/) is a good place to start.

### Git

- [cheatsheet](https://www.git-tower.com/blog/content/posts/54-git-cheat-sheet/git-cheat-sheet-large01.png)
- rogerdudler's [git tutorial](http://rogerdudler.github.io/git-guide/)
- [codeacademy](https://www.codecademy.com/learn/learn-git)
- [github tutorial](https://try.github.io/)

### Python

[Python Documentation](https://docs.python.org/3/)

Python Tutorials:

- [codeacademy](https://www.codecademy.com/learn/python)

### [Sqlite](https://sqlite.org/)

sqlite is the database that we are currently using.

[sqlite docs](https://sqlite.org/docs.html)

### Other useful links

command line tutorial at [codeacademy](https://www.codecademy.com/learn/learn-the-command-line)
