"use strict";
cc._RFpush(module, 'c90042lKtZBWat3qH/yvbXi', 'jinbi');
// script\jinbi.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        voise: {
            "default": null,
            url: cc.AudioClip
        },
        mohu: {
            "default": null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {

        //动作以及动作回调
        var finish = cc.callFunc(this.callback1, this);
        var seq = cc.sequence(cc.moveBy(2, 0, -900).easing(cc.easeCubicActionIn()), cc.moveBy(0.5, 0, 20).easing(cc.easeCubicActionOut()), cc.moveBy(0.5, 0, -20).easing(cc.easeCubicActionIn()), finish);
        this.node.runAction(seq);
    },
    begain: function begain() {},
    callback1: function callback1() {
        cc.audioEngine.playEffect(this.voise, false);
        this.node.destroy();
    },
    update: function update() {}
    // this.kankan.string = end_x;

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();