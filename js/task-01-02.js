/*
    User access control Interface
*/


var isSysLog = true;
// var isDebug = false;
var isDebug = true;

function sysLog(message) {
    var sysLogPrefix = "SysLog :: ";
    if(isSysLog) {
        console.log(sysLogPrefix + message);
        return true;
    }
}

var userRing = {
    users : {
        maxUsers : 5,
        userList : []
    },
    // a User trying to Log-in
    currentUser : {
            userName : undefined,   // a user to be logged in
            gotAccess : undefined   // isUserAuthorised ? Yes, then we could use it later !
    },
    // inflateUserList : function () {},
    // requestUserName : function () {},
    // getUserAccess   : function () {},

};


function inflateUserList() {
    var userName,
        maxUsers = userRing.users.maxUsers,
        userList = [];

    for(var cntr = 0; cntr < maxUsers; cntr++) {
        userName = prompt("UserList creation (max users : " + maxUsers + ") ::\n\
        Please, enter the USER-name <" + (cntr + 1) + "> of " + maxUsers);

        switch(userName) {
            // null, '' (i.e. <empty_string>) => Handle as nothing to analyze, and finish the POW-task
            case null:  // "Cancel"-state of the PROMPT Modal-dialog but the Safari browser behaviour
            case '':
                console.log('UserList creation stopped !');
                return false;
        }

        userName = userName.trim();
        userList.push(userName);
    }

    userRing.users.userList = userList;
    sysLog("userList => { " + userRing.users.userList.join(":") + " }");

    return true;
}

function requestUserName() {
    var userName;

    userName = prompt("User Authentication : Please, enter Your USER-name to log-in !");
    switch(userName) {
        // null, '' (i.e. <empty_string>) => Handle as nothing to analyze, and finish the POW-task
        case null:  // "Cancel"-state of the PROMPT Modal-dialog but the Safari browser behaviour
        case '':
            console.log("User Authentication : Input of a USER-name is CANCELED ! See You later ...");
            return false;
    }

    debugger;

    userRing.currentUser.userName = userName.trim();
    return true;
}

function getUserAccess() {
    var userName = userRing.currentUser.userName,
        maxUsers = userRing.users.maxUsers;

    debugger;

//    if(!Array.prototype.indexOf) { // Some old browsers
    if(Array.prototype.indexOf) { // Some old browsers
        for(var cntr = 0; cntr < maxUsers; cntr++) {
            if(userName === userRing.users.userList[cntr]) {
                userRing.currentUser.gotAccess = true;

                break;
            }
        }
    } else if (userRing.users.userList.indexOf(userName) >= 0) {
        userRing.currentUser.gotAccess = true;
    }

    return userRing.currentUser.gotAccess ? true : false;
}

function confirmUserAuthorization() {
    console.log("Congratulations ! You are AUTHORIZED under Login-name < " + userRing.currentUser.userName + " > !");
    return true;
}

function badUserCredentials() {
    console.log("Authentication failed : The user name < " +
        userRing.currentUser.userName +
        " > is UNKNOWN !\n\tTry to LOGIN again by pressing F5(refresh) in the browser !");

    return false;
}

if(inflateUserList()) {
    if(requestUserName()) {
        if(getUserAccess())
            confirmUserAuthorization();
        else
            badUserCredentials();
    }
}
else
    console.log("UserList creation failed. \n\tTry Again by pressing F5(refresh) in the browser !");

// Finish the execution
