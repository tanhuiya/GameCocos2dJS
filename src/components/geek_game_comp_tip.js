/**
 * Created by tanhui on 2018/8/31.
 */

/**
 * 弹出提示框
 * @type {any}
 */
var g_game_comp_tip_layer = cc.LayerColor.extend({

    ctor: function (icon, text) {
        this._super(cc.color(0, 0, 0, 150))
        this.draw(icon, text)
    },

    draw: function (icon, text) {
        var size = g_size
        var bg_center_y = (size.height + 130) * 0.5
        var bg = geek_lib.f_sprite_create_box(this, res.s_tip_bg, size.width * 0.5, bg_center_y, 504, 402, 1, 1, cc.AncorPointCenter)
        var icon_center_y = bg.getBoundingBox().y + bg.getBoundingBox().height - 150
        geek_lib.f_sprite_create(this, icon, size.width * 0.5, icon_center_y, 1, 2, 2, cc.AncorPointCenter)
        var text_y = bg.getBoundingBox().y + 50 * 2
        geek_lib.f_label_create(this, text, 48, size.width * 0.5, text_y, 1, cc.hexToColor("#4486EB"), 2, 3, cc.AncorPointTopMid)

        this.close_btn_ = geek_lib.f_btn_create(this, res.s_tip_close, "", size.width * 0.5, bg.getBoundingBox().y - 15, 1, 2, 4, cc.AncorPointTopMid)
    },

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (sender) {
                case this.close_btn_:
                    this.removeFromParent(true)
                    break;
            }
        }
    },
})
