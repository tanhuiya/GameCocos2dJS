/**
 * Created by tanhui on 2018/8/22.
 */

var ContentType = {
    Text: 1,
    Text_Picture: 2,
    Text_Radio: 3
}

var g_question_content_node = cc.Node.extend({

    init: function () {
        this._super()
    },
    setUp:function (type) {
        var text = "ContentTypeContentTypeContentTypeContentTypeContentTypeContentTypeContentType,,ContentTypeContentTypeContentTypeContentTypeContentTypeContentTypeContentType"
        if (type == ContentType.Text) {
            var text_label = geek_lib.f_label_create(this, text, 36 , 50, 0, 1, cc.color.WHITE, 1, 1, cc.AncorPointTopLeft)
            text_label.setDimensions(g_size.width - 100, 0)
            // console.log(this.getContentSize())
            this.height += text_label.getContentSize().height
        }
    },

    getHeight: function () {
        return this.height
    }
})
