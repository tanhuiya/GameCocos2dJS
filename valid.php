<?php
/**
 * Created by PhpStorm.
 * User: tanhui
 * Date: 2018/8/31
 * Time: 14:14
 */

define("TOKEN", "geekge1108");

if (!isset($_GET['echostr']))
{
	$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
	if (!empty($postStr))                               //微信通信
	{
		include_once("weixin/class_weixin_main.php");
		$wechatObj = new class_weixin_main();
		$wechatObj->responseMsg();
	}
}
else                                        //微信认证
{
	include_once("weixin/class_weixin_main.php");
	$wechatObj = new class_weixin_main();
	$wechatObj->valid();
}
