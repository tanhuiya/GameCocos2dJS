/**
 * Created by tanhui on 2018/8/21.
 */

var g_question_1_layer = cc.Layer.extend({
    init: function () {
        this._super()

        g_index = this
        // var bg = geek_lib.f_sprite_create_box(this, res.s_background, g_size.width * 0.5, g_size.height* 0.5, g_size.width, g_size.height, 1, 1)
        // var bg_y = bg.getBoundingBox().height

        this.drawTitle()
    },

    // 绘制题目头部信息
    drawTitle: function () {
        // var head_bg = geek_lib.f_sprite_create_box(this, res.s_rule, 44, g_size.height - 20, 500, 124, 1, 1)
        // head_bg.setAnchorPoint(cc.p(0, 1))

        var clippingNode = new cc.ClippingNode();
        var stencil = new cc.Sprite(res.s_circle);
        clippingNode.setStencil(stencil)
        clippingNode.setInverted(false);
        clippingNode.setAlphaThreshold(0);


        // 创建一个大于圆圈的图片精灵，添加在裁切功能的Node上（头像）
        var playerHeadIcon = new cc.Sprite(res.s_head);

        clippingNode.addChild(playerHeadIcon,1,2);

        clippingNode.setPosition(cc.p(200,300))
        // 将剪切node添加到容器中（例如：this）
        this.addChild(clippingNode,1,1);



    }
})