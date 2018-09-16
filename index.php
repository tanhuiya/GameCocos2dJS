<?php
/**
 * Created by PhpStorm.
 * User: tanhui
 * Date: 2018/7/11
 * Time: 13:37
 */
header("Content-type:text/html;charset=utf-8");



echo "<!DOCTYPE html>";
echo "<html>";
echo "<head>";
echo "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi\" metaname=\"x5-orientation\" content=\"portrait\" />";
echo "<meta content='8dsun' name='author'>";
echo "<title></title>";
echo "</head>";

/**
 * log 记录
 */
$myfile = fopen("log.txt", "a");
fwrite($myfile, $_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING']);
fwrite($myfile, "\n");
fwrite($myfile, json_encode($_GET, true));
fwrite($myfile, "\n");


/**
 * 是否测试环境
 */
$test_env = true;

if (!$test_env) {
	$userID = $_GET["userId"];
	$channeID = $_GET["channelId"];
	$channeName = $_GET["channelName"];
	$activityID = $_GET["activityId"];
	$activityName = $_GET["activityName"];
	if (!$userID) {
		die("userId 非法");
	}
	if (!$channeID) {
		die("channelId 非法");
	}
	if (!$channeName) {
		die("channelName 非法");
	}
	if (!$activityID) {
		die("activityId 非法");
	}
} else {
	$userID = "";
	$channeID = "";
	$channeName = "";
	$activityID = "";
	$activityName = "测试环境";
}

?>


<body>

<canvas id="geekCanvas" width="675" height="1206"></canvas>

<!--<script type="text/javascript" src="http://8dsun.oss-cn-hangzhou.aliyuncs.com/PubJsLib/geek-cocos-v3.9.1.js" charset="UTF-8"></script>-->
<script type="text/javascript" src="src/core/vconsole.min.js" charset=utf-8></script>
<script type="text/javascript" src="src/core/geek-cocos-v3.9.1.js" charset=utf-8></script>
<script type="text/javascript" src="src/core/geek-cocos-class-lib.js" charset=utf-8></script>
<script type="text/javascript" src="src/layer/geek_app_game_root.js" charset=utf-8></script>
<script type="text/javascript" src="src/data/geek_app_data.js" charset=utf-8></script>
<script type="text/javascript" src="src/test/geek_mock_data.js" charset=utf-8></script>


<script type="text/javascript">
    window.onload = function(){
        var ua = window.navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf('android') > -1 || ua.indexOf('linux') > -1;

        document.title = "<?php echo $activityName ?>"
        var test_env = "<?php echo $test_env ?>"
        if (test_env) {
                    var vConsole = new VConsole();
            g_game_user.userID = MockData.UserID
            g_game_user.channel = MockData.channelID
            g_game_user.channelName = MockData.channelName
            g_game_user.activity = MockData.Activity
        } else {
            g_game_user.userID = "<?php echo $userID ?>"
            g_game_user.channel = "<?php echo $channeID ?>"
            g_game_user.channelName = "<?php echo $channeName ?>"
            g_game_user.activity = "<?php echo $activityID ?>"
        }

        g_start_geek_h5("geekCanvas", 375 * 2, 603 * 2, g_root_layer, true);
    };

    /**
     * 设置video标签样式，小屏播放
     */
    function geek_game_setup_video(removedCallback) {
        var video = document.getElementsByClassName("cocosVideo")[0]
        if (video) {
            video.setAttribute("x5-playsinline", "true")
            video.setAttribute("webkit-playsinline", "true")
//            video.setAttribute("x5-video-player-type", "h5")
            video.setAttribute("playsinline", "true")
            video.setAttribute("controls", "true")
        }
        video.addEventListener("x5videoexitfullscreen", function(){
            if (removedCallback){
                removedCallback()
            }
        });
    }

    /**
     * 加载音乐
     * @param path
     */
    function audioPreload(path) {
        var audio = document.getElementById("backAudio")
        audio.setAttribute("src", path)
        audio.setAttribute("preload", "auto")
    }
    /**
     * 播放或停止音乐
     * @param play
     */
    function playBack(play) {
        var audio = document.getElementById("backAudio")
        if (play){
            audio.play()
        } else {
            audio.pause()
        }
    }


</script>



<style type="text/css">
    .IIV::-webkit-media-controls-fullscreen-button {
        overflow:hidden;
    }
    video::-webkit-media-controls-fullscreen-button {
        display: none;
    }

</style>


<audio id="backAudio" loop="loop"></audio>

</body>
</html>
