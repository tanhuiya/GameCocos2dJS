/**
 * Created by tanhui on 2018/8/22.
 */

var g_question_header_node = cc.Node.extend({
    progress_: null,
    white_circle_: null,
    totalSecond_: 0,
    numberOfQuestion_: 0,
    ctor: function (numberOfQuestion) {
        this._super()
        this.numberOfQuestion_ = numberOfQuestion
    },

    /**
     * 题目头部信息
     */
    setUp:function () {
        var head_bg = geek_lib.f_sprite_create_box(this, res.s_purpose, 0, 0, 500, 126, 1, 1, cc.AncorPointTopLeft)

        var white_circle = geek_lib.f_sprite_create_box(this, res.s_white_circle_big, head_bg.getBoundingBox().width, -1, 126,126,2,4, cc.AncorPointTopRight)
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
        var score_label = geek_lib.f_label_create(this, "0 分", 48, 126, -54, 1, cc.color.WHITE, 2,3, cc.AncorPointTopLeft)

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
     * 更新倒计时
     * @param time
     */
    updateTime: function (time) {
        if (time > 99) {
            this.time_lable.setFontSize(60)
        } else {
            this.time_lable.setFontSize(74)
        }
        this.time_lable.setString(time + "")
        var rate = time * 1.0 / this.totalSecond_
        this.progress_.setPercentage(rate * 100)
    },

    /**
     * 设置第几题标题
     */
    setQuestionIndex: function (num) {
        var chineseIndex = ArabiSimplified(num)
        var title = "第" + chineseIndex + "题 (" + num + "/" + this.numberOfQuestion_ + ")"
        this.title_label_.setString(title)
    }
})