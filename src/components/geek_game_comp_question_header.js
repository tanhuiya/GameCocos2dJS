/**
 * Created by tanhui on 2018/8/22.
 */

var g_question_header_node = cc.Node.extend({
    init: function () {
        this._super()
    },

    /**
     * 题目头部信息
     */
    setUp:function () {
        var head_bg = geek_lib.f_sprite_create_box(this, res.s_rule, 0, 0, 500, 126, 1, 1, cc.AncorPointTopLeft)

        var white_circle = geek_lib.f_sprite_create_box(this, res.s_white_circle_big, head_bg.getBoundingBox().width, 1, 126,126,2,4, cc.AncorPointTopRight)

        var progress = cc.ProgressTimer.create(cc.Sprite.create(res.s_progress))
        progress.setPosition(head_bg.getBoundingBox().width, 0)
        progress.setType(cc.ProgressTimer.TYPE_RADIAL)
        progress.setAnchorPoint(cc.p(1,1))
        progress.setPercentage(50)
        this.addChild(progress, 4, 5)

        this.time_lable = geek_lib.f_label_create(white_circle, "3",74, white_circle.getBoundingBox().width * 0.5 , white_circle.getBoundingBox().height * 0.5, 1, cc.color.WHITE, 1,1)

        var title_label = geek_lib.f_label_create(this, "第一题（1/20）", 28, 126, -14, 1, cc.color.WHITE, 2,2 , cc.AncorPointTopLeft)

        var score_label = geek_lib.f_label_create(this, "380分", 48, 126, -54, 1, cc.color.WHITE, 2,3, cc.AncorPointTopLeft)

        var white_bg = geek_lib.f_sprite_create_box(this, res.s_white_bg, 60, 0 - head_bg.getBoundingBox().height * 0.5, 100, 100, 2, 4, cc.AncorPointCenter)

        var avatar = geek_lib.f_sprite_create_box(this, res.s_default_avator, 60, 0 - head_bg.getBoundingBox().height * 0.5, 100, 100, 3, 5, cc.AncorPointCenter)
    }
})