/**
 * Created by tanhui on 2018/8/25.
 */

/**
 * 游戏结束页面
 * @type {any}
 */
var g_game_over_layer = cc.Layer.extend({
    init: function (data) {
        this._super()
        this.stopGame()
        geek_lib.f_sprite_create_box(this, res.s_background, g_size.width * 0.5, g_size.height * 0.5, g_size.width, g_size.height, 1, 1)
        geek_lib.f_swallow_event(this)
        this.secondUsed_ = data.secondUsed
        this.score_ = data.score
    },


    /**
     * 绘制界面
     */
    drawRect: function (data) {
        this.close_btn_ = geek_lib.f_btn_create(this, res.s_close, "",g_size.width - 34, g_size.height - 32 * 2, 1, 1, 2, cc.AncorPointCenter)
        var bg = geek_lib.f_sprite_create(this, res.s_over_des_bg, g_size.width * 0.5, g_size.height - 23 * 2, 1, 2, 3, cc.AncorPointTopMid)
        // 用户头像
        geek_lib.f_circle_sprite_create(this, res.s_audio_bg, g_size.width * 0.5, g_size.height - 60 - 108, 108, 3, 4, data.img)
        // 用户名称
        geek_lib.f_label_create(this, data.userName, 36, g_size.width * 0.5, g_size.height - 300, 1, cc.hexToColor("#1F2B75"),3,5,cc.AncorPointTopMid)

        var node = null
        if (g_game_info.isAnswer()) {
            node = new g_game_comp_over_question(g_size.width, data.again, this.score_, this.secondUsed_)
        } else {
            node = new g_game_comp_over_test(g_size.width, data.again, data.imgTitle, data.result)
        }
        this.addChild(node, 2, 5)
        node.setPosition(0, bg.getBoundingBox().y)

        this.back_btn_ = geek_lib.f_btn_create(this, res.s_back_index, "", g_size.width * 0.25, 80 * 2, 1, 2, 5, cc.AncorPointCenter)
        this.again_btn_ = geek_lib.f_btn_create(this, res.s_answer_again, "", g_size.width * 0.75, 80 * 2, 1, 2, 5, cc.AncorPointCenter)
    },

    /**
     * 关闭当前页面
     */
    close: function () {
        this.removeFromParent()
    },

    /**
     * 按钮被点击的回调
     * @param sender 事件相应者
     * @param type  事件类型
     */
    ctl_button_event: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            switch (sender) {
                case this.close_btn_:
                    this.close()
                    break;
                case this.back_btn_:
                    this.removeFromParent(true)
                    break;
                case this.again_btn_:
                    this.removeFromParent(true)
                    // 重新开始游戏
                    g_root.indexLayer_.startGame()
                    break;
            }
        }
    },

    stopGameParser: function (res) {
        if (res && res.finishData){
            this.finishData_ = res.finishData
            this.drawRect(this.finishData_)
        }
    },

    /**
     * 结束游戏
     */
    stopGame: function () {
        var that = this
        geek_lib.f_network_post_json(
            this,
            uri.questionFinish,
            {
                userId: g_game_user.userID,
                activityId: g_game_user.activity
            },
            function (response) {
                that.stopGameParser(response)
            })
    },
})