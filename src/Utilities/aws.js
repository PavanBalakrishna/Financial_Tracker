
var AWS = require('aws-sdk');
var config = require('../config.json');


const FileService = {
    SaveDataToAWS:(searchFileKey, data,callbackFunction)=>{
        AWS.config.update({
            accessKeyId:config.aws.key,
            secretAccessKey:config.aws.secret,
            region:"ap-northeast-1"
        })
        var s3 = new AWS.S3();
        let dataString = JSON.stringify(data);
            var params = {
            Body: dataString,
            Bucket: "financialtracker.pavanbalakrishna.com",
            Key:searchFileKey,
            ACL:'public-read'
            };
            
            return s3.putObject(params,(err, responseData)=>{
                if(callbackFunction != null){
                    callbackFunction( responseData,err);
                }
                
            })

},
GetListFromAWS:async (searchFileKey, callbackFunction, errorCallback)=>{
    AWS.config.update({
        accessKeyId:config.aws.key,
        secretAccessKey:config.aws.secret,
        region:"ap-northeast-1"
    })
    var s3 = new AWS.S3();
    
        var params = {
             Bucket: "financialtracker.pavanbalakrishna.com",
             Key:searchFileKey,
             ResponseContentType: 'application/javascript'
        };
        
            if(callbackFunction != null){
                await s3.getObject(params,(err, responseData)=>{
                    if (err) {
                        console.log(err, err.stack); // an error occurred
                        errorCallback(err);
                    }
                    else   {
                        let uint8array = new TextEncoder().encode(responseData.Body);
                        let resultbody = new TextDecoder().decode(uint8array);
                        if(callbackFunction != null){
                            callbackFunction(JSON.parse(resultbody),err);
                        }
                        
                    } 
                 })
            }else{
                let promiseData = await s3.getObject(params).promise();
                 let uint8array = new TextEncoder().encode(promiseData.Body);
                 let resultbody = new TextDecoder().decode(uint8array);
                 return JSON.parse(resultbody);
            }
     
        }
}

export default FileService;