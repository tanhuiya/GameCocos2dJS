/**
 * Created by tanhui on 2018/8/28.
 */


var DisableColor = cc.hexToColor("#4A4A4A")
var TimeToWaite = 6
/**
 * 信息录入界面
 * @type {any}
 */
var g_game_activity_record_layer = cc.Layer.extend({

    fetchCode_: false,
    seconds_: 0,

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
        var marign_x = (size.width - 656) * 0.5
        this.close_btn_ = geek_lib.f_btn_create(that, res.s_login_delete, "", size.width - 60, size.height - 60, 1, 2, 1, cc.AncorPointCenter)
        geek_lib.f_label_create(that, "活动平台信息录入", 56, size.width * 0.5, size.height - 60, 1, cc.hexToColor("#117AF5"), 1, 1, cc.AncorPointTopMid)

        {// 姓名
            geek_lib.f_imageview_create(that, res.s_edit_box,marign_x, size.height - 150 * 2, 1, 1, 2,cc.AncorPointBottomLeft)
            var name_edit = geek_lib.f_edit_create(that, marign_x, size.height - 150 * 2, 656 - 100, 57 * 2, 28, 28, null, "您的姓名", 20, 1)
            geek_lib.f_set_anchor_point_type(name_edit, cc.AncorPointBottomLeft)
            var name_cancel = geek_lib.f_btn_create(that, res.s_login_delete, "", 333 * 2, size.height - 120 * 2, 1, 2, 3, cc.AncorPointCenter)
            name_cancel.setVisible(false)
            name_cancel.setSwallowTouches(true)
            this.name_cancel_ = name_cancel
            this.name_edit_ = name_edit

        }

        {// 手机号
            geek_lib.f_imageview_create(that, res.s_edit_box,marign_x, size.height - 210 * 2, 1, 1, 2,cc.AncorPointBottomLeft)
            var phone_edit = geek_lib.f_edit_create(that, marign_x, size.height - 210 * 2, 656 - 100, 57 * 2, 28, 28, null, "手机号码", 15, 1)
            geek_lib.f_set_anchor_point_type(phone_edit, cc.AncorPointBottomLeft)
            var phone_cancel = geek_lib.f_btn_create(that, res.s_login_delete, "", 333 * 2, size.height - 180 * 2, 1, 2, 3, cc.AncorPointCenter)
            phone_cancel.setVisible(false)
            this.phone_cancel_ = phone_cancel
            this.phone_edit_ = phone_edit
        }

        {// 验证码
            geek_lib.f_imageview_create(that, res.s_edit_box,marign_x, size.height - 270 * 2, 1, 1, 2,cc.AncorPointBottomLeft)
            var captcha_edit = geek_lib.f_edit_create(that, marign_x, size.height - 270 * 2, 656 - 300, 57 *2, 28, 28, null,"验证码", 4, 1)
            geek_lib.f_set_anchor_point_type(captcha_edit, cc.AncorPointBottomLeft)
            geek_lib.f_imageview_create(that, res.s_v_line,230 * 2, size.height - 242 * 2, 1, 1, 2,cc.AncorPointMidLeft)
            var captch_label = geek_lib.f_label_create(that, "获取验证码", 28, 240 * 2, size.height - 242 * 2, 1, cc.hexToColor("#117AF5"), 1, 3, cc.AncorPointMidLeft)
            this.captch_label_ = captch_label
            this.captcha_edit_ = captcha_edit
            this.captchaClickEvent()
        }

        /**
         * 学校
         */
        var school_edit = geek_lib.f_edit_create(that, size.width * 0.5, size.height - 330 * 2, 656, 57 *2, 28, 28,res.s_edit_box,"学校",30, 2)
        geek_lib.f_set_anchor_point_type(school_edit, cc.AncorPointBottomMid)
        this.school_edit_ = school_edit

        /**
         * 年级
         */
        var grade_edit = new g_game_comp_select_item(marign_x, size.height - 390 * 2, 656, 57 *2, "年级", function () {
            that.showSheet(SheetType.SheetGrade)
        })
        this.addChild(grade_edit, 1, 9)

        /**
         * 班级
         */
        var class_edit = new g_game_comp_select_item(marign_x, size.height - 450 * 2, 656, 57 *2, "班级", function () {
            that.showSheet(SheetType.SheetClass)
        })
        this.addChild(class_edit, 1, 10)

        /**
         * 保存按钮
         */
        var save_btn = geek_lib.f_btn_create(that, res.s_save_record, "保存", size.width * 0.5, size.height - 470 * 2, 1, 1,3, cc.AncorPointTopMid)
        save_btn.setTitleFontSize(38)

    },

    /**
     * 显示选择框
     */
    showSheet:function (type) {
        var back = cc.LayerColor.create(cc.color(112,112,112,150))
        this.addChild(back, 9)
        var sheet = new g_app_game_action_sheet(MockData.ClassData, type)
        sheet.setPosition(0, 0)
        geek_lib.f_set_anchor_point_type(sheet, cc.AncorPointBottomLeft)
        this.addChild(sheet, 9999, 10)
        var that = this
        sheet.setCallback(function (isSelect, data) {
            back.removeFromParent()
            sheet.removeFromParent()
            that.recoverCocosBug()
        })
        var move1 = cc.moveTo(0.3, cc.p(0, 0));
        sheet.runAction(cc.sequence(move1));

        this.fixCocosEditBoxBug(sheet.getBoundingBox().height)
    },

    /**
     *恢复EditBox 显示
     */
    recoverCocosBug: function () {
        this.school_edit_.setVisible(true)
        this.captcha_edit_.setVisible(true)
    },
    /**
     * EditBox 层级过高， 临时解决方案， 隐藏sheet 下部的editbox
     * @param belowHeight
     */
    fixCocosEditBoxBug:function (belowHeight) {
        console.log(belowHeight)
        if (this.captcha_edit_.getBoundingBox().y + this.captcha_edit_.getBoundingBox().height * 0.5 < belowHeight) {
            this.captcha_edit_.setVisible(false)
        }

        console.log(this.school_edit_.getBoundingBox().y + this.school_edit_.getBoundingBox().height * 0.5 )
        if (this.school_edit_.getBoundingBox().y + this.school_edit_.getBoundingBox().height * 0.5 < belowHeight) {
            this.school_edit_.setVisible(false)
        }
    },

    /**
     * api获取验证码
     */
    loadPhoneCode: function () {
        geek_lib.f_network_post_json(
            this,
            uri.sendSms,
            {
                phone: this.phone_edit_.getText()
            },
            function (response) {
                if (response.returnCode == 1) {
                    console.log("111")
                    geek_lib.g_notice("发送成功", 5)
                } else {
                    console.log("000")
                    geek_lib.g_notice(response.msg, 15)
                }
            }, function () {
                console.log("error")
            }
        );
    },

    /**
     * 点击获取验证码
     */
    captchaClickEvent: function () {
        var that = this
        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan : function (touch,event){
                var target = event.getCurrentTarget();
                // target --> item , target.parent --> activity
                var locationInNode = target.parent.convertToNodeSpace(touch.getLocation());
                var rect = target.getBoundingBox();
                if (!cc.rectContainsPoint(rect, locationInNode)) {
                    return false;
                }
                return true
            },
            onTouchEnded: function (touch,event) {
                // captch clicked
                if (!that.fetchCode_) {
                    that.fetchCode_ = true
                    that.resetTimer()
                    that.loadPhoneCode()
                    geek_lib.f_timer_start(that, that.g_hand_timer_pro, 1, true)
                }
            }
        }, this.captch_label_);
    },

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (sender) {
                case this.phone_cancel_:
                    this.phone_edit_.setText("")
                    break;
                case this.name_cancel_:
                    this.name_edit_.setText("")
                    break;
                case this.close_btn_:
                    // this.removeFromParent()
                    break;
            }
        }
    },

    /**
     * 编辑框开始编辑回调函数
     * @param sender
     */
    editBoxEditingDidBegin: function (sender) {
        switch (sender) {
            case this.name_edit_:
                this.name_cancel_.setVisible(true)
                break;
            case this.phone_edit_:
                this.phone_cancel_.setVisible(true)
                break;
        }
    },

    /**
     * 编辑框结束编辑回调函数
     * @param sender
     */
    editBoxEditingDidEnd: function (sender) {
        switch (sender) {
            case this.name_edit_:
                this.name_cancel_.setVisible(false)
                break;
            case this.phone_edit_:
                this.phone_cancel_.setVisible(false)
                break;
        }
    },

    /**
     * 定时器回调
     */
    g_hand_timer_pro:function () {
        this.seconds_ = this.seconds_ - 1
        if (this.seconds_ > 0){
            this.captch_label_.setColor(DisableColor);
            geek_lib.f_label_change_txt(this.captch_label_, this.seconds_ + "s后重发")
        } else {
            this.fetchCode_ = false
            this.captch_label_.setColor(cc.hexToColor("#117AF5"))
            geek_lib.f_label_change_txt(this.captch_label_, "获取验证码")
            geek_lib.f_timer_stop(this, this.g_hand_timer_pro)

        }
    },

    /**
     * 重置时长
     */
    resetTimer: function () {
        this.seconds_ = TimeToWaite
    }
})

/**
 * 年级/班级 item
 * @type {any}
 */
var g_game_comp_select_item = cc.LayerColor.extend({
    ctor:function (pos_x, pos_y, width, height, title, func) {
        this._super(cc.color(255,33,55,0), width, height)
        this.selectCallback_ = func
        this.draw(title)
        this.setPosition(pos_x, pos_y)
    },
    draw: function (placeholder) {
        var size = this.getBoundingBox()
        geek_lib.f_imageview_create(this, res.s_edit_box, 0, 0, 1, 1, 2,cc.AncorPointBottomLeft)
        var label = geek_lib.f_label_create(this, placeholder, 28, 5, size.height * 0.5, 1, DisableColor, 1, 1, cc.AncorPointMidLeft)
        label.height = 57 * 2
        // var name_edit = geek_lib.f_edit_create(this, 0, 0, size.width, size.height, 28, 28,res.s_edit_box,placeholder,20)
        // geek_lib.f_set_anchor_point_type(name_edit, cc.AncorPointBottomLeft)
        geek_lib.f_imageview_create(this, res.s_arrow, size.width - 20, size.height * 0.5, 1, 2, 3, cc.AncorPointCenter)

        var that = this
        cc.eventManager.addListener(cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan : function (touch,event){
                var target = event.getCurrentTarget();
                // target --> item , target.parent --> activity
                var locationInNode = target.parent.convertToNodeSpace(touch.getLocation());
                var rect = target.getBoundingBox();
                if (!cc.rectContainsPoint(rect, locationInNode)) {
                    return false;
                }
                return true
            },
            onTouchEnded: function (touch,event) {
                if (that.selectCallback_){
                    that.selectCallback_()
                }
            }
        }), this);
    },

})