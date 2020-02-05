import DBG from 'debug';
import {getFilesInfo, downloadFile} from '../api-combiners/combiners'
var debug = DBG('televizor:req-getFiles-debug');
var error = DBG('televizor:req-getFiles-error');
export async function getFiles({fileIds}){
  let files = await getFilesInfo(JSON.parse(fileIds));
  files.forEach(({id, isDownloadingActive, isDownloadingCompleted})=>{
    if(!isDownloadingActive&&!isDownloadingCompleted){
      downloadFile(id,0).then((res)=>{
        //debug(`${id} downloaded (retry)`)
      });
    }
  });
  //debug(files);
  return files;
};
