/**
 * Created by tanhui on 2018/8/21.
 */

var g_question_1_layer = cc.Layer.extend({
    init: function () {
        this._super()

        g_index = this
        var bg = geek_lib.f_sprite_create_box(this, res.s_background, g_size.width * 0.5, g_size.height* 0.5, g_size.width, g_size.height, 1, 1)
        var bg_y = bg.getBoundingBox().height

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

        console.log(node.getContentSize())
        console.log(node.getBoundingBox())
        console.log(1111)
        // 停止答题按钮
        var stop_btn = geek_lib.f_btn_create(this, res.s_stop, "",g_size.width - 92, g_size.height - 20 - 72,1, 3, 3, cc.AncorPointCenter)

        // 设置问题内容
        var content = new g_question_content_node()
        this.addChild(content, 2, 3)
        content.setPosition(cc.p(0, g_size.height - 166))
        content.setUp(ContentType.Text)

        var content_height = content.getHeight()


        var submit_btn = geek_lib.f_btn_create(this, res.s_submit, "", g_size.width * 0.5, 50,1,4,4,cc.AncorPointCenter)

        var answer_y_max = content.getPosition().y - content_height - 50
        var answer_y_min = 100
        var scroll_height = answer_y_max - answer_y_min
        var answer_node = new g_question_answer_node()
        this.addChild(answer_node, 2, 4)
        // answer_node.setUp()
        answer_node.setPosition(0, content.getPosition().y - content_height - 50)
        var questions = ["44444444444444444444","44444444444444444444","44444444444444444444","44444444444444444444","44444444444444444444"];
        answer_node.setData(questions,g_size.width, scroll_height)

        // var color_layer = cc.LayerColor.create(cc.color.WHITE, 200, 200)
        // geek_lib.f_set_anchor_point_type(color_layer, cc.AncorPointCenter)
        // color_layer.setPosition(200,300)
        // // color_layer.setOpacity(0)
        // this.addChild(color_layer, 100, 100)
        //
        // var submit_btn = geek_lib.f_btn_create(color_layer, res.s_game_start, "", 100, 50,1,4,4,cc.AncorPointCenter)

    }
})