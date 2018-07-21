/**
 * Created by tanhui on 2018/7/21.
 */

var g_index_layer = cc.Layer.extend({
    init: function () {
        this._super()

        g_index = this


        m_rank_btn = geek_lib.f_btn_size_create(this, null, "排行榜", 120, g_size.height - 20, cc.size(300,200), 1, 1, 1)
        var m_rule_x = g_size.width - m_rank_btn.width - 20
        var m_rule_btn = geek_lib.f_btn_size_create(this, null, "规则介绍", m_rule_x, g_size.height - 20, cc.size(400,300), 1, 2, 2)
        m_rule_btn.setColor(geek_lib.v_color(12,12,12))

        console.log(m_rule_btn.getColor())
        m_rule_btn.setTitleFontSize(30)
    }
})