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
var g_comp_question_content = cc.Node.extend({
    heigth_: 0,
    animating_: false,
    content_type_: ContentType.Text,
    background_playing_: false,

    /**
     * 初始化
     * @param contentType
     * @param questionData
     */
    ctor: function (contentType, questionData) {
        this._super()
        var margin = 30
        this.heigth_ = 0
        var textHeight = 300
        var question_material_img = questionData.question_material_img
        if (!contentType || !question_material_img) {
            contentType = ContentType.Text
        }
        this.content_type_ = contentType
        var question_type_ = questionData.question_type
        var text = questionData.question_title
        if (question_type_ == AnswerSelectType.Single) {
            text = "(单选题): " + text
        } else if (question_type_ == AnswerSelectType.Multi) {
            text = "(多选题): " + text
        } else if (question_type_ == AnswerSelectType.Judge) {
            text = "(判断题): " + text
        }
        if (this.content_type_ == ContentType.Text_Picture) {
            geek_lib.f_remote_img_sprite_create(this, question_material_img, res.s_audio_bg, g_size.width * 0.5, 0, 395, 290, 1, cc.AncorPointTopMid)

            var title = geek_lib.f_label_create(this, text, 36, g_size.width * 0.5, -163 * 2, 1, cc.color.WHITE, 1, 1, cc.AncorPointTopMid)
            title.setDimensions(g_size.width - 100, 0)
            this.height_ = title.getContentSize().height + 290 + margin
        } else if (this.content_type_ == ContentType.Text_Audio) {
            var image = geek_lib.f_imageview_box_create(this, res.s_audio_bg, g_size.width * 0.5, 0, 395, 290, 1, 1, cc.AncorPointTopMid)
            var icon = geek_lib.f_sprite_create_box(this, res.s_audio_2, g_size.width * 0.5, -145, 60, 50, 2, 2, cc.AncorPointCenter)
            this.addListener(icon, question_material_img)
            var title = geek_lib.f_label_create(this, text, 36, g_size.width * 0.5, -163 * 2, 1, cc.color.WHITE, 1, 1, cc.AncorPointTopMid)
            title.setDimensions(g_size.width - 100, 0)
            this.height_ = title.getContentSize().height + image.getBoundingBox().height + margin
        } else if (this.content_type_ == ContentType.Text_Video) {
            var player = new ccui.VideoPlayer(question_material_img)
            this.addChild(player, 1, 1)
            this.videoPlayer_ = player
            player.setContentSize(395, 290)
            player.setFullScreenEnabled(false)
            player.setPosition(g_size.width * 0.5, -145)
            var title = geek_lib.f_label_create(this, text, 36, g_size.width * 0.5, -163 * 2, 1, cc.color.WHITE, 1, 1, cc.AncorPointTopMid)
            title.setDimensions(g_size.width - 100, 0)
            this.height_ = title.getContentSize().height + player.getBoundingBox().height + margin
            var that = this
            player.setEventListener(ccui.VideoPlayer.EventType.COMPLETED, function () {
                that.videoPlayOver(player, null)
            })
            player.setEventListener(ccui.VideoPlayer.EventType.PLAYING, function () {
                that.videpPlayBegin()
            })
            // 设置video 标签样式
            geek_game_setup_video()
        } else {
            var text_label = geek_lib.f_label_create(this, text, 36, g_size.width * 0.5, -(textHeight * 0.5), 1, cc.color.WHITE, 1, 1, cc.AncorPointCenter)
            text_label.setDimensions(g_size.width - 100, 0)
            // 文字类型固定高度300
            this.height_ = textHeight
        }
    },

    /**
     * 播放音乐
     */
    startMusic: function (videopath) {
        console.log(videopath)
        // var url = "http://s2-cdn.oneitfarm.com/njpivllfr63mk8pikayc4uro5gqu0td2/8e009aee4ff0981231325e8fc52e7cad.mp3"
        cc.audioEngine.playMusic(videopath, false)
    },

    /**
     * 添加播放按钮回调
     * @param icon
     */
    addListener: function (icon, question_material_img) {
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
                that.playIconCallback(icon, question_material_img)
            }
        }, icon)
        this.icon_play_ = icon
    },

    /**
     * 视频开始播放
     */
    videpPlayBegin: function () {
        this.background_playing_ = geek_lib.f_isplay_effect()
        if (this.background_playing_) {
            geek_lib.f_toggle_back_music()
        }
    },

    /**
     * 播放按钮点击回调
     */
    playIconCallback: function (icon, videopath) {
        if (this.animating_) return

        this.background_playing_ = geek_lib.f_isplay_effect()
        if (this.background_playing_) {
            geek_lib.f_toggle_back_music()
        }
        if (this.content_type_ == ContentType.Text_Audio) {
            if (!videopath || videopath.length < 1) {
                geek_lib.g_notice("音频文件为空", 2)
                return
            }
            if (!this.animating_) {
                this.addAnimateFrame(icon)
                this.startMusic(videopath)
                geek_lib.f_timer_start(this, this.updateTimer, 0.1, true)
            }
            // else {
            //     this.stopAnimate(icon)
            // }
            this.animating_ = !this.animating_
        }
        geek_lib.f_play_music(true)
    },

    /**
     * 视频播放结束
     * @param player
     */
    videoPlayOver: function (player,icon) {
        geek_lib.f_play_music(false)
        // player.setVisible(false)
        // this.player_image_.setVisible(true)
        // icon.setVisible(true)
        if (this.background_playing_) {
            this.scheduleOnce(function () {  // 2秒后恢复背景音
                geek_lib.f_toggle_back_music()
            },2);
        }
    },

    /**
     * 停止视频或音频播放
     */
    stopPlayAll: function () {
        if (this.videoPlayer_) {
            this.videoPlayer_.stop()
        } else {
            cc.audioEngine.stopMusic(false)
        }
    },

    /**
     * 判断是否播放结束
     */
    updateTimer:function () {
        if  (!cc.audioEngine.isMusicPlaying()) {
            geek_lib.f_play_music(false)
            geek_lib.f_timer_stop(this, this.updateTimer)
            this.stopAnimate(this.icon_play_)
            if (this.background_playing_) {
                this.scheduleOnce(function () {  // 2秒后打印日志
                    console.log("play")
                    geek_lib.f_toggle_back_music()
                },2);

            }
            this.animating_ = false
        }

    },

    /**
     * 停止动画帧
     * @param sp
     */
    stopAnimate: function (sp) {
        sp.stopAllActions()
    },

    /**
     * 添加动画帧
     * @param sp
     */
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
     * 设置视频隐藏或显示, 视频在最上层，无法遮盖，只能隐藏
     * @param visible
     */
    setVideo:function (visible) {
        if (this.videoPlayer_) {
            this.videoPlayer_.setVisible(visible)
        }
    },

    /**
     * 获取当前组件的总高度
     * @returns {*}
     */
    getHeight: function () {
        return this.height_
    }
})
