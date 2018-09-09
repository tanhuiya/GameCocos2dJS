/**
 * Created by tanhui on 2018/9/9.
 */

var fontInfo = cc.Class.extend({
    fontName:null,
    fontSize:null,
    color:null,
    opacity:null,
    ctor:function (){
        var self = this;
        self.fontName = "Helvetica";
        self.fontSize = 24.0;
        self.opacity = 255;
        self.color = "255,255,255";
    }
});

//富文本
var g_app_super_rich_text = ccui.Widget.extend({
    fontList:null,	//字体列表
    lineList:null,	//RichText列表
    m_line:null,	//当前文本
    m_width:0,
    m_height:0,
    m_max:0,
    m_htmlJsonList:null,
    m_defaultFontSize:18,
    /*
     _width    文本宽度
     _height    文本高度
     _string    字符串
     _pos       位置
     _args      参数替换列表
     _fontSize  默认字体大小
     */
    ctor:function(_width,_height,_string,_pos,_args,_fontSize){
        ccui.Widget.prototype.ctor.call(this);
        var self = this;
        self.fontList = [];
        self.lineList = [];
        self.m_htmlJsonList = [];
        self.setSize(_width,_height);
        self.fontList.push(new fontInfo());
        self.addNewLine();
        if(typeof _pos != "undefined"){
            self.setPosition(_pos);
        }
        if(typeof _args != "undefined"){
            _string = _string.format(_args);
        }
        if(typeof _fontSize != "undefined"){
            self.m_defaultFontSize = _fontSize;
        }
        self.analysisHtml(_string);
        return self;
    },
    setSize:function(_width, _height){
        this.m_width = _width;
        this.m_height = _height;
    },
    renderHtml:function(_json)
    {
        _json = eval(_json);
        var self = this;
        var colorArr= [];
        for(var i in _json)
        {
            var obj = _json[i];
            if(obj.text == "</br>"){
                self.addNewLine();
            }else if(obj.text != ""){
                //添加文字
                colorArr = obj.color.split(',');
                var textElement = new ccui.RichElementText(0, cc.color(parseInt(colorArr[0]), parseInt(colorArr[1]), parseInt(colorArr[2]), parseInt(obj.opacity)), parseInt(obj.opacity), obj.text, obj.fontName, parseInt(obj.fontSize));
                var num = self.m_width/parseInt(obj.fontSize)*2;        //一行能容纳的字数
                var max = self.LengthOfString(obj.text);                //文本长度
                var actualWidth = max*obj.fontSize/2;
                var hang = Math.ceil((self.m_line.actualWidth+actualWidth)/self.m_width);
                self.m_line.actualWidth = parseInt(self.m_line.actualWidth)+actualWidth+obj.fontSize*2;
                self.m_max = parseInt(obj.fontSize)>self.m_max?parseInt(obj.fontSize):self.m_max;       //取字体大的那个
                self.m_line.width = self.m_width-obj.fontSize*2;
                self.m_line.height = hang*Math.ceil(self.m_max+self.m_max/5);
                self.m_line.pushBackElement(textElement);
            }else if(obj.img != ""){
                //添加图片
                colorArr = obj.color.split(',');
                var image = new ccui.RichElementImage(0, cc.color.WHITE, parseInt(obj.opacity), obj.img);
                self.m_line.pushBackElement(image);
            }
        }
        self.updateLine();
    },
    //解析HTML
    analysisHtml:function(_str){
        // 解析属性 (\w+)=([^\s>]+)
        var self = this;

        var curString = _str;
        var begin = curString.search("<font");
        var end = curString.search("</font>");
        if(begin >= 0){
            if(begin > 0){
                var str = curString.slice(0,begin);
                var htmlJson = {};
                htmlJson["fontSize"] = self.m_defaultFontSize;
                htmlJson["color"] = "255,255,255";
                htmlJson["opacity"] = 255;
                htmlJson["fontName"] = res.font;
                htmlJson["text"] = str;
                self.m_htmlJsonList.push(htmlJson);
            }
            while(begin >= 0){
                var htmlText = curString.slice(begin,end+7);
                console.log("htmlText = "+htmlText);
                var attr = htmlText.match(/(\w+)=([^\s>]+)/g);
                var content = htmlText.match(/>.*</)[0];
                var htmlJson = {};
                htmlJson["text"] = content.slice(1,content.length-1);
                if(attr){
                    for(var i in attr){
                        var array = attr[i].split("=");
                        if(array[0] == "fontSize"){
                            htmlJson["fontSize"] = array[1];
                        }else{
                            htmlJson["fontSize"] = self.m_defaultFontSize;
                        }
                        if(array[0] == "color"){
                            htmlJson["color"] = array[1];
                        }else{
                            htmlJson["color"] = "255,255,255";
                        }
                        if(array[0] == "opacity"){
                            htmlJson["opacity"] = array[1];
                        }else{
                            htmlJson["opacity"] = 255;
                        }
                        if(array[0] == "fontName"){
                            htmlJson["fontName"] = array[1];
                        }else{
                            htmlJson["fontName"] = res.font;
                        }
                    }
                }else{
                    htmlJson["fontSize"] = self.m_defaultFontSize;
                    htmlJson["color"] = "255,255,255";
                    htmlJson["opacity"] = 255;
                    htmlJson["fontName"] = res.font;
                }

                self.m_htmlJsonList.push(htmlJson);
                console.log("attr = "+attr);
                curString = curString.slice(end+7,curString.length);
                var brTag = curString.search("</br>");
                if(brTag == 0){
                    //换行
                    var brHtmlJson = {};
                    brHtmlJson["text"] = "</br>";
                    self.m_htmlJsonList.push(brHtmlJson);
                    curString.slice(5,curString.length);
                }
                begin = curString.search("<font");
                end = curString.search("</font>");
            }
        }else{
            var htmlJson = {};
            htmlJson["fontSize"] = self.m_defaultFontSize;
            htmlJson["color"] = "255,255,255";
            htmlJson["opacity"] = 255;
            htmlJson["fontName"] = res.font;
            htmlJson["text"] = _str;
            self.m_htmlJsonList.push(htmlJson);
        }
        self.renderHtml(self.m_htmlJsonList);
        console.log("analysis Ended!");

    },
    //解析属性
    analysisAttr:function(_str){
        var self = this;
    },
    LengthOfString:function(str){
        var len = 0;
        for (var i=0; i<str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                len++;
            }
            else {
                len+=2;
            }
        }
        return len;
    },
    addNewLine:function(){
        //新加一个RichText
        var self = this;
        self.m_line = new ccui.RichText();
        self.m_line.actualWidth = 0;
        //self.m_line.setSizeType(ccui.Widget.SIZE_ABSOLUTE);
        self.m_line.ignoreContentAdaptWithSize(false);
        self.lineList.push(self.m_line);
        self.addChild(self.m_line);
        self.m_max = 0;
    },
    updateLine:function(){
        //调整RichText位置
        var self = this;
        var maxWidth = 0.0;
        var maxHeight = 0.0;
        for(var i=self.lineList.length-1; i>=0; i--){
            var line = self.lineList[i];
            line.setAnchorPoint(cc.p(0, 0));
            line.formatText();
            var size = line.getContentSize();
            console.log("maxHeight =" +maxHeight);
            line.setPositionY(maxHeight);
            if(size.width>maxWidth){
                maxWidth=size.width;
            }
            maxHeight+=size.height;
        }
        self.setAnchorPoint(cc.p(0, 0));
        self.setContentSize(maxWidth, maxHeight);
    }
});
