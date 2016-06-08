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