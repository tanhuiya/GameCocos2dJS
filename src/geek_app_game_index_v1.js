/**
 * Created by tanhui on 2018/7/21.
 */


var g_index_layer = cc.Layer.extend({
    init: function () {
        this._super()

        g_index = this
        var bg = geek_lib.f_sprite_create_box(this, res.s_background, g_size.width * 0.5, g_size.height* 0.5, g_size.width, g_size.height, 1, 1)
        var bg_y = bg.getBoundingBox().height
        // 活动介绍
        var rule_btn = geek_lib.f_btn_create(this, res.s_rule, "活动介绍", 30, bg_y - 32, 1, 1, 2)

        // 排名
        var rank_btn = geek_lib.f_btn_create(this, res.s_rank, "", g_size.width - 32 - 82 , g_size.height, 1, 1, 3)

        var music_btn = geek_lib.f_btn_create(this, res.s_music, "", rank_btn.getBoundingBox().x - 14 - 50, g_size.height - 44, 1, 1, 4)
        geek_lib.f_sprite_create_box(this, res.s_activity_bg, g_size.width * 0.5, g_size.height - (128 + 281), 692, 562, 2, 5)

        start_btn = geek_lib.f_btn_create(this, res.s_game_start, "", g_size.width * 0.5, 170, 1, 1, 6)
        start_btn.setAnchorPoint(cc.p(0.5, 0.5))
        this.start_btn = start_btn

        this.addRichLabel()
    },

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
        richText.setPosition(g_size.width * 0.5, this.start_btn.getBoundingBox().y + 130)
        this.addChild(richText,2,10)
    },

    startGame: function () {
        this.removeFromParent();
        geek_lib.f_layer_create(g_root, g_question_1_layer, 0, 0)
    },

    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (sender) {
                case self.start_btn:
                    this.startGame()
                    break;
            }
        }
    }
})