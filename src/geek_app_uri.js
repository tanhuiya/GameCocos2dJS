/**
 * Created by tanhui on 2018/8/29.
 */

/**
 * 域名
 * @type {string}
 */
var domain = "http://120.27.163.33:8081"

/**
 * uri 定义
 * @type {}
 */
var uri = {
    /**
     * 添加用户信息
     */
    userInfoAdd:    domain + "/front/user/userInfoAdd",
    /**
     * 发送短信
     */
    sendSms:        domain + "/front/user/sendSms",
    /**
     * 活动参与情况
     */
    activityState:  domain + "/front/activity/activitySituation",
    /**
     * 主页
     */
    home:           domain + "/front/activity/home",
    /**
     * 开始游戏
     */
    startPlay:      domain + "/front/activity/startPlay",
    /**
     * 提交答案
     */
    questionCommit: domain + "/front/activity/questionCommit",
    /**
     * 结束游戏
     */
    questionFinish: domain + "/front/activity/questionFinish",
    /**
     * 游戏排行
     */
    rank:           domain + "/front/activity/rank",
}