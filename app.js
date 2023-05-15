// (c) Copyright 2021 ABB
//
// Any unauthorized use, reproduction, distribution,
// or disclosure to third parties is strictly forbidden.
// ABB reserves all rights regarding Intellectual Property Rights

// declare variables in the global scope.
var myDigital;
var mySwitch;
var mySwitch2;
var myIOData;
var myButton;
var myButton2,di2,valueDI2;
// change signalName to valid I/O signal name.
var signal1;
var signal2;
var value;
var value2;
var di1;
var valueDI1;

/*This procedure will be executed when the html page has finished loading.*/
window.addEventListener("load", async function () {
    fpComponentsEnableLog(); //Enables the console
    createMainContent(); //Creates all components
});

/* CONTENT MAIN  VIEW  */
function createMainContent() {
    Create_Switch1();
    Create_Switch2();
    //Create_Digital1();
    Create_Button1();
    Create_Button2();
}


function Create_Switch1() {
    try {
        /* CREATE SWITCH COMPONENTS */
        mySwitch = new FPComponents.Switch_A();
        mySwitch.desc = "Local_IO_0_DO1";
        mySwitch.attachToId("mySwitchDiv1");
        mySwitch.onchange = async function (active) {            
            console.log(active);
            signal1 = await RWS.IO.getSignal('Local_IO_0_DO1');
            value = await signal1.getValue();     
            console.log(value);
            Set_Pos1(value);
            // if (value == 1) {
            //     await RWS.IO.setSignalValue('Local_IO_0_DO1', 0);//The 'Changed' output is set to 0.
            // } else {
            //     await RWS.IO.setSignalValue('Local_IO_0_DO1', 1);//The 'Changed' output is set to 1.
            // }
        }
    } catch (e) { console.log("Something has gone wrong with the Up button!"); } //A popup is displayed if something has gone wrong
}

/* Function that updates the current position of the liftkit */
async function Set_Pos1(value) {    
    if (value == 1) {
        await RWS.IO.setSignalValue('Local_IO_0_DO1', 0);//The 'Changed' output is set to 0.
    } else {
        await RWS.IO.setSignalValue('Local_IO_0_DO1', 1);//The 'Changed' output is set to 1.
    }
}


function Create_Switch2() {
    try{
        mySwitch2 = new FPComponents.Switch_A();
        mySwitch2.desc = "Local_IO_0_DO2";
        mySwitch2.attachToId("mySwitchDiv2");
        mySwitch2.onchange = async function (active) {            
            console.log(active);
            signal2 = await RWS.IO.getSignal('Local_IO_0_DO2');
            value2 = await signal2.getValue();   
            console.log(value2);
            if (value2 == 1) {
                await RWS.IO.setSignalValue('Local_IO_0_DO2', 0);//The 'Changed' output is set to 0.
            } else {
                await RWS.IO.setSignalValue('Local_IO_0_DO2', 1);//The 'Changed' output is set to 1.
            }
        }
    } catch (e) { console.log("Something has gone wrong with the Up button!"); } //A popup is displayed if something has gone wrong
}

/* function Create_Digital1() {
    try{
        myDigital = new FPComponents.Digital_A();
        myDigital.attachToId("myLedDiv1");
        myDigital.desc = "Local_IO_0_DI3";
        myDigital.onclick = function () {
            myDigital.active = !(myDigital.active);
        }
    } catch (e) { console.log("Something has gone wrong with the Led button!"); } //A popup is displayed if something has gone wrong
} */

function Create_Button1(){
    try{
        myButton = new FPComponents.Button_A();
        myButton.text = "Local_IO_0_DI1";
        myButton.onclick = async function () {
            di1 = await RWS.IO.getSignal('Local_IO_0_DI1');
            valueDI1 = await di1.getValue();
            //valueDI1 = !valueDI1;
            console.log(valueDI1);
            if (valueDI1 == 0){
                await RWS.IO.setSignalValue('Local_IO_0_DI1', 1);//Invert value of DI1
                myButton.highlight = true;
            } else {
                await RWS.IO.setSignalValue('Local_IO_0_DI1', 0);//Invert value of DI1
                myButton.highlight = false;
            }
        };
        myButton.attachToId("myButtonDiv1");
    }catch (e) { console.log("Something has gone wrong with the Led button!"); } //A popup is displayed if something has gone wrong
}

function Create_Button2(){
    try{
        myButton2 = new FPComponents.Button_A();
        myButton2.text = "Local_IO_0_DI2";
        myButton2.onclick = async function () {
            di2 = await RWS.IO.getSignal('Local_IO_0_DI2');
            valueDI2 = await di2.getValue();
            //valueDI1 = !valueDI1;
            console.log(valueDI2);
            if (valueDI2 == 0){
                await RWS.IO.setSignalValue('Local_IO_0_DI2', 1);//Invert value of DI2
                myButton2.highlight = true;
            } else {
                await RWS.IO.setSignalValue('Local_IO_0_DI2', 0);//Invert value of DI2
                myButton2.highlight = false;
            }
        };
        myButton2.attachToId("myButtonDiv2");
    }catch (e) { console.log("Something has gone wrong with the Led button!"); } //A popup is displayed if something has gone wrong
}