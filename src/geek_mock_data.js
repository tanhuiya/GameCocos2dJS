/**
 * Created by tanhui on 2018/8/30.
 */



var MockData = {
    UserID: "123457",
    // Activity: "d315324316d04805a649477fc44a8832",
    Activity: "68b1443f8bf949b5af4552a024d0cb7f",
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
    },{
        title: "猜猜下面是那个",
        school: "合肥第六中学",
        score: "390",
    },{
        title: "猜猜下面是那个",
        school: "合肥第六中学",
        score: "390",
    },{
        title: "猜猜下面是那个",
        school: "合肥第六中学",
        score: "390",
    },{
        title: "猜猜下面是那个",
        school: "合肥第六中学",
        score: "390",
    },{
        title: "猜猜下面是那个",
        school: "合肥第六中学",
        score: "390",
    },{
        title: "猜猜下面是那个",
        school: "合肥第六中学",
        score: "390",
    },{
        title: "猜猜下面是那个",
        school: "合肥第六中学",
        score: "390",
    },{
        title: "猜猜下面是那个",
        school: "合肥第六中学",
        score: "390",
    },{
        title: "猜猜下面是那个",
        school: "合肥第六中学",
        score: "390",
    },{
        title: "猜猜下面是那个",
        school: "合肥第六中学",
        score: "390",
    }],


}

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

    setLeftType: function (type) {
        if (type) {
            this.left_type_ = type
        }
    },

    setLeftTime: function (time) {
        if (time >= 0){
            this.left_times_ = time
        }
    },
}