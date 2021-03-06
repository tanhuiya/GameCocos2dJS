/**
 * Created by tanhui on 2018/8/25.
 */

/**
 * Tableview列表组件
 * @type {any}
 */
var g_comp_rank_list = cc.LayerColor.extend({
    tableView_: null,
    /**
     * 构造函数
     * @param size      tableview 大小
     * @param dataArr   数据源
     * @param cell_func cell type
     * @param bg        背景图片
     * @param cellHeight 高度
     * @returns {*}
     */
    ctor: function (size, dataArr, cell_func, bg, cellHeight) {
        this._super(cc.color(255,255,255,0), size.width, size.height)
        this.width_ = size.width
        this.height_ = size.height
        this.dataArr_ = dataArr
        this.cell_func_ = cell_func
        this.cellHeight_ = cellHeight
        this.setUp(bg)
    },

    /**
     * 设置布局
     */
    setUp:function (bg) {
        if (bg){
            var bg = ccui.ImageView.create(bg)
            bg.setScale9Enabled(true)
            bg.setCapInsets(cc.rect(60, 60 ,1, 1))
            bg.setContentSize(this.width_, this.height_)
            bg.setPosition(this.width_ * 0.5, this.height_ * 0.5)
            this.addChild(bg, 1, 1)
        }
        var tableView = new cc.TableView(this, cc.size(this.width_, this.height_))
        // tableView.setBounceable(false)
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL)
        tableView.setPosition(0, 0)
        tableView.setDelegate(this)
        // cell 顺序从上到下排列
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN)
        this.addChild(tableView, 2, 2)
        tableView.reloadData()
        this.tableView_ = tableView
    },

    /**
     * 设置点击cell后的回调函数
     * @param table
     * @param cell
     */
    tableCellTouched: function (table, cell) {
        console.log("cell touched at index: " + cell.getIdx());
    },

    /**
     * 设置cell大小
     * @param table
     * @param idx
     * @returns {{width, height}}
     */
    tableCellSizeForIndex: function (table, idx) {
        return cc.size(this.width_, this.cellHeight_);
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
            cell = new this.cell_func_(this.width_, this.cellHeight_);
        }
        cell.setData(idx, this.dataArr_[idx])
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
     * 更新列表数据
     * @param dataArr
     */
    setData: function (dataArr) {
        this.dataArr_ = dataArr
        this.tableView_.reloadData()
    }

})

/**
 *
 * @param size      tableview 大小
 * @param dataArr   数据源
 * @param cell_func cell type
 * @param bg        背景图片
 * @param cellHeight 高度
 * @returns {*}
 */
g_comp_rank_list.create = function (size, dataArr, cell_func, bg, cellHeight) {
    return new g_comp_rank_list(size, dataArr, cell_func, bg, cellHeight)
}

