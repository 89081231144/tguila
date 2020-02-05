const express = require('express');
const server = express();
const { airgram } = require('./index');
const logger = require('morgan');
server.use(logger('combined'))
server.get('/searchPublicChats', (req, res, next) => {
  airgram.api.searchPublicChats({query:req.query.query || ''}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/searchPublicChat', (req, res, next) => {
  airgram.api.searchPublicChat({username:req.query.username || ''}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    res.send({
        result: error
    });
  })
});

server.get('/addRecentlyFoundChat', (req, res, next) => {
  airgram.api.addRecentlyFoundChat({chatId:req.query.chatId || ''}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/removeRecentlyFoundChat', (req, res, next) => {
  airgram.api.removeRecentlyFoundChat({chatId:req.query.chatId || ''}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/clearRecentlyFoundChats', (req, res, next) => {
  airgram.api.clearRecentlyFoundChats().then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/getMessage', (req, res, next) => {
  airgram.api.getMessage({chatId:req.query.chatId || '',messageId:req.query.messageId}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/joinChat', (req, res, next) => {
  airgram.api.joinChat({chatId:req.query.chatId}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/getChats', (req, res, next) => {
  airgram.api.getChats({offsetOrder:req.query.offsetOrder || '9223372036854775807', offsetChatId:req.query.offsetChatId || 0, limit: req.query.limit || 100}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/getFile', (req, res, next) => {
  airgram.api.getFile({fileId:req.query.fileId || ''}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/getChatMessageByDate', (req, res, next) => {
  airgram.api.getChatMessageByDate({chatId:req.query.chatId, date:req.query.date}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/getChatHistory', (req, res, next) => {
  airgram.api.getChatHistory({chatId:req.query.chatId || 0,fromMessageId:req.query.fromMessageId || 0,offset:req.query.offset || 0,limit:req.query.limit || 0,onlyLocal:req.query.onlyLocal || true}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/getGroupsInCommon', (req, res, next) => {
  airgram.api.getGroupsInCommon({userId: req.query.userId, offsetChatId:req.query.offsetChatId, limit:req.query.limit}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/searchChats', (req, res, next) => {
  airgram.api.searchChats({query: decodeURIComponent(req.query.query || ''),limit:req.query.limit || 10}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/deleteFile', (req, res, next) => {
  airgram.api.deleteFile({fileId: req.query.fileId || 0}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/getChat', (req, res, next) => {
  airgram.api.getChat({chatId:req.query.chatId}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/getRemoteFile/:id', (req, res, next) => {
  airgram.api.getRemoteFile({remoteFileId:req.params.id,fileType:{_:'fileTypeProfilePhoto'}}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/downloadFile', (req, res, next) => {
  airgram.api.downloadFile({fileId:req.query.fileId,priority:req.query.priority || 1,offset:req.query.offset || 0,limit:req.query.limit || 0,synchronous:req.query.synchronous || false}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/getSupergroupFullInfo', (req, res, next) => {
  airgram.api.getSupergroupFullInfo({supergroupId:req.query.supergroupId}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.get('/getSupergroup', (req, res, next) => {
  airgram.api.getSupergroup({supergroupId:req.query.supergroupId}).then(({response}) => {
    res.send({
        result: response
    });
  }).catch((error) => {
    console.error(error)
  })
});

server.listen(Number(process.env.APP_PORT),  function() {
  //console.log(server.name +' listening at '+ server.url);
});
