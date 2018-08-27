/**
 * Created by tanhui on 2018/8/24.
 */


var QustionResultType = {
    None : 0,
    Success : 1,
    Error : 2,
}

var g_question_result_node = cc.Node.extend({
    // ctor: function (type) {
    //     this._super()
    //     this.type_ = type
    // },

    init: function (data) {
        this._super()
        var self_height = 282 * 2
        geek_lib.f_sprite_create_box(this, res.s_activity_bg, g_size.width * 0.5, self_height * 0.5, 336 * 2, self_height,1,1,cc.AncorPointCenter)

        this.setData(data)
    },

    /**
     * 是否答对标志
     * @param data
     */
    setData: function (data) {
        if (data.type == QustionResultType.Error) {
            geek_lib.f_sprite_create_box(this, res.s_error, 132 * 2 , 252 * 2, 32, 32, 2, 2,cc.AncorPointCenter)
            geek_lib.f_label_create(this, "回答错误", 50, 147 * 2, 252 * 2, 1, cc.hexToColor("#1F2B75"), 3, 3, cc.AncorPointMidLeft)
        } else if (data.type == QustionResultType.Success) {
            geek_lib.f_sprite_create_box(this, res.s_right, 132 * 2 , 252 * 2, 32, 32, 2, 2,cc.AncorPointCenter)
            geek_lib.f_label_create(this, "回答正确", 50, 147 * 2, 252 * 2, 1, cc.hexToColor("#1F2B75"), 3, 3, cc.AncorPointMidLeft)
        }

        var des_label = geek_lib.f_label_create(this, data.data, 34, 45 * 2, 200 * 2, 1, cc.hexToColor("#1F2B75"), 3, 3, cc.AncorPointTopLeft)
        des_label.setDimensions(300 * 2, 0)
    },

    /**
     * 显示结果
     * @param that
     */
    show: function (that) {

    }
})