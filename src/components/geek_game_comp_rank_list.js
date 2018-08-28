/**
 * Created by tanhui on 2018/8/25.
 */

/**
 * 排行榜列表页面
 * @type {any}
 */
var g_app_game_rank_list_node = cc.LayerColor.extend({
    /**
     * 构造函数
     * @param width scrollview 宽度
     * @param height scrollview 高度
     * @param dataArr 数据源
     */
    ctor: function (width, height, dataArr) {
        this._super(cc.color(255,255,255,0), width, height)
        this.width_ = width
        this.height_ = height
        this.dataArr_ = dataArr
    },

    /**
     * 设置布局
     */
    setUp:function () {
        var scrollView_width = this.width_ - 10 * 4
        var innerHeight = this.dataArr_.length * ListItemHeight
        var scrollView = geek_lib.f_create_scroll_view(this, 10 * 2, 0, scrollView_width, this.height_, scrollView_width, innerHeight,1 )
        scrollView.setBackGroundImage(res.s_activity_bg)
        scrollView.setBackGroundImageScale9Enabled(true)
        scrollView.setBackGroundImageCapInsets(cc.rect(30, 30 ,1, 1))
        //scrollview 顶部偏移
        var heightOffset = this.height_ > innerHeight ? this.height_ - innerHeight : 0
        for (var i = 0; i < this.dataArr_.length; i++ ){
            var item = new g_app_game_rank_list_item(i, scrollView_width, ListItemHeight, this.dataArr_[i])
            scrollView.addChild(item, 3, i + 1)
            item.setPosition(0, innerHeight - (i+1)* ListItemHeight + heightOffset)
        }
    },

})

/**
 * 排行榜单个 item 高度
 * @type {number}
 */
var ListItemHeight = 60 * 2

/**
 * 排行榜单个 item
 * @type {any}
 */
var g_app_game_rank_list_item = cc.LayerColor.extend({
    ctor: function (index, width, height, data) {
        this._super(cc.color(255,255,255,0), width, height)
        this.width_ = width
        this.height_ = height
        this.data_ = data
        this.index_ = index
        this.setLayout()
    },

    /**
     * 设置item 布局
     */
    setLayout:function () {
        geek_lib.f_label_create(this, this.index_ + 1 + "", 40, 10 * 2, this.height_ * 0.5, 1, cc.color.BLACK, 1, 3, cc.AncorPointMidLeft)
        geek_lib.f_circle_sprite_create(this, res.s_head,55 * 2, this.height_ * 0.5, 42, 2)
        geek_lib.f_label_create(this, this.data_.title, 28, 88 * 2, this.height_ - 11 * 2, 1, cc.color.BLACK, 1, 4, cc.AncorPointTopLeft)
        geek_lib.f_label_create(this, this.data_.school, 24, 88 * 2, this.height_ - 32 * 2, 1, cc.hexToColor("#9B9B9B"), 1, 5, cc.AncorPointTopLeft)
        geek_lib.f_label_create(this, "分", 28, 327 * 2, this.height_ * 0.5, 1, cc.color.BLACK, 1, 6, cc.AncorPointMidLeft)
        geek_lib.f_label_create(this, this.data_.score, 28, 325 * 2, this.height_ * 0.5, 1, cc.hexToColor("#E99305"), 1, 7, cc.AncorPointMidRight)
        if (this.index_ > 0 ){
            var blackline = cc.LayerColor.create(cc.hexToColor("#9B9B9B"), this.width_ - 20, 0.6)
            geek_lib.f_set_anchor_point_type(blackline, cc.AncorPointTopLeft)
            this.addChild(blackline,2)
            blackline.setPosition(10,this.height_)
        }
    },

})