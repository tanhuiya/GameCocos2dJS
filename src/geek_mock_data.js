/**
 * Created by tanhui on 2018/8/30.
 */


/**
 * 模拟测试数据
 * @type {{UserID: string, Activity: string, channelID: number, channelName: string, ClassData: [*], GradeData: [*], RankData: [*]}}
 */
var MockData = {
    // UserID: "123456",
    UserID: "7f1510b93e204b0b89d81e72cff3b8f7",
    // Activity: "d315324316d04805a649477fc44a8832",
    // Activity: "68b1443f8bf949b5af4552a024d0cb7f",
    // Activity: "25a319c52c164be8840ce8f00b7dcffe",
    Activity: "d783046f7cf449bbb4484c8f38bcbc8f",
    channelID: 1111111111,
    channelName: '小学',
    ClassData: ["一班","一班","一班","一班","一班","一班","一班","一班"],
    GradeData: ["一年级","一年级","一年级","一年级"],
    RankData:  [{
        title: "猜猜下面是那个",
        school: "合肥第六中学",
        score: "390",
    },{
        title: "猜猜下面是那个",
        school: "合肥第六中学",
        score: "390",
    }],
}

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
                console.log("load avatar success")
            })
        }
    }
}