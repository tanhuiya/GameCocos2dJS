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
echo "<meta http-equiv='Content-Type' content='text/html'; charset='UTF-8'>";
echo "<meta content='8dsun' name='author'>";
echo "<title>飞花令</title>";
echo "</head>";


?>


<body>

<canvas id="geekCanvas" width="675" height="1206"></canvas>


<!--<script type="text/javascript" src="http://8dsun.oss-cn-hangzhou.aliyuncs.com/PubJsLib/geek-cocos-v3.9.1.js" charset="UTF-8"></script>-->


<script type="text/javascript" src="src/lib/XHttp.js" charset=utf-8></script>
<script type="text/javascript" src="src/lib/XTimer.js" charset=utf-8></script>
<script type="text/javascript" src="src/geek-cocos-v3.9.1.js" charset=utf-8></script>
<script type="text/javascript" src="src/geek-cocos-class-lib.js" charset=utf-8></script>

<script type="text/javascript" src="src/geek_app_game_root_v1.js" charset=utf-8></script>


<script type="text/javascript">
    window.onload = function(){
        g_start_geek_h5("geekCanvas", 375 * 2, 603 * 2, g_root_layer, true);
    };

</script>




</body>
</html>