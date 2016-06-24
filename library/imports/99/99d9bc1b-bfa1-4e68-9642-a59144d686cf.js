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