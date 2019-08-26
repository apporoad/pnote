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