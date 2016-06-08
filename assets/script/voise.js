cc.Class({
    extends: cc.Component,
    properties: {
        setvoise: {
            default: null,
            type: cc.Node
        },
        setvoise1: {
            default: null,
            type: cc.Node
        }
    },
    // use this for initialization
    onLoad: function () {
        var self = this;
        function onTouchDown (event) {

        }
        function onTouchUp (event) {
            if(self.setvoise.active ){
                self.setvoise.active = false; 
                self.setvoise1.active = true;
            }else{
                self.setvoise.active  = true; 
                self.setvoise1.active = false;
            }
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }
});