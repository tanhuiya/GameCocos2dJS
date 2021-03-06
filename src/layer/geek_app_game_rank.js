/**
 * Created by tanhui on 2018/8/25.
 */

/**
 * 排行榜
 * @type {any}
 */
var g_rank_layer = cc.Layer.extend({
    /**
     * 列表组件
     */
    list_node__: null,

    init: function () {
        this._super()
        geek_lib.f_sprite_create_box(this, g_root.indexLayer_.GetHomeBg(), g_size.width * 0.5, g_size.height * 0.5, g_size.width, g_size.height, 1, 1)
        this.drawRect()
        this.apiRankList(1)
        geek_lib.f_swallow_event(this)
    },

    /**
     * 绘制界面
     */
    drawRect: function () {
        geek_lib.f_btn_create(this, res.s_rank_list, "",g_size.width * 0.5, g_size.height - 33 * 2, 1, 1, 1, cc.AncorPointCenter)
        this.close_btn_ = geek_lib.f_btn_create(this, res.s_close, "",g_size.width - 34, g_size.height - 32 * 2, 1, 1, 2, cc.AncorPointCenter)

        // 我的分数
        geek_lib.f_label_create(this, "我的分数", 28, 200 * 2, 28 * 2, 1, cc.color.WHITE, 1, 3, cc.AncorPointBottomLeft)
        this.score_label_ = geek_lib.f_label_create(this, "0", 36, 260 * 2, 26 * 2, 1, cc.color.WHITE, 1, 4, cc.AncorPointBottomLeft)
        geek_lib.f_label_create(this, "排名", 28, 311 * 2, 28 * 2, 1, cc.color.WHITE, 1, 5, cc.AncorPointBottomLeft)
        this.rank_label_ = geek_lib.f_label_create(this, "1", 36, 345 * 2, 26 * 2, 1, cc.color.WHITE, 1, 6, cc.AncorPointBottomLeft)

        var list_bottom_y = 75 * 2
        var list_top_y = g_size.height - 55 * 2
        var list_node = g_comp_rank_list.create(cc.size(g_size.width - 40, list_top_y - list_bottom_y), [], g_comp_rank_cell,res.s_activity_bg, ListItemHeight)
        this.addChild(list_node, 1)
        list_node.setPosition(20, list_bottom_y)
        this.list_node_ = list_node
    },

    /**
     * 关闭当前页面
     */
    close: function () {
        this.removeFromParent()
    },

    /**
     * 解析网络请求返回的数据
     */
    parseResponse: function (data) {
        if (data.myscore) {
            var score = data.myscore.score
            var order = data.myscore.order
            this.score_label_.setString(score + "")
            this.rank_label_.setString(order + "")
        }
        this.list_node_.setData(data.page.data)
    },

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            console.log(this.close_btn_)
            switch (sender) {
                case this.close_btn_:
                    this.close()
                    break;
            }
        }
    },

    /**
     * 获取排行榜信息
     */
    apiRankList: function (start) {
        var that = this
        var pageSize = 100
        var param = {
            userId: g_game_user.userID,
            activityId: g_game_user.activity,
            start: start,
            pageSize: pageSize,
        }
        geek_lib.f_network_post_json(
            this,
            uri.rank,
            param,
            function (data) {
                that.parseResponse(data)
            })
    }
})