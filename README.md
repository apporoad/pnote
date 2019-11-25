# pnote
pnote short for personal note, it is a website for note for everybody

# version 
v2.0

# website
private site is [site](http://www.holyond.top)

# how to use 
* use url like "http://www.holyond.top/yourname" to share your message to anyone
* everyone can edit it
* you can click save button or use ctrl + s to save your editing

# how to deploy

just try it
```bash
npm i -g aok.js

aok https://github.com/apporoad/pnote.git  -r api -s static
#or
aok https://github.com/apporoad/pnote/blob/master/pnote.zip?raw=true --type zip -r api -s static

rm -rf .aok

```
produce env 

```bash
git clone https://github.com/apporoad/pnote.git
cd pnote
npm i -g pm2
npm i -g aok.js

pm2 start --name pnote aok -- api -s static -p 11540

# visit http://localhost:11540/

```

## ps
```bash

support view mode :
try get http://localhost:11540/abc?mode=view

```

## docker run 
```
mkdir -p /data/pnote
cd /data/pnote
cat > data.json << eof
{"/":{"value":"hello good day"}}
eof

docker run -d --name pnote -p 1154:1154 -v /data/pnote/data.json:/pnote/api/data.json apporoad/pnote:1

#visit localhost:1154
```


## dockerfile
```bash
git clone https://github.com/apporoad/pnote.git

cd pnote

docker build -t apporoad/pnote:1 .

docker run -d --name pnote -p 1154:1154 apporoad/pnote:1 

#visit localhost:1154
```

