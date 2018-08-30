/**
 * Created by tanhui on 2018/8/30.
 */

var SheetItemHeight = 41 * 2
var SheetScrollHeight = SheetItemHeight * 6
var SheetHeadHeigth = 72 * 2
var SheetTailHeigth = 92 * 2

/**
 * 选择框类型
 * @type {{SheetClass: number, SheetGrade: number}}
 */
var SheetType = {
    SheetClass: 1,
    SheetGrade: 2
}

/**
 * 弹出选择框
 * @type {any}
 */
var g_app_game_action_sheet = cc.LayerColor.extend({
    /**
     * 构造函数
     */
    ctor: function (dataArr, type) {
        var total = SheetTailHeigth + SheetHeadHeigth + SheetScrollHeight
        this._super(cc.color(255,255,255), g_size.width, total)
        this.width_ = g_size.width
        this.dataArr_ = dataArr
        this.type_ = type
        this.draw()
        this.drawScrollviewItem()
        this.swallowEvent()
    },

    /**
     * 设置回调
     */
    setCallback: function (func) {
        this.callBack_ =  func
    },

    /**
     * 绘制界面
     */
    draw: function () {
        var text = ""
        if (this.type_ == SheetType.SheetClass) {
            text = "选择班级"
        } else if (this.type_ == SheetType.SheetGrade) {
            text = "选择年级"
        }
        var sure_btn = geek_lib.f_btn_create(this, res.s_save_record, "", this.width_ * 0.5, 92, 1, 1, 1, cc.AncorPointCenter)
        sure_btn.setTitleFontSize(36)
        sure_btn.setTitleText("确定");
        this.sure_ = sure_btn
        geek_lib.f_label_create(this, text, 36, 18 * 2, SheetTailHeigth + SheetScrollHeight + 65, 1, cc.color.BLACK, 1, 3, cc.AncorPointBottomLeft)
        this.close_ = geek_lib.f_btn_create(this, res.s_login_delete, "", this.width_ - 60, SheetTailHeigth + SheetScrollHeight + 65 + 10, 1, 2, 4, cc.AncorPointBottomLeft)
    },

    /**
     * 绘制scrollview
     */
    drawScrollviewItem:function () {
        var InnerHeight = this.dataArr_.length * SheetItemHeight
        var scrollView = geek_lib.f_create_scroll_view(this, 0, SheetTailHeigth, this.width_, SheetScrollHeight, this.width_, InnerHeight, 1)
        var heightOffset = SheetScrollHeight > InnerHeight ? SheetScrollHeight - InnerHeight : 0
        for (var i = 0; i < this.dataArr_.length; i++ ){
            var item = new g_game_comp_scrollview_item(i, this.dataArr_[i], SheetItemHeight)
            scrollView.addChild(item, 3, i + 1)
            item.setPosition(0, InnerHeight - (i+1)* SheetItemHeight  + heightOffset)
        }
        scrollView.scrollToTop(0.1)
    },

    swallowEvent:function () {
        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan : function (touch,event){
                console.log(11111)
                return true
            },
        }, this);
    },

    /**
     * 关闭
     */
    close: function () {
        if (this.callBack_) {
            this.callBack_(false, null)
        }
    },

    /**
     * 确认选择
     */
    confirm: function () {
        if (this.callBack_) {
            this.callBack_(true, null)
        }
    },

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (sender) {
                case this.close_:
                    this.close()
                    break;
                case this.sure_:
                    this.confirm()
            }
        }
    },
})


var g_game_comp_scrollview_item = cc.LayerColor.extend({
    height_: 0,
    data_: null,
    /**
     * 构造函数
     */
    ctor: function (index, data, height) {
        this._super(cc.color(255,55,55,0), g_size.width, height)
        this.data_ = data
        this.height_ = height
        this.index_ = index
        this.draw()
        this.event()
    },

    setSelect: function (selectd) {
        if (selectd) {
            this.icon_.setVisible(true)
            this.label_.setFontColor(cc.color.BLACK)
        } else {
            this.icon_.setVisible(false)
            this.label_.setFontColor(cc.color(112,112,112))
        }
    },

    /**
     * 绘制item
     */
    draw:function () {
        this.label_ = geek_lib.f_label_create(this, this.data_, 36, g_size.width * 0.5, this.height_ * 0.5, 1, cc.color.BLACK, 1, 1, cc.AncorPointCenter)
        var image_x = this.label_.getBoundingBox().x + this.label_.getBoundingBox().width + 40
        this.icon_ = geek_lib.f_sprite_create_box(this, res.s_login_delete, image_x, this.height_ * 0.5, 30, 30, 1, 2, cc.AncorPointMidLeft)
        this.icon_.setVisible(false)
    },

    event: function () {
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
                console.log("qweqewr")
            }
        }), this);
    }
})