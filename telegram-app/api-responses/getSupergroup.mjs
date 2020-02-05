import filterResponse from '../api-combiners/output-types/types-getter.mjs'
 export function getSupergroup(obj){
   return filterResponse(obj);
 }
/*
{
    "result": {
        "_": "supergroup",
        "id": 1142301654,
        "username": "meduzali",
        "date": 1506945649,
        "status": {
            "_": "chatMemberStatusLeft"
        },
        "memberCount": 3,
        "anyoneCanInvite": false,
        "signMessages": false,
        "isChannel": true,
        "isVerified": false,
        "restrictionReason": ""
    }
}
*/
