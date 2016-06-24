require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ButtonScale":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd4d03JI4jJL3r90tk7LVGnT', 'ButtonScale');
// script\ButtonScale.js

cc.Class({
    'extends': cc.Component,

    properties: {
        pressedScale: 1,
        transDuration: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.initScale = this.node.scale;
        self.button = self.getComponent(cc.Button);
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);
        function onTouchDown(event) {
            this.stopAllActions();
            this.runAction(self.scaleDownAction);
        }
        function onTouchUp(event) {
            this.stopAllActions();
            this.runAction(self.scaleUpAction);
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }
});

cc._RFpop();
},{}],"GameMain":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0dabeW7TO9FkqlGd4ROklud', 'GameMain');
// script\GameMain.js

var openvoise = true; //是否开启按钮音效
var _openmusic = true; //是否开启背景音乐
var SHindex = 3616.11; //开盘上证指数
window.SHindex = 3616;
var my_shoise = 0; //我竞猜的涨跌点
var num_of_player = 100; //参与竞猜人数

cc.Class({
    "extends": cc.Component,
    properties: {
        //定义一个音效类型
        voise: {
            "default": null,
            url: cc.AudioClip
        },
        //定义一个音乐类型
        music: {
            "default": null,
            url: cc.AudioClip
        },

        //两个那啥
        down: {
            "default": null,
            type: cc.Node
        },
        down2: {
            "default": null,
            type: cc.Node
        },
        //确定按钮
        queding: {
            "default": null,
            type: cc.Label
        },
        //结果
        result: {
            "default": null,
            type: cc.Label
        },
        //参与数量
        players: {
            "default": null,
            type: cc.Label
        },
        //参与玩家比例
        play_bfb: {
            "default": null,
            type: cc.Label
        },
        //涨跌占比背景
        num_bg: {
            "default": null,
            type: cc.Sprite
        },
        up_down: {
            "default": null,
            type: cc.Label
        },
        help: {
            "default": null,
            type: cc.Node
        },
        Bmusic: {
            "default": null,
            type: cc.Node
        },
        Cmusic: {
            "default": null,
            type: cc.Node
        },
        sound: {
            "default": null,
            type: cc.Node
        },
        csound: {
            "default": null,
            type: cc.Node
        }
    },
    // 初始化加载 相当于init函数
    onLoad: function onLoad() {},
    //开启并播放音效
    openvois: function openvois() {
        openvoise = true;
        this.scheduleOnce(function () {
            // 这里的 this 指向 component
            this.csound.active = false;
            this.sound.active = true;
        }, 0.15);
        this.playvoise();
    },
    //关闭音效
    closevois: function closevois() {
        openvoise = false;
        this.scheduleOnce(function () {
            // 这里的 this 指向 component
            this.sound.active = false;
            this.csound.active = true;
        }, 0.15);
    },
    //开启并播放背景音乐
    openmusic: function openmusic() {
        _openmusic = true;

        this.scheduleOnce(function () {
            // 这里的 this 指向 component
            this.Cmusic.active = false;
            this.Bmusic.active = true;
        }, 0.15);
        this.playmusic();
    },
    //关闭背景音乐
    closemusic: function closemusic() {
        _openmusic = false;
        this.scheduleOnce(function () {
            // 这里的 this 指向 component
            this.Bmusic.active = false;
            this.Cmusic.active = true;
        }, 0.15);
        cc.audioEngine.stopMusic(true);
    },
    //播放背景音乐
    playmusic: function playmusic() {

        if (_openmusic) {
            cc.audioEngine.playMusic(this.music, false);
        }
    },
    //播放音效
    playvoise: function playvoise() {
        if (openvoise) {
            cc.audioEngine.playEffect(this.voise, false);
        }
    },
    //生成随机数
    random: function random() {
        this.playvoise();
        //生成随机数
        var zhengfu;
        // 117,212,174
        //237,106,106
        zhengfu = Math.round(Math.random());
        my_shoise = Math.ceil(Math.random() * SHindex * 0.1);
        if (zhengfu == 1) {
            this.queding.string = "涨 " + my_shoise + " 点";
            this.queding.node.color = cc.color(237, 106, 106, 255);
        } else {
            this.queding.string = "跌 " + my_shoise + " 点";
            this.queding.node.color = cc.color(117, 212, 174, 255);
            my_shoise = -my_shoise;
        }
        var dd = this.down.getChildByName("turntable").getComponent("turntable");
        dd.to_turnable(my_shoise);
    },
    go_help: function go_help() {
        if (this.help.active) {
            this.help.active = false;
        } else {
            this.help.active = true;
        }
    },
    result_back: function result_back() {
        // 这里的 this 指向 component
        if (this.down.active) {
            this.down.active = false;
            this.down2.active = true;
        } else {
            this.down.active = true;
            this.down2.active = false;
        }
    },
    //确定
    sure: function sure() {
        this.playvoise();
        //等于0 就默认是没有选择涨跌点数  不给使用确认按钮
        var sure_num;
        sure_num = this.queding.string;
        if (my_shoise == 0) {
            return;
        }
        //确定了之后各种写~
        this.result.string = "预测上证指数: " + (SHindex + my_shoise) + " " + my_shoise + " (" + (my_shoise * 100 / SHindex).toFixed(2) + "%)";
        //猜涨还是猜跌
        var urll;
        if (my_shoise > 0) {
            this.up_down.string = '猜涨';
            //参与竞猜人数
            this.players.string = "已经有" + num_of_player + "人参与，猜涨占";
            //涨跌结果中的背景小图片
            urll = cc.url.raw("game1_01/game1_02_img_05.png");
            var texture = cc.textureCache.addImage(urll);
            this.num_bg.spriteFrame.setTexture(texture);
        } else {
            this.up_down.string = '猜跌';
            //参与竞猜人数
            this.players.string = "已经有" + num_of_player + "人参与，猜跌占";
        }
        //猜涨/跌 人数的百分之百
        this.play_bfb.string = "55%";
        // 以秒为单位的时间间隔
        this.scheduleOnce(function () {
            // 这里的 this 指向 component
            if (this.down.active) {
                this.down.active = false;
                this.down2.active = true;
                this.down2.getChildByName("water_bg").getComponent("pp_control").init();
                // this.down2.;
            } else {
                    this.down.active = true;
                    this.down2.active = false;
                }
        }, 0.5);
    },
    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {}
    ///////////////这里是一些常用的东东copy///////////// for  guobaolu
    /*  (1)计时器
             // 以秒为单位的时间间隔
             var interval = 5;
             // 重复次数
             var repeat = 3;
             // 开始延时
             var delay = 10;
             component.schedule(function() {
                 // 这里的 this 指向 component
                 this.doSomething();
             }, interval, repeat, delay);
             
        (2)设置声音、音效大小的
            cc.audioEngine.setEffectsVolume(0.5);
            cc.audioEngine.setMusicVolume(0.5);
            
            
        (3)监听器的级别
            监听器的优先级是基于此节点的绘制顺序或fixedProiority(修改监听器的优先级)
        
        (4)九妹控件 scale9SPrite
    */
});

cc._RFpop();
},{}],"MainLogin":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ba13bYtXFRBirNWh7jD3fMM', 'MainLogin');
// script\MainLogin.js


//
// Tips：
// 找到的下载图片网址过长，可以忽略。
// 本教程主要还是体现如何使用Loader的进度条。
//- 457   19
var now_time = 1;
var is_load = false;

cc.Class({
    "extends": cc.Component,

    properties: {
        progressBar: {
            "default": null,
            type: cc.Node
        },
        niu: {
            "default": null,
            type: cc.Sprite

        }
    },
    // use this for initialization
    onLoad: function onLoad() {
        cc.director.setDisplayStats(false); //隐藏掉左下角的fps 帧率啥啥的
        var self = this;
        cc.loader.loadRes("MainGame", this._completeCallback.bind(this));
        var anim = this.niu.getComponent(cc.Animation);
        var animState = anim.play('loadingniu');
        animState.repeatCount = Infinity;
    },

    _progressCallback: function _progressCallback(completedCount, totalCount, res) {

        this.progress = completedCount / totalCount;

        this.completedCount = completedCount;
        this.totalCount = totalCount;
    },

    _completeCallback: function _completeCallback(error, res) {
        this.resource = res;
        is_load = true;
        now_time += 10;
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (this.node.x >= 19) {
            cc.director.runScene(this.resource.scene);
            this.niu.node.x = -240;
            this.node.x = -457;
        }
        if (!is_load && this.node.x < -50) {} else {
            this.niu.node.x += now_time;
            this.node.x += now_time;
        }
    }
});

cc._RFpop();
},{}],"jinbi":[function(require,module,exports){
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
},{}],"paopao":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a0d68K8q3dImrW+7P4+F/g7', 'paopao');
// script\paopao.js

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
    },

    // use this for initialization
    onLoad: function onLoad() {
        //动作以及动作回调
        var finish = cc.callFunc(this.callback1, this);
        var seq = cc.sequence(cc.scaleTo(0, 0.1, 0.1), cc.spawn(cc.scaleTo(2, 0.8, 0.8), cc.moveBy(2, 0, 160)), finish);
        this.node.runAction(seq);
    },
    begain: function begain() {},
    callback1: function callback1() {
        this.node.destroy();
    },
    update: function update() {}
    // this.kankan.string = end_x;

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"paowuxian":[function(require,module,exports){
"use strict";
cc._RFpush(module, '09dba7lKGBLibdriliNbg3t', 'paowuxian');
// script\paowuxian.js

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

cc._RFpop();
},{}],"pp_control":[function(require,module,exports){
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
},{}],"result_script":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fc853Gfd7pO8aO275rK50Uv', 'result_script');
// script\result_script.js

cc.Class({
    "extends": cc.Component,

    properties: {
        light: {
            "default": null,
            type: cc.Node
        },
        //自定义金币
        coinPrefab: {
            "default": null,
            type: cc.Prefab
        },
        star: {
            "default": null,
            type: cc.Node
        },
        star1: {
            "default": null,
            type: cc.Node
        },
        star2: {
            "default": null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {

        var actionBy = cc.repeatForever(cc.rotateBy(5, 360));
        // var seq = cc.sequence(cc.rotateBy(0.5,-360));
        this.light.runAction(actionBy);
        console.log("执行进来了 ");
        //定时器
        this.schedule(function () {
            // 这里的 this 指向 component
            this.creat_coin();
        }, 0.1, 20);
        var star = cc.repeatForever(cc.repeatForever(
        // cc.sequence(
        cc.spawn(cc.sequence(cc.scaleBy(1, 0.01, 0.01), cc.scaleBy(1, 100, 100)), cc.rotateBy(2, 720))
        // )
        ));
        var star2 = cc.repeatForever(cc.repeatForever(
        // cc.sequence(
        cc.spawn(cc.rotateBy(4, 720))
        // )
        ));
        // var seq = cc.sequence(cc.rotateBy(0.5,-360));
        this.star1.runAction(star);
        this.star2.runAction(star2);
    },
    creat_coin: function creat_coin() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.coinPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        //获取两个随机数 初始点
        var child_x = Math.ceil(Math.random() * 150);
        if (Math.round(Math.random()) != 1) {
            child_x = -child_x;
        }
        newStar.setPosition(child_x, 900);
    }
});

cc._RFpop();
},{}],"set_blackbg":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c52b6DE4fNBzrmvdDezxqjE', 'set_blackbg');
// script\set_blackbg.js


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

cc._RFpop();
},{}],"setting":[function(require,module,exports){
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
},{}],"turntable":[function(require,module,exports){
"use strict";
cc._RFpush(module, '99d9bwbv6FOaJZCpZFE1obP', 'turntable');
// script\turntable.js

var lastpoint = cc.v2(0, 0); //上次点
var nowpoint = cc.v2(0, 0); //当前点
var point = cc.v2(0, 0); //原点
var touch1 = false;
var lastparent = cc.v2(0, 0);
var lastrotate = 0; //上次的角度
var go_time = 0; //滑动时间参数
var began_touch = cc.v2(0, 0);
var now_kedu = 0;
cc.Class({
    "extends": cc.Component,
    properties: {
        dapan: {
            "default": null,
            type: cc.Label
        },
        up_down: {
            "default": null,
            type: cc.Label
        },
        dianshu: {
            "default": null,
            type: cc.Label
        },
        now_number: {
            "default": null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // var actionBy = cc.skewBy(2,-90, -180);
        // this.node.runAction(actionBy);
        this.max_num = window.SHindex * 0.1; //涨幅单向最大值
        this.sin = this.max_num / 180; //每刻度代表值
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function onTouchBegan(touch, event) {
                if (!touch1) {
                    self.node.stopAllActions();
                    var touchLoc1 = touch.getLocation();
                    began_touch = touchLoc1;
                    var touchLoc = self.node.convertToNodeSpaceAR(touchLoc1);
                    lastpoint = touchLoc;
                    lastparent = touchLoc1;
                    touch1 = true;
                    lastrotate = self.node.rotation;
                }
                return true; // don't capture event
            },
            onTouchMoved: function onTouchMoved(touch, event) {
                if (touch1) {
                    //如果已经有触摸 则不去执行多点
                    self.node.stopAllActions();
                    self.now_number.active = true;
                    var touchLoc1 = touch.getLocation();
                    //转换坐标系
                    var touchLoc = self.node.convertToNodeSpaceAR(touchLoc1);
                    nowpoint = touchLoc;
                    //三角函数计算公式
                    var a = parseFloat(cc.pDistance(point, nowpoint)).toFixed(6);
                    var b = parseFloat(cc.pDistance(point, lastpoint)).toFixed(6);
                    var c = parseFloat(cc.pDistance(lastpoint, nowpoint)).toFixed(6);
                    var rotation = 180 * Math.acos((a * a + b * b - c * c) / (2 * a * b)) / Math.PI;
                    // var rotation = parseFloat((a*a + b*b - c*c)/(2*a*b));
                    // this.day_5.node.rotation = 180*Math.asin( a/c )/ Math.PI;

                    /*移动转圈笨方法判断  
                        1. 转换坐标系,屏幕基点坐标使用世界坐标,移动坐标使用自己坐标
                        2. 目前只做漏出来的部分拖动 下方不考虑
                    */
                    if (lastparent.x > touchLoc1.x && touchLoc1.y > 444) {
                        //在上边向左拖动
                        self.node.rotation -= rotation;
                    } else if (lastparent.x < touchLoc1.x && touchLoc1.y > 444) {
                        //在上边向右拖动
                        self.node.rotation += rotation;
                    }

                    //移动完一次之后初始化一下坐标
                    lastpoint = nowpoint;
                    lastparent = touchLoc1;
                }
            },
            onTouchEnded: function onTouchEnded(touch, event) {
                //抬起手指时 重新初始化所有变量
                if (go_time <= 0.2) {
                    var touchLoc = touch.getLocation();
                    if (began_touch.x != touchLoc.x) {
                        var ro_num = (touchLoc.x - began_touch.x) / 1000;
                        var seq = undefined;
                        if (ro_num >= 1 || ro_num <= -1) {
                            if (ro_num > 0) {
                                seq = cc.rotateBy(2, 1080).easing(cc.easeCubicActionOut());
                            } else {
                                seq = cc.rotateBy(2, -1080).easing(cc.easeCubicActionOut());
                            }
                        } else {
                            seq = cc.rotateBy(2 * Math.abs(ro_num), 1080 * ro_num).easing(cc.easeCubicActionOut());
                        }
                        self.node.runAction(seq);
                    }
                }
                lastpoint = cc.v2(0, 0);
                nowpoint = cc.v2(0, 0);
                lastparent = cc.v2(0, 0);
                // self.now_number.active = false;
                touch1 = false;
            }
        }, self.node);
    },
    //根据参数 让盘子转圈
    to_turnable: function to_turnable(num) {
        this.node.stopAllActions();
        // this.max_num = window.SHindex * 0.1;//涨幅单向最大值
        // this.sin = this.max_num / 180;//每刻度代表值
        var rote = num / this.sin; //当前角度
        var seq = cc.rotateTo(0.5, rote).easing(cc.easeCubicActionOut());
        this.node.runAction(seq);
    },
    // called every frame
    update: function update(dt) {
        var self = this;
        //计算加速度公式
        if (touch1) {
            go_time += dt;
        } else {
            go_time = 0;
        }
        //刷新圈数
        if (this.node.rotation > 360) {
            this.node.rotation -= 360;
        } else if (this.node.rotation < -360) {
            this.node.rotation += 360;
        }
        //转圈逻辑
        now_kedu = self.node.rotation;
        if (self.node.rotation > 180) {
            now_kedu = -(360 - self.node.rotation);
        } else if (self.node.rotation < -180) {
            now_kedu = 360 + self.node.rotation;
        }
        now_kedu = Math.floor(self.sin * now_kedu);
        self.dapan.string = window.SHindex + now_kedu;
        var baifenbi = now_kedu / window.SHindex * 100;
        if (baifenbi > 10) {
            baifenbi = 10;
        } else if (baifenbi < -10) {
            baifenbi = -10;
        }
        //填写刻度
        if (now_kedu > 0) {
            self.dianshu.string = "涨 " + now_kedu + " 点";
            self.up_down.string = "+" + now_kedu + " (+" + Math.floor(baifenbi) + "%)";
            self.dianshu.node.color = cc.color(237, 106, 106, 255);
            self.up_down.node.color = cc.color(237, 106, 106, 255);
            self.dapan.node.color = cc.color(237, 106, 106, 255);
        } else {
            self.dianshu.string = "跌 " + Math.abs(now_kedu) + " 点";
            self.up_down.string = now_kedu + " (" + Math.floor(baifenbi) + "%)";
            self.dianshu.node.color = cc.color(117, 212, 174, 255);
            self.up_down.node.color = cc.color(117, 212, 174, 255);
            self.dapan.node.color = cc.color(117, 212, 174, 255);
        }
    }
});

cc._RFpop();
},{}],"voise":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5a5efeS75FEv4CAJlSS7OHA', 'voise');
// script\voise.js

cc.Class({
    'extends': cc.Component,
    properties: {
        setvoise: {
            'default': null,
            type: cc.Node
        },
        setvoise1: {
            'default': null,
            type: cc.Node
        }
    },
    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        function onTouchDown(event) {}
        function onTouchUp(event) {
            if (self.setvoise.active) {
                self.setvoise.active = false;
                self.setvoise1.active = true;
            } else {
                self.setvoise.active = true;
                self.setvoise1.active = false;
            }
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }
});

cc._RFpop();
},{}],"wait":[function(require,module,exports){
"use strict";
cc._RFpush(module, '2be20Q7S25IlpjsjB5PrnOR', 'wait');
// script\wait.js

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
    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}]},{},["paowuxian","GameMain","wait","voise","pp_control","setting","turntable","paopao","MainLogin","set_blackbg","jinbi","ButtonScale","result_script"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2RlbGwvQXBwRGF0YS9Mb2NhbC9Db2Nvc0NyZWF0b3IvYXBwLTEuMS4xL3Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL3NjcmlwdC9CdXR0b25TY2FsZS5qcyIsImFzc2V0cy9zY3JpcHQvR2FtZU1haW4uanMiLCJhc3NldHMvc2NyaXB0L01haW5Mb2dpbi5qcyIsImFzc2V0cy9zY3JpcHQvamluYmkuanMiLCJhc3NldHMvc2NyaXB0L3Bhb3Bhby5qcyIsImFzc2V0cy9zY3JpcHQvcGFvd3V4aWFuLmpzIiwiYXNzZXRzL3NjcmlwdC9wcF9jb250cm9sLmpzIiwiYXNzZXRzL3NjcmlwdC9yZXN1bHRfc2NyaXB0LmpzIiwiYXNzZXRzL3NjcmlwdC9zZXRfYmxhY2tiZy5qcyIsImFzc2V0cy9zY3JpcHQvc2V0dGluZy5qcyIsImFzc2V0cy9zY3JpcHQvdHVybnRhYmxlLmpzIiwiYXNzZXRzL3NjcmlwdC92b2lzZS5qcyIsImFzc2V0cy9zY3JpcHQvd2FpdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDclBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZDRkMDNKSTRqSkwzcjkwdGs3TFZHblQnLCAnQnV0dG9uU2NhbGUnKTtcbi8vIHNjcmlwdFxcQnV0dG9uU2NhbGUuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwcmVzc2VkU2NhbGU6IDEsXG4gICAgICAgIHRyYW5zRHVyYXRpb246IDBcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5pbml0U2NhbGUgPSB0aGlzLm5vZGUuc2NhbGU7XG4gICAgICAgIHNlbGYuYnV0dG9uID0gc2VsZi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcbiAgICAgICAgc2VsZi5zY2FsZURvd25BY3Rpb24gPSBjYy5zY2FsZVRvKHNlbGYudHJhbnNEdXJhdGlvbiwgc2VsZi5wcmVzc2VkU2NhbGUpO1xuICAgICAgICBzZWxmLnNjYWxlVXBBY3Rpb24gPSBjYy5zY2FsZVRvKHNlbGYudHJhbnNEdXJhdGlvbiwgc2VsZi5pbml0U2NhbGUpO1xuICAgICAgICBmdW5jdGlvbiBvblRvdWNoRG93bihldmVudCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5ydW5BY3Rpb24oc2VsZi5zY2FsZURvd25BY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uVG91Y2hVcChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5ydW5BY3Rpb24oc2VsZi5zY2FsZVVwQWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoc3RhcnQnLCBvblRvdWNoRG93biwgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGVuZCcsIG9uVG91Y2hVcCwgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGNhbmNlbCcsIG9uVG91Y2hVcCwgdGhpcy5ub2RlKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzBkYWJlVzdUTzlGa3FsR2Q0Uk9rbHVkJywgJ0dhbWVNYWluJyk7XG4vLyBzY3JpcHRcXEdhbWVNYWluLmpzXG5cbnZhciBvcGVudm9pc2UgPSB0cnVlOyAvL+aYr+WQpuW8gOWQr+aMiemSrumfs+aViFxudmFyIF9vcGVubXVzaWMgPSB0cnVlOyAvL+aYr+WQpuW8gOWQr+iDjOaZr+mfs+S5kFxudmFyIFNIaW5kZXggPSAzNjE2LjExOyAvL+W8gOebmOS4iuivgeaMh+aVsFxud2luZG93LlNIaW5kZXggPSAzNjE2O1xudmFyIG15X3Nob2lzZSA9IDA7IC8v5oiR56ue54yc55qE5rao6LeM54K5XG52YXIgbnVtX29mX3BsYXllciA9IDEwMDsgLy/lj4LkuI7nq57njJzkurrmlbBcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvL+WumuS5ieS4gOS4qumfs+aViOexu+Wei1xuICAgICAgICB2b2lzZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICAvL+WumuS5ieS4gOS4qumfs+S5kOexu+Wei1xuICAgICAgICBtdXNpYzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuXG4gICAgICAgIC8v5Lik5Liq6YKj5ZWlXG4gICAgICAgIGRvd246IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBkb3duMjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIC8v56Gu5a6a5oyJ6ZKuXG4gICAgICAgIHF1ZWRpbmc6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgLy/nu5PmnpxcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIC8v5Y+C5LiO5pWw6YePXG4gICAgICAgIHBsYXllcnM6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgLy/lj4LkuI7njqnlrrbmr5TkvotcbiAgICAgICAgcGxheV9iZmI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgLy/mtqjot4zljaDmr5Tog4zmma9cbiAgICAgICAgbnVtX2JnOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuICAgICAgICB1cF9kb3duOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGhlbHA6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBCbXVzaWM6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBDbXVzaWM6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBzb3VuZDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGNzb3VuZDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIOWIneWni+WMluWKoOi9vSDnm7jlvZPkuo5pbml05Ye95pWwXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcbiAgICAvL+W8gOWQr+W5tuaSreaUvumfs+aViFxuICAgIG9wZW52b2lzOiBmdW5jdGlvbiBvcGVudm9pcygpIHtcbiAgICAgICAgb3BlbnZvaXNlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8g6L+Z6YeM55qEIHRoaXMg5oyH5ZCRIGNvbXBvbmVudFxuICAgICAgICAgICAgdGhpcy5jc291bmQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNvdW5kLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0sIDAuMTUpO1xuICAgICAgICB0aGlzLnBsYXl2b2lzZSgpO1xuICAgIH0sXG4gICAgLy/lhbPpl63pn7PmlYhcbiAgICBjbG9zZXZvaXM6IGZ1bmN0aW9uIGNsb3Nldm9pcygpIHtcbiAgICAgICAgb3BlbnZvaXNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIOi/memHjOeahCB0aGlzIOaMh+WQkSBjb21wb25lbnRcbiAgICAgICAgICAgIHRoaXMuc291bmQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNzb3VuZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9LCAwLjE1KTtcbiAgICB9LFxuICAgIC8v5byA5ZCv5bm25pKt5pS+6IOM5pmv6Z+z5LmQXG4gICAgb3Blbm11c2ljOiBmdW5jdGlvbiBvcGVubXVzaWMoKSB7XG4gICAgICAgIF9vcGVubXVzaWMgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIOi/memHjOeahCB0aGlzIOaMh+WQkSBjb21wb25lbnRcbiAgICAgICAgICAgIHRoaXMuQ211c2ljLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5CbXVzaWMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSwgMC4xNSk7XG4gICAgICAgIHRoaXMucGxheW11c2ljKCk7XG4gICAgfSxcbiAgICAvL+WFs+mXreiDjOaZr+mfs+S5kFxuICAgIGNsb3NlbXVzaWM6IGZ1bmN0aW9uIGNsb3NlbXVzaWMoKSB7XG4gICAgICAgIF9vcGVubXVzaWMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8g6L+Z6YeM55qEIHRoaXMg5oyH5ZCRIGNvbXBvbmVudFxuICAgICAgICAgICAgdGhpcy5CbXVzaWMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLkNtdXNpYy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9LCAwLjE1KTtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKHRydWUpO1xuICAgIH0sXG4gICAgLy/mkq3mlL7og4zmma/pn7PkuZBcbiAgICBwbGF5bXVzaWM6IGZ1bmN0aW9uIHBsYXltdXNpYygpIHtcblxuICAgICAgICBpZiAoX29wZW5tdXNpYykge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKHRoaXMubXVzaWMsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy/mkq3mlL7pn7PmlYhcbiAgICBwbGF5dm9pc2U6IGZ1bmN0aW9uIHBsYXl2b2lzZSgpIHtcbiAgICAgICAgaWYgKG9wZW52b2lzZSkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLnZvaXNlLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8v55Sf5oiQ6ZqP5py65pWwXG4gICAgcmFuZG9tOiBmdW5jdGlvbiByYW5kb20oKSB7XG4gICAgICAgIHRoaXMucGxheXZvaXNlKCk7XG4gICAgICAgIC8v55Sf5oiQ6ZqP5py65pWwXG4gICAgICAgIHZhciB6aGVuZ2Z1O1xuICAgICAgICAvLyAxMTcsMjEyLDE3NFxuICAgICAgICAvLzIzNywxMDYsMTA2XG4gICAgICAgIHpoZW5nZnUgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpO1xuICAgICAgICBteV9zaG9pc2UgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIFNIaW5kZXggKiAwLjEpO1xuICAgICAgICBpZiAoemhlbmdmdSA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZWRpbmcuc3RyaW5nID0gXCLmtqggXCIgKyBteV9zaG9pc2UgKyBcIiDngrlcIjtcbiAgICAgICAgICAgIHRoaXMucXVlZGluZy5ub2RlLmNvbG9yID0gY2MuY29sb3IoMjM3LCAxMDYsIDEwNiwgMjU1KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucXVlZGluZy5zdHJpbmcgPSBcIui3jCBcIiArIG15X3Nob2lzZSArIFwiIOeCuVwiO1xuICAgICAgICAgICAgdGhpcy5xdWVkaW5nLm5vZGUuY29sb3IgPSBjYy5jb2xvcigxMTcsIDIxMiwgMTc0LCAyNTUpO1xuICAgICAgICAgICAgbXlfc2hvaXNlID0gLW15X3Nob2lzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGQgPSB0aGlzLmRvd24uZ2V0Q2hpbGRCeU5hbWUoXCJ0dXJudGFibGVcIikuZ2V0Q29tcG9uZW50KFwidHVybnRhYmxlXCIpO1xuICAgICAgICBkZC50b190dXJuYWJsZShteV9zaG9pc2UpO1xuICAgIH0sXG4gICAgZ29faGVscDogZnVuY3Rpb24gZ29faGVscCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVscC5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuaGVscC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVscC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZXN1bHRfYmFjazogZnVuY3Rpb24gcmVzdWx0X2JhY2soKSB7XG4gICAgICAgIC8vIOi/memHjOeahCB0aGlzIOaMh+WQkSBjb21wb25lbnRcbiAgICAgICAgaWYgKHRoaXMuZG93bi5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuZG93bi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZG93bjIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZG93bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kb3duMi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy/noa7lrppcbiAgICBzdXJlOiBmdW5jdGlvbiBzdXJlKCkge1xuICAgICAgICB0aGlzLnBsYXl2b2lzZSgpO1xuICAgICAgICAvL+etieS6jjAg5bCx6buY6K6k5piv5rKh5pyJ6YCJ5oup5rao6LeM54K55pWwICDkuI3nu5nkvb/nlKjnoa7orqTmjInpkq5cbiAgICAgICAgdmFyIHN1cmVfbnVtO1xuICAgICAgICBzdXJlX251bSA9IHRoaXMucXVlZGluZy5zdHJpbmc7XG4gICAgICAgIGlmIChteV9zaG9pc2UgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8v56Gu5a6a5LqG5LmL5ZCO5ZCE56eN5YaZflxuICAgICAgICB0aGlzLnJlc3VsdC5zdHJpbmcgPSBcIumihOa1i+S4iuivgeaMh+aVsDogXCIgKyAoU0hpbmRleCArIG15X3Nob2lzZSkgKyBcIiBcIiArIG15X3Nob2lzZSArIFwiIChcIiArIChteV9zaG9pc2UgKiAxMDAgLyBTSGluZGV4KS50b0ZpeGVkKDIpICsgXCIlKVwiO1xuICAgICAgICAvL+eMnOa2qOi/mOaYr+eMnOi3jFxuICAgICAgICB2YXIgdXJsbDtcbiAgICAgICAgaWYgKG15X3Nob2lzZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudXBfZG93bi5zdHJpbmcgPSAn54yc5raoJztcbiAgICAgICAgICAgIC8v5Y+C5LiO56ue54yc5Lq65pWwXG4gICAgICAgICAgICB0aGlzLnBsYXllcnMuc3RyaW5nID0gXCLlt7Lnu4/mnIlcIiArIG51bV9vZl9wbGF5ZXIgKyBcIuS6uuWPguS4ju+8jOeMnOa2qOWNoFwiO1xuICAgICAgICAgICAgLy/mtqjot4znu5PmnpzkuK3nmoTog4zmma/lsI/lm77niYdcbiAgICAgICAgICAgIHVybGwgPSBjYy51cmwucmF3KFwiZ2FtZTFfMDEvZ2FtZTFfMDJfaW1nXzA1LnBuZ1wiKTtcbiAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gY2MudGV4dHVyZUNhY2hlLmFkZEltYWdlKHVybGwpO1xuICAgICAgICAgICAgdGhpcy5udW1fYmcuc3ByaXRlRnJhbWUuc2V0VGV4dHVyZSh0ZXh0dXJlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBfZG93bi5zdHJpbmcgPSAn54yc6LeMJztcbiAgICAgICAgICAgIC8v5Y+C5LiO56ue54yc5Lq65pWwXG4gICAgICAgICAgICB0aGlzLnBsYXllcnMuc3RyaW5nID0gXCLlt7Lnu4/mnIlcIiArIG51bV9vZl9wbGF5ZXIgKyBcIuS6uuWPguS4ju+8jOeMnOi3jOWNoFwiO1xuICAgICAgICB9XG4gICAgICAgIC8v54yc5raoL+i3jCDkurrmlbDnmoTnmb7liIbkuYvnmb5cbiAgICAgICAgdGhpcy5wbGF5X2JmYi5zdHJpbmcgPSBcIjU1JVwiO1xuICAgICAgICAvLyDku6Xnp5LkuLrljZXkvY3nmoTml7bpl7Tpl7TpmpRcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8g6L+Z6YeM55qEIHRoaXMg5oyH5ZCRIGNvbXBvbmVudFxuICAgICAgICAgICAgaWYgKHRoaXMuZG93bi5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvd24uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3duMi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZG93bjIuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXRlcl9iZ1wiKS5nZXRDb21wb25lbnQoXCJwcF9jb250cm9sXCIpLmluaXQoKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmRvd24yLjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvd24yLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMC41KTtcbiAgICB9LFxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHt9XG4gICAgLy8vLy8vLy8vLy8vLy8v6L+Z6YeM5piv5LiA5Lqb5bi455So55qE5Lic5LicY29weS8vLy8vLy8vLy8vLy8gZm9yICBndW9iYW9sdVxuICAgIC8qICAoMSnorqHml7blmahcclxuICAgICAgICAgICAgIC8vIOS7peenkuS4uuWNleS9jeeahOaXtumXtOmXtOmalFxyXG4gICAgICAgICAgICAgdmFyIGludGVydmFsID0gNTtcclxuICAgICAgICAgICAgIC8vIOmHjeWkjeasoeaVsFxyXG4gICAgICAgICAgICAgdmFyIHJlcGVhdCA9IDM7XHJcbiAgICAgICAgICAgICAvLyDlvIDlp4vlu7bml7ZcclxuICAgICAgICAgICAgIHZhciBkZWxheSA9IDEwO1xyXG4gICAgICAgICAgICAgY29tcG9uZW50LnNjaGVkdWxlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgIC8vIOi/memHjOeahCB0aGlzIOaMh+WQkSBjb21wb25lbnRcclxuICAgICAgICAgICAgICAgICB0aGlzLmRvU29tZXRoaW5nKCk7XHJcbiAgICAgICAgICAgICB9LCBpbnRlcnZhbCwgcmVwZWF0LCBkZWxheSk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAoMinorr7nva7lo7Dpn7PjgIHpn7PmlYjlpKflsI/nmoRcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0RWZmZWN0c1ZvbHVtZSgwLjUpO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRNdXNpY1ZvbHVtZSgwLjUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgKDMp55uR5ZCs5Zmo55qE57qn5YirXHJcbiAgICAgICAgICAgIOebkeWQrOWZqOeahOS8mOWFiOe6p+aYr+WfuuS6juatpOiKgueCueeahOe7mOWItumhuuW6j+aIlmZpeGVkUHJvaW9yaXR5KOS/ruaUueebkeWQrOWZqOeahOS8mOWFiOe6pylcclxuICAgICAgICBcclxuICAgICAgICAoNCnkuZ3lprnmjqfku7Ygc2NhbGU5U1ByaXRlXHJcbiAgICAqL1xufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdiYTEzYll0WEZSQmlyTldoN2pEM2ZNTScsICdNYWluTG9naW4nKTtcbi8vIHNjcmlwdFxcTWFpbkxvZ2luLmpzXG5cblxuLy9cbi8vIFRpcHPvvJpcbi8vIOaJvuWIsOeahOS4i+i9veWbvueJh+e9keWdgOi/h+mVv++8jOWPr+S7peW/veeVpeOAglxuLy8g5pys5pWZ56iL5Li76KaB6L+Y5piv5L2T546w5aaC5L2V5L2/55SoTG9hZGVy55qE6L+b5bqm5p2h44CCXG4vLy0gNDU3ICAgMTlcbnZhciBub3dfdGltZSA9IDE7XG52YXIgaXNfbG9hZCA9IGZhbHNlO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcHJvZ3Jlc3NCYXI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBuaXU6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXG5cbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLnNldERpc3BsYXlTdGF0cyhmYWxzZSk7IC8v6ZqQ6JeP5o6J5bem5LiL6KeS55qEZnBzIOW4p+eOh+WVpeWVpeeahFxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwiTWFpbkdhbWVcIiwgdGhpcy5fY29tcGxldGVDYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgICAgICAgdmFyIGFuaW0gPSB0aGlzLm5pdS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgdmFyIGFuaW1TdGF0ZSA9IGFuaW0ucGxheSgnbG9hZGluZ25pdScpO1xuICAgICAgICBhbmltU3RhdGUucmVwZWF0Q291bnQgPSBJbmZpbml0eTtcbiAgICB9LFxuXG4gICAgX3Byb2dyZXNzQ2FsbGJhY2s6IGZ1bmN0aW9uIF9wcm9ncmVzc0NhbGxiYWNrKGNvbXBsZXRlZENvdW50LCB0b3RhbENvdW50LCByZXMpIHtcblxuICAgICAgICB0aGlzLnByb2dyZXNzID0gY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50O1xuXG4gICAgICAgIHRoaXMuY29tcGxldGVkQ291bnQgPSBjb21wbGV0ZWRDb3VudDtcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gdG90YWxDb3VudDtcbiAgICB9LFxuXG4gICAgX2NvbXBsZXRlQ2FsbGJhY2s6IGZ1bmN0aW9uIF9jb21wbGV0ZUNhbGxiYWNrKGVycm9yLCByZXMpIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZSA9IHJlcztcbiAgICAgICAgaXNfbG9hZCA9IHRydWU7XG4gICAgICAgIG5vd190aW1lICs9IDEwO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGUueCA+PSAxOSkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IucnVuU2NlbmUodGhpcy5yZXNvdXJjZS5zY2VuZSk7XG4gICAgICAgICAgICB0aGlzLm5pdS5ub2RlLnggPSAtMjQwO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnggPSAtNDU3O1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNfbG9hZCAmJiB0aGlzLm5vZGUueCA8IC01MCkge30gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5pdS5ub2RlLnggKz0gbm93X3RpbWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCArPSBub3dfdGltZTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYzkwMDQybEt0WkJXYXQzcUgveXZiWGknLCAnamluYmknKTtcbi8vIHNjcmlwdFxcamluYmkuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICB2b2lzZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICBtb2h1OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcblxuICAgICAgICAvL+WKqOS9nOS7peWPiuWKqOS9nOWbnuiwg1xuICAgICAgICB2YXIgZmluaXNoID0gY2MuY2FsbEZ1bmModGhpcy5jYWxsYmFjazEsIHRoaXMpO1xuICAgICAgICB2YXIgc2VxID0gY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDIsIDAsIC05MDApLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKSwgY2MubW92ZUJ5KDAuNSwgMCwgMjApLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSksIGNjLm1vdmVCeSgwLjUsIDAsIC0yMCkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpLCBmaW5pc2gpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHNlcSk7XG4gICAgfSxcbiAgICBiZWdhaW46IGZ1bmN0aW9uIGJlZ2FpbigpIHt9LFxuICAgIGNhbGxiYWNrMTogZnVuY3Rpb24gY2FsbGJhY2sxKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMudm9pc2UsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge31cbiAgICAvLyB0aGlzLmthbmthbi5zdHJpbmcgPSBlbmRfeDtcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2EwZDY4SzhxM2RJbXJXKzdQNCtGL2c3JywgJ3Bhb3BhbycpO1xuLy8gc2NyaXB0XFxwYW9wYW8uanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgLy/liqjkvZzku6Xlj4rliqjkvZzlm57osINcbiAgICAgICAgdmFyIGZpbmlzaCA9IGNjLmNhbGxGdW5jKHRoaXMuY2FsbGJhY2sxLCB0aGlzKTtcbiAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMCwgMC4xLCAwLjEpLCBjYy5zcGF3bihjYy5zY2FsZVRvKDIsIDAuOCwgMC44KSwgY2MubW92ZUJ5KDIsIDAsIDE2MCkpLCBmaW5pc2gpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHNlcSk7XG4gICAgfSxcbiAgICBiZWdhaW46IGZ1bmN0aW9uIGJlZ2FpbigpIHt9LFxuICAgIGNhbGxiYWNrMTogZnVuY3Rpb24gY2FsbGJhY2sxKCkge1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fVxuICAgIC8vIHRoaXMua2Fua2FuLnN0cmluZyA9IGVuZF94O1xuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMDlkYmE3bEtHQkxpYmRyaWxpTmJnM3QnLCAncGFvd3V4aWFuJyk7XG4vLyBzY3JpcHRcXHBhb3d1eGlhbi5qc1xuXG52YXIgbWkgPSAwO1xudmFyIGdvID0gdHJ1ZTtcblxudmFyIGdvYmFjayA9IGNjLmZhZGVJbigwLjMpO1xudmFyIGdvYmFjazEgPSBjYy5mYWRlSW4oMC4zKTtcbnZhciBnb291dCA9IGNjLmZhZGVPdXQoMSk7XG52YXIgZ29vdXQxID0gY2MuZmFkZU91dCgxKTtcbnZhciBtaW5zaXplID0gY2Muc2NhbGVUbygwLCAwLjEsIDAuMSk7XG52YXIgbWluc2l6ZTEgPSBjYy5zY2FsZVRvKDAsIDAuMSwgMC4xKTtcbnZhciBtYXhzaXplID0gY2Muc2NhbGVUbygwLjMsIDEsIDEpO1xudmFyIG1heHNpemUxID0gY2Muc2NhbGVUbygwLjMsIDEsIDEpO1xuY2MuQ2xhc3Moe1xuXG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgd2F0ZXI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXG4gICAgICAgIH0sXG4gICAgICAgIHdhdGVyMToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgLy/liJ3lp4vljJbmsLTnj6DlpKflsI9cbiAgICAgICAgdGhpcy53YXRlci5ub2RlLnJ1bkFjdGlvbihtaW5zaXplKTtcbiAgICAgICAgdGhpcy53YXRlcjEubm9kZS5ydW5BY3Rpb24obWluc2l6ZTEpO1xuICAgICAgICAvL+i3s+i3g+eahOS4pOS4quWKqOS9nFxuICAgICAgICB2YXIganVtcFVwID0gY2MubW92ZUJ5KDAuNywgY2MucCgxLCA0NTApKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpO1xuICAgICAgICB2YXIganVtcERvd24gPSBjYy5tb3ZlQnkoMC43LCBjYy5wKDEsIC00NTApKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uSW4oKSk7XG4gICAgICAgIC8v5Zue6LCD5Ye95pWwXG4gICAgICAgIHZhciBmaW5pc2ggPSBjYy5jYWxsRnVuYyh0aGlzLmZpc2hfbW92ZSwgdGhpcyk7XG4gICAgICAgIHZhciBmaW5pc2gxID0gY2MuY2FsbEZ1bmModGhpcy5kZWxheXRpbWUsIHRoaXMpO1xuICAgICAgICAvL+aXi+i9rFxuICAgICAgICB2YXIgcm90YXRlID0gY2Mucm90YXRlQnkoMS41LCAtMTgwKTtcbiAgICAgICAgdmFyIHJvdGF0ZTEgPSBjYy5yb3RhdGVCeSgwLCAxODApO1xuICAgICAgICAvL+W7tui/n1xuICAgICAgICB2YXIgZGVsYXkgPSBjYy5kZWxheVRpbWUoMik7XG4gICAgICAgIC8vIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5zcGF3bihjYy5zZXF1ZW5jZShqdW1wVXAsIGp1bXBEb3duLGZpbmlzaCkscm90YXRlKSxyb3RhdGUxLGRlbGF5LGZpbmlzaDEpKSk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc3Bhd24oY2Muc2VxdWVuY2UoanVtcFVwLCBqdW1wRG93biwgZmluaXNoKSwgcm90YXRlKSwgcm90YXRlMSwgZGVsYXksIGZpbmlzaDEpKTtcbiAgICB9LFxuICAgIHdhdGVyX2luaXQ6IGZ1bmN0aW9uIHdhdGVyX2luaXQoKSB7XG4gICAgICAgIC8v5Yid5aeL5YyW5rC054+g5aSn5bCPXG4gICAgICAgIHRoaXMud2F0ZXIubm9kZS5ydW5BY3Rpb24obWluc2l6ZSk7XG4gICAgICAgIHRoaXMud2F0ZXIxLm5vZGUucnVuQWN0aW9uKG1pbnNpemUxKTtcbiAgICAgICAgdGhpcy53YXRlci5ub2RlLnggPSAtMjE1O1xuICAgICAgICB0aGlzLndhdGVyLm5vZGUueSA9IDMyO1xuICAgICAgICB0aGlzLndhdGVyMS5ub2RlLnggPSAtMjYyO1xuICAgICAgICB0aGlzLndhdGVyMS5ub2RlLnkgPSA0NjtcbiAgICB9LFxuICAgIGZpc2hfbW92ZTogZnVuY3Rpb24gZmlzaF9tb3ZlKCkge1xuICAgICAgICAvL+awtOePoOWKqOeUuyDmuoXlsITmlYjmnpxcbiAgICAgICAgdmFyIHdhdGVybW92ZSA9IGNjLm1vdmVCeSgwLjMsIDQ4LCAzOSk7XG4gICAgICAgIHZhciB3YXRlcjFtb3ZlID0gY2MubW92ZUJ5KDAuMywgLTE3LCA0NSk7XG4gICAgICAgIHRoaXMud2F0ZXIubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc3Bhd24oZ29iYWNrLCBtYXhzaXplLCB3YXRlcm1vdmUpLCBnb291dCkpO1xuICAgICAgICB0aGlzLndhdGVyMS5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zcGF3bihnb2JhY2sxLCBtYXhzaXplMSwgd2F0ZXIxbW92ZSksIGdvb3V0MSkpO1xuXG4gICAgICAgIHRoaXMubm9kZS54ID0gMzYwO1xuICAgICAgICB0aGlzLm5vZGUueSA9IC0xMTA7XG4gICAgICAgIG1pID0gMDtcbiAgICAgICAgZ28gPSBmYWxzZTtcbiAgICB9LFxuICAgIGRlbGF5dGltZTogZnVuY3Rpb24gZGVsYXl0aW1lKCkge1xuICAgICAgICB0aGlzLndhdGVyX2luaXQoKTtcbiAgICAgICAgdGhpcy5ub2RlLnggPSAzNjA7XG4gICAgICAgIHRoaXMubm9kZS55ID0gLTExMDtcbiAgICAgICAgZ28gPSB0cnVlO1xuICAgIH0sXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAoZ28pIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS54IC09IDcuNTU7XG4gICAgICAgICAgICBtaSArPSA3LjU1O1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc4NzgxZStBVEpST0FiM2N2UXVzK0w2NScsICdwcF9jb250cm9sJyk7XG4vLyBzY3JpcHRcXHBwX2NvbnRyb2wuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuXG4gICAgICAgIC8vIOazoeazoeiHquWumuS5iVhYXG4gICAgICAgIHN0YXJQcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICAvL+i0ueaYr35cbiAgICAgICAgZmlzaDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXG4gICAgICAgIH0sXG4gICAgICAgIC8v5YCS6K6h5pe26YKj5LiqbGFiZWxcbiAgICAgICAgQ291bnRkb3duOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICAvL+e7k+aenOeVjOmdolxuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5vdmVyX3RpbWUgPSAxMDsgLy/lgJLorqHml7bliankvZnml7bpl7RcbiAgICAgICAgdGhpcy5ub3dfdGltZSA9IDA7IC8v57uT5p6c5YCS6K6h5pe2ICDml7bpl7TorqHml7ZcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvL+i/meS6m+aYr+aQnuazoeazoeeahFxuICAgICAgICBzZWxmLmNyZWF0ZV9wYW9wYW8oKTtcbiAgICAgICAgLy/lrprml7blmahcbiAgICAgICAgc2VsZi5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyDov5nph4znmoQgdGhpcyDmjIflkJEgY29tcG9uZW50XG4gICAgICAgICAgICBzZWxmLmNyZWF0ZV9wYW9wYW8oKTtcbiAgICAgICAgfSwgMC41KTtcbiAgICAgICAgLy/ov5nph4zmmK/mkJ7psbznmoRcbiAgICAgICAgdGhpcy5maXNoX21vdmUoKTtcbiAgICAgICAgdmFyIGFuaW0gPSB0aGlzLmZpc2guZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHZhciBhbmltU3RhdGUgPSBhbmltLnBsYXkoJ2Zpc2hfYWN0aW9uJyk7XG4gICAgICAgIGFuaW1TdGF0ZS5yZXBlYXRDb3VudCA9IEluZmluaXR5O1xuICAgIH0sXG4gICAgLy/psbzotbDjgILjgIJcbiAgICBmaXNoX21vdmU6IGZ1bmN0aW9uIGZpc2hfbW92ZSgpIHtcbiAgICAgICAgdmFyIGJlZ2luX3gsIGJlZ2luX3ksIGVuZF95LCB0aW1lO1xuICAgICAgICAvL+WKqOeUu+WPguaVsFxuICAgICAgICBiZWdpbl94ID0gdGhpcy5ub2RlLndpZHRoIC8gMiArIHRoaXMuZmlzaC5ub2RlLndpZHRoIC8gMjtcbiAgICAgICAgYmVnaW5feSA9IC0oTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMzApICsgMTAwKTtcbiAgICAgICAgdGhpcy5maXNoLm5vZGUueCA9IGJlZ2luX3g7XG4gICAgICAgIHRoaXMuZmlzaC5ub2RlLnkgPSBiZWdpbl95O1xuICAgICAgICBlbmRfeSA9IC1NYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDUwKTtcbiAgICAgICAgdGltZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMykgKyA1O1xuICAgICAgICAvL+WKqOeUu1xuICAgICAgICB2YXIgZmluaXNoID0gY2MuY2FsbEZ1bmModGhpcy5maXNoX21vdmUsIHRoaXMpO1xuICAgICAgICB2YXIgc2VxID0gY2Muc2VxdWVuY2UoY2MubW92ZUJ5KHRpbWUsIC1iZWdpbl94ICogMiwgZW5kX3kpLCBmaW5pc2gpO1xuICAgICAgICB0aGlzLmZpc2gubm9kZS5ydW5BY3Rpb24oc2VxKTtcblxuICAgICAgICAvLyB2YXIgYWN0aW9uQnkgPSBjYy5za2V3QnkoMiwgLTkwLCAtOTApO1xuICAgICAgICAvLyB0aGlzLmZpc2gubm9kZS5ydW5BY3Rpb24oYWN0aW9uQnkpO1xuICAgICAgICAvL+eri+WNs+makOiXj1xuICAgICAgICAvLyB2YXIgaGlkZUFjdGlvbiA9IGNjLmhpZGUoKTtcbiAgICAgICAgLy8gdGhpcy5maXNoLm5vZGUucnVuQWN0aW9uKGhpZGVBY3Rpb24pO1xuICAgIH0sXG4gICAgLy/ms6Hms6Hpm4bkuK3okKVcbiAgICBjcmVhdGVfcGFvcGFvOiBmdW5jdGlvbiBjcmVhdGVfcGFvcGFvKCkge1xuICAgICAgICAvLyDkvb/nlKjnu5nlrprnmoTmqKHmnb/lnKjlnLrmma/kuK3nlJ/miJDkuIDkuKrmlrDoioLngrlcbiAgICAgICAgdmFyIG5ld1N0YXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YXJQcmVmYWIpO1xuICAgICAgICAvLyDlsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobmV3U3Rhcik7XG4gICAgICAgIC8vIHVybGwgPSBjYy51cmwucmF3KFwiZ2FtZTFfMDEvZ2FtZTFfMDFfZ29sZF8wMi5wbmdcIik7XG4gICAgICAgIC8vIHZhciBzcyA9IG5ldyBjYy5TcHJpdGVGcmFtZSh1cmxsKTtcbiAgICAgICAgLy8gbmV3U3Rhci5zcHJpdGVGcmFtZSA9IHNzO1xuICAgICAgICAvL+iOt+WPluS4pOS4qumaj+acuuaVsCDliJ3lp4vngrlcbiAgICAgICAgdmFyIGNoaWxkX3ggPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDMwMCk7XG4gICAgICAgIGlmIChNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpICE9IDEpIHtcbiAgICAgICAgICAgIGNoaWxkX3ggPSAtY2hpbGRfeDtcbiAgICAgICAgfVxuICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKGNoaWxkX3gsIC0xNTApO1xuICAgIH0sXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdGhpcy5vdmVyX3RpbWUgPSAxNTsgLy/lgJLorqHml7bliankvZnml7bpl7RcbiAgICAgICAgdGhpcy5ub3dfdGltZSA9IDA7XG4gICAgICAgIHRoaXMucmVzdWx0LmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5yZXN1bHQuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgdmFyIHRpbWVMZWZ0ID0gTWF0aC5mbG9vcih0aGlzLm92ZXJfdGltZSAtIHRoaXMubm93X3RpbWUpO1xuICAgICAgICBpZiAodGltZUxlZnQgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLkNvdW50ZG93bi5zdHJpbmcgPSBNYXRoLmZsb29yKHRpbWVMZWZ0IC8gMzYwMCkudG9TdHJpbmcoKSArICc6JyArIE1hdGguZmxvb3IodGltZUxlZnQgJSAzNjAwIC8gNjApLnRvU3RyaW5nKCkgKyBcIjpcIiArIE1hdGguZmxvb3IodGltZUxlZnQgJSAzNjAwICUgNjApLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMubm93X3RpbWUgKz0gZHQ7XG4gICAgICAgIGlmICh0aGlzLm5vd190aW1lID49IHRoaXMub3Zlcl90aW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5vd190aW1lID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdmYzg1M0dmZDdwTzhhTzI3NXJLNTBVdicsICdyZXN1bHRfc2NyaXB0Jyk7XG4vLyBzY3JpcHRcXHJlc3VsdF9zY3JpcHQuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxpZ2h0OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgLy/oh6rlrprkuYnph5HluIFcbiAgICAgICAgY29pblByZWZhYjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgc3Rhcjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXIxOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcjI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuXG4gICAgICAgIHZhciBhY3Rpb25CeSA9IGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoNSwgMzYwKSk7XG4gICAgICAgIC8vIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShjYy5yb3RhdGVCeSgwLjUsLTM2MCkpO1xuICAgICAgICB0aGlzLmxpZ2h0LnJ1bkFjdGlvbihhY3Rpb25CeSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5omn6KGM6L+b5p2l5LqGIFwiKTtcbiAgICAgICAgLy/lrprml7blmahcbiAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyDov5nph4znmoQgdGhpcyDmjIflkJEgY29tcG9uZW50XG4gICAgICAgICAgICB0aGlzLmNyZWF0X2NvaW4oKTtcbiAgICAgICAgfSwgMC4xLCAyMCk7XG4gICAgICAgIHZhciBzdGFyID0gY2MucmVwZWF0Rm9yZXZlcihjYy5yZXBlYXRGb3JldmVyKFxuICAgICAgICAvLyBjYy5zZXF1ZW5jZShcbiAgICAgICAgY2Muc3Bhd24oY2Muc2VxdWVuY2UoY2Muc2NhbGVCeSgxLCAwLjAxLCAwLjAxKSwgY2Muc2NhbGVCeSgxLCAxMDAsIDEwMCkpLCBjYy5yb3RhdGVCeSgyLCA3MjApKVxuICAgICAgICAvLyApXG4gICAgICAgICkpO1xuICAgICAgICB2YXIgc3RhcjIgPSBjYy5yZXBlYXRGb3JldmVyKGNjLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vIGNjLnNlcXVlbmNlKFxuICAgICAgICBjYy5zcGF3bihjYy5yb3RhdGVCeSg0LCA3MjApKVxuICAgICAgICAvLyApXG4gICAgICAgICkpO1xuICAgICAgICAvLyB2YXIgc2VxID0gY2Muc2VxdWVuY2UoY2Mucm90YXRlQnkoMC41LC0zNjApKTtcbiAgICAgICAgdGhpcy5zdGFyMS5ydW5BY3Rpb24oc3Rhcik7XG4gICAgICAgIHRoaXMuc3RhcjIucnVuQWN0aW9uKHN0YXIyKTtcbiAgICB9LFxuICAgIGNyZWF0X2NvaW46IGZ1bmN0aW9uIGNyZWF0X2NvaW4oKSB7XG4gICAgICAgIC8vIOS9v+eUqOe7meWumueahOaooeadv+WcqOWcuuaZr+S4reeUn+aIkOS4gOS4quaWsOiKgueCuVxuICAgICAgICB2YXIgbmV3U3RhciA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29pblByZWZhYik7XG4gICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdTdGFyKTtcbiAgICAgICAgLy/ojrflj5bkuKTkuKrpmo/mnLrmlbAg5Yid5aeL54K5XG4gICAgICAgIHZhciBjaGlsZF94ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxNTApO1xuICAgICAgICBpZiAoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSAhPSAxKSB7XG4gICAgICAgICAgICBjaGlsZF94ID0gLWNoaWxkX3g7XG4gICAgICAgIH1cbiAgICAgICAgbmV3U3Rhci5zZXRQb3NpdGlvbihjaGlsZF94LCA5MDApO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYzUyYjZERTRmTkJ6cm12ZERlenhxakUnLCAnc2V0X2JsYWNrYmcnKTtcbi8vIHNjcmlwdFxcc2V0X2JsYWNrYmcuanNcblxuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGJhY2s6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBtdXNpYzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIHNvdW5kOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgaGVscDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLm51bWJlciA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMuc2V0YW5pbWF0aW9uKCk7XG4gICAgfSxcbiAgICB0b19tb3ZlOiBmdW5jdGlvbiB0b19tb3ZlKCkge1xuICAgICAgICB2YXIgc2VxID0gY2MubW92ZUJ5KDEsIDAsIC0xOTEpLmVhc2luZyhjYy5lYXNlRWxhc3RpY091dCgpKTtcbiAgICAgICAgdGhpcy5iYWNrLnJ1bkFjdGlvbihzZXEpO1xuICAgICAgICB2YXIgc2VxMSA9IGNjLm1vdmVCeSgxLjIsIDAsIC0zNzMpLmVhc2luZyhjYy5lYXNlRWxhc3RpY091dCgpKTtcbiAgICAgICAgdGhpcy5tdXNpYy5ydW5BY3Rpb24oc2VxMSk7XG4gICAgICAgIHZhciBzZXEzID0gY2MubW92ZUJ5KDEuMywgMCwgLTU2MCkuZWFzaW5nKGNjLmVhc2VFbGFzdGljT3V0KCkpO1xuICAgICAgICB0aGlzLnNvdW5kLnJ1bkFjdGlvbihzZXEzKTtcbiAgICAgICAgdmFyIHNlcTUgPSBjYy5tb3ZlQnkoMS40LCAwLCAtNzM4KS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNPdXQoKSk7XG4gICAgICAgIHRoaXMuaGVscC5ydW5BY3Rpb24oc2VxNSk7XG4gICAgfSxcbiAgICBnb19jbG9zZTogZnVuY3Rpb24gZ29fY2xvc2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5udW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm51bWJlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJhY2sueSArPSAxOTE7XG4gICAgICAgIH0sIDAuNSk7XG4gICAgICAgIC8vIHZhciBzZXExMTExID0gY2MubW92ZUJ5KDAuOSwwLDE5MSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpXG4gICAgICAgIC8vIHRoaXMuYmFjay5ydW5BY3Rpb24oc2VxMTExMSk7XG4gICAgICAgIHZhciBzZXExID0gY2MubW92ZUJ5KDAuNSwgMCwgMzczKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uSW4oKSk7XG4gICAgICAgIHRoaXMubXVzaWMucnVuQWN0aW9uKHNlcTEpO1xuICAgICAgICB2YXIgc2VxMiA9IGNjLm1vdmVCeSgwLjQsIDAsIDU2MCkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpO1xuICAgICAgICB0aGlzLnNvdW5kLnJ1bkFjdGlvbihzZXEyKTtcbiAgICAgICAgdmFyIHNlcTMgPSBjYy5tb3ZlQnkoMC4zLCAwLCA3MzgpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcbiAgICAgICAgdGhpcy5oZWxwLnJ1bkFjdGlvbihzZXEzKTtcbiAgICAgICAgLy8g5Lul56eS5Li65Y2V5L2N55qE5pe26Ze06Ze06ZqUXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubnVtYmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSwgMC43KTtcbiAgICB9LFxuICAgIHNldGFuaW1hdGlvbjogZnVuY3Rpb24gc2V0YW5pbWF0aW9uKCkge1xuICAgICAgICAvLyDku6Xnp5LkuLrljZXkvY3nmoTml7bpl7Tpl7TpmpRcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy50b19tb3ZlKCk7XG4gICAgICAgIH0sIDAuMyk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc5MjRiMXV5OEZKR0VaRXZ0UFhDRENYUScsICdzZXR0aW5nJyk7XG4vLyBzY3JpcHRcXHNldHRpbmcuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc2V0Ymc6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gb25Ub3VjaERvd24oZXZlbnQpIHt9XG4gICAgICAgIGZ1bmN0aW9uIG9uVG91Y2hVcChldmVudCkge1xuICAgICAgICAgICAgaWYgKHNlbGYuc2V0YmcuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRiZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRiZy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hzdGFydCcsIG9uVG91Y2hEb3duLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoZW5kJywgb25Ub3VjaFVwLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoY2FuY2VsJywgb25Ub3VjaFVwLCB0aGlzLm5vZGUpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnOTlkOWJ3YnY2Rk9hSlpDcFpGRTFvYlAnLCAndHVybnRhYmxlJyk7XG4vLyBzY3JpcHRcXHR1cm50YWJsZS5qc1xuXG52YXIgbGFzdHBvaW50ID0gY2MudjIoMCwgMCk7IC8v5LiK5qyh54K5XG52YXIgbm93cG9pbnQgPSBjYy52MigwLCAwKTsgLy/lvZPliY3ngrlcbnZhciBwb2ludCA9IGNjLnYyKDAsIDApOyAvL+WOn+eCuVxudmFyIHRvdWNoMSA9IGZhbHNlO1xudmFyIGxhc3RwYXJlbnQgPSBjYy52MigwLCAwKTtcbnZhciBsYXN0cm90YXRlID0gMDsgLy/kuIrmrKHnmoTop5LluqZcbnZhciBnb190aW1lID0gMDsgLy/mu5Hliqjml7bpl7Tlj4LmlbBcbnZhciBiZWdhbl90b3VjaCA9IGNjLnYyKDAsIDApO1xudmFyIG5vd19rZWR1ID0gMDtcbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZGFwYW46IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgdXBfZG93bjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBkaWFuc2h1OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIG5vd19udW1iZXI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICAvLyB2YXIgYWN0aW9uQnkgPSBjYy5za2V3QnkoMiwtOTAsIC0xODApO1xuICAgICAgICAvLyB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdGlvbkJ5KTtcbiAgICAgICAgdGhpcy5tYXhfbnVtID0gd2luZG93LlNIaW5kZXggKiAwLjE7IC8v5rao5bmF5Y2V5ZCR5pyA5aSn5YC8XG4gICAgICAgIHRoaXMuc2luID0gdGhpcy5tYXhfbnVtIC8gMTgwOyAvL+avj+WIu+W6puS7o+ihqOWAvFxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5UT1VDSF9PTkVfQllfT05FLFxuICAgICAgICAgICAgb25Ub3VjaEJlZ2FuOiBmdW5jdGlvbiBvblRvdWNoQmVnYW4odG91Y2gsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0b3VjaDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaExvYzEgPSB0b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBiZWdhbl90b3VjaCA9IHRvdWNoTG9jMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoTG9jID0gc2VsZi5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRvdWNoTG9jMSk7XG4gICAgICAgICAgICAgICAgICAgIGxhc3Rwb2ludCA9IHRvdWNoTG9jO1xuICAgICAgICAgICAgICAgICAgICBsYXN0cGFyZW50ID0gdG91Y2hMb2MxO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaDEgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsYXN0cm90YXRlID0gc2VsZi5ub2RlLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gZG9uJ3QgY2FwdHVyZSBldmVudFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVG91Y2hNb3ZlZDogZnVuY3Rpb24gb25Ub3VjaE1vdmVkKHRvdWNoLCBldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0b3VjaDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzlt7Lnu4/mnInop6bmkbgg5YiZ5LiN5Y675omn6KGM5aSa54K5XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vd19udW1iZXIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoTG9jMSA9IHRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIC8v6L2s5o2i5Z2Q5qCH57O7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaExvYyA9IHNlbGYubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0b3VjaExvYzEpO1xuICAgICAgICAgICAgICAgICAgICBub3dwb2ludCA9IHRvdWNoTG9jO1xuICAgICAgICAgICAgICAgICAgICAvL+S4ieinkuWHveaVsOiuoeeul+WFrOW8j1xuICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IHBhcnNlRmxvYXQoY2MucERpc3RhbmNlKHBvaW50LCBub3dwb2ludCkpLnRvRml4ZWQoNik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiID0gcGFyc2VGbG9hdChjYy5wRGlzdGFuY2UocG9pbnQsIGxhc3Rwb2ludCkpLnRvRml4ZWQoNik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjID0gcGFyc2VGbG9hdChjYy5wRGlzdGFuY2UobGFzdHBvaW50LCBub3dwb2ludCkpLnRvRml4ZWQoNik7XG4gICAgICAgICAgICAgICAgICAgIHZhciByb3RhdGlvbiA9IDE4MCAqIE1hdGguYWNvcygoYSAqIGEgKyBiICogYiAtIGMgKiBjKSAvICgyICogYSAqIGIpKSAvIE1hdGguUEk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHZhciByb3RhdGlvbiA9IHBhcnNlRmxvYXQoKGEqYSArIGIqYiAtIGMqYykvKDIqYSpiKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZGF5XzUubm9kZS5yb3RhdGlvbiA9IDE4MCpNYXRoLmFzaW4oIGEvYyApLyBNYXRoLlBJO1xuXG4gICAgICAgICAgICAgICAgICAgIC8q56e75Yqo6L2s5ZyI56yo5pa55rOV5Yik5patICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDEuIOi9rOaNouWdkOagh+ezuyzlsY/luZXln7rngrnlnZDmoIfkvb/nlKjkuJbnlYzlnZDmoIcs56e75Yqo5Z2Q5qCH5L2/55So6Ieq5bex5Z2Q5qCHXG4gICAgICAgICAgICAgICAgICAgICAgICAyLiDnm67liY3lj6rlgZrmvI/lh7rmnaXnmoTpg6jliIbmi5bliqgg5LiL5pa55LiN6ICD6JmRXG4gICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0cGFyZW50LnggPiB0b3VjaExvYzEueCAmJiB0b3VjaExvYzEueSA+IDQ0NCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/lnKjkuIrovrnlkJHlt6bmi5bliqhcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZS5yb3RhdGlvbiAtPSByb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0cGFyZW50LnggPCB0b3VjaExvYzEueCAmJiB0b3VjaExvYzEueSA+IDQ0NCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/lnKjkuIrovrnlkJHlj7Pmi5bliqhcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZS5yb3RhdGlvbiArPSByb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8v56e75Yqo5a6M5LiA5qyh5LmL5ZCO5Yid5aeL5YyW5LiA5LiL5Z2Q5qCHXG4gICAgICAgICAgICAgICAgICAgIGxhc3Rwb2ludCA9IG5vd3BvaW50O1xuICAgICAgICAgICAgICAgICAgICBsYXN0cGFyZW50ID0gdG91Y2hMb2MxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRvdWNoRW5kZWQ6IGZ1bmN0aW9uIG9uVG91Y2hFbmRlZCh0b3VjaCwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAvL+aKrOi1t+aJi+aMh+aXtiDph43mlrDliJ3lp4vljJbmiYDmnInlj5jph49cbiAgICAgICAgICAgICAgICBpZiAoZ29fdGltZSA8PSAwLjIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoTG9jID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlZ2FuX3RvdWNoLnggIT0gdG91Y2hMb2MueCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvX251bSA9ICh0b3VjaExvYy54IC0gYmVnYW5fdG91Y2gueCkgLyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb19udW0gPj0gMSB8fCByb19udW0gPD0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm9fbnVtID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXEgPSBjYy5yb3RhdGVCeSgyLCAxMDgwKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcSA9IGNjLnJvdGF0ZUJ5KDIsIC0xMDgwKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VxID0gY2Mucm90YXRlQnkoMiAqIE1hdGguYWJzKHJvX251bSksIDEwODAgKiByb19udW0pLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGUucnVuQWN0aW9uKHNlcSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFzdHBvaW50ID0gY2MudjIoMCwgMCk7XG4gICAgICAgICAgICAgICAgbm93cG9pbnQgPSBjYy52MigwLCAwKTtcbiAgICAgICAgICAgICAgICBsYXN0cGFyZW50ID0gY2MudjIoMCwgMCk7XG4gICAgICAgICAgICAgICAgLy8gc2VsZi5ub3dfbnVtYmVyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRvdWNoMSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzZWxmLm5vZGUpO1xuICAgIH0sXG4gICAgLy/moLnmja7lj4LmlbAg6K6p55uY5a2Q6L2s5ZyIXG4gICAgdG9fdHVybmFibGU6IGZ1bmN0aW9uIHRvX3R1cm5hYmxlKG51bSkge1xuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgLy8gdGhpcy5tYXhfbnVtID0gd2luZG93LlNIaW5kZXggKiAwLjE7Ly/mtqjluYXljZXlkJHmnIDlpKflgLxcbiAgICAgICAgLy8gdGhpcy5zaW4gPSB0aGlzLm1heF9udW0gLyAxODA7Ly/mr4/liLvluqbku6PooajlgLxcbiAgICAgICAgdmFyIHJvdGUgPSBudW0gLyB0aGlzLnNpbjsgLy/lvZPliY3op5LluqZcbiAgICAgICAgdmFyIHNlcSA9IGNjLnJvdGF0ZVRvKDAuNSwgcm90ZSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzZXEpO1xuICAgIH0sXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvL+iuoeeul+WKoOmAn+W6puWFrOW8j1xuICAgICAgICBpZiAodG91Y2gxKSB7XG4gICAgICAgICAgICBnb190aW1lICs9IGR0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ29fdGltZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy/liLfmlrDlnIjmlbBcbiAgICAgICAgaWYgKHRoaXMubm9kZS5yb3RhdGlvbiA+IDM2MCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJvdGF0aW9uIC09IDM2MDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5vZGUucm90YXRpb24gPCAtMzYwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUucm90YXRpb24gKz0gMzYwO1xuICAgICAgICB9XG4gICAgICAgIC8v6L2s5ZyI6YC76L6RXG4gICAgICAgIG5vd19rZWR1ID0gc2VsZi5ub2RlLnJvdGF0aW9uO1xuICAgICAgICBpZiAoc2VsZi5ub2RlLnJvdGF0aW9uID4gMTgwKSB7XG4gICAgICAgICAgICBub3dfa2VkdSA9IC0oMzYwIC0gc2VsZi5ub2RlLnJvdGF0aW9uKTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWxmLm5vZGUucm90YXRpb24gPCAtMTgwKSB7XG4gICAgICAgICAgICBub3dfa2VkdSA9IDM2MCArIHNlbGYubm9kZS5yb3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBub3dfa2VkdSA9IE1hdGguZmxvb3Ioc2VsZi5zaW4gKiBub3dfa2VkdSk7XG4gICAgICAgIHNlbGYuZGFwYW4uc3RyaW5nID0gd2luZG93LlNIaW5kZXggKyBub3dfa2VkdTtcbiAgICAgICAgdmFyIGJhaWZlbmJpID0gbm93X2tlZHUgLyB3aW5kb3cuU0hpbmRleCAqIDEwMDtcbiAgICAgICAgaWYgKGJhaWZlbmJpID4gMTApIHtcbiAgICAgICAgICAgIGJhaWZlbmJpID0gMTA7XG4gICAgICAgIH0gZWxzZSBpZiAoYmFpZmVuYmkgPCAtMTApIHtcbiAgICAgICAgICAgIGJhaWZlbmJpID0gLTEwO1xuICAgICAgICB9XG4gICAgICAgIC8v5aGr5YaZ5Yi75bqmXG4gICAgICAgIGlmIChub3dfa2VkdSA+IDApIHtcbiAgICAgICAgICAgIHNlbGYuZGlhbnNodS5zdHJpbmcgPSBcIua2qCBcIiArIG5vd19rZWR1ICsgXCIg54K5XCI7XG4gICAgICAgICAgICBzZWxmLnVwX2Rvd24uc3RyaW5nID0gXCIrXCIgKyBub3dfa2VkdSArIFwiICgrXCIgKyBNYXRoLmZsb29yKGJhaWZlbmJpKSArIFwiJSlcIjtcbiAgICAgICAgICAgIHNlbGYuZGlhbnNodS5ub2RlLmNvbG9yID0gY2MuY29sb3IoMjM3LCAxMDYsIDEwNiwgMjU1KTtcbiAgICAgICAgICAgIHNlbGYudXBfZG93bi5ub2RlLmNvbG9yID0gY2MuY29sb3IoMjM3LCAxMDYsIDEwNiwgMjU1KTtcbiAgICAgICAgICAgIHNlbGYuZGFwYW4ubm9kZS5jb2xvciA9IGNjLmNvbG9yKDIzNywgMTA2LCAxMDYsIDI1NSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmRpYW5zaHUuc3RyaW5nID0gXCLot4wgXCIgKyBNYXRoLmFicyhub3dfa2VkdSkgKyBcIiDngrlcIjtcbiAgICAgICAgICAgIHNlbGYudXBfZG93bi5zdHJpbmcgPSBub3dfa2VkdSArIFwiIChcIiArIE1hdGguZmxvb3IoYmFpZmVuYmkpICsgXCIlKVwiO1xuICAgICAgICAgICAgc2VsZi5kaWFuc2h1Lm5vZGUuY29sb3IgPSBjYy5jb2xvcigxMTcsIDIxMiwgMTc0LCAyNTUpO1xuICAgICAgICAgICAgc2VsZi51cF9kb3duLm5vZGUuY29sb3IgPSBjYy5jb2xvcigxMTcsIDIxMiwgMTc0LCAyNTUpO1xuICAgICAgICAgICAgc2VsZi5kYXBhbi5ub2RlLmNvbG9yID0gY2MuY29sb3IoMTE3LCAyMTIsIDE3NCwgMjU1KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNWE1ZWZlUzc1RkV2NENBSmxTUzdPSEEnLCAndm9pc2UnKTtcbi8vIHNjcmlwdFxcdm9pc2UuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc2V0dm9pc2U6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgc2V0dm9pc2UxOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIG9uVG91Y2hEb3duKGV2ZW50KSB7fVxuICAgICAgICBmdW5jdGlvbiBvblRvdWNoVXAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLnNldHZvaXNlLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0dm9pc2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXR2b2lzZTEuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXR2b2lzZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0dm9pc2UxLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hzdGFydCcsIG9uVG91Y2hEb3duLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoZW5kJywgb25Ub3VjaFVwLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoY2FuY2VsJywgb25Ub3VjaFVwLCB0aGlzLm5vZGUpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMmJlMjBRN1MyNUlscGpzakI1UHJuT1InLCAnd2FpdCcpO1xuLy8gc2NyaXB0XFx3YWl0LmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiXX0=
