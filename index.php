<?php
/**
 * Created by PhpStorm.
 * User: tanhui
 * Date: 2018/7/11
 * Time: 13:37
 */
header("Content-type:text/html;charset=utf-8");

$myfile = fopen("log.txt", "a");
fwrite($myfile, $_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING']);
fwrite($myfile, "\n");
fwrite($myfile, json_encode($_GET, true));
fwrite($myfile, "\n");

echo "<!DOCTYPE html>";
echo "<html>";
echo "<head>";
echo "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi\" />";
echo "<meta content='8dsun' name='author'>";
echo "<title>皖新金智</title>";
echo "</head>";

//$userID = $_GET["userId"];
//$channeID = $_GET["channelId"];
//$channeName = $_GET["channelName"];
//$activityID = $_GET["activityId"];
//
//if (!$userID) {
//    die("userId 非法");
//}
//
//if (!$channeID) {
//	die("channelId 非法");
//}
//if (!$channeName) {
//	die("channelName 非法");
//}
//if (!$activityID) {
//	die("activityId 非法");
//}
?>


<body>

<canvas id="geekCanvas" width="675" height="1206"></canvas>

<!--<script type="text/javascript" src="http://8dsun.oss-cn-hangzhou.aliyuncs.com/PubJsLib/geek-cocos-v3.9.1.js" charset="UTF-8"></script>-->
<script type="text/javascript" src="src/lib/vconsole.min.js" charset=utf-8></script>
<script type="text/javascript" src="src/lib/XHttp.js" charset=utf-8></script>
<script type="text/javascript" src="src/lib/XTimer.js" charset=utf-8></script>
<script type="text/javascript" src="src/geek-cocos-v3.9.1.js" charset=utf-8></script>
<script type="text/javascript" src="src/geek-cocos-class-lib.js" charset=utf-8></script>
<script type="text/javascript" src="src/geek_app_game_root_v1.js" charset=utf-8></script>
<script type="text/javascript" src="src/geek_mock_data.js" charset=utf-8></script>

<style type="text/css">
    .IIV::-webkit-media-controls-fullscreen-button {
        overflow:hidden;
    }
    video::-webkit-media-controls-fullscreen-button {
        display: none;
    }

</style>

<script type="text/javascript">
    window.onload = function(){
//        var vConsole = new VConsole();

//        g_game_user.userID = "<?php //echo $userID ?>//"
//        g_game_user.channel = "<?php //echo $channeID ?>//"
//        g_game_user.channelName = "<?php //echo $channeName ?>//"
//        g_game_user.activity = "<?php //echo $activityID ?>//"

        // testdata
        g_game_user.userID = MockData.UserID
        g_game_user.channel = MockData.channelID
        g_game_user.channelName = MockData.channelName
        g_game_user.activity = MockData.Activity

        g_start_geek_h5("geekCanvas", 375 * 2, 603 * 2, g_root_layer, true);
        cc.view.enableRetina(true);
    };

    function geek_game_setup_video() {
        var video = document.getElementsByClassName("cocosVideo")[0]
        if (video) {
            video.setAttribute("x5-playsinline", "true")
            video.setAttribute("webkit-playsinline", "true")
            video.setAttribute("x5-video-player-type", "h5")
//            video.setAttribute("x5-video-orientation", "portraint")
//            video.setAttribute("x5-video-player-fullscreen", "true")
            video.setAttribute("playsinline", "true")
            video.setAttribute("controls", "true")
        }
    }
</script>




</body>
</html>