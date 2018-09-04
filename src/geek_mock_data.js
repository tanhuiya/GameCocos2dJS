/**
 * Created by tanhui on 2018/8/30.
 */



var MockData = {
    UserID: "123456",
    Activity: "68b1443f8bf949b5af4552a024d0cb7f",
    channelID: 1111111111,
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
    }]
}

var g_game_user = {
    userID: MockData.UserID,
    activity: MockData.Activity,
    channelID: MockData.channelID,
}

var g_game_info = {
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
        return this.activityType_ != ActivityType.Answer
    },

}