var DB=(function(){
    var dataDirectory="wgt-private/SamsungSmartTV-IPTV/";
    var log = new Logger('DB');
    return{
        createFiles:function (callback){
            var password,channelDataLinks,blacklistCategories,blacklistChannels;
            try { 
                password = tizen.filesystem.openFile(dataDirectory+"password","a"); 
                DB.setAsync("password","00000");
            } catch (error) {log("code 2 : "+error);}

            try {
                channelDataLinks = tizen.filesystem.openFile(dataDirectory+"channelDataLinks","a");
            } catch (error) {log("code 3 : "+error);}

            try {
                blacklistCategories= tizen.filesystem.openFile(dataDirectory+"blacklistCategories","a");
            } catch (error) {log("code 4 : "+error);}

            try { 
                blacklistChannels= tizen.filesystem.openFile(dataDirectory+"blacklistChannels","a");
            } catch (error) {log("code 5 : "+error);} 
                
            if(callback)
                 callback();

        },
        
        setChannelLink:function (data,callback){ 
            this.set("channelDataLinks",data,callback);
        },
        addChannelLink:function (data,callback){ 
            this.add("channelDataLinks",data,callback);
        },
        getChannelLink:function(callback){
            this.get("channelDataLinks",callback);
        },

        setPassword:function (data,callback){ 
            this.set("password",data,callback);
        },
        addPassword:function (data,callback){ 
            this.add("password",data,callback);
        },
        getPassword:function(callback){
            this.get("password",callback);
        },

        setBlacklistCategory:function (data,callback){ 
            this.set("blacklistCategories",data,callback);
        },
        addBlacklistCategory:function (data,callback){ 
            this.add("blacklistCategories",data,callback);
        },
        getBlacklistCategory:function(callback){
            this.get("blacklistCategories",callback);
        },

        setBlacklistChannel:function (data,callback){ 
            this.set("blacklistChannels",data,callback);
        },
        addBlacklistChannel:function (data,callback){ 
            this.add("blacklistChannels",data,callback);
        },
        getBlacklistChannel:function(callback){
            this.get("blacklistChannels",callback);
        },
        

        get:function (filePath,callback){
            try{
                var file = tizen.filesystem.openFile(dataDirectory+filePath,"r");  
                var result="";
                result=file.readString();  
                file.close();
                if(callback){   
                    callback(result);
                }  
            }
            catch(error){
                log("code : 11 "+error);
            }
        }, 
        set:function (filePath,data,callback){  
            try{
                var file = tizen.filesystem.openFile(dataDirectory+filePath,"w"); 
                file.writeString(data);
                file.close();
                if(callback){
                    try {
                        callback(true);    
                    } catch (error) {
                        log("code : 19 "+error);
                    } 
                } 
            }
            catch(error){
                log("code : 14 "+error);
            }

        }, 
        add:function (filePath,data,callback){  
            try{
                var file = tizen.filesystem.openFile(dataDirectory+filePath,"w"); 
                file.seek(0, "END");
                file.writeString(data);
                file.close();
                if(callback){
                    try { 
                        callback(true);    
                    } catch (error) {
                        log("code : 20 "+error);
                    } 
                } 
            }
            catch(error){
                log("code : 17 "+error);
            }
        }, 

        getAsync:  function (filePath){  
            return (new Promise(function(resolve,reject){
                try{
                    var result="";
                    var file = tizen.filesystem.openFile(dataDirectory+filePath,"r");
                    result=file.readString();
                    file.close();
                    resolve(result); 
                }
                catch(error)
                {
                    log("code : 11 "+error.message);
                    reject(false);
                }
            })) ; 
        },
        
        setAsync:  function (filePath,data){  
            return (new Promise(function(resolve,reject){
                try{
                    var file = tizen.filesystem.openFile(dataDirectory+filePath,"w");
                    file.writeString(data);
                    file.close();
                    resolve(true);
                }
                catch(error){
                    log("code : 14 "+error.message);
                    reject(false);
                }
            })) ; 
        },
        
        addAsync:  function (filePath,data){  
            return (new Promise(function(resolve,reject){ 
                try{
                    var file = tizen.filesystem.openFile(dataDirectory+filePath,"w"); 
                    file.seek(0, "END");
                    file.writeString(data);
                    file.close();
                    resolve(true);
                }
                catch(error){
                    log("code : 17 "+error.message);
                    reject(false);
                }
            })) ; 
        },

        setChannelLinkAsync:function (data){ 
            return this.setAsync("channelDataLinks",data);
        },
        addChannelLinkAsync:function (data){ 
            return this.addAsync("channelDataLinks",data);
        },
        getChannelLinkAsync:function(){
            return this.getAsync("channelDataLinks");
        },

        setPasswordAsync:function (data){ 
            return this.setAsync("password",data);
        },
        addPasswordAsync:function (data){ 
            return this.addAsync("password",data);
        },
        getPasswordAsync:function(){
            return this.getAsync("password");
        },

        setBlacklistCategoryAsync:function (data){ 
            return this.setAsync("blacklistCategories",data);
        },
        addBlacklistCategoryAsync:function (data){ 
            return this.addAsync("blacklistCategories",data);
        },
        getBlacklistCategoryAsync:function(){
            return this.getAsync("blacklistCategories");
        },

        setBlacklistChannelAsync:function (data){ 
            return this.setAsync("blacklistChannels",data);
        },
        addBlacklistChannelAsync:function (data){ 
            return this.addAsync("blacklistChannels",data);
        },
        getBlacklistChannelAsync:function(){
            return this.getAsync("blacklistChannels");
        }, 
    }
   

}());