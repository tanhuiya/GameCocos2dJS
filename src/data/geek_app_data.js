/**
 * Created by tanhui on 2018/9/12.
 */


/**
 * 活动基础信息
 * @type {{userID: string, activity: string, channelID: string, channelName: string}}
 */
var g_game_user = {
    userID: "",
    activity: "",
    channelID: "",
    channelName: "",
}

var LeftTimeType = {
    Left_Unlimit: 1,
    Left_Total: 2,
    Left_Day: 3,
}

var g_game_info = {
    /**
     * 用户信息
     */
    user_: null,
    /**
     * 剩余答题次数
     */
    left_times_: 0,

    /**
     * 答题次数限制类型
     */
    left_type_: LeftTimeType.Left_Unlimit,

    /**
     * 活动类型
     */
    activityType_: 1,

    /**
     * 是否录入过信息
     */
    isRecorded_: false,
    /**
     * 是否是问答
     * @returns {boolean}
     */
    isAnswer: function () {
        return this.activityType_ == ActivityType.Answer
    },

    /**
     * 设置录入
     */
    setRecord: function (flag) {
        this.isRecorded_ = flag
    },

    /**
     * 设置剩余次数类型
     * @param type
     */
    setLeftType: function (type) {
        if (type) {
            this.left_type_ = type
        }
    },

    /**
     * 设置活动剩余次数
     * @param time
     */
    setLeftTime: function (time) {
        if (time >= 0){
            this.left_times_ = time
        }
    },

    /**
     * 设置微信用户信息
     * @param user
     */
    setUser: function (user) {
        this.user_ = user
        if (user && user.avatar) {
            geek_lib.f_load_resource([user.avatar], function () {
                // console.log("load avatar success")
            })
        }
    }
}