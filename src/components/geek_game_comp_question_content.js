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
    Text_Radio: 3//带音频
}

/**
 * 题目内容组件
 * @type {any}
 */
var g_question_content_node = cc.Node.extend({

    /**
     * 设置题目类型
     * @param type
     */
    setUp:function (type) {
        this.height_ = 0
        var text = "ContentTypeContentTypeContentTypeContentTypeContentTypeContentTypeContentType,,ContentTypeContentTypeContentTypeContentTypeContentTypeContentTypeContentType"
        if (type == ContentType.Text) {
            var text_label = geek_lib.f_label_create(this, text, 36 , 50, 0, 1, cc.color.WHITE, 1, 1, cc.AncorPointTopLeft)
            text_label.setDimensions(g_size.width - 100, 0)
            this.height_ += text_label.getContentSize().height
        } else if (type == ContentType.Text_Picture) {
            var image = geek_lib.f_sprite_create_box(this, res.s_head, g_size.width * 0.5, 0, 395, 290, 1, 1, cc.AncorPointTopMid)
            var title = geek_lib.f_label_create(this, text, 36 , g_size.width * 0.5, - 163 * 2, 1, cc.color.WHITE, 1, 1, cc.AncorPointTopMid)
            title.setDimensions(g_size.width - 100, 0)
            this.height_ = title.getContentSize().height + image.getBoundingBox().height
        } else if (type == ContentType.Text_Picture) {

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
