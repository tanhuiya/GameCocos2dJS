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
    selectType_ :AnswerSelectType.Single,
    selections_: [],
    /**
     * 设置答题框
     * @param answers 答案数据
     * @param width scrollview 宽度
     * @param height scrollview 高度
     */
    ctor: function (answers, width, height, selectType) {
        this._super(cc.color(255,255,255,0), width, height)
        this.selectType_ = selectType
        var type = AnswerType.Text


        // var listView = g_app_game_list_view.create(size, dataArr, cell_func, bg)
        
        var maxItemHeight = type == AnswerType.Text ? TextBgHeight : TextImageBgHeight + ItemMargin * 2
        var innerHeight = answers.length * maxItemHeight
        //scrollview 顶部偏移
        var heightOffset = height > innerHeight ? height - innerHeight : 0
        var scrollview = geek_lib.f_create_scroll_view(this, 0, 0, width, height, width, innerHeight,1)
        geek_lib.f_set_anchor_point_type(scrollview, cc.AncorPointBottomLeft)
        for (var i = 0; i < answers.length ; i++) {
            var item = new g_question_answer_item()
            var back = item.setType(width, maxItemHeight,type, answers[i])
            scrollview.addChild(back, 2, i + 1)
            back.setPosition((g_size.width - width) * 0.5, innerHeight - (i+1)* maxItemHeight + heightOffset)
        }
        scrollview.scrollToTop(0.1)
    },

    selecedAtIndex: function (idx) {

    },
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
     * @returns layer
     */
    setType:function (width, height, type, option) {
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
        var leftMargin = 50
        var content = geek_lib.f_sprite_create_box(back, content_image, leftMargin, topMargin, width - 2 * leftMargin, bg_height , 1, 1, cc.AncorPointBottomLeft)
        var select_img = geek_lib.f_sprite_create_box(back, res.s_right, 50 + 40 , height * 0.5, 36, 36, 3,3, cc.AncorPointCenter)
        this.select_img_ = select_img
        this.selected(false)

        this.setData(option)

        var m_this = this
        var AnswerOnClickListener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : false,
            moved: false,
            onTouchBegan : function (touch,event){
                // console.log("begin")
                this.moved = false
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                if(!cc.rectContainsPoint(target.getBoundingBox(), locationInNode))return false;
                return true
            },
            onTouchMoved: function () {
                this.moved = true
            },
            onTouchEnded: function (touch,event) {
                if (this.moved) return
                m_this.selected(!m_this.getSelected())
            }
        });
        cc.eventManager.addListener(AnswerOnClickListener, content);
        return back
    },


    /**
     * 设置答案内容
     * @param data
     */
    setData:function (data) {
        if (this.type_ == AnswerType.Text) {
            var size = this.backLayer_.getBoundingBox()
            geek_lib.f_label_create(this.backLayer_, data.optionContent, 36, 130, size.height * 0.5, 1, cc.color.BLACK, 3, 3, cc.AncorPointMidLeft)
        }
    },

    /**
     * 设置答案选中
     */
    selected: function (select) {
        this.selected_ = select
        this.select_img_.setVisible(this.selected_)
    },

    /**
     * 获取答案是否选中
     * @returns bool
     */
    getSelected: function () {
        return this.selected_
    }
})