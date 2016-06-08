var mi = 0;
var go = true;

var goback = cc.fadeIn(0.3);
var goback1 = cc.fadeIn(0.3);
var goout = cc.fadeOut(1);
var goout1 = cc.fadeOut(1);
var minsize = cc.scaleTo(0, 0.1, 0.1);
var minsize1 = cc.scaleTo(0, 0.1, 0.1);
var maxsize = cc.scaleTo(0.3, 1, 1);
var maxsize1 = cc.scaleTo(0.3, 1, 1);
cc.Class({

    "extends": cc.Component,

    properties: {
        water: {
            "default": null,
            type: cc.Sprite
        },
        water1: {
            "default": null,
            type: cc.Sprite
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        //初始化水珠大小
        this.water.node.runAction(minsize);
        this.water1.node.runAction(minsize1);
        //跳跃的两个动作
        var jumpUp = cc.moveBy(0.7, cc.p(1, 450)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(0.7, cc.p(1, -450)).easing(cc.easeCubicActionIn());
        //回调函数
        var finish = cc.callFunc(this.fish_move, this);
        var finish1 = cc.callFunc(this.delaytime, this);
        //旋转
        var rotate = cc.rotateBy(1.5, -180);
        var rotate1 = cc.rotateBy(0, 180);
        //延迟
        var delay = cc.delayTime(2);
        // this.node.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.sequence(jumpUp, jumpDown,finish),rotate),rotate1,delay,finish1)));
        this.node.runAction(cc.sequence(cc.spawn(cc.sequence(jumpUp, jumpDown, finish), rotate), rotate1, delay, finish1));
    },
    water_init: function water_init() {
        //初始化水珠大小
        this.water.node.runAction(minsize);
        this.water1.node.runAction(minsize1);
        this.water.node.x = -215;
        this.water.node.y = 32;
        this.water1.node.x = -262;
        this.water1.node.y = 46;
    },
    fish_move: function fish_move() {
        //水珠动画 溅射效果
        var watermove = cc.moveBy(0.3, 48, 39);
        var water1move = cc.moveBy(0.3, -17, 45);
        this.water.node.runAction(cc.sequence(cc.spawn(goback, maxsize, watermove), goout));
        this.water1.node.runAction(cc.sequence(cc.spawn(goback1, maxsize1, water1move), goout1));

        this.node.x = 360;
        this.node.y = -110;
        mi = 0;
        go = false;
    },
    delaytime: function delaytime() {
        this.water_init();
        this.node.x = 360;
        this.node.y = -110;
        go = true;
    },
    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (go) {
            this.node.x -= 7.55;
            mi += 7.55;
        }
    }
});