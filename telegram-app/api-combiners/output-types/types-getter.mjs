import DBG from 'debug';
var debug = DBG(`${process.env.DEBUG}:types-getters-debug`);
var error = DBG(`${process.env.DEBUG}:types-getters-error`);
import path from 'path';
import axios from 'axios';
import types from './types.mjs'
const reqUrl = `${process.env.TELEGRAM_CLIENT_PROTOCOL}://${process.env.TELEGRAM_CLIENT_CONTAINER}:${process.env.TELEGRAM_CLIENT_CONTAINER_PORT}`;
/*
async function downloadFile(fileId,synchronous = 1) {
  let {data} = await Promise.resolve(axios.get(`${reqUrl}/downloadFile?fileId=${fileId}&synchronous=${synchronous}`))
  return data;
}
*/
let getEntityFunc = {
  textEntityTypeUrl: (str) => {return `<a href="${str}">${str}</a>`},
  textEntityTypeTextUrl: (str, url) => {return `<a href="${url}">${str}</a>`},
  textEntityTypeBold: (str) => {return `<span style="font-weight: bold;">${str}</span>`},
  textEntityTypeItalic: (str) => {return `<span style="font-style: italic;">${str}</span>`},
}

let makeTextEntityTypeUrlObj = (t) => {

  let patt = /\bhttps?:\/\/\S+/gi, res = '', ent = {text: t, entities: []};
  while (res = patt.exec(t)) {
	   ent.entities.push({offset: res.index,length: patt.lastIndex - res.index,type: {_: "textEntityTypeUrl"}});
  }
  return ent;
  /*
    {
      text: "Lorem Huem v Rotem im vsem. https://t.me/skvlspr/10036",
      entities: [
        {
          "offset": 49,
          "length": 26,
          "type": {"_": "textEntityTypeUrl"}
        }
    ]
    }
  */
}

let insertHtml = (formattedText) => {
  let {text,entities} = formattedText;
  //debug(entities);
  let htmledText = text;
  entities.forEach((el)=>{
    let entityFunc = getEntityFunc.hasOwnProperty(el.type._)?getEntityFunc[el.type._]:(str)=>str;
    let textChunk = text.slice(el.offset, el.offset + el.length);
    htmledText = htmledText.replace(textChunk,entityFunc(textChunk,el.type.url || ''));
  });
  return htmledText;
}

/*let downloadPhoto = (id,synchronous = 1)=>{
  Promise.resolve(axios.get(`${reqUrl}/downloadFile?fileId=${id}&synchronous=${synchronous}`)).then((res)=>{console.log(res)})
}*/
let downloadPhoto = ({id,local:{path}},synchronous = 0)=>{
  if(!path){
    Promise.resolve(axios.get(`${reqUrl}/downloadFile?fileId=${id}&synchronous=${synchronous}`)).then((res)=>{debug(`${id} downloaded`)})
  }
}
let downloadPhotos = (p)=>{if(p.hasOwnProperty('id')){downloadPhoto(p);} return p;}
let mods = {
  path: (p)=>path.basename(p || ''),
  text: (t)=>{return typeof t === 'object'?insertHtml(t):t;},
  caption: (t)=>{return typeof t === 'object'?insertHtml(t):t;},
  description: (t)=>{return typeof t === 'string'?insertHtml(makeTextEntityTypeUrlObj(t)):t;}
  //photo: (p)=>downloadPhotos(p),
  //small: (p)=>downloadPhotos(p),
  //big: (p)=>downloadPhotos(p)
}




function applyMod(el,val){
  return mods.hasOwnProperty(el)?mods[el](val):val;
}
export default function filterResponse(obj){
  //obj = Object.assign({},obj);
  obj = JSON.parse(JSON.stringify(obj));
  let res = {};

  if(obj.hasOwnProperty('_')){
    let {_:type} = obj;

    if(types.hasOwnProperty(type)){
      types[type].forEach((el)=>{

        if(Array.isArray(obj[el]) && obj[el].length > 0)
        {
          obj[el] = obj[el].map((el)=>{return typeof el === 'object'?filterResponse(el):el});
        }
        if(!obj.hasOwnProperty(el)){obj[el] = {};}
        if(obj[el].hasOwnProperty('_')){
          obj[el] = filterResponse(obj[el])
        }
        res[el] = applyMod(el,obj[el]);
      });
    }
    else{
      res = false;
    }
  }

  return res;
};
