FROM node:12
 
RUN mkdir -p /pnote/api
RUN mkdir -p /pnote/static
#WORKDIR /pnote
 
ADD api/ /pnote/api/
ADD static/ /pnote/static/
 
RUN npm i -g aok.js
 
EXPOSE 1154
 
CMD ["aok", "/pnote/api","-s","/pnote/static","-p","1154"]