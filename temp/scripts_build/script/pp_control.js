"use strict";
cc._RFpush(module, '8781e+ATJROAb3cvQus+L65', 'pp_control');
// script\pp_control.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },

        // 泡泡自定义XX
        starPrefab: {
            'default': null,
            type: cc.Prefab
        },
        //费是~
        fish: {
            'default': null,
            type: cc.Sprite
        },
        //倒计时那个label
        Countdown: {
            'default': null,
            type: cc.Label
        },
        //结果界面
        result: {
            'default': null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.over_time = 10; //倒计时剩余时间
        this.now_time = 0; //结果倒计时  时间计时
        var self = this;
        //这些是搞泡泡的
        self.create_paopao();
        //定时器
        self.schedule(function () {
            // 这里的 this 指向 component
            self.create_paopao();
        }, 0.5);
        //这里是搞鱼的
        this.fish_move();
        var anim = this.fish.getComponent(cc.Animation);
        var animState = anim.play('fish_action');
        animState.repeatCount = Infinity;
    },
    //鱼走。。
    fish_move: function fish_move() {
        var begin_x, begin_y, end_y, time;
        //动画参数
        begin_x = this.node.width / 2 + this.fish.node.width / 2;
        begin_y = -(Math.ceil(Math.random() * 130) + 100);
        this.fish.node.x = begin_x;
        this.fish.node.y = begin_y;
        end_y = -Math.ceil(Math.random() * 50);
        time = Math.ceil(Math.random() * 3) + 5;
        //动画
        var finish = cc.callFunc(this.fish_move, this);
        var seq = cc.sequence(cc.moveBy(time, -begin_x * 2, end_y), finish);
        this.fish.node.runAction(seq);

        // var actionBy = cc.skewBy(2, -90, -90);
        // this.fish.node.runAction(actionBy);
        //立即隐藏
        // var hideAction = cc.hide();
        // this.fish.node.runAction(hideAction);
    },
    //泡泡集中营
    create_paopao: function create_paopao() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // urll = cc.url.raw("game1_01/game1_01_gold_02.png");
        // var ss = new cc.SpriteFrame(urll);
        // newStar.spriteFrame = ss;
        //获取两个随机数 初始点
        var child_x = Math.ceil(Math.random() * 300);
        if (Math.round(Math.random()) != 1) {
            child_x = -child_x;
        }
        newStar.setPosition(child_x, -150);
    },
    init: function init() {
        this.over_time = 15; //倒计时剩余时间
        this.now_time = 0;
        this.result.active = false;
    },
    close: function close() {
        this.result.active = false;
        // this.result.destroy();
    },
    update: function update(dt) {
        var timeLeft = Math.floor(this.over_time - this.now_time);
        if (timeLeft == 0) {
            this.result.active = true;
            return;
        }
        this.Countdown.string = Math.floor(timeLeft / 3600).toString() + ':' + Math.floor(timeLeft % 3600 / 60).toString() + ":" + Math.floor(timeLeft % 3600 % 60).toString();
        this.now_time += dt;
        if (this.now_time >= this.over_time) {
            this.now_time = 0;
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();