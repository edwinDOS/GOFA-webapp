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
var myStringData;
var myBoolData;
var myBoolDO1;
var myBoolDO2;
// change signalName to valid I/O signal name.
var signalName = "Local_IO_0_DO3";

// wait for HTML to finish loading before initiating any components.
window.addEventListener("load", async function () {

    // uncomment line below to enable debug console
    fpComponentsEnableLog();

    // wrap everything in a generic try catch in order to catch any potential error not already caught.
    try {
        

        /* CREATE SWITCH COMPONENTS */
        mySwitch = new FPComponents.Switch_A();
        mySwitch.desc = "Local_IO_0_DO1";
        mySwitch.attachToId("mySwitchDiv");
        mySwitch.onchange = async function (active) {
            console.log(active);
            myBoolData = myBoolDO1;
            changeBoolData(myBoolData);
        }

        mySwitch2 = new FPComponents.Switch_A();
        mySwitch2.desc = "Local_IO_0_DO2";
        mySwitch2.attachToId("myDO2Div");
        mySwitch2.onchange = async function (active) {
            console.log(active);
            myBoolData = myBoolDO2;
            changeBoolData(myBoolData);
        }

        async function changeBoolData() {
            let value = await myBoolData.getValue();
            console.log("value is " + value);

            try {
                // we set the value to inverse of current value. If value is true, we set to false and vice versa.
                await myBoolData.setValue(!value);
            } catch (e) {
                FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
            }
        }

        /* CREATE DIGITAL INDICATOR */
        myDigital = new FPComponents.Digital_A();
        myDigital.desc = "Local_IO_0_DO3";
        myDigital.attachToId("myDigitalDiv");
        myDigital.onclick = async function () {
            var setValue = myDigital.active ? 0 : 1;
            myDigital.active = !myDigital.active

            try {
                await myIOData.setValue(setValue);
            } catch (e) {
                FPComponents.Popup_A.message(e.message, [e.httpStatus.code, e.controllerStatus.name, e.controllerStatus.description]);
            }

        };

        /* SUBSCRIBE TO IO SIGNAL */
        try {
            myIOData = await RWS.IO.getSignal(signalName);
            myIOData.addCallbackOnChanged(async (newValue) => {
                // first time this is called, newValue is undefined.
                if (newValue == undefined) {
                    newValue = await myIOData.getValue();
                    console.log("value" + newValue);
                }

                // since 1 and 0 work for true or false we can use the new value directly to set UI status.
                myDigital.active = newValue;
                console.log("value" + newValue);
            })
            await myIOData.subscribe(true);
            console.log("SUSCRIBE OK ");
        } catch (e) {
            FPComponents.Popup_A.message(e.message, [e.message, `Couldn't find I/O with name ${signalName}`]);
        }

        /* SUBSCRIBE TO STRING BOOL VARIABLE */
        myBoolDO1 = await RWS.Rapid.getData("T_ROB1", "Example", "isDO1");
        myBoolDO1.addCallbackOnChanged(async function (value) {

            var val = await myBoolDO1.getValue();
            mySwitch.active = val;

        });
        await myBoolDO1.subscribe(true);

        myBoolDO2 = await RWS.Rapid.getData("T_ROB1", "Example", "isDO2");
        myBoolDO2.addCallbackOnChanged(async function (value) {

            var val = await myBoolDO2.getValue();
            mySwitch2.active = val;

        });
        await myBoolDO2.subscribe(true);

    } catch (e) {
        var err = JSON.stringify(e);
        console.log(err);
        console.log(e);
        FPComponents.Popup_A.message("Something went wrong!", "Application might not work as intended");
    }

    this.initMenu();
    this.initView();
});

var initMenu = function () {
    var menu = new FPComponents.Menu_A();
    menu.model = {
        content: [
            {
                type: "gap"
            },
            {
                type: "label",
                label: "IO Example"
            },
            {
                type: "gap"
            }
        ]
    }

    menu.attachToId("menu-main");
}

var initView = function () {
    var mainView = document.getElementById("main-view");
    mainView.style.display = "flex";
}

// Here we should do things that should happen when app activate.
var appActivate = async function () {
    console.log("subscribe");
    // subscribe to data
    if (myBoolDO1) {
        await myBoolDO1.subscribe(true);
    }
    if (myBoolDO2) {
        await myBoolDO2.subscribe(true);
    }

    if (myStringData) {
        await myStringData.subscribe(true);
    }

    if (myRapidData) {
        await myRapidData.subscribe();
    }

    if (myIOData) {
        await myIOData.subscribe(true);
    }


    return true;
}

// Here we should do things that should happen right before app deactivates.
var appDeactivate = async function () {
    console.log("unsubscribe");
    // unsubscribe to data
    if (myBoolDO1) {
        await myBoolDO1.unsubscribe();
    }
    if (myBoolDO2) {
        await myBoolDO2.unsubscribe();
    }

    if (myStringData) {
        await myStringData.unsubscribe();
    }

    if (myRapidData) {
        await myRapidData.unsubscribe();
    }

    if (myIOData) {
        await myIOData.unsubscribe();
    }

    return true;
}