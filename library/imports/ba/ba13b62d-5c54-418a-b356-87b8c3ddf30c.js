
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