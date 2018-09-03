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
        // this.questionTime_ = startData.questiontime
        // this.questionTimeType_ = startData.questionTimeType

        this.questionTime_ = 112
        this.questionTimeType_ = QuestionTimeLimitType.Single

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
        var node = new g_question_header_node(this.questions_.length)
        this.addChild(node,2,2)
        node.setUp()
        node.setPosition(cc.p(44, g_size.height - 20))
        this.headNode_ = node

        // 停止答题按钮
        var stop_btn = geek_lib.f_btn_create(this, res.s_stop, "",g_size.width - 92, g_size.height - 18,1, 3, 3, cc.AncorPointTopMid)
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
        this.headNode_.setQuestionIndex(this.currentIndex_ + 1)
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
        // content.setUp(ContentType.Text_Video,questionData)
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
            this.headNode_.setTotal(this.questionTime_)
            geek_lib.f_timer_start(this, this.updateTimeBack, 1, true)
        }
    },

    /**
     * 更新倒计时
     */
    updateTimeBack: function () {
        this.questionTime_ = this.questionTime_ - 1
        if (this.questionTime_ >= 0){
            this.headNode_.updateTime(this.questionTime_)
        } else {
            geek_lib.f_timer_stop(this, this.updateTimeBack)
        }
    },

    /**
     * 结束游戏
     */
    stopGame: function () {
        var that = this
        geek_lib.f_network_post_json(
            this,
            uri.questionFinish,
            {
                userId: g_game_user.userID,
                activityId: g_game_user.activity
            },
            function (response) {
                that.stopGameParser(response)
            })
    },

    /**
     * 结束游戏解析
     * @param data
     */
    stopGameParser: function (data) {
        var finishData = data.finishData
        // 答题结束
        if (g_game_info.isAnswer()) {
            // 结束页
            this.gotoFinishLayer(finishData)
        } else {
            // 是否录入信息
            if (!g_game_info.isRecorded_) {
                this.goRecordList()
            } else {
                this.gotoFinishLayer(finishData)
            }
        }
    },

    /**
     * 去解析页
     */
    goRecordList: function () {
        this.removeFromParent(true)
        geek_lib.f_layer_create_data(g_root, g_game_activity_record_layer, null, 1, 3)
    },

    /**
     * 去结束页
     * @param data
     */
    gotoFinishLayer: function (finishData) {
        this.removeFromParent()
        geek_lib.f_layer_create_data(g_root, g_game_over_layer, finishData, 1, 3)
    },

    /**
     * 提及成功
     */
    submitParser: function (data) {
        var next = data.nextData
        if (next.iscorrect == 1) {
            // 回答正确
            if (this.isResolve_) {
                this.showResolve(QustionResolveType.Success)
            } else {
                this.nextQuestion()
            }
        } else {
            if (this.isResolve_) {
                this.showResolve(QustionResolveType.Error)
            } else {
                this.nextQuestion()
            }
        }

    },

    /**
     * 显示解析页
     */
    showResolve: function (type) {
        this.answer_node_.setVisible(false)
        var data = {
            type: type,
            data: "你好好你啊浮嚣烦啊发你好好你啊浮嚣烦啊发你好好你啊浮嚣烦啊发你好好你啊浮嚣烦啊发你好好你啊浮嚣烦啊发"
        }
        var that = this
        var result_node = new g_question_result_node(
            data,
            function () {
                // stop
                that.stopGame()
            }, function () {
                // next
                that.nextQuestion()
            })
        result_node.setPosition(0 ,0)
        this.addChild(result_node, 5)
        geek_lib.f_set_anchor_point_type(result_node, cc.AncorPointBottomLeft)
    },

    /**
     * 切换下一题
     */
    nextQuestion: function () {
        this.currentIndex_++
        if (this.currentIndex_ == this.questions_.length) {
            this.stopGame()
        } else {
            this.drawQuestion(this.currentIndex_)
        }
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
                    that.submitParser(data)

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