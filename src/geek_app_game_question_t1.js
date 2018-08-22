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

        // 停止答题按钮
        var stop_btn = geek_lib.f_btn_create(this, res.s_stop, "",g_size.width - 92, g_size.height - 20 - 72,1, 3, 3, cc.AncorPointCenter)

        // 设置问题内容
        var content = new g_question_content_node()
        this.addChild(content, 2, 3)
        content.setPosition(cc.p(0, g_size.height - 166))
        content.setUp(ContentType.Text)


    }
})