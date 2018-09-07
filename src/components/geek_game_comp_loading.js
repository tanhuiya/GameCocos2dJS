/**
 * Created by tanhui on 2018/9/7.
 */

/**
 * 弹出选择框
 * @type {any}
 */
var g_app_game_comp_loading = cc.LayerColor.extend({
    /**
     * 构造函数
     */
    ctor: function (dataArr, type, lastIndex) {
        this._super(cc.color(255, 255, 255), g_size.width, g_size.height)
    },

    init: function () {
        geek_lib.f_imageview_create(this, res.s_loading, g_size.width * 0.5, g_size.height * 0.5, 1, 1, 1, cc.AncorPointCenter)
    }
})