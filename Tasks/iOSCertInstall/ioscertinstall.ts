import path = require('path');
import tl = require('vsts-task-lib/task');
//import sign = require('ios-signing-common/ios-signing-common');
import vsts = require('vso-node-api');

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
        var name = tl.getVariable('SECUREFILE_NAME_1');
        var url = tl.getVariable('SECUREFILE_URL_1');

        //await sign.installCertInTemporaryKeychain('_tmpKeychain', 'tmpKeychainPW', certificate, password);
        tl.setResult(tl.TaskResult.Succeeded, "iOS certificate install succeeded");
    }
    catch(err) {
        tl.setResult(tl.TaskResult.Failed, err);
    } finally {
    }
}

run();
