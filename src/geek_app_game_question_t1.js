/**
 * Created by tanhui on 2018/8/21.
 */

var QuestionTimeLimitType = {
    Unlimit: 1,
    All: 2,
    Single: 3 ,
}

/**
 * 答题页面
 * @type {any}
 */
var g_question_1_layer = cc.Layer.extend({
    // 问题
    questions_: [],
    // 限时时间
    questionTime_ : 0,
    // 限时类型
    questionTimeType_: QuestionTimeLimitType.Unlimit,
    // 当前问题索引
    currentIndex_: 0,

    init: function (startData) {
        this._super()
        this.questions_ = startData.questions
        this.questionTime_ = startData.questiontime
        this.questionTimeType_ = startData.questionTimeType
        geek_lib.f_sprite_create_box(this, res.s_background, g_size.width * 0.5, g_size.height* 0.5, g_size.width, g_size.height, 1, 1)
        this.drawRect()
    },

    /**
     * 绘制题目信息
     */
    drawRect: function () {
        // 设置头
        var node = new g_question_header_node()
        this.addChild(node,2,2)
        node.setUp()
        node.setPosition(cc.p(44, g_size.height - 20))

        // 停止答题按钮
        var stop_btn = geek_lib.f_btn_create(this, res.s_stop, "",g_size.width - 92, g_size.height - 20 - 72,1, 3, 3, cc.AncorPointCenter)
        this.stop_btn_ = stop_btn


        // 提交答案按钮
        var submit_btn = geek_lib.f_btn_create(this, res.s_submit, "", g_size.width * 0.5, 50,1,4,4,cc.AncorPointCenter)
        this.submit_btn_ = submit_btn

        this.drawQuestion(this.currentIndex_)
    },

    /**
     * 绘制问题区域
     * @param idx 问题 index
     */
    drawQuestion: function (idx) {
        var questionData = this.questions_[idx]
        var container_top = 166
        var container_bottom = 100
        var container_height = g_size.height - container_top - container_bottom
        var container = cc.LayerColor.create(cc.color(255,255,255, 0), g_size.width , container_height )
        this.addChild(container, 2)
        container.setPosition(0, container_bottom)

        // 设置问题内容
        var content = new g_question_content_node()
        container.addChild(content, 2, 3)
        content.setPosition(cc.p(0, container_height))
        content.setUp(questionData.question_material_type, questionData)
        var content_height = content.getHeight()

        // 绘制答案
        var scroll_height = container_height - content_height - 50
        var answer_node = new g_question_answer_node(questionData.options,g_size.width, scroll_height, questionData.question_type)
        container.addChild(answer_node, 2, 4)
        this.answer_node_ = answer_node
        answer_node.setPosition(0, 0)

    },

    /**
     * 结束游戏
     */
    stopGame: function () {
        this.removeFromParent()
        geek_lib.f_layer_create_data(g_root, g_game_over_layer, null, 1, 3)
    },

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (sender) {
                case this.submit_btn_:
                    this.submitAnswer()
                    break;
                case this.stop_btn_:
                    this.stopGame()
                    break;
            }
        }
    },

    /**
     * 提交答案
     */
    submitAnswer: function () {
        this.showResult(QustionResultType.Error)
    },

    /**
     * 显示结果
     */
    showResult: function (type) {
        this.answer_node_.setVisible(false)
        var data = {
            type: type,
            data: "你好好你啊浮嚣烦啊发你好好你啊浮嚣烦啊发你好好你啊浮嚣烦啊发你好好你啊浮嚣烦啊发你好好你啊浮嚣烦啊发"
        }
        var result_node = geek_lib.f_layer_create_data(this, g_question_result_node, data, 3, 5)
        result_node.setPosition(0 ,50 * 2)
        geek_lib.f_set_anchor_point_type(result_node, cc.AncorPointBottomLeft)
    }
})