# Feedreader test

## Online version

``` bash
http://enricoboccadifuoco.github.io/frontend-nanodegree-feedreader/
```

## How to run: local

``` bash
git clone https://github.com/enricoboccadifuoco/frontend-nanodegree-feedreader.git
cd /path/to/frontend-nanodegree-feedreader/
python -m SimpleHTTPServer 8080
http://localhost:8080
```

## Test summary

#### RSS Feeds
* allFeeds should be defined
* feed url exists
* feed name exists

#### The menu
* should be hidden
* on-click menu should not be hidden

#### Initial Entries
* should exists at least a single ".entry" element within the ".feed" container

#### New Feed Selection
* should change the content when a new feed is loaded
