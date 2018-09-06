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
var AnswerOptionType = {
    Text: 1,
    TextImage:2
}

/**
 * 1 单选题 2 多选题 3 判断题
 * @type {{Single: number, Multi: number, Judge: number}}
 */
var AnswerSelectType = {
    Single: 1,
    Multi: 2,
    Judge: 3,
}

/**
 * 答题框组件
 * @type {*}
 */
var g_question_answer_node = cc.LayerColor.extend({
    /**
     * 单选 双选
     */
    selectType_ :AnswerSelectType.Single,
    /**
     * 选项类型
     */
    optionType_: AnswerOptionType.Text,
    /**
     * 所有选项
     */
    answers_: [],
    /**
     * 所有选择的cell idx
     */
    selections_: [],
    /**
     * 提交按钮高度
     */
    left_height_: 0,

    lastIndex_: -1,

    lastCell_: null,
    /**
     * 提交按钮回调
     * @private
     */
    submitCallback_: function () {},

    /**
     * 设置答题框
     * @param answers 答案数据
     * @param width scrollview 宽度
     * @param height scrollview 高度
     * @param selectType 题目类型
     */
    ctor: function (answers, width, height, selectType) {
        this._super(cc.color(255,255,255,0), width, height)
        this.selectType_ = selectType
        this.selections_ = []
        this.answers_ = answers
        this.width_ = width
        this.height_ = height

        var type = AnswerOptionType.Text
        if (this.judgeOptionImage(answers)) {
            type = AnswerOptionType.TextImage
        }
        this.optionType_ = type
        this.cellHeight_ = type == AnswerOptionType.Text ? TextBgHeight : TextImageBgHeight
        var left = height - answers.length * this.cellHeight_
        left = left < 100 ? 100 : left
        this.left_height_ = left
        this.setUp()
    },

    /**
     * 判断选项中是否含图片
     * @returns {boolean}
     */
    judgeOptionImage: function (answer) {
        var find = false
        answer.forEach(function (option, p2, p3) {
            if (option.optionImg && option.optionImg.length > 0) {
                find = true
            }
        })
        return false
    },

    /**
     * 设置布局UI
     */
    setUp: function () {
        var tableView = new cc.TableView(this, cc.size(this.width_, this.height_))
        tableView.setBounceable(false)
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL)
        tableView.setPosition(0, 0)
        tableView.setDelegate(this)
        // cell 顺序从上到下排列
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN)
        this.addChild(tableView, 2, 2)
        tableView.reloadData()
    },


    /**
     * 设置点击cell后的回调函数
     * @param table
     * @param cell
     */
    tableCellTouched: function (table, cell) {
        if (cell.getIdx() == this.answers_.length) return

        var index = cell.getIdx()

        if (this.selectType_ == AnswerSelectType.Multi){
            if (this.selections_.indexOf(index) < 0) {
                this.selections_.push(index)
            }
        } else if (this.selectType_ == AnswerSelectType.Single) {
            this.selections_ = [index]
            if (this.lastCell_){
                this.lastCell_.selected(false)
            }
        } else if (this.selectType_ == AnswerSelectType.Judge){
            this.selections_ = [index]
            if (this.lastCell_){
                this.lastCell_.selected(false)
            }
        }

        cell.selected(true)
        this.lastCell_ = cell
        this.lastIndex_ = index
    },

    /**
     * 设置cell大小
     * @param table
     * @param idx
     * @returns {{width, height}}
     */
    tableCellSizeForIndex: function (table, idx) {
        if (idx == this.answers_.length){
            // 提交按钮
            return cc.size(this.width_, this.left_height_)
        } else {
            return cc.size(this.width_, this.cellHeight_)
        }
    },

    /**
     * 添加Cell
     * @param table
     * @param idx
     * @returns {*}
     */
    tableCellAtIndex: function (table, idx) {
        var cell = table.dequeueCell();
        if (!cell) {
            cell = new g_question_answer_cell(this.width_, this.cellHeight_, this.optionType_);
        }
        cell.setDelegate(this)
        cell.setData(idx, this.answers_[idx], idx == this.answers_.length)
        cell.selected(this.selections_.indexOf(idx) > -1)

        return cell
    },

    /**
     * 设置cell个数
     * @param table
     * @returns {*}
     */
    numberOfCellsInTableView: function (table) {
        // 添加提交按钮
        return this.answers_.length + 1
    },

    /**
     * 获取答案
     * @returns {Array}
     */
    getAnswers: function () {
        var selectionS = []
        for (var i = 0; i < this.answers_.length; i++) {
            if (this.selections_.indexOf(i) > -1) {
                var option = this.answers_[i]
                selectionS.push({
                    id: option.questionOptionId,
                    correct: option.isCorrect,
                    score: option.optionScore
                })
            }
        }
        return selectionS
    },

    /**
     * 提交答案按钮
     */
    submit: function () {
        if (this.submitCallback_){
            this.submitCallback_()
        }
    },
})


/**
 * option cell
 * @type {any}
 */
var g_question_answer_cell = cc.TableViewCell.extend({

    optionType_: AnswerOptionType.Text,
    option_ : null,
    delegate_: null,

    ctor: function (width, height, type) {
        this._super()
        this.width_ = width
        this.height_ = height
        this.optionType_ = type
        this.setLayout(type)
    },

    /**
     * 设置代理
     */
    setDelegate: function (del) {
        this.delegate_ = del
    },

    /**
     * 设置item 布局
     */
    setLayout:function (type) {
        var back = cc.LayerColor.create(cc.color(0,0,0,0), this.width_, this.height_)
        this.addChild(back, 1)
        this.backLayer_ = back
        var content_image = null
        var bg_height = 0
        if (type == AnswerOptionType.Text) {
            content_image = res.s_text_bg
            bg_height = TextBgHeight
        } else {
            content_image = res.s_text_image_bg
            bg_height = TextImageBgHeight
        }
        var topMargin =  (this.height_ - bg_height) * 0.5
        var leftMargin = 50
        var content = geek_lib.f_sprite_create_box(back, content_image, leftMargin, topMargin, this.width_ - 2 * leftMargin, bg_height , 1, 1, cc.AncorPointBottomLeft)
        var select_img = geek_lib.f_sprite_create_box(back, res.s_right, 50 + 40 , this.height_ - 68, 36, 36, 3,3, cc.AncorPointCenter)
        this.select_img_ = select_img
        this.selected(false)
        if (type == AnswerOptionType.Text) {
            var size = this.backLayer_.getBoundingBox()
            this.text_label_ = geek_lib.f_label_create(this.backLayer_, "", 36, 130, size.height * 0.5, 1, cc.color.BLACK, 3, 3, cc.AncorPointMidLeft)
            this.text_label_.setDimensions(this.width_ - 230,0)
        } else if (type == AnswerOptionType.TextImage) {
            var size = this.backLayer_.getBoundingBox()
            geek_lib.f_imageview_box_create(this.backLayer_, res.s_audio_bg, this.width_ * 0.5, 120 * 2, 230, 230, 2, 2, cc.AncorPointCenter )
            this.text_label_ = geek_lib.f_label_create(this.backLayer_, "", 36, 80, 100, 1, cc.color.BLACK, 3, 3, cc.AncorPointMidLeft)
            this.text_label_.setDimensions(this.width_ - 230,0)
        }

        this.submit_btn_ = geek_lib.f_btn_create(this, res.s_submit, "", g_size.width * 0.5, 60,1,4,4,cc.AncorPointCenter)
        this.submit_btn_.setVisible(false)
    },

    setData: function (index, data, isFooter) {
        if (isFooter) {
            this.submit_btn_.setVisible(true)
            this.backLayer_.setVisible(false)
        } else {
            this.submit_btn_.setVisible(false)
            this.backLayer_.setVisible(true)
            this.option_ = data
            geek_lib.f_label_change_txt(this.text_label_, data.optionContent)
        }
    },

    /**
     * 设置答案选中
     */
    selected: function (select) {

        this.select_img_.setVisible(select)
    },

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this.delegate_){
                this.delegate_.submit()
            }
        }
    },
})

