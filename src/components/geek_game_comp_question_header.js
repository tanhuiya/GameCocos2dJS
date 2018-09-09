/**
 * Created by tanhui on 2018/8/22.
 */

var g_question_header_node = cc.Node.extend({
    progress_: null,
    white_circle_: null,
    totalSecond_: 0,
    currentSecond_: 0,
    numberOfQuestion_: 0,
    score_: 0,
    ctor: function (numberOfQuestion) {
        this._super()
        this.numberOfQuestion_ = numberOfQuestion
    },

    /**
     * 题目头部信息
     */
    setUp:function () {
        var head_bg = geek_lib.f_sprite_create_box(this, res.s_purpose, 0, 0, 420, 124, 1, 1, cc.AncorPointTopLeft)

        this.music_btn_ = geek_lib.f_btn_create(this, res.s_music, "", 180 * 2, - head_bg.getBoundingBox().height * 0.5, 1, 2, 4, cc.AncorPointCenter)
        var white_circle = geek_lib.f_sprite_create_box(this, res.s_white_circle_big, head_bg.getBoundingBox().width + 14, -1, 126,126,2,4, cc.AncorPointTopLeft)
        this.white_circle_ = white_circle
        var progress = cc.ProgressTimer.create(cc.Sprite.create(res.s_progress))
        progress.setPosition(0, 0)
        progress.setType(cc.ProgressTimer.TYPE_RADIAL)
        progress.setAnchorPoint(cc.p(0,0))
        progress.setReverseProgress(true)
        progress.setPercentage(100)
        white_circle.addChild(progress, 4, 5)
        this.progress_ = progress
        this.time_lable = geek_lib.f_label_create(white_circle, "",74, white_circle.getBoundingBox().width * 0.5 , white_circle.getBoundingBox().height * 0.5, 1, cc.color.WHITE, 1,1)
        var title_label = geek_lib.f_label_create(this, "第一题（1/" + this.numberOfQuestion_ +"）", 28, 126, -14, 1, cc.color.WHITE, 2,2 , cc.AncorPointTopLeft)
        this.title_label_ = title_label
        var score_label = geek_lib.f_label_create(this, this.score_ + " 分", 48, 126, -54, 1, cc.color.WHITE, 2,3, cc.AncorPointTopLeft)
        this.score_label_ = score_label
        var white_bg = geek_lib.f_sprite_create_box(this, res.s_white_bg, 60, 0 - head_bg.getBoundingBox().height * 0.5, 100, 100, 2, 4, cc.AncorPointCenter)
        var avatar = geek_lib.f_sprite_create_box(this, res.s_default_avator, 60, 0 - head_bg.getBoundingBox().height * 0.5, 100, 100, 3, 5, cc.AncorPointCenter)
    },

    /**
     * 是否显示倒计时
     * @param visible
     */
    setTimeVisible: function (visible) {
        this.white_circle_.setVisible(visible)
    },

    /**
     * 设置总时常
     */
    setTotal: function (total) {
        this.totalSecond_ = total
        this.updateTime(total)
    },

    /**
     * 更新分数 添加
     * @param score
     */
    updateScore: function (score) {
        score = this.score_ + score
        this.score_label_.setString(score + "")
        this.score_ = score
    },

    /**
     * 获取当前分数
     * @returns {number}
     */
    getScore: function () {
        return this.score_
    },

    /**
     * 更新倒计时
     * @param time
     */
    updateTime: function (time) {
        if (time > 999) {
            this.time_lable.setFontSize(44)
        } else if (time > 99) {
            this.time_lable.setFontSize(60)
        } else {
            this.time_lable.setFontSize(74)
        }
        this.time_lable.setString(time + "")
        var rate = time * 1.0 / this.totalSecond_
        this.progress_.setPercentage(rate * 100)
        this.currentSecond_ = time
    },

    /**
     * 花费的时间
     * @returns {number}
     */
    getUsedSeconds: function () {
        return this.totalSecond_ - this.currentSecond_
    },


    /**
     * 设置第几题标题
     */
    setQuestionIndex: function (num) {
        var chineseIndex = ArabiSimplified(num)
        var title = "第" + chineseIndex + "题 (" + num + "/" + this.numberOfQuestion_ + ")"
        this.title_label_.setString(title)
    },



    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (sender) {
                case this.music_btn_:
                    geek_lib.f_toggle_back_music()
                    break;
            }
        }
    },
})