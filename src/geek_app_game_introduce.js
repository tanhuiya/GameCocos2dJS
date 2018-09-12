/**
 * Created by tanhui on 2018/8/25.
 */

var g_game_introduce_layer = cc.Layer.extend({
    /**
     * 初始化函数
     */
    init: function (data) {
        this._super()

        this.drawRect(data)
        geek_lib.f_swallow_event(this)
    },

    /**
     * 绘制界面
     */
    drawRect: function (data) {
        var text = data.introContent
        geek_lib.f_sprite_create_box(this,data.introPage ? data.introPage : res.s_background , g_size.width * 0.5, g_size.height * 0.5, g_size.width, g_size.height, 1, 1)
        text = this.processContent(text)
        geek_lib.f_label_create(this, "活动介绍", 40, g_size.width * 0.5, g_size.height - 33 * 2, 1, cc.color.WHITE, 1, 1, cc.AncorPointCenter)
        this.close_btn_ = geek_lib.f_btn_create(this, res.s_close, "",g_size.width - 34, g_size.height - 32 * 2, 1, 1, 2, cc.AncorPointCenter)
        {
            var bg = ccui.ImageView.create(res.s_activity_bg)
            bg.setScale9Enabled(true)
            bg.setCapInsets(cc.rect(200, 200 ,1, 1))
            bg.setContentSize(357 * 2, 473 * 2)
            bg.setPosition(g_size.width * 0.5, g_size.height - 55 * 2)
            geek_lib.f_set_anchor_point_type(bg, cc.AncorPointTopMid)
            this.addChild(bg, 1, 3)
        }
        var des_label = geek_lib.f_label_create(this, text, 34, 25 * 2, g_size.height - 87 * 2, 1, cc.hexToColor("#1F2B75"), 1, 4, cc.AncorPointTopLeft)
        des_label.setDimensions(g_size.width - 25 * 2 * 2, 0)
    },

    /**
     * 去除h5标签
     * @param text
     * @returns {string|void|XML}
     */
    processContent: function (text) {
        var reg=new RegExp("<[^>]+>","g") //创建正则RegExp对象
        var newstr = text.replace(reg,"")
        if (newstr[0] == '\"' && newstr[newstr.length - 1] == '\"') {
            newstr = newstr.substr(1, newstr.length - 2)
        }
        return newstr
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