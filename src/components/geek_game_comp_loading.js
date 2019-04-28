/**
 * Created by tanhui on 2018/9/7.
 */

/**
 * 弹出选择框
 * @type {any}
 */
var g_comp_loading = cc.LayerColor.extend({
    /**
     * 构造函数
     */
    ctor: function () {
        this._super(cc.color(255, 255, 255), g_size.width, g_size.height)
    },

    init: function () {
        var image = geek_lib.f_imageview_create(this, res.s_loading, g_size.width * 0.5, g_size.height * 0.5 + 40, 1, 1, 1, cc.AncorPointCenter)
        geek_lib.f_label_create(this, "正在加载…", 28, g_size.width * 0.5, image.getBoundingBox().y - 20, 1, cc.hexToColor("#9B9B9B"), 2, 2, cc.AncorPointTopMid)
    }
})