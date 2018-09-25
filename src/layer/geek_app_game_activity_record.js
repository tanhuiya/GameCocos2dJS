/**
 * Created by tanhui on 2018/8/28.
 */


var DisableColor = cc.hexToColor("#8A8A8A")
var TimeToWaite = 60

/**
 * 信息录入界面
 * @type {any}
 */
var g_activity_record_layer = cc.LayerColor.extend({
    classArr_: [],
    gradeArr_: [],
    fetchCode_: false,
    seconds_: 0,
    lastGradeID_: -1,
    lastClassID_: -1,
    success_call_back: function () {},

    ctor: function () {
        this._super(cc.color(255,255,255))
    },

    init: function () {
        this._super()
        geek_lib.f_swallow_event(this)
        this.drawRect()
    },

    /**
     * 绘制界面
     */
    drawRect: function () {
        var that = this
        var size = g_size

        {
            var bg = ccui.ImageView.create(res.s_white)
            bg.setScale9Enabled(true)
            bg.setCapInsets(cc.rect(60, 60 ,1, 1))
            bg.setContentSize(g_size)
            bg.setPosition(this.width_ * 0.5, this.height_ * 0.5)
            this.addChild(bg, 1, 1)
        }

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
        var school_edit = new g_game_comp_select_item(marign_x, size.height - 330 * 2, 656, 57 *2, "学校", null)
        school_edit.setText(g_game_user.channelName)
        this.addChild(school_edit, 1, 8)

        /**
         * 保存按钮
         */
        var save_btn = geek_lib.f_btn_create(that, res.s_save_record, "保存", size.width * 0.5, size.height - 470 * 2, 1, 1,3, cc.AncorPointTopMid)
        save_btn.setTitleFontSize(38)
        this.submit_btn_ = save_btn


    },


    /**
     * 提交用户信息
     */
    apiSubmitInfo: function () {
        if (this.name_edit_.getString().length < 1){
            console.log("name empty")
            geek_lib.g_notice("姓名非法", 2)
            return
        }
        if (this.captcha_edit_.getString().length < 4) {
            geek_lib.g_notice("验证码非法", 2)
            return
        }
        if (this.phone_edit_.getString().length < 11){
            geek_lib.g_notice("手机号非法", 2)
            return
        }

        var param = {
            mobile: this.phone_edit_.getString(),
            code: this.captcha_edit_.getString(),
            // gradeName: gradename,
            // className: classname,
            userName: this.name_edit_.getString(),
            channelId: g_game_user.channelID,
            userId: g_game_user.userID
        }
        var that = this
        geek_lib.f_network_post_json(this, uri.userInfoAdd, param, function (response) {
            g_game_info.setRecord(true)
            if (that.success_call_back) {
                that.success_call_back()
                that.removeFromParent()
            }
        })
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
                console.log("发送成功")
                // geek_lib.g_notice("发送成功", 2)
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
                    this.removeFromParent()
                    break;
                case this.submit_btn_:
                    this.apiSubmitInfo()
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
    },

    /**
     * 通用错误处理
     */
    errorHandler: function (msg) {
        geek_lib.g_notice(msg, 2)
    },
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
        this.placeholder_ = placeholder
        var size = this.getBoundingBox()
        geek_lib.f_imageview_create(this, res.s_edit_box, 0, 0, 1, 1, 2,cc.AncorPointBottomLeft)
        var label = geek_lib.f_label_create(this, placeholder, 28, 5, size.height * 0.5, 1, DisableColor, 1, 1, cc.AncorPointMidLeft)
        label.height = 57 * 2
        this.label_ = label

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

    setText: function (text) {
        if (!text) {
            text = this.placeholder_
            this.label_.setColor(DisableColor)
        } else {
            this.label_.setColor(cc.color.BLACK)
        }
        geek_lib.f_label_change_txt(this.label_, text)
    }

})