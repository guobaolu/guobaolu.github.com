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
        console.log("几次");
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
        console.log("生成金币");
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
    'extends': cc.Component,
    properties: {
        dapan: {
            'default': null,
            type: cc.Label
        },
        up_down: {
            'default': null,
            type: cc.Label
        },
        dianshu: {
            'default': null,
            type: cc.Label
        },
        now_number: {
            'default': null,
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
                        console.log('之前的x:' + began_touch.x + '之后的x:' + touchLoc.x + '比例' + ro_num);
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
        }, self);
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
},{}]},{},["paowuxian","GameMain","wait","voise","pp_control","setting","paopao","MainLogin","turntable","set_blackbg","jinbi","ButtonScale","result_script"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2RlbGwvQXBwRGF0YS9Mb2NhbC9Db2Nvc0NyZWF0b3IvYXBwLTEuMC4zL3Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2NyaXB0L0J1dHRvblNjYWxlLmpzIiwic2NyaXB0L0dhbWVNYWluLmpzIiwic2NyaXB0L01haW5Mb2dpbi5qcyIsInNjcmlwdC9qaW5iaS5qcyIsInNjcmlwdC9wYW9wYW8uanMiLCJzY3JpcHQvcGFvd3V4aWFuLmpzIiwic2NyaXB0L3BwX2NvbnRyb2wuanMiLCJzY3JpcHQvcmVzdWx0X3NjcmlwdC5qcyIsInNjcmlwdC9zZXRfYmxhY2tiZy5qcyIsInNjcmlwdC9zZXR0aW5nLmpzIiwic2NyaXB0L3R1cm50YWJsZS5qcyIsInNjcmlwdC92b2lzZS5qcyIsInNjcmlwdC93YWl0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdkNGQwM0pJNGpKTDNyOTB0azdMVkduVCcsICdCdXR0b25TY2FsZScpO1xuLy8gc2NyaXB0XFxCdXR0b25TY2FsZS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHByZXNzZWRTY2FsZTogMSxcbiAgICAgICAgdHJhbnNEdXJhdGlvbjogMFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCLlh6DmrKFcIik7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5pbml0U2NhbGUgPSB0aGlzLm5vZGUuc2NhbGU7XG4gICAgICAgIHNlbGYuYnV0dG9uID0gc2VsZi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcbiAgICAgICAgc2VsZi5zY2FsZURvd25BY3Rpb24gPSBjYy5zY2FsZVRvKHNlbGYudHJhbnNEdXJhdGlvbiwgc2VsZi5wcmVzc2VkU2NhbGUpO1xuICAgICAgICBzZWxmLnNjYWxlVXBBY3Rpb24gPSBjYy5zY2FsZVRvKHNlbGYudHJhbnNEdXJhdGlvbiwgc2VsZi5pbml0U2NhbGUpO1xuICAgICAgICBmdW5jdGlvbiBvblRvdWNoRG93bihldmVudCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5ydW5BY3Rpb24oc2VsZi5zY2FsZURvd25BY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uVG91Y2hVcChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5ydW5BY3Rpb24oc2VsZi5zY2FsZVVwQWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoc3RhcnQnLCBvblRvdWNoRG93biwgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGVuZCcsIG9uVG91Y2hVcCwgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGNhbmNlbCcsIG9uVG91Y2hVcCwgdGhpcy5ub2RlKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzBkYWJlVzdUTzlGa3FsR2Q0Uk9rbHVkJywgJ0dhbWVNYWluJyk7XG4vLyBzY3JpcHRcXEdhbWVNYWluLmpzXG5cbnZhciBvcGVudm9pc2UgPSB0cnVlOyAvL+aYr+WQpuW8gOWQr+aMiemSrumfs+aViFxudmFyIF9vcGVubXVzaWMgPSB0cnVlOyAvL+aYr+WQpuW8gOWQr+iDjOaZr+mfs+S5kFxudmFyIFNIaW5kZXggPSAzNjE2LjExOyAvL+W8gOebmOS4iuivgeaMh+aVsFxud2luZG93LlNIaW5kZXggPSAzNjE2O1xudmFyIG15X3Nob2lzZSA9IDA7IC8v5oiR56ue54yc55qE5rao6LeM54K5XG52YXIgbnVtX29mX3BsYXllciA9IDEwMDsgLy/lj4LkuI7nq57njJzkurrmlbBcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvL+WumuS5ieS4gOS4qumfs+aViOexu+Wei1xuICAgICAgICB2b2lzZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICAvL+WumuS5ieS4gOS4qumfs+S5kOexu+Wei1xuICAgICAgICBtdXNpYzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICAvL+S4pOS4qumCo+WVpVxuICAgICAgICBkb3duOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgZG93bjI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICAvL+ehruWumuaMiemSrlxuICAgICAgICBxdWVkaW5nOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIC8v57uT5p6cXG4gICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICAvL+WPguS4juaVsOmHj1xuICAgICAgICBwbGF5ZXJzOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIC8v5Y+C5LiO546p5a625q+U5L6LXG4gICAgICAgIHBsYXlfYmZiOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIC8v5rao6LeM5Y2g5q+U6IOM5pmvXG4gICAgICAgIG51bV9iZzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfSxcbiAgICAgICAgdXBfZG93bjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBoZWxwOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgQm11c2ljOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgQ211c2ljOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgc291bmQ6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBjc291bmQ6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyDliJ3lp4vljJbliqDovb0g55u45b2T5LqOaW5pdOWHveaVsFxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG4gICAgLy/lvIDlkK/lubbmkq3mlL7pn7PmlYhcbiAgICBvcGVudm9pczogZnVuY3Rpb24gb3BlbnZvaXMoKSB7XG4gICAgICAgIG9wZW52b2lzZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIOi/memHjOeahCB0aGlzIOaMh+WQkSBjb21wb25lbnRcbiAgICAgICAgICAgIHRoaXMuY3NvdW5kLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zb3VuZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9LCAwLjE1KTtcbiAgICAgICAgdGhpcy5wbGF5dm9pc2UoKTtcbiAgICB9LFxuICAgIC8v5YWz6Zet6Z+z5pWIXG4gICAgY2xvc2V2b2lzOiBmdW5jdGlvbiBjbG9zZXZvaXMoKSB7XG4gICAgICAgIG9wZW52b2lzZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyDov5nph4znmoQgdGhpcyDmjIflkJEgY29tcG9uZW50XG4gICAgICAgICAgICB0aGlzLnNvdW5kLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jc291bmQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSwgMC4xNSk7XG4gICAgfSxcbiAgICAvL+W8gOWQr+W5tuaSreaUvuiDjOaZr+mfs+S5kFxuICAgIG9wZW5tdXNpYzogZnVuY3Rpb24gb3Blbm11c2ljKCkge1xuICAgICAgICBfb3Blbm11c2ljID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyDov5nph4znmoQgdGhpcyDmjIflkJEgY29tcG9uZW50XG4gICAgICAgICAgICB0aGlzLkNtdXNpYy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuQm11c2ljLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0sIDAuMTUpO1xuICAgICAgICB0aGlzLnBsYXltdXNpYygpO1xuICAgIH0sXG4gICAgLy/lhbPpl63og4zmma/pn7PkuZBcbiAgICBjbG9zZW11c2ljOiBmdW5jdGlvbiBjbG9zZW11c2ljKCkge1xuICAgICAgICBfb3Blbm11c2ljID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIOi/memHjOeahCB0aGlzIOaMh+WQkSBjb21wb25lbnRcbiAgICAgICAgICAgIHRoaXMuQm11c2ljLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5DbXVzaWMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSwgMC4xNSk7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYyh0cnVlKTtcbiAgICB9LFxuICAgIC8v5pKt5pS+6IOM5pmv6Z+z5LmQXG4gICAgcGxheW11c2ljOiBmdW5jdGlvbiBwbGF5bXVzaWMoKSB7XG5cbiAgICAgICAgaWYgKF9vcGVubXVzaWMpIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLm11c2ljLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8v5pKt5pS+6Z+z5pWIXG4gICAgcGxheXZvaXNlOiBmdW5jdGlvbiBwbGF5dm9pc2UoKSB7XG4gICAgICAgIGlmIChvcGVudm9pc2UpIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy52b2lzZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvL+eUn+aIkOmaj+acuuaVsFxuICAgIHJhbmRvbTogZnVuY3Rpb24gcmFuZG9tKCkge1xuICAgICAgICB0aGlzLnBsYXl2b2lzZSgpO1xuICAgICAgICAvL+eUn+aIkOmaj+acuuaVsFxuICAgICAgICB2YXIgemhlbmdmdTtcbiAgICAgICAgLy8gMTE3LDIxMiwxNzRcbiAgICAgICAgLy8yMzcsMTA2LDEwNlxuICAgICAgICB6aGVuZ2Z1ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgbXlfc2hvaXNlID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBTSGluZGV4ICogMC4xKTtcbiAgICAgICAgaWYgKHpoZW5nZnUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5xdWVkaW5nLnN0cmluZyA9IFwi5raoIFwiICsgbXlfc2hvaXNlICsgXCIg54K5XCI7XG4gICAgICAgICAgICB0aGlzLnF1ZWRpbmcubm9kZS5jb2xvciA9IGNjLmNvbG9yKDIzNywgMTA2LCAxMDYsIDI1NSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnF1ZWRpbmcuc3RyaW5nID0gXCLot4wgXCIgKyBteV9zaG9pc2UgKyBcIiDngrlcIjtcbiAgICAgICAgICAgIHRoaXMucXVlZGluZy5ub2RlLmNvbG9yID0gY2MuY29sb3IoMTE3LCAyMTIsIDE3NCwgMjU1KTtcbiAgICAgICAgICAgIG15X3Nob2lzZSA9IC1teV9zaG9pc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRkID0gdGhpcy5kb3duLmdldENoaWxkQnlOYW1lKFwidHVybnRhYmxlXCIpLmdldENvbXBvbmVudChcInR1cm50YWJsZVwiKTtcbiAgICAgICAgZGQudG9fdHVybmFibGUobXlfc2hvaXNlKTtcbiAgICB9LFxuICAgIGdvX2hlbHA6IGZ1bmN0aW9uIGdvX2hlbHAoKSB7XG4gICAgICAgIGlmICh0aGlzLmhlbHAuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmhlbHAuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlbHAuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzdWx0X2JhY2s6IGZ1bmN0aW9uIHJlc3VsdF9iYWNrKCkge1xuICAgICAgICAvLyDov5nph4znmoQgdGhpcyDmjIflkJEgY29tcG9uZW50XG4gICAgICAgIGlmICh0aGlzLmRvd24uYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmRvd24uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRvd24yLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvd24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZG93bjIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8v56Gu5a6aXG4gICAgc3VyZTogZnVuY3Rpb24gc3VyZSgpIHtcbiAgICAgICAgdGhpcy5wbGF5dm9pc2UoKTtcbiAgICAgICAgLy/nrYnkuo4wIOWwsem7mOiupOaYr+ayoeaciemAieaLqea2qOi3jOeCueaVsCAg5LiN57uZ5L2/55So56Gu6K6k5oyJ6ZKuXG4gICAgICAgIHZhciBzdXJlX251bTtcbiAgICAgICAgc3VyZV9udW0gPSB0aGlzLnF1ZWRpbmcuc3RyaW5nO1xuICAgICAgICBpZiAobXlfc2hvaXNlID09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvL+ehruWumuS6huS5i+WQjuWQhOenjeWGmX5cbiAgICAgICAgdGhpcy5yZXN1bHQuc3RyaW5nID0gXCLpooTmtYvkuIror4HmjIfmlbA6IFwiICsgKFNIaW5kZXggKyBteV9zaG9pc2UpICsgXCIgXCIgKyBteV9zaG9pc2UgKyBcIiAoXCIgKyAobXlfc2hvaXNlICogMTAwIC8gU0hpbmRleCkudG9GaXhlZCgyKSArIFwiJSlcIjtcbiAgICAgICAgLy/njJzmtqjov5jmmK/njJzot4xcbiAgICAgICAgdmFyIHVybGw7XG4gICAgICAgIGlmIChteV9zaG9pc2UgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnVwX2Rvd24uc3RyaW5nID0gJ+eMnOa2qCc7XG4gICAgICAgICAgICAvL+WPguS4juernueMnOS6uuaVsFxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzLnN0cmluZyA9IFwi5bey57uP5pyJXCIgKyBudW1fb2ZfcGxheWVyICsgXCLkurrlj4LkuI7vvIznjJzmtqjljaBcIjtcbiAgICAgICAgICAgIC8v5rao6LeM57uT5p6c5Lit55qE6IOM5pmv5bCP5Zu+54mHXG4gICAgICAgICAgICB1cmxsID0gY2MudXJsLnJhdyhcImdhbWUxXzAxL2dhbWUxXzAyX2ltZ18wNS5wbmdcIik7XG4gICAgICAgICAgICB2YXIgdGV4dHVyZSA9IGNjLnRleHR1cmVDYWNoZS5hZGRJbWFnZSh1cmxsKTtcbiAgICAgICAgICAgIHRoaXMubnVtX2JnLnNwcml0ZUZyYW1lLnNldFRleHR1cmUodGV4dHVyZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwX2Rvd24uc3RyaW5nID0gJ+eMnOi3jCc7XG4gICAgICAgICAgICAvL+WPguS4juernueMnOS6uuaVsFxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzLnN0cmluZyA9IFwi5bey57uP5pyJXCIgKyBudW1fb2ZfcGxheWVyICsgXCLkurrlj4LkuI7vvIznjJzot4zljaBcIjtcbiAgICAgICAgfVxuICAgICAgICAvL+eMnOa2qC/ot4wg5Lq65pWw55qE55m+5YiG5LmL55m+XG4gICAgICAgIHRoaXMucGxheV9iZmIuc3RyaW5nID0gXCI1NSVcIjtcbiAgICAgICAgLy8g5Lul56eS5Li65Y2V5L2N55qE5pe26Ze06Ze06ZqUXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIOi/memHjOeahCB0aGlzIOaMh+WQkSBjb21wb25lbnRcbiAgICAgICAgICAgIGlmICh0aGlzLmRvd24uYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3duLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZG93bjIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvd24yLmdldENoaWxkQnlOYW1lKFwid2F0ZXJfYmdcIikuZ2V0Q29tcG9uZW50KFwicHBfY29udHJvbFwiKS5pbml0KCk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5kb3duMi47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvd24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duMi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0sIDAuNSk7XG4gICAgfSxcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7fVxuICAgIC8vLy8vLy8vLy8vLy8vL+i/memHjOaYr+S4gOS6m+W4uOeUqOeahOS4nOS4nGNvcHkvLy8vLy8vLy8vLy8vIGZvciAgZ3VvYmFvbHVcbiAgICAvKiAgKDEp6K6h5pe25ZmoXHJcbiAgICAgICAgICAgICAvLyDku6Xnp5LkuLrljZXkvY3nmoTml7bpl7Tpl7TpmpRcclxuICAgICAgICAgICAgIHZhciBpbnRlcnZhbCA9IDU7XHJcbiAgICAgICAgICAgICAvLyDph43lpI3mrKHmlbBcclxuICAgICAgICAgICAgIHZhciByZXBlYXQgPSAzO1xyXG4gICAgICAgICAgICAgLy8g5byA5aeL5bu25pe2XHJcbiAgICAgICAgICAgICB2YXIgZGVsYXkgPSAxMDtcclxuICAgICAgICAgICAgIGNvbXBvbmVudC5zY2hlZHVsZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAvLyDov5nph4znmoQgdGhpcyDmjIflkJEgY29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5kb1NvbWV0aGluZygpO1xyXG4gICAgICAgICAgICAgfSwgaW50ZXJ2YWwsIHJlcGVhdCwgZGVsYXkpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgKDIp6K6+572u5aOw6Z+z44CB6Z+z5pWI5aSn5bCP55qEXHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldEVmZmVjdHNWb2x1bWUoMC41KTtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUoMC41KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICgzKeebkeWQrOWZqOeahOe6p+WIq1xyXG4gICAgICAgICAgICDnm5HlkKzlmajnmoTkvJjlhYjnuqfmmK/ln7rkuo7mraToioLngrnnmoTnu5jliLbpobrluo/miJZmaXhlZFByb2lvcml0eSjkv67mlLnnm5HlkKzlmajnmoTkvJjlhYjnuqcpXHJcbiAgICAgICAgXHJcbiAgICAgICAgKDQp5Lmd5aa55o6n5Lu2IHNjYWxlOVNQcml0ZVxyXG4gICAgKi9cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYmExM2JZdFhGUkJpck5XaDdqRDNmTU0nLCAnTWFpbkxvZ2luJyk7XG4vLyBzY3JpcHRcXE1haW5Mb2dpbi5qc1xuXG5cbi8vXG4vLyBUaXBz77yaXG4vLyDmib7liLDnmoTkuIvovb3lm77niYfnvZHlnYDov4fplb/vvIzlj6/ku6Xlv73nlaXjgIJcbi8vIOacrOaVmeeoi+S4u+imgei/mOaYr+S9k+eOsOWmguS9leS9v+eUqExvYWRlcueahOi/m+W6puadoeOAglxuLy8tIDQ1NyAgIDE5XG52YXIgbm93X3RpbWUgPSAxO1xudmFyIGlzX2xvYWQgPSBmYWxzZTtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHByb2dyZXNzQmFyOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgbml1OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5zZXREaXNwbGF5U3RhdHMoZmFsc2UpOyAvL+makOiXj+aOieW3puS4i+inkueahGZwcyDluKfnjofllaXllaXnmoRcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcIk1haW5HYW1lXCIsIHRoaXMuX2NvbXBsZXRlQ2FsbGJhY2suYmluZCh0aGlzKSk7XG4gICAgICAgIHZhciBhbmltID0gdGhpcy5uaXUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHZhciBhbmltU3RhdGUgPSBhbmltLnBsYXkoJ2xvYWRpbmduaXUnKTtcbiAgICAgICAgYW5pbVN0YXRlLnJlcGVhdENvdW50ID0gSW5maW5pdHk7XG4gICAgfSxcblxuICAgIF9wcm9ncmVzc0NhbGxiYWNrOiBmdW5jdGlvbiBfcHJvZ3Jlc3NDYWxsYmFjayhjb21wbGV0ZWRDb3VudCwgdG90YWxDb3VudCwgcmVzKSB7XG5cbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IGNvbXBsZXRlZENvdW50IC8gdG90YWxDb3VudDtcblxuICAgICAgICB0aGlzLmNvbXBsZXRlZENvdW50ID0gY29tcGxldGVkQ291bnQ7XG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IHRvdGFsQ291bnQ7XG4gICAgfSxcblxuICAgIF9jb21wbGV0ZUNhbGxiYWNrOiBmdW5jdGlvbiBfY29tcGxldGVDYWxsYmFjayhlcnJvciwgcmVzKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2UgPSByZXM7XG4gICAgICAgIGlzX2xvYWQgPSB0cnVlO1xuICAgICAgICBub3dfdGltZSArPSAxMDtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy5ub2RlLnggPj0gMTkpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLnJ1blNjZW5lKHRoaXMucmVzb3VyY2Uuc2NlbmUpO1xuICAgICAgICAgICAgdGhpcy5uaXUubm9kZS54ID0gLTI0MDtcbiAgICAgICAgICAgIHRoaXMubm9kZS54ID0gLTQ1NztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzX2xvYWQgJiYgdGhpcy5ub2RlLnggPCAtNTApIHt9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uaXUubm9kZS54ICs9IG5vd190aW1lO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gbm93X3RpbWU7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2M5MDA0MmxLdFpCV2F0M3FIL3l2YlhpJywgJ2ppbmJpJyk7XG4vLyBzY3JpcHRcXGppbmJpLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgdm9pc2U6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgbW9odToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG5cbiAgICAgICAgLy/liqjkvZzku6Xlj4rliqjkvZzlm57osINcbiAgICAgICAgdmFyIGZpbmlzaCA9IGNjLmNhbGxGdW5jKHRoaXMuY2FsbGJhY2sxLCB0aGlzKTtcbiAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgyLCAwLCAtOTAwKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uSW4oKSksIGNjLm1vdmVCeSgwLjUsIDAsIDIwKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpLCBjYy5tb3ZlQnkoMC41LCAwLCAtMjApLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKSwgZmluaXNoKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzZXEpO1xuICAgIH0sXG4gICAgYmVnYWluOiBmdW5jdGlvbiBiZWdhaW4oKSB7fSxcbiAgICBjYWxsYmFjazE6IGZ1bmN0aW9uIGNhbGxiYWNrMSgpIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLnZvaXNlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9XG4gICAgLy8gdGhpcy5rYW5rYW4uc3RyaW5nID0gZW5kX3g7XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdhMGQ2OEs4cTNkSW1yVys3UDQrRi9nNycsICdwYW9wYW8nKTtcbi8vIHNjcmlwdFxccGFvcGFvLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIC8v5Yqo5L2c5Lul5Y+K5Yqo5L2c5Zue6LCDXG4gICAgICAgIHZhciBmaW5pc2ggPSBjYy5jYWxsRnVuYyh0aGlzLmNhbGxiYWNrMSwgdGhpcyk7XG4gICAgICAgIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAsIDAuMSwgMC4xKSwgY2Muc3Bhd24oY2Muc2NhbGVUbygyLCAwLjgsIDAuOCksIGNjLm1vdmVCeSgyLCAwLCAxNjApKSwgZmluaXNoKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzZXEpO1xuICAgIH0sXG4gICAgYmVnYWluOiBmdW5jdGlvbiBiZWdhaW4oKSB7fSxcbiAgICBjYWxsYmFjazE6IGZ1bmN0aW9uIGNhbGxiYWNrMSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge31cbiAgICAvLyB0aGlzLmthbmthbi5zdHJpbmcgPSBlbmRfeDtcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzA5ZGJhN2xLR0JMaWJkcmlsaU5iZzN0JywgJ3Bhb3d1eGlhbicpO1xuLy8gc2NyaXB0XFxwYW93dXhpYW4uanNcblxudmFyIG1pID0gMDtcbnZhciBnbyA9IHRydWU7XG5cbnZhciBnb2JhY2sgPSBjYy5mYWRlSW4oMC4zKTtcbnZhciBnb2JhY2sxID0gY2MuZmFkZUluKDAuMyk7XG52YXIgZ29vdXQgPSBjYy5mYWRlT3V0KDEpO1xudmFyIGdvb3V0MSA9IGNjLmZhZGVPdXQoMSk7XG52YXIgbWluc2l6ZSA9IGNjLnNjYWxlVG8oMCwgMC4xLCAwLjEpO1xudmFyIG1pbnNpemUxID0gY2Muc2NhbGVUbygwLCAwLjEsIDAuMSk7XG52YXIgbWF4c2l6ZSA9IGNjLnNjYWxlVG8oMC4zLCAxLCAxKTtcbnZhciBtYXhzaXplMSA9IGNjLnNjYWxlVG8oMC4zLCAxLCAxKTtcbmNjLkNsYXNzKHtcblxuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHdhdGVyOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuICAgICAgICB3YXRlcjE6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIC8v5Yid5aeL5YyW5rC054+g5aSn5bCPXG4gICAgICAgIHRoaXMud2F0ZXIubm9kZS5ydW5BY3Rpb24obWluc2l6ZSk7XG4gICAgICAgIHRoaXMud2F0ZXIxLm5vZGUucnVuQWN0aW9uKG1pbnNpemUxKTtcbiAgICAgICAgLy/ot7Pot4PnmoTkuKTkuKrliqjkvZxcbiAgICAgICAgdmFyIGp1bXBVcCA9IGNjLm1vdmVCeSgwLjcsIGNjLnAoMSwgNDUwKSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKTtcbiAgICAgICAgdmFyIGp1bXBEb3duID0gY2MubW92ZUJ5KDAuNywgY2MucCgxLCAtNDUwKSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpO1xuICAgICAgICAvL+Wbnuiwg+WHveaVsFxuICAgICAgICB2YXIgZmluaXNoID0gY2MuY2FsbEZ1bmModGhpcy5maXNoX21vdmUsIHRoaXMpO1xuICAgICAgICB2YXIgZmluaXNoMSA9IGNjLmNhbGxGdW5jKHRoaXMuZGVsYXl0aW1lLCB0aGlzKTtcbiAgICAgICAgLy/ml4vovaxcbiAgICAgICAgdmFyIHJvdGF0ZSA9IGNjLnJvdGF0ZUJ5KDEuNSwgLTE4MCk7XG4gICAgICAgIHZhciByb3RhdGUxID0gY2Mucm90YXRlQnkoMCwgMTgwKTtcbiAgICAgICAgLy/lu7bov59cbiAgICAgICAgdmFyIGRlbGF5ID0gY2MuZGVsYXlUaW1lKDIpO1xuICAgICAgICAvLyB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc3Bhd24oY2Muc2VxdWVuY2UoanVtcFVwLCBqdW1wRG93bixmaW5pc2gpLHJvdGF0ZSkscm90YXRlMSxkZWxheSxmaW5pc2gxKSkpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNwYXduKGNjLnNlcXVlbmNlKGp1bXBVcCwganVtcERvd24sIGZpbmlzaCksIHJvdGF0ZSksIHJvdGF0ZTEsIGRlbGF5LCBmaW5pc2gxKSk7XG4gICAgfSxcbiAgICB3YXRlcl9pbml0OiBmdW5jdGlvbiB3YXRlcl9pbml0KCkge1xuICAgICAgICAvL+WIneWni+WMluawtOePoOWkp+Wwj1xuICAgICAgICB0aGlzLndhdGVyLm5vZGUucnVuQWN0aW9uKG1pbnNpemUpO1xuICAgICAgICB0aGlzLndhdGVyMS5ub2RlLnJ1bkFjdGlvbihtaW5zaXplMSk7XG4gICAgICAgIHRoaXMud2F0ZXIubm9kZS54ID0gLTIxNTtcbiAgICAgICAgdGhpcy53YXRlci5ub2RlLnkgPSAzMjtcbiAgICAgICAgdGhpcy53YXRlcjEubm9kZS54ID0gLTI2MjtcbiAgICAgICAgdGhpcy53YXRlcjEubm9kZS55ID0gNDY7XG4gICAgfSxcbiAgICBmaXNoX21vdmU6IGZ1bmN0aW9uIGZpc2hfbW92ZSgpIHtcbiAgICAgICAgLy/msLTnj6DliqjnlLsg5rqF5bCE5pWI5p6cXG4gICAgICAgIHZhciB3YXRlcm1vdmUgPSBjYy5tb3ZlQnkoMC4zLCA0OCwgMzkpO1xuICAgICAgICB2YXIgd2F0ZXIxbW92ZSA9IGNjLm1vdmVCeSgwLjMsIC0xNywgNDUpO1xuICAgICAgICB0aGlzLndhdGVyLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNwYXduKGdvYmFjaywgbWF4c2l6ZSwgd2F0ZXJtb3ZlKSwgZ29vdXQpKTtcbiAgICAgICAgdGhpcy53YXRlcjEubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc3Bhd24oZ29iYWNrMSwgbWF4c2l6ZTEsIHdhdGVyMW1vdmUpLCBnb291dDEpKTtcblxuICAgICAgICB0aGlzLm5vZGUueCA9IDM2MDtcbiAgICAgICAgdGhpcy5ub2RlLnkgPSAtMTEwO1xuICAgICAgICBtaSA9IDA7XG4gICAgICAgIGdvID0gZmFsc2U7XG4gICAgfSxcbiAgICBkZWxheXRpbWU6IGZ1bmN0aW9uIGRlbGF5dGltZSgpIHtcbiAgICAgICAgdGhpcy53YXRlcl9pbml0KCk7XG4gICAgICAgIHRoaXMubm9kZS54ID0gMzYwO1xuICAgICAgICB0aGlzLm5vZGUueSA9IC0xMTA7XG4gICAgICAgIGdvID0gdHJ1ZTtcbiAgICB9LFxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKGdvKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCAtPSA3LjU1O1xuICAgICAgICAgICAgbWkgKz0gNy41NTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnODc4MWUrQVRKUk9BYjNjdlF1cytMNjUnLCAncHBfY29udHJvbCcpO1xuLy8gc2NyaXB0XFxwcF9jb250cm9sLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcblxuICAgICAgICAvLyDms6Hms6Hoh6rlrprkuYlYWFxuICAgICAgICBzdGFyUHJlZmFiOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgLy/otLnmmK9+XG4gICAgICAgIGZpc2g6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuICAgICAgICAvL+WAkuiuoeaXtumCo+S4qmxhYmVsXG4gICAgICAgIENvdW50ZG93bjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgLy/nu5PmnpznlYzpnaJcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMub3Zlcl90aW1lID0gMTA7IC8v5YCS6K6h5pe25Ymp5L2Z5pe26Ze0XG4gICAgICAgIHRoaXMubm93X3RpbWUgPSAwOyAvL+e7k+aenOWAkuiuoeaXtiAg5pe26Ze06K6h5pe2XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgLy/ov5nkupvmmK/mkJ7ms6Hms6HnmoRcbiAgICAgICAgc2VsZi5jcmVhdGVfcGFvcGFvKCk7XG4gICAgICAgIC8v5a6a5pe25ZmoXG4gICAgICAgIHNlbGYuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8g6L+Z6YeM55qEIHRoaXMg5oyH5ZCRIGNvbXBvbmVudFxuICAgICAgICAgICAgc2VsZi5jcmVhdGVfcGFvcGFvKCk7XG4gICAgICAgIH0sIDAuNSk7XG4gICAgICAgIC8v6L+Z6YeM5piv5pCe6bG855qEXG4gICAgICAgIHRoaXMuZmlzaF9tb3ZlKCk7XG4gICAgICAgIHZhciBhbmltID0gdGhpcy5maXNoLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICB2YXIgYW5pbVN0YXRlID0gYW5pbS5wbGF5KCdmaXNoX2FjdGlvbicpO1xuICAgICAgICBhbmltU3RhdGUucmVwZWF0Q291bnQgPSBJbmZpbml0eTtcbiAgICB9LFxuICAgIC8v6bG86LWw44CC44CCXG4gICAgZmlzaF9tb3ZlOiBmdW5jdGlvbiBmaXNoX21vdmUoKSB7XG4gICAgICAgIHZhciBiZWdpbl94LCBiZWdpbl95LCBlbmRfeSwgdGltZTtcbiAgICAgICAgLy/liqjnlLvlj4LmlbBcbiAgICAgICAgYmVnaW5feCA9IHRoaXMubm9kZS53aWR0aCAvIDIgKyB0aGlzLmZpc2gubm9kZS53aWR0aCAvIDI7XG4gICAgICAgIGJlZ2luX3kgPSAtKE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMTMwKSArIDEwMCk7XG4gICAgICAgIHRoaXMuZmlzaC5ub2RlLnggPSBiZWdpbl94O1xuICAgICAgICB0aGlzLmZpc2gubm9kZS55ID0gYmVnaW5feTtcbiAgICAgICAgZW5kX3kgPSAtTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiA1MCk7XG4gICAgICAgIHRpbWUgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDMpICsgNTtcbiAgICAgICAgLy/liqjnlLtcbiAgICAgICAgdmFyIGZpbmlzaCA9IGNjLmNhbGxGdW5jKHRoaXMuZmlzaF9tb3ZlLCB0aGlzKTtcbiAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGNjLm1vdmVCeSh0aW1lLCAtYmVnaW5feCAqIDIsIGVuZF95KSwgZmluaXNoKTtcbiAgICAgICAgdGhpcy5maXNoLm5vZGUucnVuQWN0aW9uKHNlcSk7XG5cbiAgICAgICAgLy8gdmFyIGFjdGlvbkJ5ID0gY2Muc2tld0J5KDIsIC05MCwgLTkwKTtcbiAgICAgICAgLy8gdGhpcy5maXNoLm5vZGUucnVuQWN0aW9uKGFjdGlvbkJ5KTtcbiAgICAgICAgLy/nq4vljbPpmpDol49cbiAgICAgICAgLy8gdmFyIGhpZGVBY3Rpb24gPSBjYy5oaWRlKCk7XG4gICAgICAgIC8vIHRoaXMuZmlzaC5ub2RlLnJ1bkFjdGlvbihoaWRlQWN0aW9uKTtcbiAgICB9LFxuICAgIC8v5rOh5rOh6ZuG5Lit6JClXG4gICAgY3JlYXRlX3Bhb3BhbzogZnVuY3Rpb24gY3JlYXRlX3Bhb3BhbygpIHtcbiAgICAgICAgLy8g5L2/55So57uZ5a6a55qE5qih5p2/5Zyo5Zy65pmv5Lit55Sf5oiQ5LiA5Liq5paw6IqC54K5XG4gICAgICAgIHZhciBuZXdTdGFyID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFyUHJlZmFiKTtcbiAgICAgICAgLy8g5bCG5paw5aKe55qE6IqC54K55re75Yqg5YiwIENhbnZhcyDoioLngrnkuIvpnaJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld1N0YXIpO1xuICAgICAgICAvLyB1cmxsID0gY2MudXJsLnJhdyhcImdhbWUxXzAxL2dhbWUxXzAxX2dvbGRfMDIucG5nXCIpO1xuICAgICAgICAvLyB2YXIgc3MgPSBuZXcgY2MuU3ByaXRlRnJhbWUodXJsbCk7XG4gICAgICAgIC8vIG5ld1N0YXIuc3ByaXRlRnJhbWUgPSBzcztcbiAgICAgICAgLy/ojrflj5bkuKTkuKrpmo/mnLrmlbAg5Yid5aeL54K5XG4gICAgICAgIHZhciBjaGlsZF94ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAzMDApO1xuICAgICAgICBpZiAoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSAhPSAxKSB7XG4gICAgICAgICAgICBjaGlsZF94ID0gLWNoaWxkX3g7XG4gICAgICAgIH1cbiAgICAgICAgbmV3U3Rhci5zZXRQb3NpdGlvbihjaGlsZF94LCAtMTUwKTtcbiAgICB9LFxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHRoaXMub3Zlcl90aW1lID0gMTU7IC8v5YCS6K6h5pe25Ymp5L2Z5pe26Ze0XG4gICAgICAgIHRoaXMubm93X3RpbWUgPSAwO1xuICAgICAgICB0aGlzLnJlc3VsdC5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vIHRoaXMucmVzdWx0LmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIHZhciB0aW1lTGVmdCA9IE1hdGguZmxvb3IodGhpcy5vdmVyX3RpbWUgLSB0aGlzLm5vd190aW1lKTtcbiAgICAgICAgaWYgKHRpbWVMZWZ0ID09IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5Db3VudGRvd24uc3RyaW5nID0gTWF0aC5mbG9vcih0aW1lTGVmdCAvIDM2MDApLnRvU3RyaW5nKCkgKyAnOicgKyBNYXRoLmZsb29yKHRpbWVMZWZ0ICUgMzYwMCAvIDYwKS50b1N0cmluZygpICsgXCI6XCIgKyBNYXRoLmZsb29yKHRpbWVMZWZ0ICUgMzYwMCAlIDYwKS50b1N0cmluZygpO1xuICAgICAgICB0aGlzLm5vd190aW1lICs9IGR0O1xuICAgICAgICBpZiAodGhpcy5ub3dfdGltZSA+PSB0aGlzLm92ZXJfdGltZSkge1xuICAgICAgICAgICAgdGhpcy5ub3dfdGltZSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZmM4NTNHZmQ3cE84YU8yNzVySzUwVXYnLCAncmVzdWx0X3NjcmlwdCcpO1xuLy8gc2NyaXB0XFxyZXN1bHRfc2NyaXB0LmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsaWdodDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIC8v6Ieq5a6a5LmJ6YeR5biBXG4gICAgICAgIGNvaW5QcmVmYWI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBzdGFyMToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXIyOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcblxuICAgICAgICB2YXIgYWN0aW9uQnkgPSBjYy5yZXBlYXRGb3JldmVyKGNjLnJvdGF0ZUJ5KDUsIDM2MCkpO1xuICAgICAgICAvLyB2YXIgc2VxID0gY2Muc2VxdWVuY2UoY2Mucm90YXRlQnkoMC41LC0zNjApKTtcbiAgICAgICAgdGhpcy5saWdodC5ydW5BY3Rpb24oYWN0aW9uQnkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIuaJp+ihjOi/m+adpeS6hiBcIik7XG4gICAgICAgIC8v5a6a5pe25ZmoXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8g6L+Z6YeM55qEIHRoaXMg5oyH5ZCRIGNvbXBvbmVudFxuICAgICAgICAgICAgdGhpcy5jcmVhdF9jb2luKCk7XG4gICAgICAgIH0sIDAuMSwgMjApO1xuICAgICAgICB2YXIgc3RhciA9IGNjLnJlcGVhdEZvcmV2ZXIoY2MucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgLy8gY2Muc2VxdWVuY2UoXG4gICAgICAgIGNjLnNwYXduKGNjLnNlcXVlbmNlKGNjLnNjYWxlQnkoMSwgMC4wMSwgMC4wMSksIGNjLnNjYWxlQnkoMSwgMTAwLCAxMDApKSwgY2Mucm90YXRlQnkoMiwgNzIwKSlcbiAgICAgICAgLy8gKVxuICAgICAgICApKTtcbiAgICAgICAgdmFyIHN0YXIyID0gY2MucmVwZWF0Rm9yZXZlcihjYy5yZXBlYXRGb3JldmVyKFxuICAgICAgICAvLyBjYy5zZXF1ZW5jZShcbiAgICAgICAgY2Muc3Bhd24oY2Mucm90YXRlQnkoNCwgNzIwKSlcbiAgICAgICAgLy8gKVxuICAgICAgICApKTtcbiAgICAgICAgLy8gdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGNjLnJvdGF0ZUJ5KDAuNSwtMzYwKSk7XG4gICAgICAgIHRoaXMuc3RhcjEucnVuQWN0aW9uKHN0YXIpO1xuICAgICAgICB0aGlzLnN0YXIyLnJ1bkFjdGlvbihzdGFyMik7XG4gICAgfSxcbiAgICBjcmVhdF9jb2luOiBmdW5jdGlvbiBjcmVhdF9jb2luKCkge1xuICAgICAgICAvLyDkvb/nlKjnu5nlrprnmoTmqKHmnb/lnKjlnLrmma/kuK3nlJ/miJDkuIDkuKrmlrDoioLngrlcbiAgICAgICAgdmFyIG5ld1N0YXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvaW5QcmVmYWIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIueUn+aIkOmHkeW4gVwiKTtcbiAgICAgICAgLy8g5bCG5paw5aKe55qE6IqC54K55re75Yqg5YiwIENhbnZhcyDoioLngrnkuIvpnaJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld1N0YXIpO1xuICAgICAgICAvL+iOt+WPluS4pOS4qumaj+acuuaVsCDliJ3lp4vngrlcbiAgICAgICAgdmFyIGNoaWxkX3ggPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDE1MCk7XG4gICAgICAgIGlmIChNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpICE9IDEpIHtcbiAgICAgICAgICAgIGNoaWxkX3ggPSAtY2hpbGRfeDtcbiAgICAgICAgfVxuICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKGNoaWxkX3gsIDkwMCk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdjNTJiNkRFNGZOQnpybXZkRGV6eHFqRScsICdzZXRfYmxhY2tiZycpO1xuLy8gc2NyaXB0XFxzZXRfYmxhY2tiZy5qc1xuXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIG11c2ljOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgc291bmQ6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBoZWxwOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubnVtYmVyID0gdHJ1ZTtcbiAgICAgICAgLy8gdGhpcy5zZXRhbmltYXRpb24oKTtcbiAgICB9LFxuICAgIHRvX21vdmU6IGZ1bmN0aW9uIHRvX21vdmUoKSB7XG4gICAgICAgIHZhciBzZXEgPSBjYy5tb3ZlQnkoMSwgMCwgLTE5MSkuZWFzaW5nKGNjLmVhc2VFbGFzdGljT3V0KCkpO1xuICAgICAgICB0aGlzLmJhY2sucnVuQWN0aW9uKHNlcSk7XG4gICAgICAgIHZhciBzZXExID0gY2MubW92ZUJ5KDEuMiwgMCwgLTM3MykuZWFzaW5nKGNjLmVhc2VFbGFzdGljT3V0KCkpO1xuICAgICAgICB0aGlzLm11c2ljLnJ1bkFjdGlvbihzZXExKTtcbiAgICAgICAgdmFyIHNlcTMgPSBjYy5tb3ZlQnkoMS4zLCAwLCAtNTYwKS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNPdXQoKSk7XG4gICAgICAgIHRoaXMuc291bmQucnVuQWN0aW9uKHNlcTMpO1xuICAgICAgICB2YXIgc2VxNSA9IGNjLm1vdmVCeSgxLjQsIDAsIC03MzgpLmVhc2luZyhjYy5lYXNlRWxhc3RpY091dCgpKTtcbiAgICAgICAgdGhpcy5oZWxwLnJ1bkFjdGlvbihzZXE1KTtcbiAgICB9LFxuICAgIGdvX2Nsb3NlOiBmdW5jdGlvbiBnb19jbG9zZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm51bWJlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubnVtYmVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuYmFjay55ICs9IDE5MTtcbiAgICAgICAgfSwgMC41KTtcbiAgICAgICAgLy8gdmFyIHNlcTExMTEgPSBjYy5tb3ZlQnkoMC45LDAsMTkxKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uSW4oKSlcbiAgICAgICAgLy8gdGhpcy5iYWNrLnJ1bkFjdGlvbihzZXExMTExKTtcbiAgICAgICAgdmFyIHNlcTEgPSBjYy5tb3ZlQnkoMC41LCAwLCAzNzMpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcbiAgICAgICAgdGhpcy5tdXNpYy5ydW5BY3Rpb24oc2VxMSk7XG4gICAgICAgIHZhciBzZXEyID0gY2MubW92ZUJ5KDAuNCwgMCwgNTYwKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uSW4oKSk7XG4gICAgICAgIHRoaXMuc291bmQucnVuQWN0aW9uKHNlcTIpO1xuICAgICAgICB2YXIgc2VxMyA9IGNjLm1vdmVCeSgwLjMsIDAsIDczOCkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpO1xuICAgICAgICB0aGlzLmhlbHAucnVuQWN0aW9uKHNlcTMpO1xuICAgICAgICAvLyDku6Xnp5LkuLrljZXkvY3nmoTml7bpl7Tpl7TpmpRcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5udW1iZXIgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9LCAwLjcpO1xuICAgIH0sXG4gICAgc2V0YW5pbWF0aW9uOiBmdW5jdGlvbiBzZXRhbmltYXRpb24oKSB7XG4gICAgICAgIC8vIOS7peenkuS4uuWNleS9jeeahOaXtumXtOmXtOmalFxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnRvX21vdmUoKTtcbiAgICAgICAgfSwgMC4zKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzkyNGIxdXk4RkpHRVpFdnRQWENEQ1hRJywgJ3NldHRpbmcnKTtcbi8vIHNjcmlwdFxcc2V0dGluZy5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzZXRiZzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBvblRvdWNoRG93bihldmVudCkge31cbiAgICAgICAgZnVuY3Rpb24gb25Ub3VjaFVwKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5zZXRiZy5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldGJnLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldGJnLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaERvd24sIHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hlbmQnLCBvblRvdWNoVXAsIHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hjYW5jZWwnLCBvblRvdWNoVXAsIHRoaXMubm9kZSk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc5OWQ5YndidjZGT2FKWkNwWkZFMW9iUCcsICd0dXJudGFibGUnKTtcbi8vIHNjcmlwdFxcdHVybnRhYmxlLmpzXG5cbnZhciBsYXN0cG9pbnQgPSBjYy52MigwLCAwKTsgLy/kuIrmrKHngrlcbnZhciBub3dwb2ludCA9IGNjLnYyKDAsIDApOyAvL+W9k+WJjeeCuVxudmFyIHBvaW50ID0gY2MudjIoMCwgMCk7IC8v5Y6f54K5XG52YXIgdG91Y2gxID0gZmFsc2U7XG52YXIgbGFzdHBhcmVudCA9IGNjLnYyKDAsIDApO1xudmFyIGxhc3Ryb3RhdGUgPSAwOyAvL+S4iuasoeeahOinkuW6plxudmFyIGdvX3RpbWUgPSAwOyAvL+a7keWKqOaXtumXtOWPguaVsFxudmFyIGJlZ2FuX3RvdWNoID0gY2MudjIoMCwgMCk7XG52YXIgbm93X2tlZHUgPSAwO1xuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZGFwYW46IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIHVwX2Rvd246IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGRpYW5zaHU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIG5vd19udW1iZXI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgLy8gdmFyIGFjdGlvbkJ5ID0gY2Muc2tld0J5KDIsLTkwLCAtMTgwKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb25CeSk7XG5cbiAgICAgICAgdGhpcy5tYXhfbnVtID0gd2luZG93LlNIaW5kZXggKiAwLjE7IC8v5rao5bmF5Y2V5ZCR5pyA5aSn5YC8XG4gICAgICAgIHRoaXMuc2luID0gdGhpcy5tYXhfbnVtIC8gMTgwOyAvL+avj+WIu+W6puS7o+ihqOWAvFxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5UT1VDSF9PTkVfQllfT05FLFxuICAgICAgICAgICAgb25Ub3VjaEJlZ2FuOiBmdW5jdGlvbiBvblRvdWNoQmVnYW4odG91Y2gsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0b3VjaDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaExvYzEgPSB0b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBiZWdhbl90b3VjaCA9IHRvdWNoTG9jMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoTG9jID0gc2VsZi5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRvdWNoTG9jMSk7XG4gICAgICAgICAgICAgICAgICAgIGxhc3Rwb2ludCA9IHRvdWNoTG9jO1xuICAgICAgICAgICAgICAgICAgICBsYXN0cGFyZW50ID0gdG91Y2hMb2MxO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaDEgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsYXN0cm90YXRlID0gc2VsZi5ub2RlLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gZG9uJ3QgY2FwdHVyZSBldmVudFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVG91Y2hNb3ZlZDogZnVuY3Rpb24gb25Ub3VjaE1vdmVkKHRvdWNoLCBldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0b3VjaDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzlt7Lnu4/mnInop6bmkbgg5YiZ5LiN5Y675omn6KGM5aSa54K5XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vd19udW1iZXIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoTG9jMSA9IHRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIC8v6L2s5o2i5Z2Q5qCH57O7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaExvYyA9IHNlbGYubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0b3VjaExvYzEpO1xuICAgICAgICAgICAgICAgICAgICBub3dwb2ludCA9IHRvdWNoTG9jO1xuICAgICAgICAgICAgICAgICAgICAvL+S4ieinkuWHveaVsOiuoeeul+WFrOW8j1xuICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IHBhcnNlRmxvYXQoY2MucERpc3RhbmNlKHBvaW50LCBub3dwb2ludCkpLnRvRml4ZWQoNik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiID0gcGFyc2VGbG9hdChjYy5wRGlzdGFuY2UocG9pbnQsIGxhc3Rwb2ludCkpLnRvRml4ZWQoNik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjID0gcGFyc2VGbG9hdChjYy5wRGlzdGFuY2UobGFzdHBvaW50LCBub3dwb2ludCkpLnRvRml4ZWQoNik7XG4gICAgICAgICAgICAgICAgICAgIHZhciByb3RhdGlvbiA9IDE4MCAqIE1hdGguYWNvcygoYSAqIGEgKyBiICogYiAtIGMgKiBjKSAvICgyICogYSAqIGIpKSAvIE1hdGguUEk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHZhciByb3RhdGlvbiA9IHBhcnNlRmxvYXQoKGEqYSArIGIqYiAtIGMqYykvKDIqYSpiKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZGF5XzUubm9kZS5yb3RhdGlvbiA9IDE4MCpNYXRoLmFzaW4oIGEvYyApLyBNYXRoLlBJO1xuXG4gICAgICAgICAgICAgICAgICAgIC8q56e75Yqo6L2s5ZyI56yo5pa55rOV5Yik5patICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDEuIOi9rOaNouWdkOagh+ezuyzlsY/luZXln7rngrnlnZDmoIfkvb/nlKjkuJbnlYzlnZDmoIcs56e75Yqo5Z2Q5qCH5L2/55So6Ieq5bex5Z2Q5qCHXG4gICAgICAgICAgICAgICAgICAgICAgICAyLiDnm67liY3lj6rlgZrmvI/lh7rmnaXnmoTpg6jliIbmi5bliqgg5LiL5pa55LiN6ICD6JmRXG4gICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0cGFyZW50LnggPiB0b3VjaExvYzEueCAmJiB0b3VjaExvYzEueSA+IDQ0NCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/lnKjkuIrovrnlkJHlt6bmi5bliqhcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZS5yb3RhdGlvbiAtPSByb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0cGFyZW50LnggPCB0b3VjaExvYzEueCAmJiB0b3VjaExvYzEueSA+IDQ0NCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/lnKjkuIrovrnlkJHlj7Pmi5bliqhcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZS5yb3RhdGlvbiArPSByb3RhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8v56e75Yqo5a6M5LiA5qyh5LmL5ZCO5Yid5aeL5YyW5LiA5LiL5Z2Q5qCHXG4gICAgICAgICAgICAgICAgICAgIGxhc3Rwb2ludCA9IG5vd3BvaW50O1xuICAgICAgICAgICAgICAgICAgICBsYXN0cGFyZW50ID0gdG91Y2hMb2MxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRvdWNoRW5kZWQ6IGZ1bmN0aW9uIG9uVG91Y2hFbmRlZCh0b3VjaCwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAvL+aKrOi1t+aJi+aMh+aXtiDph43mlrDliJ3lp4vljJbmiYDmnInlj5jph49cbiAgICAgICAgICAgICAgICBpZiAoZ29fdGltZSA8PSAwLjIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoTG9jID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlZ2FuX3RvdWNoLnggIT0gdG91Y2hMb2MueCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvX251bSA9ICh0b3VjaExvYy54IC0gYmVnYW5fdG91Y2gueCkgLyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+S5i+WJjeeahHg6JyArIGJlZ2FuX3RvdWNoLnggKyAn5LmL5ZCO55qEeDonICsgdG91Y2hMb2MueCArICfmr5TkvosnICsgcm9fbnVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm9fbnVtID49IDEgfHwgcm9fbnVtIDw9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvX251bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VxID0gY2Mucm90YXRlQnkoMiwgMTA4MCkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXEgPSBjYy5yb3RhdGVCeSgyLCAtMTA4MCkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcSA9IGNjLnJvdGF0ZUJ5KDIgKiBNYXRoLmFicyhyb19udW0pLCAxMDgwICogcm9fbnVtKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5ub2RlLnJ1bkFjdGlvbihzZXEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3Rwb2ludCA9IGNjLnYyKDAsIDApO1xuICAgICAgICAgICAgICAgIG5vd3BvaW50ID0gY2MudjIoMCwgMCk7XG4gICAgICAgICAgICAgICAgbGFzdHBhcmVudCA9IGNjLnYyKDAsIDApO1xuICAgICAgICAgICAgICAgIC8vIHNlbGYubm93X251bWJlci5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0b3VjaDEgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc2VsZik7XG4gICAgfSxcbiAgICAvL+agueaNruWPguaVsCDorqnnm5jlrZDovazlnIhcbiAgICB0b190dXJuYWJsZTogZnVuY3Rpb24gdG9fdHVybmFibGUobnVtKSB7XG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAvLyB0aGlzLm1heF9udW0gPSB3aW5kb3cuU0hpbmRleCAqIDAuMTsvL+a2qOW5heWNleWQkeacgOWkp+WAvFxuICAgICAgICAvLyB0aGlzLnNpbiA9IHRoaXMubWF4X251bSAvIDE4MDsvL+avj+WIu+W6puS7o+ihqOWAvFxuICAgICAgICB2YXIgcm90ZSA9IG51bSAvIHRoaXMuc2luOyAvL+W9k+WJjeinkuW6plxuICAgICAgICB2YXIgc2VxID0gY2Mucm90YXRlVG8oMC41LCByb3RlKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHNlcSk7XG4gICAgfSxcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8v6K6h566X5Yqg6YCf5bqm5YWs5byPXG4gICAgICAgIGlmICh0b3VjaDEpIHtcbiAgICAgICAgICAgIGdvX3RpbWUgKz0gZHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnb190aW1lID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvL+WIt+aWsOWciOaVsFxuICAgICAgICBpZiAodGhpcy5ub2RlLnJvdGF0aW9uID4gMzYwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUucm90YXRpb24gLT0gMzYwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm9kZS5yb3RhdGlvbiA8IC0zNjApIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5yb3RhdGlvbiArPSAzNjA7XG4gICAgICAgIH1cbiAgICAgICAgLy/ovazlnIjpgLvovpFcbiAgICAgICAgbm93X2tlZHUgPSBzZWxmLm5vZGUucm90YXRpb247XG4gICAgICAgIGlmIChzZWxmLm5vZGUucm90YXRpb24gPiAxODApIHtcbiAgICAgICAgICAgIG5vd19rZWR1ID0gLSgzNjAgLSBzZWxmLm5vZGUucm90YXRpb24pO1xuICAgICAgICB9IGVsc2UgaWYgKHNlbGYubm9kZS5yb3RhdGlvbiA8IC0xODApIHtcbiAgICAgICAgICAgIG5vd19rZWR1ID0gMzYwICsgc2VsZi5ub2RlLnJvdGF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIG5vd19rZWR1ID0gTWF0aC5mbG9vcihzZWxmLnNpbiAqIG5vd19rZWR1KTtcbiAgICAgICAgc2VsZi5kYXBhbi5zdHJpbmcgPSB3aW5kb3cuU0hpbmRleCArIG5vd19rZWR1O1xuICAgICAgICB2YXIgYmFpZmVuYmkgPSBub3dfa2VkdSAvIHdpbmRvdy5TSGluZGV4ICogMTAwO1xuICAgICAgICBpZiAoYmFpZmVuYmkgPiAxMCkge1xuICAgICAgICAgICAgYmFpZmVuYmkgPSAxMDtcbiAgICAgICAgfSBlbHNlIGlmIChiYWlmZW5iaSA8IC0xMCkge1xuICAgICAgICAgICAgYmFpZmVuYmkgPSAtMTA7XG4gICAgICAgIH1cbiAgICAgICAgLy/loavlhpnliLvluqZcbiAgICAgICAgaWYgKG5vd19rZWR1ID4gMCkge1xuICAgICAgICAgICAgc2VsZi5kaWFuc2h1LnN0cmluZyA9IFwi5raoIFwiICsgbm93X2tlZHUgKyBcIiDngrlcIjtcbiAgICAgICAgICAgIHNlbGYudXBfZG93bi5zdHJpbmcgPSBcIitcIiArIG5vd19rZWR1ICsgXCIgKCtcIiArIE1hdGguZmxvb3IoYmFpZmVuYmkpICsgXCIlKVwiO1xuICAgICAgICAgICAgc2VsZi5kaWFuc2h1Lm5vZGUuY29sb3IgPSBjYy5jb2xvcigyMzcsIDEwNiwgMTA2LCAyNTUpO1xuICAgICAgICAgICAgc2VsZi51cF9kb3duLm5vZGUuY29sb3IgPSBjYy5jb2xvcigyMzcsIDEwNiwgMTA2LCAyNTUpO1xuICAgICAgICAgICAgc2VsZi5kYXBhbi5ub2RlLmNvbG9yID0gY2MuY29sb3IoMjM3LCAxMDYsIDEwNiwgMjU1KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZGlhbnNodS5zdHJpbmcgPSBcIui3jCBcIiArIE1hdGguYWJzKG5vd19rZWR1KSArIFwiIOeCuVwiO1xuICAgICAgICAgICAgc2VsZi51cF9kb3duLnN0cmluZyA9IG5vd19rZWR1ICsgXCIgKFwiICsgTWF0aC5mbG9vcihiYWlmZW5iaSkgKyBcIiUpXCI7XG4gICAgICAgICAgICBzZWxmLmRpYW5zaHUubm9kZS5jb2xvciA9IGNjLmNvbG9yKDExNywgMjEyLCAxNzQsIDI1NSk7XG4gICAgICAgICAgICBzZWxmLnVwX2Rvd24ubm9kZS5jb2xvciA9IGNjLmNvbG9yKDExNywgMjEyLCAxNzQsIDI1NSk7XG4gICAgICAgICAgICBzZWxmLmRhcGFuLm5vZGUuY29sb3IgPSBjYy5jb2xvcigxMTcsIDIxMiwgMTc0LCAyNTUpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc1YTVlZmVTNzVGRXY0Q0FKbFNTN09IQScsICd2b2lzZScpO1xuLy8gc2NyaXB0XFx2b2lzZS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzZXR2b2lzZToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBzZXR2b2lzZTE6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gb25Ub3VjaERvd24oZXZlbnQpIHt9XG4gICAgICAgIGZ1bmN0aW9uIG9uVG91Y2hVcChldmVudCkge1xuICAgICAgICAgICAgaWYgKHNlbGYuc2V0dm9pc2UuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXR2b2lzZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLnNldHZvaXNlMS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldHZvaXNlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXR2b2lzZTEuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaERvd24sIHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hlbmQnLCBvblRvdWNoVXAsIHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hjYW5jZWwnLCBvblRvdWNoVXAsIHRoaXMubm9kZSk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICcyYmUyMFE3UzI1SWxwanNqQjVQcm5PUicsICd3YWl0Jyk7XG4vLyBzY3JpcHRcXHdhaXQuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyJdfQ==
