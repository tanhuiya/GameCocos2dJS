/**
 * Created by tanhui on 2018/8/22.
 */

/**
 * 题目类型
 * @type {{Text: number, Text_Picture: number, Text_Radio: number}}
 */
var ContentType = {
    Text: 1,// 纯文字
    Text_Picture: 2,//带图片
    Text_Audio: 3,//带音频
    Text_Video: 3//带视频
}

/**
 * 题目内容组件
 * @type {any}
 */
var g_question_content_node = cc.Node.extend({
    heigth_: 0,
    /**
     * 设置题目类型
     * @param type
     */
    setUp:function (type, questionData) {
        var text = "设置题目类型设置题目类型设置题目类型设置题目类型设置题目类型设置题目textttextt类型"
        this.heigth_ = 0
        var textHeight = 300
        // var text = questionData.question_title
        if (type == ContentType.Text) {
            var text_label = geek_lib.f_label_create(this, text, 36 , g_size.width * 0.5, -(textHeight * 0.5), 1, cc.color.WHITE, 1, 1, cc.AncorPointCenter)
            text_label.setDimensions(g_size.width - 100, 0)
            // 文字类型固定高度300
            this.height_ = textHeight
        } else if (type == ContentType.Text_Picture) {
            var music_btn = geek_lib.f_btn_create(this, res.s_music, "", 32 * 2, 0, 1, 1, 4, cc.AncorPointTopLeft)
            var image = geek_lib.f_sprite_create_box(this, res.s_head, g_size.width * 0.5, 0, 395, 290, 1, 1, cc.AncorPointTopMid)
            var title = geek_lib.f_label_create(this, text, 36 , g_size.width * 0.5, - 163 * 2, 1, cc.color.WHITE, 1, 1, cc.AncorPointTopMid)
            title.setDimensions(g_size.width - 100, 0)
            this.height_ = title.getContentSize().height + image.getBoundingBox().height
        } else if (type == ContentType.Text_Audio) {
            var music_btn = geek_lib.f_btn_create(this, res.s_music, "", 32 * 2, 0, 1, 1, 4, cc.AncorPointTopLeft)
            var image = geek_lib.f_sprite_create_box(this, res.s_head, g_size.width * 0.5, 0, 395, 290, 1, 1, cc.AncorPointTopMid)
            var title = geek_lib.f_label_create(this, text, 36 , g_size.width * 0.5, - 163 * 2, 1, cc.color.WHITE, 1, 1, cc.AncorPointTopMid)
            title.setDimensions(g_size.width - 100, 0)
            this.height_ = title.getContentSize().height + image.getBoundingBox().height

            var player = new ccui.VideoPlayer("")
        }
    },

    /**
     * 获取当前组件的总高度
     * @returns {*}
     */
    getHeight: function () {
        return this.height_
    }
})
