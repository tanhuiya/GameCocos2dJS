/**
 * Created by tanhui on 2018/8/28.
 */


/**
 * 信息录入界面
 * @type {any}
 */
var g_game_introduce_layer = cc.Layer.extend({
    init: function () {
        this._super()
        this.drawRect()
    },

    /**
     * 绘制界面
     */
    drawRect: function () {
        var that = this
        var size = g_size
        geek_lib.f_label_create(that, "活动平台信息录入", 56, size.width * 0.5, size.height - 60, 1, cc.hexToColor("#117AF5"), 1, 1, cc.AncorPointTopMid)

        {
            var name_edit = geek_lib.f_edit_create(that, size.width * 0.5, size.height - 150 * 2, 327 * 2, 44 * 2, 28, 28, res.s_rule, "您的姓名", 20)
            geek_lib.f_set_anchor_point_type(name_edit, cc.AncorPointBottomMid)
            var name_cancel = geek_lib.f_btn_create(that, res.s_error, "", 318 * 2, size.height - 130 * 2, 1, 2, 3, cc.AncorPointCenter)
            name_cancel.setVisible(false)
            name_cancel.setSwallowTouches(true)
            this.name_cancel_ = name_cancel
            var name_del = cc.Class.extend({
                editBoxEditingDidBegin: function (sender) {
                    name_cancel.setVisible(true)
                },
                editBoxEditingDidEnd: function (sender) {
                    name_cancel.setVisible(false)
                },
            })
            name_edit.setDelegate(new name_del())
            this.name_edit_ = name_edit
        }

        {
            var phone_edit = geek_lib.f_edit_create(that, size.width * 0.5, size.height - 210 * 2, 327 * 2, 44 * 2, 28, 28, res.s_rule, "手机号码", 20)
            geek_lib.f_set_anchor_point_type(phone_edit, cc.AncorPointBottomMid)
            var phone_cancel = geek_lib.f_btn_create(that, res.s_error, "", 318 * 2, size.height - 190 * 2, 1, 2, 3, cc.AncorPointCenter)
            phone_cancel.setVisible(false)
            this.phone_cancel_ = phone_cancel
            var phone_del = cc.Class.extend({
                editBoxEditingDidBegin: function (sender) {
                    phone_cancel.setVisible(true)
                },
                editBoxEditingDidEnd: function (sender) {
                    phone_cancel.setVisible(false)
                },
            })
            phone_edit.setDelegate(new phone_del())
            this.phone_edit_ = phone_edit
        }


        var captcha_edit = geek_lib.f_edit_create(that, size.width * 0.5, size.height - 270 * 2, 327 * 2, 44 *2, 28, 28,res.s_rule,"验证码",4)
        geek_lib.f_set_anchor_point_type(captcha_edit, cc.AncorPointBottomMid)

        var school_edit = geek_lib.f_edit_create(that, size.width * 0.5, size.height - 330 * 2, 327 * 2, 44 *2, 28, 28,res.s_rule,"手机号码",30)
        geek_lib.f_set_anchor_point_type(school_edit, cc.AncorPointBottomMid)

        var grade_edit = geek_lib.f_edit_create(that, size.width * 0.5, size.height - 390 * 2, 327 * 2, 44 *2, 28, 28,res.s_rule,"手机号码",30)
        geek_lib.f_set_anchor_point_type(grade_edit, cc.AncorPointBottomMid)

        var class_edit = geek_lib.f_edit_create(that, size.width * 0.5, size.height - 450 * 2, 327 * 2, 44 *2, 28, 28,res.s_rule,"手机号码",30)
        geek_lib.f_set_anchor_point_type(class_edit, cc.AncorPointBottomMid)

        var save_btn = geek_lib.f_btn_create(that, res.s_rule, "保存", size.width * 0.5, size.height - 470 * 2, 1, 1,3, cc.AncorPointTopMid)
        save_btn.setTitleFontSize(52)
    },

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        console.log(11111)
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (sender) {
                case this.phone_cancel_:
                    this.phone_edit_.setText("")
                    console.log(11111)
                    break;
                case this.name_cancel_:
                    this.name_edit_.setText("")
                    break;
            }
        }
    },
})

var g_game_comp_cancel_editbox = cc.Node.extend({
    init: function (placeholder) {
        this._super()
        var size = g_size
        var name_edit = geek_lib.f_edit_create(this, 0, 0, 327 * 2, 44 *2, 28, 28,res.s_rule,"您的姓名",20)
        geek_lib.f_set_anchor_point_type(name_edit, cc.AncorPointBottomLeft)
        console.log(name_edit.getBoundingBox())
    }
})