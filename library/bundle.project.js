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
},{}]},{},["paowuxian","GameMain","wait","voise","pp_control","setting","turntable","paopao","MainLogin","set_blackbg","jinbi","ButtonScale","result_script"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2RlbGwvQXBwRGF0YS9Mb2NhbC9Db2Nvc0NyZWF0b3IvYXBwLTEuMC4zL3Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL3NjcmlwdC9CdXR0b25TY2FsZS5qcyIsImFzc2V0cy9zY3JpcHQvR2FtZU1haW4uanMiLCJhc3NldHMvc2NyaXB0L01haW5Mb2dpbi5qcyIsImFzc2V0cy9zY3JpcHQvamluYmkuanMiLCJhc3NldHMvc2NyaXB0L3Bhb3Bhby5qcyIsImFzc2V0cy9zY3JpcHQvcGFvd3V4aWFuLmpzIiwiYXNzZXRzL3NjcmlwdC9wcF9jb250cm9sLmpzIiwiYXNzZXRzL3NjcmlwdC9yZXN1bHRfc2NyaXB0LmpzIiwiYXNzZXRzL3NjcmlwdC9zZXRfYmxhY2tiZy5qcyIsImFzc2V0cy9zY3JpcHQvc2V0dGluZy5qcyIsImFzc2V0cy9zY3JpcHQvdHVybnRhYmxlLmpzIiwiYXNzZXRzL3NjcmlwdC92b2lzZS5qcyIsImFzc2V0cy9zY3JpcHQvd2FpdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZDRkMDNKSTRqSkwzcjkwdGs3TFZHblQnLCAnQnV0dG9uU2NhbGUnKTtcbi8vIHNjcmlwdFxcQnV0dG9uU2NhbGUuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwcmVzc2VkU2NhbGU6IDEsXG4gICAgICAgIHRyYW5zRHVyYXRpb246IDBcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yeg5qyhXCIpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuaW5pdFNjYWxlID0gdGhpcy5ub2RlLnNjYWxlO1xuICAgICAgICBzZWxmLmJ1dHRvbiA9IHNlbGYuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgIHNlbGYuc2NhbGVEb3duQWN0aW9uID0gY2Muc2NhbGVUbyhzZWxmLnRyYW5zRHVyYXRpb24sIHNlbGYucHJlc3NlZFNjYWxlKTtcbiAgICAgICAgc2VsZi5zY2FsZVVwQWN0aW9uID0gY2Muc2NhbGVUbyhzZWxmLnRyYW5zRHVyYXRpb24sIHNlbGYuaW5pdFNjYWxlKTtcbiAgICAgICAgZnVuY3Rpb24gb25Ub3VjaERvd24oZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMucnVuQWN0aW9uKHNlbGYuc2NhbGVEb3duQWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvblRvdWNoVXAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMucnVuQWN0aW9uKHNlbGYuc2NhbGVVcEFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaERvd24sIHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hlbmQnLCBvblRvdWNoVXAsIHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hjYW5jZWwnLCBvblRvdWNoVXAsIHRoaXMubm9kZSk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICcwZGFiZVc3VE85RmtxbEdkNFJPa2x1ZCcsICdHYW1lTWFpbicpO1xuLy8gc2NyaXB0XFxHYW1lTWFpbi5qc1xuXG52YXIgb3BlbnZvaXNlID0gdHJ1ZTsgLy/mmK/lkKblvIDlkK/mjInpkq7pn7PmlYhcbnZhciBfb3Blbm11c2ljID0gdHJ1ZTsgLy/mmK/lkKblvIDlkK/og4zmma/pn7PkuZBcbnZhciBTSGluZGV4ID0gMzYxNi4xMTsgLy/lvIDnm5jkuIror4HmjIfmlbBcbndpbmRvdy5TSGluZGV4ID0gMzYxNjtcbnZhciBteV9zaG9pc2UgPSAwOyAvL+aIkeernueMnOeahOa2qOi3jOeCuVxudmFyIG51bV9vZl9wbGF5ZXIgPSAxMDA7IC8v5Y+C5LiO56ue54yc5Lq65pWwXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy/lrprkuYnkuIDkuKrpn7PmlYjnsbvlnotcbiAgICAgICAgdm9pc2U6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgLy/lrprkuYnkuIDkuKrpn7PkuZDnsbvlnotcbiAgICAgICAgbXVzaWM6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgLy/kuKTkuKrpgqPllaVcbiAgICAgICAgZG93bjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGRvd24yOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgLy/noa7lrprmjInpkq5cbiAgICAgICAgcXVlZGluZzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICAvL+e7k+aenFxuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgLy/lj4LkuI7mlbDph49cbiAgICAgICAgcGxheWVyczoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICAvL+WPguS4jueOqeWutuavlOS+i1xuICAgICAgICBwbGF5X2JmYjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICAvL+a2qOi3jOWNoOavlOiDjOaZr1xuICAgICAgICBudW1fYmc6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXG4gICAgICAgIH0sXG4gICAgICAgIHVwX2Rvd246IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgaGVscDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIEJtdXNpYzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIENtdXNpYzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIHNvdW5kOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgY3NvdW5kOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8g5Yid5aeL5YyW5Yqg6L29IOebuOW9k+S6jmluaXTlh73mlbBcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuICAgIC8v5byA5ZCv5bm25pKt5pS+6Z+z5pWIXG4gICAgb3BlbnZvaXM6IGZ1bmN0aW9uIG9wZW52b2lzKCkge1xuICAgICAgICBvcGVudm9pc2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyDov5nph4znmoQgdGhpcyDmjIflkJEgY29tcG9uZW50XG4gICAgICAgICAgICB0aGlzLmNzb3VuZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc291bmQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSwgMC4xNSk7XG4gICAgICAgIHRoaXMucGxheXZvaXNlKCk7XG4gICAgfSxcbiAgICAvL+WFs+mXremfs+aViFxuICAgIGNsb3Nldm9pczogZnVuY3Rpb24gY2xvc2V2b2lzKCkge1xuICAgICAgICBvcGVudm9pc2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8g6L+Z6YeM55qEIHRoaXMg5oyH5ZCRIGNvbXBvbmVudFxuICAgICAgICAgICAgdGhpcy5zb3VuZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY3NvdW5kLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0sIDAuMTUpO1xuICAgIH0sXG4gICAgLy/lvIDlkK/lubbmkq3mlL7og4zmma/pn7PkuZBcbiAgICBvcGVubXVzaWM6IGZ1bmN0aW9uIG9wZW5tdXNpYygpIHtcbiAgICAgICAgX29wZW5tdXNpYyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8g6L+Z6YeM55qEIHRoaXMg5oyH5ZCRIGNvbXBvbmVudFxuICAgICAgICAgICAgdGhpcy5DbXVzaWMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLkJtdXNpYy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9LCAwLjE1KTtcbiAgICAgICAgdGhpcy5wbGF5bXVzaWMoKTtcbiAgICB9LFxuICAgIC8v5YWz6Zet6IOM5pmv6Z+z5LmQXG4gICAgY2xvc2VtdXNpYzogZnVuY3Rpb24gY2xvc2VtdXNpYygpIHtcbiAgICAgICAgX29wZW5tdXNpYyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyDov5nph4znmoQgdGhpcyDmjIflkJEgY29tcG9uZW50XG4gICAgICAgICAgICB0aGlzLkJtdXNpYy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuQ211c2ljLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0sIDAuMTUpO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWModHJ1ZSk7XG4gICAgfSxcbiAgICAvL+aSreaUvuiDjOaZr+mfs+S5kFxuICAgIHBsYXltdXNpYzogZnVuY3Rpb24gcGxheW11c2ljKCkge1xuXG4gICAgICAgIGlmIChfb3Blbm11c2ljKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5tdXNpYywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvL+aSreaUvumfs+aViFxuICAgIHBsYXl2b2lzZTogZnVuY3Rpb24gcGxheXZvaXNlKCkge1xuICAgICAgICBpZiAob3BlbnZvaXNlKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMudm9pc2UsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy/nlJ/miJDpmo/mnLrmlbBcbiAgICByYW5kb206IGZ1bmN0aW9uIHJhbmRvbSgpIHtcbiAgICAgICAgdGhpcy5wbGF5dm9pc2UoKTtcbiAgICAgICAgLy/nlJ/miJDpmo/mnLrmlbBcbiAgICAgICAgdmFyIHpoZW5nZnU7XG4gICAgICAgIC8vIDExNywyMTIsMTc0XG4gICAgICAgIC8vMjM3LDEwNiwxMDZcbiAgICAgICAgemhlbmdmdSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSk7XG4gICAgICAgIG15X3Nob2lzZSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogU0hpbmRleCAqIDAuMSk7XG4gICAgICAgIGlmICh6aGVuZ2Z1ID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMucXVlZGluZy5zdHJpbmcgPSBcIua2qCBcIiArIG15X3Nob2lzZSArIFwiIOeCuVwiO1xuICAgICAgICAgICAgdGhpcy5xdWVkaW5nLm5vZGUuY29sb3IgPSBjYy5jb2xvcigyMzcsIDEwNiwgMTA2LCAyNTUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5xdWVkaW5nLnN0cmluZyA9IFwi6LeMIFwiICsgbXlfc2hvaXNlICsgXCIg54K5XCI7XG4gICAgICAgICAgICB0aGlzLnF1ZWRpbmcubm9kZS5jb2xvciA9IGNjLmNvbG9yKDExNywgMjEyLCAxNzQsIDI1NSk7XG4gICAgICAgICAgICBteV9zaG9pc2UgPSAtbXlfc2hvaXNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZCA9IHRoaXMuZG93bi5nZXRDaGlsZEJ5TmFtZShcInR1cm50YWJsZVwiKS5nZXRDb21wb25lbnQoXCJ0dXJudGFibGVcIik7XG4gICAgICAgIGRkLnRvX3R1cm5hYmxlKG15X3Nob2lzZSk7XG4gICAgfSxcbiAgICBnb19oZWxwOiBmdW5jdGlvbiBnb19oZWxwKCkge1xuICAgICAgICBpZiAodGhpcy5oZWxwLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5oZWxwLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWxwLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlc3VsdF9iYWNrOiBmdW5jdGlvbiByZXN1bHRfYmFjaygpIHtcbiAgICAgICAgLy8g6L+Z6YeM55qEIHRoaXMg5oyH5ZCRIGNvbXBvbmVudFxuICAgICAgICBpZiAodGhpcy5kb3duLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5kb3duLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kb3duMi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb3duLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRvd24yLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvL+ehruWumlxuICAgIHN1cmU6IGZ1bmN0aW9uIHN1cmUoKSB7XG4gICAgICAgIHRoaXMucGxheXZvaXNlKCk7XG4gICAgICAgIC8v562J5LqOMCDlsLHpu5jorqTmmK/msqHmnInpgInmi6nmtqjot4zngrnmlbAgIOS4jee7meS9v+eUqOehruiupOaMiemSrlxuICAgICAgICB2YXIgc3VyZV9udW07XG4gICAgICAgIHN1cmVfbnVtID0gdGhpcy5xdWVkaW5nLnN0cmluZztcbiAgICAgICAgaWYgKG15X3Nob2lzZSA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy/noa7lrprkuobkuYvlkI7lkITnp43lhpl+XG4gICAgICAgIHRoaXMucmVzdWx0LnN0cmluZyA9IFwi6aKE5rWL5LiK6K+B5oyH5pWwOiBcIiArIChTSGluZGV4ICsgbXlfc2hvaXNlKSArIFwiIFwiICsgbXlfc2hvaXNlICsgXCIgKFwiICsgKG15X3Nob2lzZSAqIDEwMCAvIFNIaW5kZXgpLnRvRml4ZWQoMikgKyBcIiUpXCI7XG4gICAgICAgIC8v54yc5rao6L+Y5piv54yc6LeMXG4gICAgICAgIHZhciB1cmxsO1xuICAgICAgICBpZiAobXlfc2hvaXNlID4gMCkge1xuICAgICAgICAgICAgdGhpcy51cF9kb3duLnN0cmluZyA9ICfnjJzmtqgnO1xuICAgICAgICAgICAgLy/lj4LkuI7nq57njJzkurrmlbBcbiAgICAgICAgICAgIHRoaXMucGxheWVycy5zdHJpbmcgPSBcIuW3sue7j+aciVwiICsgbnVtX29mX3BsYXllciArIFwi5Lq65Y+C5LiO77yM54yc5rao5Y2gXCI7XG4gICAgICAgICAgICAvL+a2qOi3jOe7k+aenOS4reeahOiDjOaZr+Wwj+WbvueJh1xuICAgICAgICAgICAgdXJsbCA9IGNjLnVybC5yYXcoXCJnYW1lMV8wMS9nYW1lMV8wMl9pbWdfMDUucG5nXCIpO1xuICAgICAgICAgICAgdmFyIHRleHR1cmUgPSBjYy50ZXh0dXJlQ2FjaGUuYWRkSW1hZ2UodXJsbCk7XG4gICAgICAgICAgICB0aGlzLm51bV9iZy5zcHJpdGVGcmFtZS5zZXRUZXh0dXJlKHRleHR1cmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cF9kb3duLnN0cmluZyA9ICfnjJzot4wnO1xuICAgICAgICAgICAgLy/lj4LkuI7nq57njJzkurrmlbBcbiAgICAgICAgICAgIHRoaXMucGxheWVycy5zdHJpbmcgPSBcIuW3sue7j+aciVwiICsgbnVtX29mX3BsYXllciArIFwi5Lq65Y+C5LiO77yM54yc6LeM5Y2gXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy/njJzmtqgv6LeMIOS6uuaVsOeahOeZvuWIhuS5i+eZvlxuICAgICAgICB0aGlzLnBsYXlfYmZiLnN0cmluZyA9IFwiNTUlXCI7XG4gICAgICAgIC8vIOS7peenkuS4uuWNleS9jeeahOaXtumXtOmXtOmalFxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyDov5nph4znmoQgdGhpcyDmjIflkJEgY29tcG9uZW50XG4gICAgICAgICAgICBpZiAodGhpcy5kb3duLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG93bi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvd24yLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3duMi5nZXRDaGlsZEJ5TmFtZShcIndhdGVyX2JnXCIpLmdldENvbXBvbmVudChcInBwX2NvbnRyb2xcIikuaW5pdCgpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuZG93bjIuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3duLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bjIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9LCAwLjUpO1xuICAgIH0sXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge31cbiAgICAvLy8vLy8vLy8vLy8vLy/ov5nph4zmmK/kuIDkupvluLjnlKjnmoTkuJzkuJxjb3B5Ly8vLy8vLy8vLy8vLyBmb3IgIGd1b2Jhb2x1XG4gICAgLyogICgxKeiuoeaXtuWZqFxyXG4gICAgICAgICAgICAgLy8g5Lul56eS5Li65Y2V5L2N55qE5pe26Ze06Ze06ZqUXHJcbiAgICAgICAgICAgICB2YXIgaW50ZXJ2YWwgPSA1O1xyXG4gICAgICAgICAgICAgLy8g6YeN5aSN5qyh5pWwXHJcbiAgICAgICAgICAgICB2YXIgcmVwZWF0ID0gMztcclxuICAgICAgICAgICAgIC8vIOW8gOWni+W7tuaXtlxyXG4gICAgICAgICAgICAgdmFyIGRlbGF5ID0gMTA7XHJcbiAgICAgICAgICAgICBjb21wb25lbnQuc2NoZWR1bGUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgLy8g6L+Z6YeM55qEIHRoaXMg5oyH5ZCRIGNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgIHRoaXMuZG9Tb21ldGhpbmcoKTtcclxuICAgICAgICAgICAgIH0sIGludGVydmFsLCByZXBlYXQsIGRlbGF5KTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICgyKeiuvue9ruWjsOmfs+OAgemfs+aViOWkp+Wwj+eahFxyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRFZmZlY3RzVm9sdW1lKDAuNSk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDAuNSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAoMynnm5HlkKzlmajnmoTnuqfliKtcclxuICAgICAgICAgICAg55uR5ZCs5Zmo55qE5LyY5YWI57qn5piv5Z+65LqO5q2k6IqC54K555qE57uY5Yi26aG65bqP5oiWZml4ZWRQcm9pb3JpdHko5L+u5pS555uR5ZCs5Zmo55qE5LyY5YWI57qnKVxyXG4gICAgICAgIFxyXG4gICAgICAgICg0KeS5neWmueaOp+S7tiBzY2FsZTlTUHJpdGVcclxuICAgICovXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2JhMTNiWXRYRlJCaXJOV2g3akQzZk1NJywgJ01haW5Mb2dpbicpO1xuLy8gc2NyaXB0XFxNYWluTG9naW4uanNcblxuXG4vL1xuLy8gVGlwc++8mlxuLy8g5om+5Yiw55qE5LiL6L295Zu+54mH572R5Z2A6L+H6ZW/77yM5Y+v5Lul5b+955Wl44CCXG4vLyDmnKzmlZnnqIvkuLvopoHov5jmmK/kvZPnjrDlpoLkvZXkvb/nlKhMb2FkZXLnmoTov5vluqbmnaHjgIJcbi8vLSA0NTcgICAxOVxudmFyIG5vd190aW1lID0gMTtcbnZhciBpc19sb2FkID0gZmFsc2U7XG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwcm9ncmVzc0Jhcjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIG5pdToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcblxuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3Iuc2V0RGlzcGxheVN0YXRzKGZhbHNlKTsgLy/pmpDol4/mjonlt6bkuIvop5LnmoRmcHMg5bin546H5ZWl5ZWl55qEXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJNYWluR2FtZVwiLCB0aGlzLl9jb21wbGV0ZUNhbGxiYWNrLmJpbmQodGhpcykpO1xuICAgICAgICB2YXIgYW5pbSA9IHRoaXMubml1LmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICB2YXIgYW5pbVN0YXRlID0gYW5pbS5wbGF5KCdsb2FkaW5nbml1Jyk7XG4gICAgICAgIGFuaW1TdGF0ZS5yZXBlYXRDb3VudCA9IEluZmluaXR5O1xuICAgIH0sXG5cbiAgICBfcHJvZ3Jlc3NDYWxsYmFjazogZnVuY3Rpb24gX3Byb2dyZXNzQ2FsbGJhY2soY29tcGxldGVkQ291bnQsIHRvdGFsQ291bnQsIHJlcykge1xuXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XG5cbiAgICAgICAgdGhpcy5jb21wbGV0ZWRDb3VudCA9IGNvbXBsZXRlZENvdW50O1xuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSB0b3RhbENvdW50O1xuICAgIH0sXG5cbiAgICBfY29tcGxldGVDYWxsYmFjazogZnVuY3Rpb24gX2NvbXBsZXRlQ2FsbGJhY2soZXJyb3IsIHJlcykge1xuICAgICAgICB0aGlzLnJlc291cmNlID0gcmVzO1xuICAgICAgICBpc19sb2FkID0gdHJ1ZTtcbiAgICAgICAgbm93X3RpbWUgKz0gMTA7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZS54ID49IDE5KSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5ydW5TY2VuZSh0aGlzLnJlc291cmNlLnNjZW5lKTtcbiAgICAgICAgICAgIHRoaXMubml1Lm5vZGUueCA9IC0yNDA7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IC00NTc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc19sb2FkICYmIHRoaXMubm9kZS54IDwgLTUwKSB7fSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubml1Lm5vZGUueCArPSBub3dfdGltZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IG5vd190aW1lO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdjOTAwNDJsS3RaQldhdDNxSC95dmJYaScsICdqaW5iaScpO1xuLy8gc2NyaXB0XFxqaW5iaS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIHZvaXNlOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIG1vaHU6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuXG4gICAgICAgIC8v5Yqo5L2c5Lul5Y+K5Yqo5L2c5Zue6LCDXG4gICAgICAgIHZhciBmaW5pc2ggPSBjYy5jYWxsRnVuYyh0aGlzLmNhbGxiYWNrMSwgdGhpcyk7XG4gICAgICAgIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMiwgMCwgLTkwMCkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpLCBjYy5tb3ZlQnkoMC41LCAwLCAyMCkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKSwgY2MubW92ZUJ5KDAuNSwgMCwgLTIwKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uSW4oKSksIGZpbmlzaCk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oc2VxKTtcbiAgICB9LFxuICAgIGJlZ2FpbjogZnVuY3Rpb24gYmVnYWluKCkge30sXG4gICAgY2FsbGJhY2sxOiBmdW5jdGlvbiBjYWxsYmFjazEoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy52b2lzZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fVxuICAgIC8vIHRoaXMua2Fua2FuLnN0cmluZyA9IGVuZF94O1xuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYTBkNjhLOHEzZEltclcrN1A0K0YvZzcnLCAncGFvcGFvJyk7XG4vLyBzY3JpcHRcXHBhb3Bhby5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICAvL+WKqOS9nOS7peWPiuWKqOS9nOWbnuiwg1xuICAgICAgICB2YXIgZmluaXNoID0gY2MuY2FsbEZ1bmModGhpcy5jYWxsYmFjazEsIHRoaXMpO1xuICAgICAgICB2YXIgc2VxID0gY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLCAwLjEsIDAuMSksIGNjLnNwYXduKGNjLnNjYWxlVG8oMiwgMC44LCAwLjgpLCBjYy5tb3ZlQnkoMiwgMCwgMTYwKSksIGZpbmlzaCk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oc2VxKTtcbiAgICB9LFxuICAgIGJlZ2FpbjogZnVuY3Rpb24gYmVnYWluKCkge30sXG4gICAgY2FsbGJhY2sxOiBmdW5jdGlvbiBjYWxsYmFjazEoKSB7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9XG4gICAgLy8gdGhpcy5rYW5rYW4uc3RyaW5nID0gZW5kX3g7XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICcwOWRiYTdsS0dCTGliZHJpbGlOYmczdCcsICdwYW93dXhpYW4nKTtcbi8vIHNjcmlwdFxccGFvd3V4aWFuLmpzXG5cbnZhciBtaSA9IDA7XG52YXIgZ28gPSB0cnVlO1xuXG52YXIgZ29iYWNrID0gY2MuZmFkZUluKDAuMyk7XG52YXIgZ29iYWNrMSA9IGNjLmZhZGVJbigwLjMpO1xudmFyIGdvb3V0ID0gY2MuZmFkZU91dCgxKTtcbnZhciBnb291dDEgPSBjYy5mYWRlT3V0KDEpO1xudmFyIG1pbnNpemUgPSBjYy5zY2FsZVRvKDAsIDAuMSwgMC4xKTtcbnZhciBtaW5zaXplMSA9IGNjLnNjYWxlVG8oMCwgMC4xLCAwLjEpO1xudmFyIG1heHNpemUgPSBjYy5zY2FsZVRvKDAuMywgMSwgMSk7XG52YXIgbWF4c2l6ZTEgPSBjYy5zY2FsZVRvKDAuMywgMSwgMSk7XG5jYy5DbGFzcyh7XG5cbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB3YXRlcjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfSxcbiAgICAgICAgd2F0ZXIxOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICAvL+WIneWni+WMluawtOePoOWkp+Wwj1xuICAgICAgICB0aGlzLndhdGVyLm5vZGUucnVuQWN0aW9uKG1pbnNpemUpO1xuICAgICAgICB0aGlzLndhdGVyMS5ub2RlLnJ1bkFjdGlvbihtaW5zaXplMSk7XG4gICAgICAgIC8v6Lez6LeD55qE5Lik5Liq5Yqo5L2cXG4gICAgICAgIHZhciBqdW1wVXAgPSBjYy5tb3ZlQnkoMC43LCBjYy5wKDEsIDQ1MCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSk7XG4gICAgICAgIHZhciBqdW1wRG93biA9IGNjLm1vdmVCeSgwLjcsIGNjLnAoMSwgLTQ1MCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcbiAgICAgICAgLy/lm57osIPlh73mlbBcbiAgICAgICAgdmFyIGZpbmlzaCA9IGNjLmNhbGxGdW5jKHRoaXMuZmlzaF9tb3ZlLCB0aGlzKTtcbiAgICAgICAgdmFyIGZpbmlzaDEgPSBjYy5jYWxsRnVuYyh0aGlzLmRlbGF5dGltZSwgdGhpcyk7XG4gICAgICAgIC8v5peL6L2sXG4gICAgICAgIHZhciByb3RhdGUgPSBjYy5yb3RhdGVCeSgxLjUsIC0xODApO1xuICAgICAgICB2YXIgcm90YXRlMSA9IGNjLnJvdGF0ZUJ5KDAsIDE4MCk7XG4gICAgICAgIC8v5bu26L+fXG4gICAgICAgIHZhciBkZWxheSA9IGNjLmRlbGF5VGltZSgyKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLnNwYXduKGNjLnNlcXVlbmNlKGp1bXBVcCwganVtcERvd24sZmluaXNoKSxyb3RhdGUpLHJvdGF0ZTEsZGVsYXksZmluaXNoMSkpKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zcGF3bihjYy5zZXF1ZW5jZShqdW1wVXAsIGp1bXBEb3duLCBmaW5pc2gpLCByb3RhdGUpLCByb3RhdGUxLCBkZWxheSwgZmluaXNoMSkpO1xuICAgIH0sXG4gICAgd2F0ZXJfaW5pdDogZnVuY3Rpb24gd2F0ZXJfaW5pdCgpIHtcbiAgICAgICAgLy/liJ3lp4vljJbmsLTnj6DlpKflsI9cbiAgICAgICAgdGhpcy53YXRlci5ub2RlLnJ1bkFjdGlvbihtaW5zaXplKTtcbiAgICAgICAgdGhpcy53YXRlcjEubm9kZS5ydW5BY3Rpb24obWluc2l6ZTEpO1xuICAgICAgICB0aGlzLndhdGVyLm5vZGUueCA9IC0yMTU7XG4gICAgICAgIHRoaXMud2F0ZXIubm9kZS55ID0gMzI7XG4gICAgICAgIHRoaXMud2F0ZXIxLm5vZGUueCA9IC0yNjI7XG4gICAgICAgIHRoaXMud2F0ZXIxLm5vZGUueSA9IDQ2O1xuICAgIH0sXG4gICAgZmlzaF9tb3ZlOiBmdW5jdGlvbiBmaXNoX21vdmUoKSB7XG4gICAgICAgIC8v5rC054+g5Yqo55S7IOa6heWwhOaViOaenFxuICAgICAgICB2YXIgd2F0ZXJtb3ZlID0gY2MubW92ZUJ5KDAuMywgNDgsIDM5KTtcbiAgICAgICAgdmFyIHdhdGVyMW1vdmUgPSBjYy5tb3ZlQnkoMC4zLCAtMTcsIDQ1KTtcbiAgICAgICAgdGhpcy53YXRlci5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zcGF3bihnb2JhY2ssIG1heHNpemUsIHdhdGVybW92ZSksIGdvb3V0KSk7XG4gICAgICAgIHRoaXMud2F0ZXIxLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNwYXduKGdvYmFjazEsIG1heHNpemUxLCB3YXRlcjFtb3ZlKSwgZ29vdXQxKSk7XG5cbiAgICAgICAgdGhpcy5ub2RlLnggPSAzNjA7XG4gICAgICAgIHRoaXMubm9kZS55ID0gLTExMDtcbiAgICAgICAgbWkgPSAwO1xuICAgICAgICBnbyA9IGZhbHNlO1xuICAgIH0sXG4gICAgZGVsYXl0aW1lOiBmdW5jdGlvbiBkZWxheXRpbWUoKSB7XG4gICAgICAgIHRoaXMud2F0ZXJfaW5pdCgpO1xuICAgICAgICB0aGlzLm5vZGUueCA9IDM2MDtcbiAgICAgICAgdGhpcy5ub2RlLnkgPSAtMTEwO1xuICAgICAgICBnbyA9IHRydWU7XG4gICAgfSxcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmIChnbykge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnggLT0gNy41NTtcbiAgICAgICAgICAgIG1pICs9IDcuNTU7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzg3ODFlK0FUSlJPQWIzY3ZRdXMrTDY1JywgJ3BwX2NvbnRyb2wnKTtcbi8vIHNjcmlwdFxccHBfY29udHJvbC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG5cbiAgICAgICAgLy8g5rOh5rOh6Ieq5a6a5LmJWFhcbiAgICAgICAgc3RhclByZWZhYjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIC8v6LS55pivflxuICAgICAgICBmaXNoOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfSxcbiAgICAgICAgLy/lgJLorqHml7bpgqPkuKpsYWJlbFxuICAgICAgICBDb3VudGRvd246IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIC8v57uT5p6c55WM6Z2iXG4gICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLm92ZXJfdGltZSA9IDEwOyAvL+WAkuiuoeaXtuWJqeS9meaXtumXtFxuICAgICAgICB0aGlzLm5vd190aW1lID0gMDsgLy/nu5PmnpzlgJLorqHml7YgIOaXtumXtOiuoeaXtlxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8v6L+Z5Lqb5piv5pCe5rOh5rOh55qEXG4gICAgICAgIHNlbGYuY3JlYXRlX3Bhb3BhbygpO1xuICAgICAgICAvL+WumuaXtuWZqFxuICAgICAgICBzZWxmLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIOi/memHjOeahCB0aGlzIOaMh+WQkSBjb21wb25lbnRcbiAgICAgICAgICAgIHNlbGYuY3JlYXRlX3Bhb3BhbygpO1xuICAgICAgICB9LCAwLjUpO1xuICAgICAgICAvL+i/memHjOaYr+aQnumxvOeahFxuICAgICAgICB0aGlzLmZpc2hfbW92ZSgpO1xuICAgICAgICB2YXIgYW5pbSA9IHRoaXMuZmlzaC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgdmFyIGFuaW1TdGF0ZSA9IGFuaW0ucGxheSgnZmlzaF9hY3Rpb24nKTtcbiAgICAgICAgYW5pbVN0YXRlLnJlcGVhdENvdW50ID0gSW5maW5pdHk7XG4gICAgfSxcbiAgICAvL+mxvOi1sOOAguOAglxuICAgIGZpc2hfbW92ZTogZnVuY3Rpb24gZmlzaF9tb3ZlKCkge1xuICAgICAgICB2YXIgYmVnaW5feCwgYmVnaW5feSwgZW5kX3ksIHRpbWU7XG4gICAgICAgIC8v5Yqo55S75Y+C5pWwXG4gICAgICAgIGJlZ2luX3ggPSB0aGlzLm5vZGUud2lkdGggLyAyICsgdGhpcy5maXNoLm5vZGUud2lkdGggLyAyO1xuICAgICAgICBiZWdpbl95ID0gLShNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEzMCkgKyAxMDApO1xuICAgICAgICB0aGlzLmZpc2gubm9kZS54ID0gYmVnaW5feDtcbiAgICAgICAgdGhpcy5maXNoLm5vZGUueSA9IGJlZ2luX3k7XG4gICAgICAgIGVuZF95ID0gLU1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogNTApO1xuICAgICAgICB0aW1lID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAzKSArIDU7XG4gICAgICAgIC8v5Yqo55S7XG4gICAgICAgIHZhciBmaW5pc2ggPSBjYy5jYWxsRnVuYyh0aGlzLmZpc2hfbW92ZSwgdGhpcyk7XG4gICAgICAgIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShjYy5tb3ZlQnkodGltZSwgLWJlZ2luX3ggKiAyLCBlbmRfeSksIGZpbmlzaCk7XG4gICAgICAgIHRoaXMuZmlzaC5ub2RlLnJ1bkFjdGlvbihzZXEpO1xuXG4gICAgICAgIC8vIHZhciBhY3Rpb25CeSA9IGNjLnNrZXdCeSgyLCAtOTAsIC05MCk7XG4gICAgICAgIC8vIHRoaXMuZmlzaC5ub2RlLnJ1bkFjdGlvbihhY3Rpb25CeSk7XG4gICAgICAgIC8v56uL5Y2z6ZqQ6JePXG4gICAgICAgIC8vIHZhciBoaWRlQWN0aW9uID0gY2MuaGlkZSgpO1xuICAgICAgICAvLyB0aGlzLmZpc2gubm9kZS5ydW5BY3Rpb24oaGlkZUFjdGlvbik7XG4gICAgfSxcbiAgICAvL+azoeazoembhuS4reiQpVxuICAgIGNyZWF0ZV9wYW9wYW86IGZ1bmN0aW9uIGNyZWF0ZV9wYW9wYW8oKSB7XG4gICAgICAgIC8vIOS9v+eUqOe7meWumueahOaooeadv+WcqOWcuuaZr+S4reeUn+aIkOS4gOS4quaWsOiKgueCuVxuICAgICAgICB2YXIgbmV3U3RhciA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhclByZWZhYik7XG4gICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdTdGFyKTtcbiAgICAgICAgLy8gdXJsbCA9IGNjLnVybC5yYXcoXCJnYW1lMV8wMS9nYW1lMV8wMV9nb2xkXzAyLnBuZ1wiKTtcbiAgICAgICAgLy8gdmFyIHNzID0gbmV3IGNjLlNwcml0ZUZyYW1lKHVybGwpO1xuICAgICAgICAvLyBuZXdTdGFyLnNwcml0ZUZyYW1lID0gc3M7XG4gICAgICAgIC8v6I635Y+W5Lik5Liq6ZqP5py65pWwIOWIneWni+eCuVxuICAgICAgICB2YXIgY2hpbGRfeCA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMzAwKTtcbiAgICAgICAgaWYgKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSkgIT0gMSkge1xuICAgICAgICAgICAgY2hpbGRfeCA9IC1jaGlsZF94O1xuICAgICAgICB9XG4gICAgICAgIG5ld1N0YXIuc2V0UG9zaXRpb24oY2hpbGRfeCwgLTE1MCk7XG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB0aGlzLm92ZXJfdGltZSA9IDE1OyAvL+WAkuiuoeaXtuWJqeS9meaXtumXtFxuICAgICAgICB0aGlzLm5vd190aW1lID0gMDtcbiAgICAgICAgdGhpcy5yZXN1bHQuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcbiAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzLnJlc3VsdC5kZXN0cm95KCk7XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICB2YXIgdGltZUxlZnQgPSBNYXRoLmZsb29yKHRoaXMub3Zlcl90aW1lIC0gdGhpcy5ub3dfdGltZSk7XG4gICAgICAgIGlmICh0aW1lTGVmdCA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuQ291bnRkb3duLnN0cmluZyA9IE1hdGguZmxvb3IodGltZUxlZnQgLyAzNjAwKS50b1N0cmluZygpICsgJzonICsgTWF0aC5mbG9vcih0aW1lTGVmdCAlIDM2MDAgLyA2MCkudG9TdHJpbmcoKSArIFwiOlwiICsgTWF0aC5mbG9vcih0aW1lTGVmdCAlIDM2MDAgJSA2MCkudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5ub3dfdGltZSArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMubm93X3RpbWUgPj0gdGhpcy5vdmVyX3RpbWUpIHtcbiAgICAgICAgICAgIHRoaXMubm93X3RpbWUgPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2ZjODUzR2ZkN3BPOGFPMjc1cks1MFV2JywgJ3Jlc3VsdF9zY3JpcHQnKTtcbi8vIHNjcmlwdFxccmVzdWx0X3NjcmlwdC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGlnaHQ6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICAvL+iHquWumuS5iemHkeW4gVxuICAgICAgICBjb2luUHJlZmFiOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICBzdGFyOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcjE6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBzdGFyMjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG5cbiAgICAgICAgdmFyIGFjdGlvbkJ5ID0gY2MucmVwZWF0Rm9yZXZlcihjYy5yb3RhdGVCeSg1LCAzNjApKTtcbiAgICAgICAgLy8gdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGNjLnJvdGF0ZUJ5KDAuNSwtMzYwKSk7XG4gICAgICAgIHRoaXMubGlnaHQucnVuQWN0aW9uKGFjdGlvbkJ5KTtcbiAgICAgICAgY29uc29sZS5sb2coXCLmiafooYzov5vmnaXkuoYgXCIpO1xuICAgICAgICAvL+WumuaXtuWZqFxuICAgICAgICB0aGlzLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIOi/memHjOeahCB0aGlzIOaMh+WQkSBjb21wb25lbnRcbiAgICAgICAgICAgIHRoaXMuY3JlYXRfY29pbigpO1xuICAgICAgICB9LCAwLjEsIDIwKTtcbiAgICAgICAgdmFyIHN0YXIgPSBjYy5yZXBlYXRGb3JldmVyKGNjLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgIC8vIGNjLnNlcXVlbmNlKFxuICAgICAgICBjYy5zcGF3bihjYy5zZXF1ZW5jZShjYy5zY2FsZUJ5KDEsIDAuMDEsIDAuMDEpLCBjYy5zY2FsZUJ5KDEsIDEwMCwgMTAwKSksIGNjLnJvdGF0ZUJ5KDIsIDcyMCkpXG4gICAgICAgIC8vIClcbiAgICAgICAgKSk7XG4gICAgICAgIHZhciBzdGFyMiA9IGNjLnJlcGVhdEZvcmV2ZXIoY2MucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgLy8gY2Muc2VxdWVuY2UoXG4gICAgICAgIGNjLnNwYXduKGNjLnJvdGF0ZUJ5KDQsIDcyMCkpXG4gICAgICAgIC8vIClcbiAgICAgICAgKSk7XG4gICAgICAgIC8vIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShjYy5yb3RhdGVCeSgwLjUsLTM2MCkpO1xuICAgICAgICB0aGlzLnN0YXIxLnJ1bkFjdGlvbihzdGFyKTtcbiAgICAgICAgdGhpcy5zdGFyMi5ydW5BY3Rpb24oc3RhcjIpO1xuICAgIH0sXG4gICAgY3JlYXRfY29pbjogZnVuY3Rpb24gY3JlYXRfY29pbigpIHtcbiAgICAgICAgLy8g5L2/55So57uZ5a6a55qE5qih5p2/5Zyo5Zy65pmv5Lit55Sf5oiQ5LiA5Liq5paw6IqC54K5XG4gICAgICAgIHZhciBuZXdTdGFyID0gY2MuaW5zdGFudGlhdGUodGhpcy5jb2luUHJlZmFiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCLnlJ/miJDph5HluIFcIik7XG4gICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdTdGFyKTtcbiAgICAgICAgLy/ojrflj5bkuKTkuKrpmo/mnLrmlbAg5Yid5aeL54K5XG4gICAgICAgIHZhciBjaGlsZF94ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxNTApO1xuICAgICAgICBpZiAoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSAhPSAxKSB7XG4gICAgICAgICAgICBjaGlsZF94ID0gLWNoaWxkX3g7XG4gICAgICAgIH1cbiAgICAgICAgbmV3U3Rhci5zZXRQb3NpdGlvbihjaGlsZF94LCA5MDApO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYzUyYjZERTRmTkJ6cm12ZERlenhxakUnLCAnc2V0X2JsYWNrYmcnKTtcbi8vIHNjcmlwdFxcc2V0X2JsYWNrYmcuanNcblxuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGJhY2s6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBtdXNpYzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIHNvdW5kOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgaGVscDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLm51bWJlciA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMuc2V0YW5pbWF0aW9uKCk7XG4gICAgfSxcbiAgICB0b19tb3ZlOiBmdW5jdGlvbiB0b19tb3ZlKCkge1xuICAgICAgICB2YXIgc2VxID0gY2MubW92ZUJ5KDEsIDAsIC0xOTEpLmVhc2luZyhjYy5lYXNlRWxhc3RpY091dCgpKTtcbiAgICAgICAgdGhpcy5iYWNrLnJ1bkFjdGlvbihzZXEpO1xuICAgICAgICB2YXIgc2VxMSA9IGNjLm1vdmVCeSgxLjIsIDAsIC0zNzMpLmVhc2luZyhjYy5lYXNlRWxhc3RpY091dCgpKTtcbiAgICAgICAgdGhpcy5tdXNpYy5ydW5BY3Rpb24oc2VxMSk7XG4gICAgICAgIHZhciBzZXEzID0gY2MubW92ZUJ5KDEuMywgMCwgLTU2MCkuZWFzaW5nKGNjLmVhc2VFbGFzdGljT3V0KCkpO1xuICAgICAgICB0aGlzLnNvdW5kLnJ1bkFjdGlvbihzZXEzKTtcbiAgICAgICAgdmFyIHNlcTUgPSBjYy5tb3ZlQnkoMS40LCAwLCAtNzM4KS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNPdXQoKSk7XG4gICAgICAgIHRoaXMuaGVscC5ydW5BY3Rpb24oc2VxNSk7XG4gICAgfSxcbiAgICBnb19jbG9zZTogZnVuY3Rpb24gZ29fY2xvc2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5udW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm51bWJlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJhY2sueSArPSAxOTE7XG4gICAgICAgIH0sIDAuNSk7XG4gICAgICAgIC8vIHZhciBzZXExMTExID0gY2MubW92ZUJ5KDAuOSwwLDE5MSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpXG4gICAgICAgIC8vIHRoaXMuYmFjay5ydW5BY3Rpb24oc2VxMTExMSk7XG4gICAgICAgIHZhciBzZXExID0gY2MubW92ZUJ5KDAuNSwgMCwgMzczKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uSW4oKSk7XG4gICAgICAgIHRoaXMubXVzaWMucnVuQWN0aW9uKHNlcTEpO1xuICAgICAgICB2YXIgc2VxMiA9IGNjLm1vdmVCeSgwLjQsIDAsIDU2MCkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpO1xuICAgICAgICB0aGlzLnNvdW5kLnJ1bkFjdGlvbihzZXEyKTtcbiAgICAgICAgdmFyIHNlcTMgPSBjYy5tb3ZlQnkoMC4zLCAwLCA3MzgpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcbiAgICAgICAgdGhpcy5oZWxwLnJ1bkFjdGlvbihzZXEzKTtcbiAgICAgICAgLy8g5Lul56eS5Li65Y2V5L2N55qE5pe26Ze06Ze06ZqUXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubnVtYmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSwgMC43KTtcbiAgICB9LFxuICAgIHNldGFuaW1hdGlvbjogZnVuY3Rpb24gc2V0YW5pbWF0aW9uKCkge1xuICAgICAgICAvLyDku6Xnp5LkuLrljZXkvY3nmoTml7bpl7Tpl7TpmpRcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy50b19tb3ZlKCk7XG4gICAgICAgIH0sIDAuMyk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc5MjRiMXV5OEZKR0VaRXZ0UFhDRENYUScsICdzZXR0aW5nJyk7XG4vLyBzY3JpcHRcXHNldHRpbmcuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc2V0Ymc6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gb25Ub3VjaERvd24oZXZlbnQpIHt9XG4gICAgICAgIGZ1bmN0aW9uIG9uVG91Y2hVcChldmVudCkge1xuICAgICAgICAgICAgaWYgKHNlbGYuc2V0YmcuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRiZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRiZy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hzdGFydCcsIG9uVG91Y2hEb3duLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoZW5kJywgb25Ub3VjaFVwLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoY2FuY2VsJywgb25Ub3VjaFVwLCB0aGlzLm5vZGUpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnOTlkOWJ3YnY2Rk9hSlpDcFpGRTFvYlAnLCAndHVybnRhYmxlJyk7XG4vLyBzY3JpcHRcXHR1cm50YWJsZS5qc1xuXG52YXIgbGFzdHBvaW50ID0gY2MudjIoMCwgMCk7IC8v5LiK5qyh54K5XG52YXIgbm93cG9pbnQgPSBjYy52MigwLCAwKTsgLy/lvZPliY3ngrlcbnZhciBwb2ludCA9IGNjLnYyKDAsIDApOyAvL+WOn+eCuVxudmFyIHRvdWNoMSA9IGZhbHNlO1xudmFyIGxhc3RwYXJlbnQgPSBjYy52MigwLCAwKTtcbnZhciBsYXN0cm90YXRlID0gMDsgLy/kuIrmrKHnmoTop5LluqZcbnZhciBnb190aW1lID0gMDsgLy/mu5Hliqjml7bpl7Tlj4LmlbBcbnZhciBiZWdhbl90b3VjaCA9IGNjLnYyKDAsIDApO1xudmFyIG5vd19rZWR1ID0gMDtcbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRhcGFuOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICB1cF9kb3duOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBkaWFuc2h1OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBub3dfbnVtYmVyOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIC8vIHZhciBhY3Rpb25CeSA9IGNjLnNrZXdCeSgyLC05MCwgLTE4MCk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uQnkpO1xuXG4gICAgICAgIHRoaXMubWF4X251bSA9IHdpbmRvdy5TSGluZGV4ICogMC4xOyAvL+a2qOW5heWNleWQkeacgOWkp+WAvFxuICAgICAgICB0aGlzLnNpbiA9IHRoaXMubWF4X251bSAvIDE4MDsgLy/mr4/liLvluqbku6PooajlgLxcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkTGlzdGVuZXIoe1xuICAgICAgICAgICAgZXZlbnQ6IGNjLkV2ZW50TGlzdGVuZXIuVE9VQ0hfT05FX0JZX09ORSxcbiAgICAgICAgICAgIG9uVG91Y2hCZWdhbjogZnVuY3Rpb24gb25Ub3VjaEJlZ2FuKHRvdWNoLCBldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICghdG91Y2gxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2hMb2MxID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgYmVnYW5fdG91Y2ggPSB0b3VjaExvYzE7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaExvYyA9IHNlbGYubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0b3VjaExvYzEpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0cG9pbnQgPSB0b3VjaExvYztcbiAgICAgICAgICAgICAgICAgICAgbGFzdHBhcmVudCA9IHRvdWNoTG9jMTtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2gxID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdHJvdGF0ZSA9IHNlbGYubm9kZS5yb3RhdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vIGRvbid0IGNhcHR1cmUgZXZlbnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRvdWNoTW92ZWQ6IGZ1bmN0aW9uIG9uVG91Y2hNb3ZlZCh0b3VjaCwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodG91Y2gxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5bey57uP5pyJ6Kem5pG4IOWImeS4jeWOu+aJp+ihjOWkmueCuVxuICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ub3dfbnVtYmVyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaExvYzEgPSB0b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAvL+i9rOaNouWdkOagh+ezu1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2hMb2MgPSBzZWxmLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodG91Y2hMb2MxKTtcbiAgICAgICAgICAgICAgICAgICAgbm93cG9pbnQgPSB0b3VjaExvYztcbiAgICAgICAgICAgICAgICAgICAgLy/kuInop5Llh73mlbDorqHnrpflhazlvI9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBwYXJzZUZsb2F0KGNjLnBEaXN0YW5jZShwb2ludCwgbm93cG9pbnQpKS50b0ZpeGVkKDYpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYiA9IHBhcnNlRmxvYXQoY2MucERpc3RhbmNlKHBvaW50LCBsYXN0cG9pbnQpKS50b0ZpeGVkKDYpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IHBhcnNlRmxvYXQoY2MucERpc3RhbmNlKGxhc3Rwb2ludCwgbm93cG9pbnQpKS50b0ZpeGVkKDYpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm90YXRpb24gPSAxODAgKiBNYXRoLmFjb3MoKGEgKiBhICsgYiAqIGIgLSBjICogYykgLyAoMiAqIGEgKiBiKSkgLyBNYXRoLlBJO1xuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgcm90YXRpb24gPSBwYXJzZUZsb2F0KChhKmEgKyBiKmIgLSBjKmMpLygyKmEqYikpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmRheV81Lm5vZGUucm90YXRpb24gPSAxODAqTWF0aC5hc2luKCBhL2MgKS8gTWF0aC5QSTtcblxuICAgICAgICAgICAgICAgICAgICAvKuenu+WKqOi9rOWciOesqOaWueazleWIpOaWrSAgXG4gICAgICAgICAgICAgICAgICAgICAgICAxLiDovazmjaLlnZDmoIfns7ss5bGP5bmV5Z+654K55Z2Q5qCH5L2/55So5LiW55WM5Z2Q5qCHLOenu+WKqOWdkOagh+S9v+eUqOiHquW3seWdkOagh1xuICAgICAgICAgICAgICAgICAgICAgICAgMi4g55uu5YmN5Y+q5YGa5ryP5Ye65p2l55qE6YOo5YiG5ouW5YqoIOS4i+aWueS4jeiAg+iZkVxuICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdHBhcmVudC54ID4gdG91Y2hMb2MxLnggJiYgdG91Y2hMb2MxLnkgPiA0NDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyo5LiK6L655ZCR5bem5ouW5YqoXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGUucm90YXRpb24gLT0gcm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdHBhcmVudC54IDwgdG91Y2hMb2MxLnggJiYgdG91Y2hMb2MxLnkgPiA0NDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5Zyo5LiK6L655ZCR5Y+z5ouW5YqoXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5vZGUucm90YXRpb24gKz0gcm90YXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL+enu+WKqOWujOS4gOasoeS5i+WQjuWIneWni+WMluS4gOS4i+WdkOagh1xuICAgICAgICAgICAgICAgICAgICBsYXN0cG9pbnQgPSBub3dwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgbGFzdHBhcmVudCA9IHRvdWNoTG9jMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Ub3VjaEVuZGVkOiBmdW5jdGlvbiBvblRvdWNoRW5kZWQodG91Y2gsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgLy/miqzotbfmiYvmjIfml7Yg6YeN5paw5Yid5aeL5YyW5omA5pyJ5Y+Y6YePXG4gICAgICAgICAgICAgICAgaWYgKGdvX3RpbWUgPD0gMC4yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaExvYyA9IHRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiZWdhbl90b3VjaC54ICE9IHRvdWNoTG9jLngpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb19udW0gPSAodG91Y2hMb2MueCAtIGJlZ2FuX3RvdWNoLngpIC8gMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfkuYvliY3nmoR4OicgKyBiZWdhbl90b3VjaC54ICsgJ+S5i+WQjueahHg6JyArIHRvdWNoTG9jLnggKyAn5q+U5L6LJyArIHJvX251bSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VxID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvX251bSA+PSAxIHx8IHJvX251bSA8PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb19udW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcSA9IGNjLnJvdGF0ZUJ5KDIsIDEwODApLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VxID0gY2Mucm90YXRlQnkoMiwgLTEwODApLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXEgPSBjYy5yb3RhdGVCeSgyICogTWF0aC5hYnMocm9fbnVtKSwgMTA4MCAqIHJvX251bSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubm9kZS5ydW5BY3Rpb24oc2VxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0cG9pbnQgPSBjYy52MigwLCAwKTtcbiAgICAgICAgICAgICAgICBub3dwb2ludCA9IGNjLnYyKDAsIDApO1xuICAgICAgICAgICAgICAgIGxhc3RwYXJlbnQgPSBjYy52MigwLCAwKTtcbiAgICAgICAgICAgICAgICAvLyBzZWxmLm5vd19udW1iZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdG91Y2gxID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNlbGYpO1xuICAgIH0sXG4gICAgLy/moLnmja7lj4LmlbAg6K6p55uY5a2Q6L2s5ZyIXG4gICAgdG9fdHVybmFibGU6IGZ1bmN0aW9uIHRvX3R1cm5hYmxlKG51bSkge1xuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgLy8gdGhpcy5tYXhfbnVtID0gd2luZG93LlNIaW5kZXggKiAwLjE7Ly/mtqjluYXljZXlkJHmnIDlpKflgLxcbiAgICAgICAgLy8gdGhpcy5zaW4gPSB0aGlzLm1heF9udW0gLyAxODA7Ly/mr4/liLvluqbku6PooajlgLxcbiAgICAgICAgdmFyIHJvdGUgPSBudW0gLyB0aGlzLnNpbjsgLy/lvZPliY3op5LluqZcbiAgICAgICAgdmFyIHNlcSA9IGNjLnJvdGF0ZVRvKDAuNSwgcm90ZSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzZXEpO1xuICAgIH0sXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvL+iuoeeul+WKoOmAn+W6puWFrOW8j1xuICAgICAgICBpZiAodG91Y2gxKSB7XG4gICAgICAgICAgICBnb190aW1lICs9IGR0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ29fdGltZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy/liLfmlrDlnIjmlbBcbiAgICAgICAgaWYgKHRoaXMubm9kZS5yb3RhdGlvbiA+IDM2MCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJvdGF0aW9uIC09IDM2MDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5vZGUucm90YXRpb24gPCAtMzYwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUucm90YXRpb24gKz0gMzYwO1xuICAgICAgICB9XG4gICAgICAgIC8v6L2s5ZyI6YC76L6RXG4gICAgICAgIG5vd19rZWR1ID0gc2VsZi5ub2RlLnJvdGF0aW9uO1xuICAgICAgICBpZiAoc2VsZi5ub2RlLnJvdGF0aW9uID4gMTgwKSB7XG4gICAgICAgICAgICBub3dfa2VkdSA9IC0oMzYwIC0gc2VsZi5ub2RlLnJvdGF0aW9uKTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWxmLm5vZGUucm90YXRpb24gPCAtMTgwKSB7XG4gICAgICAgICAgICBub3dfa2VkdSA9IDM2MCArIHNlbGYubm9kZS5yb3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBub3dfa2VkdSA9IE1hdGguZmxvb3Ioc2VsZi5zaW4gKiBub3dfa2VkdSk7XG4gICAgICAgIHNlbGYuZGFwYW4uc3RyaW5nID0gd2luZG93LlNIaW5kZXggKyBub3dfa2VkdTtcbiAgICAgICAgdmFyIGJhaWZlbmJpID0gbm93X2tlZHUgLyB3aW5kb3cuU0hpbmRleCAqIDEwMDtcbiAgICAgICAgaWYgKGJhaWZlbmJpID4gMTApIHtcbiAgICAgICAgICAgIGJhaWZlbmJpID0gMTA7XG4gICAgICAgIH0gZWxzZSBpZiAoYmFpZmVuYmkgPCAtMTApIHtcbiAgICAgICAgICAgIGJhaWZlbmJpID0gLTEwO1xuICAgICAgICB9XG4gICAgICAgIC8v5aGr5YaZ5Yi75bqmXG4gICAgICAgIGlmIChub3dfa2VkdSA+IDApIHtcbiAgICAgICAgICAgIHNlbGYuZGlhbnNodS5zdHJpbmcgPSBcIua2qCBcIiArIG5vd19rZWR1ICsgXCIg54K5XCI7XG4gICAgICAgICAgICBzZWxmLnVwX2Rvd24uc3RyaW5nID0gXCIrXCIgKyBub3dfa2VkdSArIFwiICgrXCIgKyBNYXRoLmZsb29yKGJhaWZlbmJpKSArIFwiJSlcIjtcbiAgICAgICAgICAgIHNlbGYuZGlhbnNodS5ub2RlLmNvbG9yID0gY2MuY29sb3IoMjM3LCAxMDYsIDEwNiwgMjU1KTtcbiAgICAgICAgICAgIHNlbGYudXBfZG93bi5ub2RlLmNvbG9yID0gY2MuY29sb3IoMjM3LCAxMDYsIDEwNiwgMjU1KTtcbiAgICAgICAgICAgIHNlbGYuZGFwYW4ubm9kZS5jb2xvciA9IGNjLmNvbG9yKDIzNywgMTA2LCAxMDYsIDI1NSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmRpYW5zaHUuc3RyaW5nID0gXCLot4wgXCIgKyBNYXRoLmFicyhub3dfa2VkdSkgKyBcIiDngrlcIjtcbiAgICAgICAgICAgIHNlbGYudXBfZG93bi5zdHJpbmcgPSBub3dfa2VkdSArIFwiIChcIiArIE1hdGguZmxvb3IoYmFpZmVuYmkpICsgXCIlKVwiO1xuICAgICAgICAgICAgc2VsZi5kaWFuc2h1Lm5vZGUuY29sb3IgPSBjYy5jb2xvcigxMTcsIDIxMiwgMTc0LCAyNTUpO1xuICAgICAgICAgICAgc2VsZi51cF9kb3duLm5vZGUuY29sb3IgPSBjYy5jb2xvcigxMTcsIDIxMiwgMTc0LCAyNTUpO1xuICAgICAgICAgICAgc2VsZi5kYXBhbi5ub2RlLmNvbG9yID0gY2MuY29sb3IoMTE3LCAyMTIsIDE3NCwgMjU1KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNWE1ZWZlUzc1RkV2NENBSmxTUzdPSEEnLCAndm9pc2UnKTtcbi8vIHNjcmlwdFxcdm9pc2UuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc2V0dm9pc2U6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgc2V0dm9pc2UxOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIG9uVG91Y2hEb3duKGV2ZW50KSB7fVxuICAgICAgICBmdW5jdGlvbiBvblRvdWNoVXAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLnNldHZvaXNlLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0dm9pc2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXR2b2lzZTEuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXR2b2lzZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0dm9pc2UxLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hzdGFydCcsIG9uVG91Y2hEb3duLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoZW5kJywgb25Ub3VjaFVwLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoY2FuY2VsJywgb25Ub3VjaFVwLCB0aGlzLm5vZGUpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMmJlMjBRN1MyNUlscGpzakI1UHJuT1InLCAnd2FpdCcpO1xuLy8gc2NyaXB0XFx3YWl0LmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiXX0=
