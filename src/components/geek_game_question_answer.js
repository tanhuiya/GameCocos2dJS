/**
 * Created by tanhui on 2018/8/22.
 */

var g_question_answer_node = cc.Node.extend({
    init: function () {
        this._super()
    },
    setData: function (answers, width, height) {
        var scrollview = geek_lib.f_create_scroll_view(this,0,0,width, height,width, height,1)
        scrollview.setBackGroundColor(cc.color.WHITE)
        for (var i = 0; i < answers.length; i++) {
            var sprite = geek_lib.f_sprite_create_box(scrollview, res.s_game_start, 0, 0 - i*260, width, 256,1,i,cc.AncorPointTopLeft)
        }
    }
})