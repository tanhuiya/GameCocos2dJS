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
var g_comp_action_sheet = cc.LayerColor.extend({
    items_: [],
    lastIndex_: -1,
    total_: 0,
    /**
     * 构造函数
     */
    ctor: function (dataArr, type, lastIndex) {
        this._super(cc.color(112,112,112,150), g_size.width, g_size.height)
        var total = SheetTailHeigth + SheetHeadHeigth + SheetScrollHeight
        this.total_ = total
        var white_bg = cc.LayerColor.create(cc.color.WHITE, g_size.width, total)
        this.addChild(white_bg)
        white_bg.setPosition(0, 0)
        this.white_bg_ = white_bg
        this.width_ = g_size.width
        this.dataArr_ = dataArr
        this.type_ = type
        this.lastIndex_ = lastIndex
        this.draw()
        this.drawScrollviewItem()
        this.swallowEvent()
    },

    /**
     * 吞噬事件
     */
    swallowEvent:function () {
        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan : function (touch,event){
                return true
            },
        }, this);
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
        geek_lib.f_label_create(this.white_bg_, text, 36, 18 * 2, SheetTailHeigth + SheetScrollHeight + 65, 1, cc.color.BLACK, 1, 3, cc.AncorPointBottomLeft)
        this.close_ = geek_lib.f_btn_create(this, res.s_login_delete, "", this.width_ - 60, SheetTailHeigth + SheetScrollHeight + 65 + 10, 1, 2, 4, cc.AncorPointBottomLeft)
    },

    /**
     * 绘制scrollview
     */
    drawScrollviewItem:function () {
        var tableView = new cc.TableView(this, cc.size(this.width_, SheetScrollHeight))
        // tableView.setBounceable(false)
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL)
        tableView.setPosition(0, SheetTailHeigth)
        tableView.setDelegate(this)
        // cell 顺序从上到下排列
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN)
        this.white_bg_.addChild(tableView, 2, 2)
        tableView.reloadData()
        this.tableView_ = tableView

    },

    /**
     * 设置点击cell后的回调函数
     * @param table
     * @param cell
     */
    tableCellTouched: function (table, cell) {
        var index = cell.getIdx()
        this.lastIndex_ = index
        if (this.lastCell_) {
            this.lastCell_.setSelect(false)
        }
        cell.setSelect(true)
        this.lastCell_ = cell
    },

    tableCellHighlight: function (table, cell) {
        var index = cell.getIdx()
        this.lastIndex_ = index
        if (this.lastCell_) {
            this.lastCell_.setSelect(false)
        }
        cell.setSelect(true)
        this.lastCell_ = cell
    },

    /**
     * 设置cell大小
     * @param table
     * @param idx
     * @returns {{width, height}}
     */
    tableCellSizeForIndex: function (table, idx) {
        return cc.size(this.width_, SheetItemHeight);
    },

    /**
     * 添加Cell
     * @param table
     * @param idx
     * @returns {*}
     */
    tableCellAtIndex: function (table, idx) {
        var cell = table.dequeueCell();
        if (!cell) {
            cell = new g_game_comp_scrollview_item(SheetItemHeight);
        }
        var item = this.dataArr_[idx]
        if (idx == this.lastIndex_) {
            this.lastCell_ = cell
        }
        cell.setData(idx == this.lastIndex_, idx, item)
        return cell;
    },

    /**
     * 设置cell个数
     * @param table
     * @returns {*}
     */
    numberOfCellsInTableView: function (table) {
        return this.dataArr_.length;
    },

    /**
     * 关闭
     */
    close: function () {
        if (this.callBack_) {
            this.callBack_(-1)
        }
    },

    /**
     * 确认选择
     */
    confirm: function () {
        if (this.callBack_ && this.lastIndex_ > -1) {
            this.callBack_(this.lastIndex_)
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

    getRealHeight: function () {
        return this.total_
    }
})


var g_game_comp_scrollview_item = cc.TableViewCell.extend({
    height_: 0,
    data_: null,
    /**
     * 构造函数
     */
    ctor: function (height) {
        this._super(cc.color(255,55,55,0), g_size.width, height)
        this.height_ = height
        this.draw()
        // this.event()
    },

    setSelect: function (selectd) {
        if (selectd) {
            this.icon_.setVisible(true)
            this.label_.setColor(cc.color.BLACK)
        } else {
            this.icon_.setVisible(false)
            this.label_.setColor(cc.color(112,112,112))
        }
    },

    /**
     * 绘制item
     */
    draw:function () {
        this.label_ = geek_lib.f_label_create(this, "", 36, g_size.width * 0.5, this.height_ * 0.5, 1, cc.color(112,112,112), 1, 1, cc.AncorPointCenter)
        var image_x = this.label_.getBoundingBox().x + this.label_.getBoundingBox().width + 220
        this.icon_ = geek_lib.f_sprite_create_box(this, res.s_right, image_x, this.height_ * 0.5, 30, 30, 1, 2, cc.AncorPointMidLeft)
        this.icon_.setVisible(false)

        var blackline = cc.LayerColor.create(cc.hexToColor("#9B9B9B"), g_size.width, 0.6)
        geek_lib.f_set_anchor_point_type(blackline, cc.AncorPointBottomLeft)
        this.addChild(blackline,2)
        blackline.setPosition(0, 0)

        var topline = cc.LayerColor.create(cc.hexToColor("#9B9B9B"), g_size.width, 0.6)
        geek_lib.f_set_anchor_point_type(topline, cc.AncorPointBottomLeft)
        this.addChild(topline,3)
        topline.setPosition(0, this.height_ - 1)
        this.topline = topline
    },

    setData: function (isSelected, index, data) {
        geek_lib.f_label_change_txt(this.label_, data.name )
        this.topline.setVisible(index == 0)
        this.setSelect(isSelected)
    },

})