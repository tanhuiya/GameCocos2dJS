/**
 * Created by tanhui on 2018/8/22.
 */

/**
 * 答题框组件
 * @type {*}
 */
var g_question_answer_node = cc.Node.extend({
    init: function () {
        this._super()
    },

    /**
     * 设置答题框
     * @param answers 答案数据
     * @param width scrollview 宽度
     * @param height scrollview 高度
     */
    setData: function (answers, width, height) {
        var scrollview = geek_lib.f_create_scroll_view(this,0,0,width, height, width , height,1)
        geek_lib.f_set_anchor_point_type(scrollview, cc.AncorPointTopLeft)
        // scrollview.setBackGroundImage(res.s_);
        var maxHeight = 200


        var answer_item = new g_question_answer_item()
        answer_item.setType(width, maxHeight,AnswerType.Text)
        geek_lib.f_set_anchor_point_type(answer_item, cc.AncorPointBottomLeft)
        scrollview.addChild(answer_item, 2, 1)
        answer_item.setPosition(100, 200)
        console.log(answer_item.getBoundingBox())
        // for (var i = 0; i < answers.length; i++) {
        //     var answer_item = new g_question_answer_item()
        //     answer_item.setType(width, maxHeight,AnswerType.Text)
        //     geek_lib.f_set_anchor_point_type(answer_item, cc.AncorPointTopLeft)
        //     scrollview.addChild(answer_item, 1, i + 1)
        //     answer_item.setPosition(0, (answers.length - i) * maxHeight)
        //     // console.log(answer_item.getBoundingBox())
        // }
        // scrollview.setInnerContainerSize(cc.size(width, maxHeight * answers.length));
    }
})

/**
 * 答案选项类型
 * @type {{Text: number, TextImage: number}}
 */
var AnswerType = {
    Text: 1,
    TextImage:2
}

/**
 * 答题选项组件
 * @type {*}
 */
var g_question_answer_item = cc.Node.extend({
    init: function () {
        this._super()
    },
    /**
     * 设置答案选项类型
     * @param width item 宽度
     * @param height item 高度
     * @param type AnswerType
     */
    setType:function (width, height, type) {
        var content_image = null
        if (type == AnswerType.Text) {
            content_image = res.s_rule
        } else {
        }
        var bg_height = 180
        var topMargin =  (height - bg_height) * 0.5
        var content = geek_lib.f_sprite_create_box(this, res.s_rule, 0, topMargin, width, bg_height , 1, 1, cc.AncorPointBottomLeft)
        console.log(content.getBoundingBox())
    },

    /**
     * 设置答案内容
     * @param data
     */
    setData:function (data) {

    }
})