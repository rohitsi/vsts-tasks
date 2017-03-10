import path = require('path');
import tl = require('vsts-task-lib/task');
import vsts = require('vso-node-api');
import fs = require('fs');

import {ToolRunner} from 'vsts-task-lib/toolrunner';

async function run() {
    try {
        tl.setResourcePath(path.join( __dirname, 'task.json'));

        /*var certificates = tl.getSecureFilesInput('certificate', true);
        var password = tl.getInput('password', true);

        if(certificates != null && certificates.length > 0) {
            for(var i = 0; i < certificates.length; i ++) {
                tl.debug('Url for secure file with id = ' + certificates[i].id + ' = ' + tl.getSecureFileUrl(certificates[i].id.toString(), true));
            }
        }*/

        var certificate = tl.getInput('certificate', true);
        var ticket = null;
        //ticket = tl.getSecureFileTicket('1');

        var secureFiles = null;
        //secureFiles = tl.getSecureFiles(certificate);
        tl.debug('secureFiles = ' + secureFiles);

        var serverUrl = tl.getEndpointUrl('SystemVssConnection'.toUpperCase(), false);
        var serverCreds = tl.getEndpointAuthorizationParameter('SystemVssConnection'.toUpperCase(), 'ACCESSTOKEN', false);

        let authHandler = vsts.getPersonalAccessTokenHandler(serverCreds);
        var connection = new vsts.WebApi(serverUrl, authHandler);
        var stream = connection.getTaskAgentApi().downloadSecureFile(tl.getVariable('SYSTEM_TEAMPROJECT'), secureFiles[0].id, secureFiles[0].ticket);
        fs.writeFileSync(secureFiles[0].name, stream);

        fs.writeFileSync('fileconnection', 'url=' + ticket + ', serverCreds = ' + serverCreds + '\r\n' + 'secure files = ' + JSON.stringify(secureFiles));
        

        //await sign.installCertInTemporaryKeychain('_tmpKeychain', 'tmpKeychainPW', certificate, password);
        tl.setResult(tl.TaskResult.Succeeded, "iOS certificate install succeeded");
    }
    catch(err) {
        tl.setResult(tl.TaskResult.Failed, err);
    } finally {
    }
}

run();
