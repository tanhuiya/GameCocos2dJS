/**
 * Created by tanhui on 2018/8/25.
 */

var g_game_introduce_layer = cc.Layer.extend({
    /**
     * 初始化函数
     */
    init: function () {
        this._super()
        geek_lib.f_sprite_create_box(this, res.s_background, g_size.width * 0.5, g_size.height * 0.5, g_size.width, g_size.height, 1, 1)
        this.drawRect()
    },

    /**
     * 绘制界面
     */
    drawRect: function () {
        var data = "你你爱你你啊啊你你爱你你啊啊你你爱你你啊啊你你爱你你啊啊你你爱你你啊啊你你爱你你啊啊你你爱你你啊啊你你爱你你啊啊"
        geek_lib.f_label_create(this, "游戏介绍", 40, g_size.width * 0.5, g_size.height - 33 * 2, 1, cc.color.WHITE, 1, 1, cc.AncorPointCenter)
        this.close_btn_ = geek_lib.f_btn_create(this, res.s_close, "",g_size.width - 34, g_size.height - 32 * 2, 1, 1, 2, cc.AncorPointCenter)
        geek_lib.f_sprite_create_box(this, res.s_activity_bg, g_size.width * 0.5, g_size.height - 55 * 2, 357 * 2, 473 * 2, 1, 3,cc.AncorPointTopMid)

        var des_label = geek_lib.f_label_create(this, data, 34, 25 * 2, g_size.height - 87 * 2, 1, cc.hexToColor("#1F2B75"), 1, 4, cc.AncorPointTopLeft)
        des_label.setDimensions(g_size.width - 25 * 2 * 2, 0)
    },

    /**
     * 关闭当前页面
     */
    close: function () {
        this.removeFromParent()
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
                    this.close()
                    break;
            }
        }
    },
})