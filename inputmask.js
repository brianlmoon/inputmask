// Copyright (c) 2015, Brian Moon
// All rights reserved.
// inputmask may be freely distributed under the BSD license.
// https://github.com/brianlmoon/inputmask

// Portions of this code based on keymaster.js
// (c) 2011 Thomas Fuchs
// keymaster.js may be freely distributed under the MIT license.
// https://github.com/madrobby/keymaster

;(function(global){
    var modifierKeyCodes = {
        shift: 16,
        alt: 18,
        ctrl: 17,
        command: 91
    };

    var modifierState = {
        shift: false,
        alt: false,
        ctrl: false,
        command: false
    };

    function modifierDown(ev) {
        var key = ev.keyCode;
        toggleModifier(key, true);
    }

    function modifierUp(ev) {
        var key = ev.keyCode;
        toggleModifier(key, false);
    }

    function toggleModifier(key, state) {
        if(key == 93 || key == 224) key = 91;
        for(var k in modifierKeyCodes){
            if(modifierKeyCodes[k] == key){
                modifierState[k] = state;
                break;
            }
        }
    }

    function resetModifiers() {
        for(var k in modifierState) {
            modifierState[k] = false;
        }
    }

    function inputMask(input) {

        this.input = input;

        this.handleKey = function(ev) {
            if(modifierState.ctrl || modifierState.command) {
                return;
            }
            var newChar = null;
            if(typeof ev.key !== "undefined"){
                if(ev.key.length === 1){
                    newChar = ev.key;
                }
            } else {
                if(!ev.charCode){
                    newChar = String.fromCharCode(ev.keyCode);
                } else {
                    newChar = String.fromCharCode(ev.charCode);
                }
            }
            if(newChar !== null) {
                if(newChar.length > 0){
                    var newValue = this.value.substring(0, this.selectionStart) + newChar + this.value.substring(this.selectionStart, this.value.length);
                    var regexStr = this.getAttribute("data-mask");
                    var r = new RegExp(regexStr);
                    if(r.exec(newValue) === null){
                        if (ev.preventDefault) {
                            ev.preventDefault();
                        } else {
                            ev.returnValue = false;
                        }
                    }
                }
            }
        };

        this.input.addEventListener(
            "keypress",
            this.handleKey
        );
    }

    document.addEventListener(
        "keydown",
        modifierDown
    );

    document.addEventListener(
        "keyup",
        modifierUp
    );

    window.addEventListener(
        "focus",
        resetModifiers
    );

    global.inputMask = inputMask;

})(window);
