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
    // 问题头
    headNode_: null,
    // 是否查看解析页
    isResolve_: 0,

    init: function (startData) {
        this._super()
        this.questions_ = startData.questions
        this.questionTime_ = startData.questiontime
        this.questionTimeType_ = startData.questionTimeType
        this.isResolve_ = startData.isResolve
        geek_lib.f_sprite_create_box(this, res.s_background, g_size.width * 0.5, g_size.height* 0.5, g_size.width, g_size.height, 1, 1)
        this.drawRect()
        this.scheduleBegin()
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
        this.headNode_ = node

        // 停止答题按钮
        var stop_btn = geek_lib.f_btn_create(this, res.s_stop, "",g_size.width - 92, g_size.height - 20 - 72,1, 3, 3, cc.AncorPointCenter)
        this.stop_btn_ = stop_btn

        // 提交答案按钮


        this.drawQuestion(this.currentIndex_)
    },

    /**
     * 绘制问题区域
     * @param idx 问题 index
     */
    drawQuestion: function (idx) {
        if (this.container_) {
            this.container_.removeFromParent(true)
            this.container_ = null
        }
        var questionData = this.questions_[idx]
        var container_top = 170
        var container_bottom = 0
        var container_height = g_size.height - container_top - container_bottom
        var container = cc.LayerColor.create(cc.color(255,255,255, 0), g_size.width , container_height )
        this.addChild(container, 2)
        container.setPosition(0, container_bottom)
        this.container_ = container

        // 设置问题内容
        var content = new g_question_content_node()
        container.addChild(content, 2, 3)
        content.setPosition(cc.p(0, container_height))
        content.setUp(questionData.question_material_type, questionData)
        var content_height = content.getHeight()

        // 绘制答案
        var scroll_height = container_height - content_height - 30
        // var data = ["adfaafad","adfaafad","adfaafad","adfaafad","adfaafad","adfaafad","adfaafad","adfaafad"]
        var answer_node = new g_question_answer_node(questionData.options,g_size.width, scroll_height, questionData.question_type)
        container.addChild(answer_node, 2, 4)
        this.answer_node_ = answer_node
        answer_node.setPosition(0, 0)
        var that = this
        // 设置提交答案按钮
        answer_node.submitCallback_ = function () {
            that.apiSubmitAnswer()
        }
    },

    /**
     * 开启倒计时定时器
     */
    scheduleBegin: function () {
        // 不限时题目
        if (this.questionTimeType_ == QuestionTimeLimitType.Unlimit){
            this.headNode_.setTimeVisible(false)
        } else {
            this.headNode_.setTimeVisible(true)
            geek_lib.f_timer_start(this, this.updateTimeBack, 1, true)
        }
    },

    /**
     * 更新倒计时
     */
    updateTimeBack: function () {
        this.questionTime_ = this.questionTime_ - 1
        if (this.questionTime_ > 0){
            this.headNode_.updateTime(this.questionTime_)
        } else {
            geek_lib.f_timer_stop(this, this.updateTimeBack)
        }
    },

    /**
     * 结束游戏
     */
    stopGame: function () {
        this.removeFromParent()
        geek_lib.f_layer_create_data(g_root, g_game_over_layer, null, 1, 3)
    },

    /**
     * 切换下一题
     */
    nextQuestion: function () {
        this.currentIndex_++
        this.drawQuestion(this.currentIndex_)
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
    },

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (sender) {
                case this.stop_btn_:
                    this.stopGame()
                    break;
            }
        }
    },

    /**
     * 提交答案
     */
    apiSubmitAnswer: function () {
        var that = this
        var question = this.questions_[this.currentIndex_]
        var params = {
            userId: g_game_user.userID,
            option: JSON.stringify(this.answer_node_.getAnswers()),
            questionId: question.activity_question_id,
            seconds: this.questionTime_
        }
        geek_lib.f_network_post_json(
            this,
            uri.questionCommit,
            params,
            function (data) {
                if (data.nextData) {
                    var next = data.nextData
                    if (next.iscorrect == 1) {
                        that.nextQuestion()
                    }
                } else {
                    that.errorHandler("缺少nextData数据")
                }
            }
        )
    },

    /**
     * 错误处理
     * @param msg
     */
    errorHandler: function (msg) {

    }
})