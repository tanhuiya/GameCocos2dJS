/**
 * Created by tanhui on 2018/8/25.
 */

var g_game_over_layer = cc.Layer.extend({
    init: function () {
        this._super()
        geek_lib.f_sprite_create_box(this, res.s_background, g_size.width * 0.5, g_size.height * 0.5, g_size.width, g_size.height, 1, 1)
        this.drawRect()
    },

    /**
     * 绘制界面
     */
    drawRect: function () {
        this.close_btn_ = geek_lib.f_btn_create(this, res.s_close, "",g_size.width - 34, g_size.height - 32 * 2, 1, 1, 2, cc.AncorPointCenter)
        var bg = geek_lib.f_sprite_create(this, res.s_over_des_bg, g_size.width * 0.5, g_size.height - 23 * 2, 1, 2, 3, cc.AncorPointTopMid)
        // 用户头像
        geek_lib.f_circle_sprite_create(this, res.s_head, g_size.width * 0.5, g_size.height - 60 - 108, 108, 3, 4)
        // 用户名称
        geek_lib.f_label_create(this, "tantan", 36, g_size.width * 0.5, g_size.height - 300, 1, cc.hexToColor("#1F2B75"),3,5,cc.AncorPointTopMid)

        // 测评结果
        // var node = new g_game_comp_over_test(g_size.width, 2, "测评结果标题", "测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析测评解析")
        // 答题结果
        var node = new g_game_comp_over_question(g_size.width, 2, 100, 120)
        this.addChild(node, 2, 5)
        node.setPosition(0, bg.getBoundingBox().y)


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