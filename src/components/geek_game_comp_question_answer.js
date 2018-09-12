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


    cells_: [],
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
        left = left < 100 ? 120 : left
        this.left_height_ = left
        this.setUp()
    },

    /**
     * 判断选项中是否含图片
     * @returns {boolean}
     */
    judgeOptionImage: function (answer) {
        for (var i = 0; i < answer.length; i++) {
            var option = answer[i]
            if (option.optionImg && option.optionImg.length > 0) {
                return  true
            }
        }
        return false
    },

    /**
     * 设置布局UI
     */
    setUp: function () {
        var listView = new ccui.ListView();
        // set list view ex direction
        listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        listView.setTouchEnabled(true);
        listView.setBounceEnabled(true);
        listView.setContentSize(cc.size(this.width_, this.height_));
        listView.x = 0;
        listView.y = 0;
        listView.addEventListener(this.selectedItemEvent, this);
        this.addChild(listView, 2, 2);
        listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);
        this.cells_ = [];
        for(var i = 0; i < this.answers_.length; i++){
            var cell = new g_question_answer_cell(this.width_, this.cellHeight_, this.optionType_, i, this.answers_[i]);
            // var layer = new cc.LayerColor.create(cc.color(123,12,32), 400, 50)
            var layout=new ccui.Layout();
            layout.setTouchEnabled(true)
            layout.setSize(cell.getContentSize())
            layout.addChild(cell)
            listView.pushBackCustomItem(layout)
            this.cells_.push(cell)
        }
        {
            // 添加提交按钮
            var sub_layout = new ccui.Layout()
            console.log(this.cellHeight_)
            sub_layout.setSize(cc.size(this.width_, this.left_height_))
            this.submit_btn_ = geek_lib.f_btn_create(sub_layout, res.s_submit, "", g_size.width * 0.5, 60,1,4,4,cc.AncorPointCenter)
            this.submit_btn_.addTouchEventListener(this.ctl_button_event, this);
            this.submit_btn_.enabled = false
            listView.pushBackCustomItem(sub_layout)
        }
    },

    /**
     * item 被选择
     * @param sender
     * @param type
     */
    selectedItemEvent: function (sender, type) {
        if (type == ccui.ListView.ON_SELECTED_ITEM_END) {
            var cell = sender;
            var index = cell.getCurSelectedIndex()
            // console.log(index)
            if (index == this.answers_.length) return

            if (this.selectType_ == AnswerSelectType.Multi){
                var find = this.selections_.indexOf(index)
                if (find < 0) {
                    this.selections_.push(index)
                } else {
                    this.selections_.splice(find, 1)
                }
            } else if (this.selectType_ == AnswerSelectType.Single) {
                this.selections_ = [index]
            } else if (this.selectType_ == AnswerSelectType.Judge){
                this.selections_ = [index]
            }
            for (var i = 0; i < this.cells_.length; i++){
                if (this.selections_.indexOf(i) > -1) {
                    this.cells_[i].selected(true)
                }else {
                    this.cells_[i].selected(false)
                }
            }
            this.submit_btn_.enabled = this.selections_.length > 0
        }
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

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.submit()
        }
    },
})


/**
 * option cell
 * @type {any}
 */
var g_question_answer_cell = cc.LayerColor.extend({

    optionType_: AnswerOptionType.Text,

    ctor: function (width, height, type, index, data) {
        this._super(cc.color(0,0,0,0), width, height)
        this.width_ = width
        this.height_ = height
        this.optionType_ = type
        this.setLayout(type, data)
    },

    /**
     * 设置item 布局
     */
    setLayout:function (type, data) {
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
            this.text_label_ = geek_lib.f_label_create(this.backLayer_, data.optionContent, 36, 130, size.height * 0.5, 1, cc.color.BLACK, 3, 3, cc.AncorPointMidLeft)
            this.text_label_.setDimensions(this.width_ - 230,0)
        } else if (type == AnswerOptionType.TextImage) {
            var size = this.backLayer_.getBoundingBox()
            this.image_ = geek_lib.f_imageview_box_create(this.backLayer_, data.optionImg, this.width_ * 0.5, 120 * 2, 230, 230, 2, 2, cc.AncorPointCenter )
            this.text_label_ = geek_lib.f_label_create(this.backLayer_, data.optionContent, 36, 80, 76, 1, cc.color.BLACK, 3, 3, cc.AncorPointMidLeft)
            this.text_label_.setDimensions(this.width_ - 230,0)
        }
    },

    /**
     * 设置答案选中
     */
    selected: function (select) {
        this.select_img_.setVisible(select)
    },

})

