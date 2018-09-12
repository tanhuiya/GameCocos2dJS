/**
 * Created by tanhui on 2018/7/21.
 */

/**
 * 1 可继续作答，2 达到总次数，3 到达单日上限
 * @type {{StateAllow: number, StateOverTotal: number, StateOverToday: number}}
 */
var QuestionStatePermission = {
    StateAllow: 1,
    StateOverTotal: 2,
    StateOverToday: 3,
}

/**
 * 活动类型， 答题 or 测评
 * @type {{Answer: number, Evalution: number}}
 */
var ActivityType = {
    Answer: 1,
    Evalution: 2
}

/**
 * 首页
 * @type {any}
 */
var g_index_layer = cc.Layer.extend({

    requestNumber_: 0,

    effectPath_: null,

    homeBack_: null,

    activity_img_: null,

    home_data_: null,
    /**
     * 页面初始化
     */
    init: function () {
        this._super()
        g_index = this

        this.loading_layer = geek_lib.f_layer_create(this, g_app_game_comp_loading, 1, 1)

        this.apiIsActivityUser()
        this.apiGameState()
        this.apiHomeData()

    },

    setLayout: function () {
        this.loading_layer.removeFromParent(true)

        var bg = geek_lib.f_imageview_box_create(this, this.homeBack_ ? this.homeBack_ : res.s_background, g_size.width * 0.5, g_size.height* 0.5, g_size.width, g_size.height, 1, 1, cc.AncorPointCenter)

        // var bg = geek_lib.f_sprite_create_box(this, res.s_background, g_size.width * 0.5, g_size.height* 0.5, g_size.width, g_size.height, 1, 1)
        this.bg_ = bg
        var bg_y = bg.getBoundingBox().height
        // 活动介绍
        var rule_btn = geek_lib.f_btn_create(this, res.s_rule, "活动介绍", 30, bg_y - 32, 1, 1, 2, cc.AncorPointTopLeft)
        this.rule_btn_ = rule_btn
        // 排名
        var rank_btn = geek_lib.f_btn_create(this, res.s_rank, "", g_size.width - 32 - 82 , g_size.height, 1, 1, 3, cc.AncorPointTopLeft)
        // rank_btn.setVisible(false)
        rank_btn.setVisible(g_game_info.isAnswer())
        this.rank_btn_ = rank_btn

        var music_x = g_game_info.isAnswer() ? rank_btn.getBoundingBox().x - 14 - 50 : rank_btn.getBoundingBox().x
        var music_btn = geek_lib.f_btn_create(this, res.s_music_off, "", music_x, g_size.height - 44, 1, 1, 4, cc.AncorPointTopLeft)
        this.music_btn_ = music_btn
        geek_lib.f_sprite_create_box(this, res.s_activity_bg, g_size.width * 0.5, g_size.height - (128 + 281), 692, 562, 2, 5)

        var homebg = geek_lib.f_imageview_box_create(this, this.activity_img_ ? this.activity_img_ : res.s_home_bg, g_size.width * 0.5, g_size.height - (128 + 281), 644, 510, 2, 6, cc.AncorPointCenter)
        this.homebg_ = homebg

        start_btn = geek_lib.f_btn_create(this, res.s_game_start, "", g_size.width * 0.5, 170, 1, 1, 7)
        this.start_btn_ = start_btn

        this.addRichLabel(this.home_data_.numOfUser)
    },

    /**
     * 添加富文本，当前参加人数
     */
    addRichLabel: function (num) {
        if (this.richLabel_ ){
            this.richLabel_.removeFromParent(true)
        }
        var richText = new ccui.RichText()
        richText.ignoreContentAdaptWithSize(false);
        richText.setContentSize(cc.size(g_size.width, 100));
        var prefix = new ccui.RichElementText(7, cc.color(255,255,255), 255, "当前已有 ", "Helvetica", 30)
        var number = new ccui.RichElementText(8, cc.color(130,89,89), 255, num + "", "Helvetica", 34)
        var sufix = new ccui.RichElementText(9, cc.color(255,255,255), 255, " 人参加", "Helvetica", 30)
        richText.pushBackElement(prefix)
        richText.pushBackElement(number)
        richText.pushBackElement(sufix)
        richText.height = 100
        richText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER)
        richText.setPosition(g_size.width * 0.5, this.start_btn_.getBoundingBox().y + 130)
        this.addChild(richText,2,10)
        this.richLabel_ = richText
    },

    /**
     * 开始游戏
     */
    startGame: function () {
        this.apiStartGame()
    },

    /**
     * 显示游戏简介
     */
    showIntroduce: function () {
        geek_lib.f_layer_create_data(this, g_game_introduce_layer, this.home_data_, 10, 10)
    },

    /**
     * 显示排行榜
     */
    showRankList:function () {
        var that = this
        if (g_game_info.isAnswer() && !g_game_info.isRecorded_) {
            this.showRecordList(function () {
                geek_lib.f_layer_create_data(that, g_app_game_rank, null, 10, 10)
            })
            return
        }
        geek_lib.f_layer_create_data(this, g_app_game_rank, null, 10, 10)
    },

    /**
     * 信息录入
     */
    showRecordList: function (callback) {
        var record = geek_lib.f_layer_create_data(g_root, g_game_activity_record_layer, null, 1, 3)
        if (callback) {
            record.success_call_back = callback
        }
    },

    /**
     * 背景音乐设置
     */
    toggleEffects: function () {
        if (geek_lib.f_toggle_back_music()) {
            // 停止或继续成功
            if (geek_lib.f_isplay_effect()) {
                this.music_btn_.loadTextures(res.s_music)
            } else {
                this.music_btn_.loadTextures(res.s_music_off)
            }
        }
    },


    /**
     * 解析首页数据
     */
    parserHomeData: function (data) {
        var that = this
        this.home_data_ = data

        var res = []
        if (data.musicUrl.length) {
            this.effectPath_ = data.musicUrl
            // "http://pab0rrvqm.bkt.clouddn.com/II-07.mp3"
            res.push(this.effectPath_)
            geek_lib.f_set_effect_path(this.effectPath_)
        }
        g_game_info.activityType_ = data.activityType

        // 设置背景图
        if (data.homeBack) {
            this.homeBack_ = data.homeBack
            res.push(data.homeBack)
        }
        if (data.introPage.length) {
            res.push(data.introPage)
        }
        // 设置活动图
        if (data.homeTitle.length > 0) {
            res.push(data.homeTitle)
            this.activity_img_ = data.homeTitle
        }

        geek_lib.f_load_resource(res, function (error) {
            that.setLayout()
        })
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
                case this.music_btn_:
                    this.toggleEffects()
                    break;
            }
        }
    },

    preloadQuestionResource: function (startData) {
        var loading_layer = geek_lib.f_layer_create(this, g_app_game_comp_loading, 3, 1)
        var resources = []
        this.pushUrl(resources, startData.questionBack)
        for (var i = 0; i < startData.questions.length; i++) {
            var que = startData.questions[i]
            var question_material_img = que.question_material_img
            // if (question_material_img && question_material_img.substring(question_material_img.lastIndexOf('.') + 1) != "mp4") {
                this.pushUrl(resources, question_material_img)
            // }
            for (var index_option = 0; index_option < que.options.length; index_option++) {
                var option = que.options[index_option]
                this.pushUrl(resources, option.optionImg)
            }
        }

        geek_lib.f_load_resource(resources, function (err) {
            console.log("load resource over", err)
            loading_layer.removeFromParent(true)
            geek_lib.f_layer_create_data(g_root, g_question_1_layer, startData, 0, 0)
        })
    },

    pushUrl: function (arr, path) {
        if (path) {
            arr.push(path)
        }
    },

    /**
     * 判断开始游戏的信息
     * @param startData
     */
    gotoQuestion: function (startData) {
        g_game_info.setLeftTime(startData.leftTimes)
        g_game_info.setLeftType(startData.leftType)
        if (startData.countState == QuestionStatePermission.StateAllow) {
            this.preloadQuestionResource(startData)
        } else if (startData.countState == QuestionStatePermission.StateOverTotal) {
            geek_lib.f_show_custom_tip(this, res.s_tip_content_2, "达到游戏次数限制")
        } else if (startData.countState == QuestionStatePermission.StateOverToday) {
            geek_lib.f_show_custom_tip(this, res.s_tip_content_2, "达到游戏今日次数限制")
        }
    },


    // ---- network

    /**
     * 判断是否录入用户
     */
    apiIsActivityUser: function () {
        var param = {
            userId: g_game_user.userID
        }
        geek_lib.f_network_post_json(
            this,
            uri.isActivityUser,
            param,
            function (data) {
                if (data.userFlag && data.userFlag == 1) {
                    g_game_info.setRecord(true)
                }
                if (data.activityUser){
                    g_game_info.setUser(data.activityUser)
                }
            })
    },

    /**
     * 判断活动开始状态
     */
    apiGameState: function () {
        var that = this
        var param = {
            activityId: g_game_user.activity
        }
        geek_lib.f_network_post_json(
            this,
            uri.activityState,
            param,
            function (data) {
                if (data.activityState != 1) {
                    geek_lib.f_show_custom_tip(that, res.s_tip_content_1, "活动已结束")
                }
            })
    },

    /**
     * 获取首页数据
     */
    apiHomeData: function () {
        var that = this
        var param = {
            activityId: g_game_user.activity
        }
        geek_lib.f_network_post_json(
            this,
            uri.home,
            param,
            function (data) {
                that.parserHomeData(data)
            })
    },

    /**
     * 获取游戏信息
     */
    apiStartGame: function () {
        var that = this
        geek_lib.f_network_post_json(
            this,
            uri.startPlay,
            {
                activityId: g_game_user.activity,
                userId: g_game_user.userID
            },
            function (response) {
                // console.log(response)
                if (response.startData) {
                    that.gotoQuestion(response.startData)
                } else {
                    that.errorHandler("startData 数据为空")
                }
            }
        )
    },

    /**
     * 通用错误处理
     */
    errorHandler: function (msg) {
        geek_lib.g_notice(msg, 2)
    },
})