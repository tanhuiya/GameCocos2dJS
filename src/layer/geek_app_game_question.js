/**
 * Created by tanhui on 2018/8/21.
 */

/**
 * 答题限时类型
 * @type {{Unlimit: number, All: number, Single: number}}
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
var g_question_layer = cc.Layer.extend({
    // 问题
    questions_: [],
    // 限时时间
    questionTime_ : 0,
    // 限制时长（不变）
    resetTime_: 0,
    // 限时类型
    questionTimeType_: QuestionTimeLimitType.Unlimit,
    // 当前问题索引
    currentIndex_: 0,
    // 问题头
    headNode_: null,
    // 是否查看解析页
    isResolve_: 0,
    // 当前分数
    score_: 0,
    // 总耗时
    secondUsed_: 0,

    startSecond_: 0,
    // 是否显示积分
    isShowNum_: 0,

    init: function (startData) {
        this._super()
        if (!startData)return
        this.isShowNum_ = startData.isShowNum
        this.startSecond_ = Date.parse(new Date())
        geek_lib.f_swallow_event(this)
        this.questions_ = startData.questions
        this.questionTime_ = startData.questiontime
        this.resetTime_ = startData.questiontime
        this.questionTimeType_ = startData.questionTimeType
        this.isResolve_ = startData.isResolve
        geek_lib.f_sprite_create_box(this, res.s_background, g_size.width * 0.5, g_size.height* 0.5, g_size.width, g_size.height, 1, 1)
        this.drawRect()
    },

    /**
     * 绘制题目信息
     */
    drawRect: function () {
        // 设置头
        var node = new g_comp_question_header(this.questions_.length, this.isShowNum_)
        this.addChild(node,2,2)
        node.setUp()
        node.setPosition(cc.p(25, g_size.height - 20))
        node.setTotal(this.resetTime_)
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
            var local = this.container_
            var move = cc.moveTo(0.2, cc.p(local.getPositionX() - g_size.width, local.getPositionY()));
            local.runAction(cc.sequence(move, cc.callFunc(function () {
                local.removeFromParent(true)
            })));
            this.container_ = null
        }

        if (this.questionTimeType_== QuestionTimeLimitType.Single) {
            this.questionTime_ = this.resetTime_
            this.headNode_.setTotal(this.resetTime_)
        }
        this.scheduleBegin()

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
        var content = new g_comp_question_content(questionData.question_material_type, questionData)
        container.addChild(content, 2, 3)
        content.setPosition(cc.p(0, container_height))
        var content_height = content.getHeight()
        this.answer_content_ = content

        // 绘制答案
        var scroll_height = container_height - content_height - 30
        var answer_node = new g_comp_question_answer(questionData.options,g_size.width, scroll_height, questionData.question_type)
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

    scheduleStop: function () {
        geek_lib.f_timer_stop(this, this.updateTimeBack)
    },

    /**
     * 更新倒计时
     */
    updateTimeBack: function () {
        this.questionTime_ = this.questionTime_ - 1
        if (this.questionTime_ >= 0){
            this.headNode_.updateTime(this.questionTime_)
        } else {
            // timeout
            this.scheduleStop()
            if (this.questionTimeType_== QuestionTimeLimitType.Single) {
                // 单题限制时间
                this.apiSubmitAnswer(true)
            } else {
                // 限制总时间
                this.gotoFinishLayer(true)
            }
        }
    },

    /**
     * 去解析页
     * @param 成功的回调
     */
    goRecordList: function (succssback) {
        this.removeFromParent(true)
        var record = geek_lib.f_layer_create_data(g_root, g_activity_record_layer, null, 1, 3)
        record.success_call_back = succssback
    },

    /**
     * 去结束页
     * @param data
     */
    gotoFinishLayer: function () {
        this.removeFromParent()
        console.log(this.secondUsed_)
        var data = {
            secondUsed: this.secondUsed_,
            score: this.headNode_.getScore()
        }
        geek_lib.f_layer_create_data(g_root, g_finish_layer, data, 1, 3)
    },

    /**
     * 提及成功
     */
    submitParser: function (data) {
        var next = data.nextData
        if (next.iscorrect == 1) {
            // 回答正确
            if (this.isResolve_) {
                this.showResolve(QustionResolveType.Success, next)
            } else {
                this.nextQuestion()
            }
        } else {
            if (this.isResolve_) {
                this.showResolve(QustionResolveType.Error, next)
            } else {
                this.nextQuestion()
            }
        }
    },

    /**
     * 显示解析页
     */
    showResolve: function (type, next) {
        this.answer_node_.setVisible(false)
        var data = {
            type: type,
            data: next.resolveContent,
            background: next.resolveBack,
        }
        var that = this
        var result_node = new g_comp_question_result(
            data,
            function () {
                // stop
                that.nextQuestion()
                that.confirm()
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
            this.stopAnswer()
        } else {
            this.drawQuestion(this.currentIndex_)
        }
    },

    /**
     * 停止答题
     */
    stopAnswer: function () {
        if (g_game_info.isAnswer()) {
            // 问答直接显示结束页
            this.gotoFinishLayer()
        } else {
            // 测评判断是否录入信息
            if (!g_game_info.isRecorded_) {
                var that = this
                this.goRecordList(function () {
                    that.gotoFinishLayer()
                })
            } else {
                this.gotoFinishLayer()
            }
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
                    this.confirm()
                    break;
            }
        }
    },

    /**
     * 退出的二次确认
     */
    confirm: function () {
        this.answer_content_.setVideo(false)
        var that = this
        var leftType = g_game_info.left_type_
        var leftTime = g_game_info.left_times_
        var text = ""
        if (leftType == LeftTimeType.Left_Day) {
            text = "今日还有" + leftTime + "次机会"
        } else if (leftType == LeftTimeType.Left_Total) {
            text = "您还有" + leftTime + "次机会"
        }

        var confirm = new g_comp_confirm(text, function (index) {
            that.answer_content_.setVideo(true)
            if (that.answer_content_) {
                that.answer_content_.stopPlayAll()
            }
            if (index == 0) {
                that.stopAnswer()
            } else if (index == 1){
                confirm.removeFromParent(true)
            } else if (index == 2){
                confirm.removeFromParent(true)
                that.removeFromParent(true)
            }
        })

        this.addChild(confirm, 50);
    },

    /**
     * 提交答案
     * @param timeout 是否超时
     */
    apiSubmitAnswer: function (timeout) {
        this.scheduleStop()
        this.answer_content_.stopPlayAll()

        var used = this.headNode_.getUsedSeconds()
        console.log("used: ", used)
        if (this.questionTimeType_ == QuestionTimeLimitType.Single) {
            this.secondUsed_ = this.secondUsed_ + used
        } else if (this.questionTimeType_ == QuestionTimeLimitType.All) {
            this.secondUsed_ = used
        } else if (this.questionTimeType_ == QuestionTimeLimitType.Unlimit) {
            this.secondUsed_ = (Date.parse(new Date()) - this.startSecond_) / 1000
        }
        console.log("used: ", used)
        var answers = this.answer_node_.getAnswers()
        var ids = []

        var ceping_score = 0
        if (!timeout) {
            answers.forEach(function (value) {
                ids.push(value.id)
                if (g_game_info.activityType_ == ActivityType.Evalution) {
                    ceping_score = value.score
                }
            })
            // 测评类，更新选项中的分数
            this.headNode_.updateScore(ceping_score)
        }

        var that = this
        var question = this.questions_[this.currentIndex_]
        var params = {
            userId: g_game_user.userID,
            options: JSON.stringify(ids),
            questionId: question.activity_question_id,
            seconds: this.headNode_.getUsedSeconds()
        }
        geek_lib.f_network_post_json(
            this,
            uri.questionCommit,
            params,
            function (data) {
                if (data.nextData) {
                    that.submitParser(data)
                    // 答题类根据服务端返回更新分数
                    if (g_game_info.activityType_ == ActivityType.Answer) {
                        that.score_ = data.nextData.scoreResult
                        that.headNode_.updateScore(that.score_)
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
        geek_lib.g_notice(msg, 2)
    }
})