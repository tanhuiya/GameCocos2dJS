/**
 * Created by tanhui on 2018/8/31.
 */

/**
 * 排行榜单个 item 高度
 * @type {number}
 */
var ListItemHeight = 60 * 2

/**
 * 排行榜单个 item
 * @type {any}
 */
var g_app_game_rank_cell = cc.TableViewCell.extend({
    ctor: function (width, height) {
        this._super()
        this.width_ = width
        this.height_ = height
        this.setLayout()
    },

    /**
     * 设置item 布局
     */
    setLayout:function () {
        this.index_label_ = geek_lib.f_label_create(this, "", 40, 10 * 2, this.height_ * 0.5, 1, cc.color.BLACK, 1, 3, cc.AncorPointMidLeft)
        geek_lib.f_circle_sprite_create(this, res.s_head,55 * 2, this.height_ * 0.5, 42, 2)
        this.title_label_ = geek_lib.f_label_create(this, "", 28, 88 * 2, this.height_ - 11 * 2, 1, cc.color.BLACK, 1, 4, cc.AncorPointTopLeft)
        this.school_label_ = geek_lib.f_label_create(this, "", 24, 88 * 2, this.height_ - 32 * 2, 1, cc.hexToColor("#9B9B9B"), 1, 5, cc.AncorPointTopLeft)
        geek_lib.f_label_create(this, "分", 28, 327 * 2, this.height_ * 0.5, 1, cc.color.BLACK, 1, 6, cc.AncorPointMidLeft)
        this.score_label_ = geek_lib.f_label_create(this, "", 28, 325 * 2, this.height_ * 0.5, 1, cc.hexToColor("#E99305"), 1, 7, cc.AncorPointMidRight)
        this.class_label_ = geek_lib.f_label_create(this, "", 28, 211 * 2, this.height_ - 32 * 2, 1, cc.hexToColor("#9B9B9B"), 1, 7, cc.AncorPointTopLeft)
        var blackline = cc.LayerColor.create(cc.hexToColor("#9B9B9B"), this.width_ - 20, 0.6)
        geek_lib.f_set_anchor_point_type(blackline, cc.AncorPointTopLeft)
        this.addChild(blackline,2)
        blackline.setPosition(10,this.height_)
        this.backline_ = blackline
    },

    setData: function (index, data) {
        geek_lib.f_label_change_txt(this.index_label_, data.order + "")
        geek_lib.f_label_change_txt(this.title_label_, data.user_id)
        geek_lib.f_label_change_txt(this.school_label_, data.channel_name)
        geek_lib.f_label_change_txt(this.score_label_, data.question_sum_score)
        geek_lib.f_label_change_txt(this.class_label_, "")
        this.backline_.setVisible(index > 0)
    }
})

/**
 * 获取高度
 * @returns {number}
 */
g_app_game_rank_cell.getHeight = function () {
    return ListItemHeight
}