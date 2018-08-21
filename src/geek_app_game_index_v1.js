/**
 * Created by tanhui on 2018/7/21.
 */

var g_index_layer = cc.Layer.extend({
    init: function () {
        this._super()

        g_index = this



        // var m_rank_label = geek_lib.f_label_create(this,"排行榜",cc.size(120,60),100,g_size.height - 20,1,1,1,1)
        // m_rank_label.setColor(geek_lib.v_color(0,255,255))
        // m_rank_label.setBackGroundColor(geek_lib.v_color(0,255,255))
        // m_rank_label.setFontSize(24)
        // console.log(m_rank_label.getBoundingBox())

        var m_rank_btn = geek_lib.f_btn_create(this, res.s_tiaozhan, "",100, g_size.height - 20,1, 1, 1)
    //     var m_rank_btn = geek_lib.f_btn_size_create(this, "排行榜", 100, g_size.height - 20, cc.size(300,200), geek_lib.v_color(0,255,255), 1, 1, 1)
    //
    //     console.log(m_rank_btn.getCustomSize())
    //     console.log(m_rank_btn.getBoundingBox())
    //     var m_rule_x = g_size.width - m_rank_btn.getCustomSize().width - 20
    //     var m_rule_btn = geek_lib.f_btn_size_create(this, "规则介绍", m_rule_x, g_size.height - 20, cc.size(400,300), geek_lib.v_color(12,12,12), 1, 2, 2)
    //     m_rule_btn.setTitleFontSize(24)
    //     m_rank_btn.setTitleFontSize(24)
    }
})