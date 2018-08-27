/**
 * Created by tanhui on 2018/7/21.
 */

/**
 * 首页
 * @type {any}
 */
var g_index_layer = cc.Layer.extend({
    /**
     * 页面初始化
     */
    init: function () {
        this._super()

        g_index = this
        var bg = geek_lib.f_sprite_create_box(this, res.s_background, g_size.width * 0.5, g_size.height* 0.5, g_size.width, g_size.height, 1, 1)
        var bg_y = bg.getBoundingBox().height
        // 活动介绍
        var rule_btn = geek_lib.f_btn_create(this, res.s_rule, "活动介绍", 30, bg_y - 32, 1, 1, 2, cc.AncorPointTopLeft)
        this.rule_btn_ = rule_btn
        // 排名
        var rank_btn = geek_lib.f_btn_create(this, res.s_rank, "", g_size.width - 32 - 82 , g_size.height, 1, 1, 3, cc.AncorPointTopLeft)
        this.rank_btn_ = rank_btn

        var music_btn = geek_lib.f_btn_create(this, res.s_music, "", rank_btn.getBoundingBox().x - 14 - 50, g_size.height - 44, 1, 1, 4, cc.AncorPointTopLeft)
        geek_lib.f_sprite_create_box(this, res.s_activity_bg, g_size.width * 0.5, g_size.height - (128 + 281), 692, 562, 2, 5)

        start_btn = geek_lib.f_btn_create(this, res.s_game_start, "", g_size.width * 0.5, 170, 1, 1, 6)
        this.start_btn_ = start_btn

        this.addRichLabel()
    },

    /**
     * 添加富文本，当前参加人数
     */
    addRichLabel: function () {
        var richText = new ccui.RichText()
        richText.ignoreContentAdaptWithSize(false);
        richText.setContentSize(cc.size(g_size.width, 100));
        var prefix = new ccui.RichElementText(7, cc.color(255,255,255), 255, "当前已有 ", "Helvetica", 30)
        var number = new ccui.RichElementText(8, cc.color(130,89,89), 255, "40", "Helvetica", 34)
        var sufix = new ccui.RichElementText(9, cc.color(255,255,255), 255, " 人参加", "Helvetica", 30)
        richText.pushBackElement(prefix)
        richText.pushBackElement(number)
        richText.pushBackElement(sufix)
        richText.height = 100
        richText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER)
        richText.setPosition(g_size.width * 0.5, this.start_btn_.getBoundingBox().y + 130)
        this.addChild(richText,2,10)
    },

    /**
     * 开始游戏
     */
    startGame: function () {
        this.removeFromParent();
        geek_lib.f_layer_create(g_root, g_question_1_layer, 0, 0)
    },

    /**
     * 显示游戏简介
     */
    showIntroduce: function () {
        geek_lib.f_layer_create_data(this, g_game_introduce_layer, null, 10, 10)
    },

    /**
     * 显示排行榜
     */
    showRankList:function () {
        geek_lib.f_layer_create_data(this, g_app_game_rank, null, 10, 10)
    },

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (sender) {
                case this.start_btn_:
                    this.startGame()
                    break;
                case this.rule_btn_:
                    this.showIntroduce()
                    break;
                case this.rank_btn_:
                    this.showRankList()
                    break;
            }
        }
    }

})