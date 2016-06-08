"use strict";
cc._RFpush(module, '924b1uy8FJGEZEvtPXCDCXQ', 'setting');
// script\setting.js

cc.Class({
    'extends': cc.Component,
    properties: {
        setbg: {
            'default': null,
            type: cc.Node
        }
    },
    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        function onTouchDown(event) {}
        function onTouchUp(event) {
            if (self.setbg.active) {
                self.setbg.active = false;
            } else {
                self.setbg.active = true;
            }
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }
});

cc._RFpop();