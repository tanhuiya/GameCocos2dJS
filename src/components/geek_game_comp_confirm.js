/**
 * Created by tanhui on 2018/9/6.
 */

var g_app_game_comp_confirm = cc.LayerColor.extend({
    call_back_: function (index) {},
    /**
     * 构造函数
     */
    ctor: function (text, callback) {
        this._super(cc.color(112, 112, 112, 150), g_size.width, g_size.height)
        this.call_back_ = callback
        this.setUpLayout(text)
    },

    /**
     * 设置布局
     * @param text
     */
    setUpLayout: function (text) {
        var width = 336 * 2
        var height = 407 * 2
        var back = cc.LayerColor.create(cc.color(255, 255, 255, 0), width, height)
        this.addChild(back, 1)
        back.setPosition( (g_size.width - width) * 0.5, (g_size.height - height) * 0.5)

        geek_lib.f_imageview_box_create(back, res.s_confirm_bg, 0, 0, width, height, 1, 1, cc.AncorPointBottomLeft)
        var top = (54 + 195) * 2
        if (text && text.length) {
            top = (246 + 30) * 2
            geek_lib.f_label_create(back, text, 40, width * 0.5, top, 1, cc.hexToColor("#95AAD1"), 2, 2, cc.AncorPointTopMid)
            top = (54 + 180) * 2
        }
        this.confirm_1_ = geek_lib.f_btn_create(back, res.s_confirm_1, "查看结果", width * 0.5, top, 1, 2, 3, cc.AncorPointTopMid)
        this.confirm_1_.addTouchEventListener(this.ctl_button_event, this);
        this.confirm_1_.setTitleFontSize(44)
        top = top - 74 * 2
        this.confirm_2_ = geek_lib.f_btn_create(back, res.s_confirm_2, "继续答题", width * 0.5, top, 1, 2, 4, cc.AncorPointTopMid)
        this.confirm_2_.addTouchEventListener(this.ctl_button_event, this);
        this.confirm_2_.setTitleFontSize(44)
        top = top - 74 * 2
        this.confirm_3_ = geek_lib.f_btn_create(back, res.s_confirm_3, "直接退出", width * 0.5, top, 1, 2, 5, cc.AncorPointTopMid)
        this.confirm_3_.addTouchEventListener(this.ctl_button_event, this);
        this.confirm_3_.setTitleFontSize(44)
    },

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (!this.call_back_)return
            switch (sender) {
                case this.confirm_1_:
                    this.call_back_(0)
                    break;
                case this.confirm_2_:
                    this.call_back_(1)
                    break;
                case this.confirm_3_:
                    this.call_back_(2)
                break;
            }
        }
    },
})