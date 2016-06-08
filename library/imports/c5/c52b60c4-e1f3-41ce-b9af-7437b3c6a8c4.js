
cc.Class({
    "extends": cc.Component,
    properties: {
        back: {
            "default": null,
            type: cc.Node
        },
        music: {
            "default": null,
            type: cc.Node
        },
        sound: {
            "default": null,
            type: cc.Node
        },
        help: {
            "default": null,
            type: cc.Node
        }
    },
    // use this for initialization
    onLoad: function onLoad() {
        this.number = true;
        // this.setanimation();
    },
    to_move: function to_move() {
        var seq = cc.moveBy(1, 0, -191).easing(cc.easeElasticOut());
        this.back.runAction(seq);
        var seq1 = cc.moveBy(1.2, 0, -373).easing(cc.easeElasticOut());
        this.music.runAction(seq1);
        var seq3 = cc.moveBy(1.3, 0, -560).easing(cc.easeElasticOut());
        this.sound.runAction(seq3);
        var seq5 = cc.moveBy(1.4, 0, -738).easing(cc.easeElasticOut());
        this.help.runAction(seq5);
    },
    go_close: function go_close() {
        if (!this.number) {
            return;
        }
        this.number = false;
        this.scheduleOnce(function () {
            this.back.y += 191;
        }, 0.5);
        // var seq1111 = cc.moveBy(0.9,0,191).easing(cc.easeCubicActionIn())
        // this.back.runAction(seq1111);
        var seq1 = cc.moveBy(0.5, 0, 373).easing(cc.easeCubicActionIn());
        this.music.runAction(seq1);
        var seq2 = cc.moveBy(0.4, 0, 560).easing(cc.easeCubicActionIn());
        this.sound.runAction(seq2);
        var seq3 = cc.moveBy(0.3, 0, 738).easing(cc.easeCubicActionIn());
        this.help.runAction(seq3);
        // 以秒为单位的时间间隔
        this.scheduleOnce(function () {
            this.number = true;
            this.node.active = false;
        }, 0.7);
    },
    setanimation: function setanimation() {
        // 以秒为单位的时间间隔
        this.scheduleOnce(function () {
            this.to_move();
        }, 0.3);
    }
});