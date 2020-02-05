 import path from 'path';
 import filterResponse from '../api-combiners/output-types/types-getter.mjs'
 export function downloadFile(obj){
     let res = filterResponse(obj);
     let localPath = res.local.path;
     res.local.path = path.basename(localPath || '');
     return res;
 };
