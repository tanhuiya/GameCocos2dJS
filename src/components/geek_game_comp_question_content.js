/**
 * Created by tanhui on 2018/8/22.
 */

/**
 * 题目类型
 * @type {{Text: number, Text_Picture: number, Text_Radio: number}}
 */
var ContentType = {
    Text: 1,// 纯文字
    Text_Picture: 2,//带图片
    Text_Audio: 3,//带音频
    Text_Video: 4//带视频
}

/**
 * 题目内容组件
 * @type {any}
 */
var g_question_content_node = cc.Node.extend({
    heigth_: 0,
    animating_: false,
    content_type_: ContentType.Text,
    /**
     * 设置题目类型
     * @param type
     */
    setUp:function (type, questionData) {
        var margin = 30
        this.heigth_ = 0
        var textHeight = 300
        var text = questionData.question_title
        this.content_type_ = type
        if (type == ContentType.Text) {
            var text_label = geek_lib.f_label_create(this, text, 36 , g_size.width * 0.5, -(textHeight * 0.5), 1, cc.color.WHITE, 1, 1, cc.AncorPointCenter)
            text_label.setDimensions(g_size.width - 100, 0)
            // 文字类型固定高度300
            this.height_ = textHeight
        } else if (type == ContentType.Text_Picture) {
            var music_btn = geek_lib.f_btn_create(this, res.s_music, "", 32 * 2, 0, 1, 1, 4, cc.AncorPointTopLeft)
            var image = geek_lib.f_sprite_create_box(this, res.s_audio_bg, g_size.width * 0.5, 0, 395, 290, 1, 1, cc.AncorPointTopMid)
            var title = geek_lib.f_label_create(this, text, 36 , g_size.width * 0.5, - 163 * 2, 1, cc.color.WHITE, 1, 1, cc.AncorPointTopMid)
            title.setDimensions(g_size.width - 100, 0)
            this.height_ = title.getContentSize().height + image.getBoundingBox().height + margin
        }
        else if (type == ContentType.Text_Audio) {
            var music_btn = geek_lib.f_btn_create(this, res.s_music, "", 32 * 2, 0, 1, 1, 4, cc.AncorPointTopLeft)
            var image = geek_lib.f_sprite_create_box(this, res.s_audio_bg, g_size.width * 0.5, 0, 395, 290, 1, 1, cc.AncorPointTopMid)
            var icon = geek_lib.f_sprite_create_box(this, res.s_audio_2, g_size.width * 0.5, -145, 60, 50, 2, 2, cc.AncorPointCenter)
            this.addListner(icon)
            var title = geek_lib.f_label_create(this, text, 36 , g_size.width * 0.5, - 163 * 2, 1, cc.color.WHITE, 1, 1, cc.AncorPointTopMid)
            title.setDimensions(g_size.width - 100, 0)
            this.height_ = title.getContentSize().height + image.getBoundingBox().height + margin
        }
        else if (type == ContentType.Text_Video) {
            var music_btn = geek_lib.f_btn_create(this, res.s_music, "", 32 * 2, 0, 1, 1, 4, cc.AncorPointTopLeft)
            var player = new ccui.VideoPlayer(res.s_video)
            this.addChild(player, 1, 1)
            player.setContentSize(395, 290)
            player.setPosition(g_size.width * 0.5, -145)
            var icon = geek_lib.f_sprite_create_box(this, res.s_audio_1, g_size.width * 0.5, -145, 60, 50, 999, 2, cc.AncorPointCenter)
            this.addListner(icon)
            var title = geek_lib.f_label_create(this, text, 36 , g_size.width * 0.5, - 163 * 2, 1, cc.color.WHITE, 1, 1, cc.AncorPointTopMid)
            title.setDimensions(g_size.width - 100, 0)
            this.height_ = title.getContentSize().height + player.getBoundingBox().height + margin
            this.videoPlayer_ = player
            player.setVisible(false)
            player.setEventListener(ccui.VideoPlayer.EventType.COMPLETED, function () {
                console.log("play over")
                player.setVisible(false)
            })
        }
    },

    /**
     * 播放音乐
     */
    startMusic: function () {
        var url = "http://s2-cdn.oneitfarm.com/njpivllfr63mk8pikayc4uro5gqu0td2/8e009aee4ff0981231325e8fc52e7cad.mp3"
        cc.audioEngine.playMusic(url, true)
    },

    /**
     * 添加播放按钮回调
     * @param icon
     */
    addListner: function (icon) {
        var that = this
        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan : function (touch,event){
                var target = event.getCurrentTarget()
                // target --> item , target.parent --> activity
                var locationInNode = target.parent.convertToNodeSpace(touch.getLocation())
                var rect = target.getBoundingBox()
                if (!cc.rectContainsPoint(rect, locationInNode)) {
                    return false
                }
                return true
            },
            onTouchEnded: function (touch,event) {
                // // captch clicked
                if (that.content_type_ == ContentType.Text_Audio) {
                    if (!that.animating_) {
                        that.addAnimateFrame(icon)
                        that.startMusic()
                    } else {
                        that.stopAnimate(icon)
                    }
                    that.animating_ = !that.animating_
                } else if (that.content_type_ == ContentType.Text_Video) {
                    that.videoPlayer_.setVisible(true)
                    that.videoPlayer_.play()
                    return
                }
            }
        }, icon)
    },

    stopAnimate: function (sp) {
        sp.stopAllActions()
    },

    addAnimateFrame: function (sp) {
        var animation = new cc.Animation()
        animation.addSpriteFrameWithFile(res.s_audio_1)
        animation.addSpriteFrameWithFile(res.s_audio_2)
        //设置帧动画属性
        animation.setDelayPerUnit(2.0 / 4)        //每一帧停留的时间
        animation.setRestoreOriginalFrame(true)   //播放完后回到第一帧
        var animate = new cc.Animate(animation)
        sp.runAction(new cc.RepeatForever(animate))
    },

    /**
     * 获取当前组件的总高度
     * @returns {*}
     */
    getHeight: function () {
        return this.height_
    }
})
