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