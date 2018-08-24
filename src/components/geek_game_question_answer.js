/**
 * Created by tanhui on 2018/8/22.
 */

// 文字答案item 高度
var TextBgHeight = 140

// 文字图片答案 item 高度
var TextImageBgHeight = 395

// item 内部间距
var ItemMargin = 10

/**
 * 答案选项类型
 * @type {{Text: number, TextImage: number}}
 */
var AnswerType = {
    Text: 1,
    TextImage:2
}


/**
 * 答题框组件
 * @type {*}
 */
var g_question_answer_node = cc.Node.extend({

    /**
     * 设置答题框
     * @param answers 答案数据
     * @param width scrollview 宽度
     * @param height scrollview 高度
     */
    setData: function (answers, width, height) {
        var type = AnswerType.Text

        var maxItemHeight = type == AnswerType.Text ? TextBgHeight : TextImageBgHeight + ItemMargin * 2
        var innerHeight = answers.length * maxItemHeight
        //scrollview 顶部偏移
        var heightOffset = height > innerHeight ? height - innerHeight : 0

        var scrollview = geek_lib.f_create_scroll_view(this, 0, 0, width, height, width, innerHeight,1)
        geek_lib.f_set_anchor_point_type(scrollview, cc.AncorPointTopLeft)
        for (var i = 0; i < answers.length ; i++) {
            var item = new g_question_answer_item()
            var back = item.setType(width, maxItemHeight,type)
            scrollview.addChild(back, 2, i + 1)
            back.setPosition((g_size.width - width) * 0.5, innerHeight - (i+1)* maxItemHeight + heightOffset)
            item.setData(answers[i])
        }
    }
})


/**
 * 答题选项组件
 * @type {*}
 */
var g_question_answer_item = cc.Node.extend({

    /**
     * 设置答案选项类型
     * @param width item 宽度
     * @param height item 高度
     * @param type AnswerType
     */
    setType:function (width, height, type) {
        var back = cc.LayerColor.create(cc.color(0,0,0,0), width, height)
        this.backLayer_ = back
        this.type_ = type
        var content_image = null
        var bg_height = 0
        if (type == AnswerType.Text) {
            content_image = res.s_text_bg
            bg_height = TextBgHeight
        } else {
            content_image = res.s_text_image_bg
            bg_height = TextImageBgHeight
        }
        var topMargin =  (height - bg_height) * 0.5
        var content = geek_lib.f_sprite_create_box(back, content_image, 0, topMargin, width, bg_height , 1, 1, cc.AncorPointBottomLeft)
        return back
    },

    /**
     * 设置答案内容
     * @param data
     */
    setData:function (data) {
        if (this.type_ == AnswerType.Text) {
            var size = this.backLayer_.getBoundingBox()
            geek_lib.f_label_create(this.backLayer_, data, 36, size.width* 0.5, size.height * 0.5, 1, cc.color.BLACK, 3, 3, cc.AncorPointCenter)
        }
    }
})