var openvoise =  true;//是否开启按钮音效
var openmusic =  true;//是否开启背景音乐
var SHindex = 3616.11;//开盘上证指数
window.SHindex = 3616;
var my_shoise = 0;//我竞猜的涨跌点
var num_of_player = 100;//参与竞猜人数

cc.Class({
    extends: cc.Component,
    properties: {
        //定义一个音效类型
        voise: {
            default: null,
            url: cc.AudioClip
        },
        //定义一个音乐类型
        music: {
            default: null,
            url: cc.AudioClip
        },
        //两个那啥
        down: {
            default: null,
            type: cc.Node
        },
        down2: {
            default: null,
            type: cc.Node
        },
        //确定按钮
        queding:{
            default: null,
            type: cc.Label
        },
        //结果
        result:{
            default:null,
            type: cc.Label
        },
        //参与数量
        players:{
            default: null,
            type: cc.Label
        },
        //参与玩家比例
        play_bfb:{
            default: null,
            type: cc.Label
        },
        //涨跌占比背景
        num_bg:{
            default: null,
            type: cc.Sprite
        },
        up_down:{
            default: null,
            type: cc.Label
        },
        help:{
            default: null,
            type: cc.Node
        },
        Bmusic:{
            default:null,
            type: cc.Node
        },
        Cmusic:{
            default:null,
            type: cc.Node
        },
        sound:{
            default:null,
            type: cc.Node
        },
        csound:{
            default:null,
            type: cc.Node
        }        
    },
    // 初始化加载 相当于init函数
    onLoad: function () {
        
    },
    //开启并播放音效
    openvois: function(){
        openvoise = true;
        this.scheduleOnce(function() {
             // 这里的 this 指向 component
             this.csound.active = false;
             this.sound.active = true;
             
         }, 0.15);
        this.playvoise();
    },
    //关闭音效
    closevois: function(){
        openvoise = false;
        this.scheduleOnce(function() {
             // 这里的 this 指向 component
             this.sound.active = false;
             this.csound.active = true;
         }, 0.15);
    },
    //开启并播放背景音乐
    openmusic: function(){
        openmusic = true;
        
        this.scheduleOnce(function() {
             // 这里的 this 指向 component
             this.Cmusic.active = false;
             this.Bmusic.active = true;
             
         }, 0.15);
        this.playmusic();
    },
    //关闭背景音乐
    closemusic: function(){
        openmusic = false;
        this.scheduleOnce(function() {
             // 这里的 this 指向 component
             this.Bmusic.active = false;
             this.Cmusic.active = true;
         }, 0.15);
        cc.audioEngine.stopMusic(true);
    },
    //播放背景音乐
    playmusic: function(){
        
        if(openmusic){
            cc.audioEngine.playMusic(this.music, false); 
        }
    },
    //播放音效
    playvoise: function(){
        if(openvoise){
            cc.audioEngine.playEffect(this.voise, false);    
        }
    },
    //生成随机数
    random:function(){
        this.playvoise();
        //生成随机数
        var zhengfu;
        // 117,212,174
        //237,106,106
        zhengfu = Math.round(Math.random());
        my_shoise = Math.ceil(Math.random()*SHindex*0.1);
        if(zhengfu == 1){
            this.queding.string = "涨 "+ my_shoise +" 点";
            this.queding.node.color = cc.color(237,106,106,255);
        }else{
            this.queding.string =  "跌 " + my_shoise + " 点";
            this.queding.node.color = cc.color(117,212,174,255);
            my_shoise = -my_shoise;
        }
        let dd = this.down.getChildByName("turntable").getComponent("turntable");
        dd.to_turnable(my_shoise);
    },
    go_help: function(){
        if(this.help.active){
            this.help.active = false;
        }else{
            this.help.active = true;
        } 
    },
    result_back: function(){
        // 这里的 this 指向 component
        if(this.down.active){
            this.down.active = false;
            this.down2.active = true;
        }else{
            this.down.active = true;
            this.down2.active = false;
        }  
    },
    //确定
    sure: function (){
        this.playvoise();
        //等于0 就默认是没有选择涨跌点数  不给使用确认按钮
        var sure_num;
        sure_num = this.queding.string;
        if(my_shoise == 0){
            return;   
        }
        //确定了之后各种写~
        this.result.string = "预测上证指数: " + (SHindex + my_shoise) + " " + my_shoise + " (" + ((my_shoise* 100)/SHindex ).toFixed(2) +"%)";
        //猜涨还是猜跌
        var urll;
        if(my_shoise > 0){
            this.up_down.string = '猜涨';
            //参与竞猜人数
            this.players.string = "已经有" + num_of_player + "人参与，猜涨占";
            //涨跌结果中的背景小图片
            urll = cc.url.raw("game1_01/game1_02_img_05.png");
            var texture = cc.textureCache.addImage(urll);
            this.num_bg.spriteFrame.setTexture(texture);
        }else{
            this.up_down.string = '猜跌';
            //参与竞猜人数
            this.players.string = "已经有" + num_of_player + "人参与，猜跌占";
        }
        //猜涨/跌 人数的百分之百
        this.play_bfb.string = "55%"
        // 以秒为单位的时间间隔
        this.scheduleOnce(function() {
            // 这里的 this 指向 component
            if(this.down.active){
                this.down.active = false;
                this.down2.active = true;
                this.down2.getChildByName("water_bg").getComponent("pp_control").init();
                // this.down2.;
            }else{
                this.down.active = true;
                this.down2.active = false;
            }
        }, 0.5);
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    }
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
