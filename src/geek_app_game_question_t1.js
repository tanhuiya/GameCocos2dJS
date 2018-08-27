/**
 * Created by tanhui on 2018/8/21.
 */

/**
 * 答题页面
 * @type {any}
 */
var g_question_1_layer = cc.Layer.extend({
    init: function () {
        this._super()
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

        // 设置问题内容
        var content = new g_question_content_node()
        this.addChild(content, 2, 3)
        content.setPosition(cc.p(0, g_size.height - 166))
        content.setUp(ContentType.Text)
        // content.setUp(ContentType.Text_Picture)


        var content_height = content.getHeight()
        console.log(content.getBoundingBox())

        // 提交答案按钮
        var submit_btn = geek_lib.f_btn_create(this, res.s_submit, "", g_size.width * 0.5, 50,1,4,4,cc.AncorPointCenter)
        this.submit_btn_ = submit_btn

        var answer_y_max = content.getPosition().y - content_height - 50
        var answer_y_min = 100
        var scroll_height = answer_y_max - answer_y_min
        var answer_node = new g_question_answer_node()
        this.addChild(answer_node, 2, 4)
        this.answer_node_ = answer_node
        answer_node.setPosition(0, content.getPosition().y - content_height - 50)
        // mock data
        var questions = ["44444444444444444444","44444444444444444444","44444444444444444444","44444444444444444444","44444444444444444444"];
        answer_node.setData(questions,g_size.width, scroll_height)


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