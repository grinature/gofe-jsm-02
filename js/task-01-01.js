var isSysLog = true;
 var isDebug = false;
//var isDebug = true;

function sysLog(message) {
    var sysLogPrefix = "SysLog :: ";
    if(isSysLog) {
        console.log(sysLogPrefix + message);
        return true;
    }
}

var powObj = {
    base : undefined,
    exponent : undefined,
    result : undefined,

    powInputState : undefined,
    powComputeState : undefined,

    // pow : function() {
    //
    // }
};


// Throw a random value ...
function getRandomSample(min, max) {
    var randomValue = Math.floor((Math.floor(max) - Math.ceil(min)) * Math.random()) + Math.ceil(min);

    return randomValue;
}

function parseInput(input) {
    // var templateString = " -4   3";

    /* If we'd like to split (ie. eliminate space-chars) ::
    N.B. !!!!  Skip the 1st empty-string El of an Array,
    when the original input has the space-chars before the 1st parameter, called <base> !
    */

    //    var reSplitLiteral = /\s+/;

    // If we'd like to match
    // Here are 2 'capturing parentheses' : base and exponent
    var reMatchLiteral = /\s*((?:\+|-)?\d+)\s+(\d+)\s*/;

    //    var inputList = templateString.split(reSplitLiteral);
//    debugger;

    var inputList = input.match(reMatchLiteral);
    if(!inputList) {
        console.log('POW-service : Ooops ! Wrong Parameters are provided.\n\
            There is nothing to compute. \n\
            Run the POW-script again (e.g. via Refresh/F5) !!!');
        powObj.powInputState = false;
    } else {
        powObj.base = parseInt(inputList[1]);
        powObj.exponent = parseInt(inputList[2]);

        powObj.powInputState = true;
    }

    sysLog("powObj.base = " + powObj.base + "" + " powObj.exponent = " + powObj.exponent);
    return powObj.powInputState;
//    var inputList = templateString.match(reMatchLiteral);
//    console.log(inputList);

}

function powInput(powArray) {
   var autoInput = false;
   // var autoInput = true;
if(isDebug) {
    debugger;
}

    var powSample_base = getRandomSample(0, 10000),
        powSample_exponent = getRandomSample(0, 1000),
        powSample = powSample_base + ' ' + powSample_exponent;

    var input;

    if(!autoInput) {
        input = window.prompt("POW-service { pow(<BASE>, <EXPONENT>) } : \n\
            Please, enter the BASE and EXPONENT values to compute the POW !\n\
            Example: " + powSample,
                    "");    // set the default value for the Prompt's input-element
    }   // eoIF autoInput
    else {
        sysLog("An input via PROMPT-dialog is off !\n\
                Let's get RANDOM-values for <BASE>, and <EXPONENT> {" + powSample + "}");
        input = powSample;
    }

    switch(input) {
        // null, '' (i.e. <empty_string>) => Handle as nothing to analyze, and finish the POW-task
        case null:  // "Cancel"-state of the PROMPT Modal-dialog but the Safari browser behaviour
        case '':
            console.log('POW-service : There is nothing to compute. \nRun the POW-script again (e.g. via Refresh/F5)');
            return false;
        default:
            if(parseInput(input)) {
                return true;
            } else
                return false;
    }

}


// Compute th POW-function
function powCompute() {
// my realization is based on statements of < www.ecma-international.org/ecma-262/6.0/#sec-math.pow >
    var base = powObj.base,
        exponent = powObj.exponent,
        result;

    if(exponent === 0) {
        return powObj.result = 1;
    }

    if(base === 0) {
        if(exponent > 0)
            return powObj.result = 0;
    }

    for( var cntr = 1, result = base; cntr < exponent; cntr++ ) {
        result *= base;
    }

    powObj.result = result;
    powObj.powComputeState = true;
    sysLog("{ powCompute base: " + base + " exponent: " + exponent +" } cntr = " + cntr + " result = " + result);
}

// Output the result of POW-function execution
function powOutput() {
    console.log("POW-service : The result of raising <base = " + powObj.base + "> to the <power = " + powObj.exponent + ">\n\
    EQUALS <" + powObj.result + ">");
}

// get values of base and exponent
powObj.powInputState = powInput();
if(powObj.powInputState) {
    // Compute the result of POW-function
    powCompute();
}

if(powObj.powComputeState) {
    powOutput();
}

// Finish the execution
