/**
 * Created by tanhui on 2018/8/25.
 */

/**
 * 答题类型
 * @type {any}
 */
var g_game_comp_over_question = cc.Node.extend({
    /**
     * 构造函数
     * @param width node 可见宽度
     * @param timeLeft 剩余答题次数
     * @param score 分数
     * @param second 答题用时
     */
    ctor: function (width, timeLeft, score, second) {
        this._super()

        if (timeLeft > 0 && g_game_info.left_type_ != LeftTimeType.Left_Unlimit) {
            var time_left_text = "您还有" + timeLeft + "次答题机会"
            geek_lib.f_label_create(this, time_left_text, 28, width * 0.5, 150 * 2, 1, cc.hexToColor("#95AAD1"), 1, 1, cc.AncorPointTopMid)
        }

        var minute = second / 60
        var sec = second % 60
        var timeRichData = [
            {
                color: cc.hexToColor("#1F2B75"),
                text: "本次答题用时",
                size: 28,
            },{
                color: cc.hexToColor("#E99305"),
                text: Math.floor(minute) +"",
                size: 28,
            },{
                color: cc.hexToColor("#1F2B75"),
                text: "分",
                size: 28,
            },{
                color: cc.hexToColor("#E99305"),
                text: sec + "",
                size: 28,
            },{
                color: cc.hexToColor("#1F2B75"),
                text: "秒",
                size: 28,
            }
        ]
        this.addRichLabel(timeRichData, width * 0.5, 190 * 2, 140 * 2, 40, cc.AncorPointTopMid)


        var scoreRichData = [
            {
                color: cc.hexToColor("#1F2B75"),
                text: "分数: ",
                size: 40,
            },{
                color: cc.hexToColor("#E99305"),
                text: score + "",
                size: 40,
            },{
                color: cc.hexToColor("#1F2B75"),
                text: "分",
                size: 40,
            }
        ]
        this.addRichLabel(scoreRichData, width * 0.5, 230 * 2, 160 * 2, 60, cc.AncorPointTopMid)

        geek_lib.f_label_create(this, "恭喜完成答题", 72, width * 0.5, 282 * 2, 1, cc.hexToColor("#117AF5"), 1, 4, cc.AncorPointTopMid)

        var line = geek_lib.f_line_create(this, cc.color(112, 112, 112, 150), 20, 200, width - 40, 2)
        console.log(line.getBoundingBox())
        var rank_btn = geek_lib.f_btn_create(this, res.s_common_btn, "", width * 0.5, 50 * 2, 1, 2, 3, cc.AncorPointCenter)
        rank_btn.setTitleText("查看排名");
        rank_btn.setTitleFontSize(40)
        this.rank_btn_ = rank_btn
    },

    /**
     * 添加富文本，当前参加人数
     */
    addRichLabel: function (richData, px, py, width, height, anchorP) {
        var richText = new ccui.RichText()
        richText.ignoreContentAdaptWithSize(false)
        richText.setContentSize(cc.size(width, height));

        for (var i = 0; i < richData.length; i++) {
            var data = richData[i]
            element = new ccui.RichElementText(i + 1, data.color, 255, data.text, "Helvetica", data.size)
            richText.pushBackElement(element)
        }

        richText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER)
        richText.setPosition(px, py)
        geek_lib.f_set_anchor_point_type(richText, anchorP)
        this.addChild(richText,2,10)
    },

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (sender) {
                case this.rank_btn_:
                    geek_lib.f_layer_create_data(this.parent, g_app_game_rank, null, 10, 10)
                    break;
            }
        }
    },
})

/**
 * 测评类型
 * @type {any}
 */
var g_game_comp_over_test = cc.Node.extend({
    /**
     * 构造函数
     * @param width node 可见宽度
     * @param timeLeft 剩余答题次数
     * @param title 标语
     * @param desc 描述
     */
    ctor: function (width, timeLeft, title, desc) {
        this._super()
        if (timeLeft > 0 && g_game_info.left_type_ != LeftTimeType.Left_Unlimit) {
            var time_left_text = "您还有" + timeLeft + "次重新测评机会"
            geek_lib.f_label_create(this, time_left_text, 28, width * 0.5, 34, 1, cc.hexToColor("#95AAD1"), 1, 1, cc.AncorPointBottomMid)
        }

        var des_label = geek_lib.f_label_create(this, desc, 34, width * 0.5, 222 * 2, 1, cc.hexToColor("#1F2B75"), 1, 4, cc.AncorPointTopMid)
        des_label.setDimensions(g_size.width - 25 * 2 * 2, 0)

        var des_label = geek_lib.f_label_create(this, title, 72, width * 0.5, 300 * 2, 1, cc.hexToColor("#117AF5"), 1, 4, cc.AncorPointTopMid)

    }
})