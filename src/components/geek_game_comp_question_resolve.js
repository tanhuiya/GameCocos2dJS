/**
 * Created by tanhui on 2018/8/24.
 */


var QustionResolveType = {
    None : 0,
    Success : 1,
    Error : 2,
}

var g_question_result_node = cc.LayerColor.extend({

    stop_callback_: function () {},
    next_callback_: function () {},

    ctor: function (data, stop_callback, next_callback) {
        this._super(cc.color(0, 0, 0, 120))
        this.stop_callback_ = stop_callback
        this.next_callback_ = next_callback
        this.setData(data)
    },

    /**
     * 是否答对标志
     * @param data
     */
    setData: function (data) {

        var node = cc.LayerColor.create(cc.color(255,255,11,0), 336 * 2, 240 *2)
        this.addChild(node)
        var width = 336 * 2
        node.setPosition( (g_size.width - width) * 0.5 , 67 * 2)

        var bg = geek_lib.f_imageview_box_create(node, res.s_activity_bg, 0, 0, width, 240 *2, 1, 1, cc.AncorPointBottomLeft)
        var rect = bg.getBoundingBox()
        if (data.type == QustionResolveType.Error) {
            geek_lib.f_sprite_create_box(node, res.s_error, 112 * 2 , 212 * 2, 40, 40, 2, 2,cc.AncorPointCenter)
            geek_lib.f_label_create(node, "回答错误", 50, rect.width * 0.5 + 20, 212 * 2, 1, cc.hexToColor("#1F2B75"), 3, 3, cc.AncorPointCenter)
        } else if (data.type == QustionResolveType.Success) {
            geek_lib.f_sprite_create_box(node, res.s_right, 112 * 2 , 212 * 2, 40, 40, 2, 2,cc.AncorPointCenter)
            geek_lib.f_label_create(node, "回答正确", 50, rect.width * 0.5 + 20, 212 * 2, 1, cc.hexToColor("#1F2B75"), 3, 3, cc.AncorPointCenter)
        }

        var blackline = cc.LayerColor.create(cc.hexToColor("#9B9B9B"), width - 40, 0.6)
        geek_lib.f_set_anchor_point_type(blackline, cc.AncorPointTopLeft)
        node.addChild(blackline,2)
        blackline.setPosition(20, 182 * 2)

        var des_label = geek_lib.f_label_create(node, data.data, 34, width * 0.5, 157 * 2, 1, cc.hexToColor("#1F2B75"), 3, 3, cc.AncorPointTopMid)
        des_label.setDimensions(300 * 2, 0)

        var stop_btn = geek_lib.f_btn_create(this, res.s_common_btn, "", g_size.width * 0.25, 25 * 2, 1, 1, 4, cc.AncorPointCenter)
        stop_btn.setTitleText("结束答题")
        stop_btn.setTitleFontSize(38)
        this.stop_btn_ = stop_btn
        var next_btn = geek_lib.f_btn_create(this, res.s_common_btn, "", g_size.width * 0.75, 25 * 2, 1, 1, 4, cc.AncorPointCenter)
        next_btn.setTitleText("下一题")
        next_btn.setTitleFontSize(38)
        this.next_btn_ = next_btn
    },

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (sender) {
                case this.stop_btn_:
                    if (this.stop_callback_) {
                        this.stop_callback_()
                    }
                    this.removeFromParent()
                    break;
                case this.next_btn_:
                    if (this.next_callback_) {
                        this.next_callback_()
                    }
                    this.removeFromParent()
                    break;
            }
        }
    },
})