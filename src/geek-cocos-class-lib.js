/**
 * Created by geekge on 15/11/10.
 */



var geek_class_lib = cc.Layer.extend({

    init:function () {
        this._super();

        return true;
    },

    v_color:function(r,g,b)
    {
        var col = cc.color(r, g, b);
        return col;
    },

    f_bgcolor_create:function(that, col)
    {
        var bg = cc.LayerColor.create(col);
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        that.addChild(bg);
    },


    f_layer_create:function (that, fun, level, id)
    {
        var layer = new fun();
        layer.init();
        if(id)
            that.addChild(layer, level, id);
        else
            that.addChild(layer, level);

        return layer;
    },

    f_layer_create_data:function (that, fun, data, level, id)
    {
        var layer = new fun();
        layer.init(data);
        if(id)
            that.addChild(layer, level, id);
        else
            that.addChild(layer, level);

        return layer;
    },


    f_sprite_create:function(that, pic, px, py, scale, level, id, anchor_type)
    {
        var sp = cc.Sprite.create(pic);
        if(sp)
        {
            sp.x = px;
            sp.y = py;
            if(scale)
                sp.setScale(scale);
            this.f_set_anchor_point_type(sp, anchor_type)
            if(id)
            {
                that.addChild(sp, level, id);
            }
            else
            {
                that.addChild(sp, level);
            }
        }
        return sp;
    },

    f_sprite_create_box:function(that, pic, px, py, width, height, level, id, anchor_type)
    {
        var sp = cc.Sprite.create(pic);
        if(sp)
        {
            sp.x = px;
            sp.y = py;

            var scalex = width/sp.getContentSize().width;
            var scaley = height/sp.getContentSize().height;

            sp.setScaleX(scalex);
            sp.setScaleY(scaley);

            this.f_set_anchor_point_type(sp, anchor_type)

            if(id)
            {
                that.addChild(sp, level, id);
            }
            else
            {
                that.addChild(sp, level);
            }
        }
        return sp;
    },



    f_sprite_create_wh:function(that, pic, px, py, sx, sy, level, id)
    {
        var sp = cc.Sprite.create(pic);
        if(sp)
        {
            sp.x = px;
            sp.y = py;
            if(sx)
                sp.setScaleX(sx);
            if(sy)
                sp.setScaleY(sy);

            if(id)
            {
                that.addChild(sp, level, id);
            }
            else
            {
                that.addChild(sp, level);
            }
        }
        return sp;
    },

    // geek_lib.f_img_create(this, "left_img.png", g_size.width/2, 800+g_bottom, 2, 30, 1);
    f_img_create:function(that, url, px, py, scale, level, id)
    {
        cc.loader.loadImg(url, function (err, img) {
            var image = new cc.Sprite(img);
            if(image)
            {
                image.x = px;
                image.y = py;
                if(scale)
                    image.setScale(scale);
                if(id)
                {
                    that.addChild(image, level, id);
                }
                else
                {
                    that.addChild(image, level);
                }

            }

        });
    },


    f_img_rotation_create:function(that, url, px, py, scale, rote, level, id)
    {
        cc.loader.loadImg(url, function (err, img) {
            var image = new cc.Sprite(img);
            if(image)
            {
                image.x = px;
                image.y = py;
                if(scale)
                    image.setScale(scale);

                image.setRotation(rote);

                if(id)
                {
                    that.addChild(image, level, id);
                }
                else
                {
                    that.addChild(image, level);
                }

            }

        });
    },


    f_img_create_box:function(that, url, px, py, width, height, level, id)
    {
        cc.loader.loadImg(url, function (err, img) {
            var image = new cc.Sprite(img);
            if(image)
            {
                image.x = px;
                image.y = py;

                var scalex = width/image.getContentSize().width;
                var scaley = height/image.getContentSize().height;

                image.setScaleX(scalex);
                image.setScaleY(scaley);

                if(id)
                {
                    that.addChild(image, level, id);
                }
                else
                {
                    that.addChild(image, level);
                }
            }
        });
    },


    f_img_create_width:function(that, url, px, py, width, height, level, id)
    {
        cc.loader.loadImg(url, function (err, img) {
            var image = new cc.Sprite(img);
            if(image)
            {
                image.x = px;
                image.y = py;

                var scalex = width/image.getContentSize().width;
                var scaley = height/image.getContentSize().height;

                image.setScale(scalex);

                if(id)
                {
                    that.addChild(image, level, id);
                }
                else
                {
                    that.addChild(image, level);
                }
            }
        });
    },




    //this.btn1 = geek_lib.f_btn_create(this, "http://www.bestudy360.com/SunApp/left_img.png", "无限学习", g_size.width/2, 500+g_bottom, 1, 30);
    f_btn_create:function(that, url, txt, px, py, scale, level, id , anchor_type)
    {
        var btn = new ccui.Button(url);
        if(btn)
        {
            if(txt != "")
            {
                btn.setTitleText(txt);
                btn.setTitleFontSize(28)
                btn.setContentSize(cc.size(150, 150));
            }

            btn.setTouchEnabled(true);
            btn.x = px;
            btn.y = py;
            if(scale)
                btn.setScale(scale);
            btn.addTouchEventListener(that.ctl_button_event, that);
            this.f_set_anchor_point_type(btn, anchor_type)
            if(id)
            {
                that.addChild(btn, level, id);
            }
            else
            {
                that.addChild(btn, level);
            }
        }

        return btn;
    },




    //var label = geek_lib.f_label_create(this, "微信扫码登录", 32, 970, 150, 1, cc.color.YELLOW, 30, 9);
    f_label_create:function(that, txt, size, px, py, scale, col, level, id, anchor_type)
    {
        var label = new cc.LabelTTF(txt, "Arial", size);
        if(label)
        {
            label.x = px;
            label.y = py;
            label.setColor(col);
            if(scale)
                label.setScale(scale);
            this.f_set_anchor_point_type(label, anchor_type)
            if(id)
            {
                that.addChild(label, level, id);
            }
            else
            {
                that.addChild(label, level);
            }
        }

        return label;
    },

//var label = f_create_label_area(this, "测试", "Times New Roman", 30, g_size.width/2, 500+g_bottom, 1, cc.color.BLACK, 30, 500, 200, cc.TEXT_ALIGNMENT_LEFT);
    f_create_label_area:function(that, txt, fz,  size, px, py, scale, col, level, width, height, type, id)
    {
        var label = new cc.LabelTTF(txt, fz, size, cc.size(width,height), type);

        if(label)
        {
            label.x = px;
            label.y = py;
            label.setColor(col);
            if(scale)
                label.setScale(scale);

            if(id)
            {
                that.addChild(label, level, id);
            }
            else
            {
                that.addChild(label, level);
            }
        }

        return label;
    },


    f_label_change_txt_by_tag:function(that, tag, txt)
    {
        var lb = that.getChildByTag(tag);
        lb.setString(txt);
    },


    f_label_change_txt:function(lb, txt)
    {
        lb.setString(txt);
    },

    f_sp_remove:function(sp)
    {
        if(sp)
            sp.removeFromParent();
    },


    f_sp_tag:function(sp)
    {
        return sp.getTag();
    },



    //this.edit_1 = g_class.g_create_edit(this,970,350,400,50, 28,28,res.s_white,"请输入内容",20);
    f_edit_create:function(that, px, py, width, height, fontsize, holderfontsize,  pic_url, input_txt, max_lenght, level)
    {
        var ss_edit = new cc.EditBox(cc.size(width, height), new cc.Scale9Sprite(pic_url));
        ss_edit.x = px;
        ss_edit.y = py;
        // ss_edit.setFont("Arial", fontsize)
        ss_edit.setFontSize(fontsize);
        ss_edit.setFontColor(cc.color(0,0,0));
        ss_edit.setPlaceHolder(input_txt);
        ss_edit.setPlaceholderFont("Arial", holderfontsize);
        ss_edit.setPlaceholderFontColor(cc.hexToColor("#8A8A8A"))
        ss_edit.setDelegate(that);
        ss_edit.setMaxLength(max_lenght);
        that.addChild(ss_edit, level);

        return ss_edit;
    },



    //this.menu_item1 = g_class.g_create_menu_item(this,  970, 200, "保存", 22);
    f_menu_create_item:function(that, px, py, titel, font_size, fun)
    {
        cc.MenuItemFont.setFontSize(font_size);

        menu_item = new cc.MenuItemFont(titel, fun, that);
        if(menu_item)
        {
            menu_item.x = px;
            menu_item.y = py;
        }
        return menu_item;
    },



    f_menu_create:function (that, mid_1, mid_2, mid_3, mid_4, mid_5, mid_6, mid_7, mid_8, mid_9, mid_10 )
    {
        var  menu = new cc.Menu( mid_1, mid_2, mid_3, mid_4, mid_5, mid_6, mid_7, mid_8, mid_9, mid_10);
        if(menu)
        {
            menu.x=0;
            menu.y=0;
            that.addChild(menu);
        }


        return menu;
    },

    f_create_scroll_view:function(that, px, py, show_width, show_height, in_width, in_height, level)
    {
        var scrollView = new ccui.ScrollView();
        if(scrollView)
        {
            scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
            scrollView.setTouchEnabled(true);                            //设置滚动事件响应
            scrollView.setContentSize(cc.size(show_width, show_height));    //设置滚动窗口

            scrollView.x = px;
            scrollView.y = py;
            that.addChild(scrollView,level);
            scrollView.setInnerContainerSize(cc.size(in_width, in_height));
        }

        return scrollView;
    },


    f_create_scroll_btn:function(nd, that, url, txt, px, py, scale, level, tag)
    {
        var btn = new ccui.Button(url);
        if(btn)
        {
            btn.setTitleText(txt);
            btn.setTouchEnabled(true);
            btn.x = px;
            btn.y = py;
            if(scale)
                btn.setScale(scale);
            btn.addTouchEventListener(nd.ctl_button_event, that);
            that.addChild(btn,level);

            if(tag)
                btn.setTag(tag);
        }

        return btn;
    },



    f_network_get_json:function (url, callback)
    {
        cc.loader.loadJson(url, callback);
    },

    /**
     * post 请求
     * @param that
     * @param url
     * @param data json 数据
     * @param then_do 成功回调
     * @param error_do 失败回调
     */
    f_network_post_json:function (that, url, data, then_do, error_do)
    {
        XHttp.PostWithTimeout(url, data, function (response) {
            var json_data = JSON.parse(response)
            if (json_data.returnCode == 1) {
                if (then_do) {
                    then_do(json_data.data)
                }
            } else {
                if (error_do) {
                    error_do(json_data.msg)
                } else {
                    if (that.errorHandler){
                        that.errorHandler(json_data.msg)
                    }
                }
            }

        },function () {
            if (error_do) {
                error_do()
            } else {
                if (that.errorHandler){
                    that.errorHandler()
                }
            }
        },10)

    },


    f_timer_start:function(that, fun, time, state)
    {
        if(state)
            that.schedule(fun, time, cc.REPEAT_FOREVER, 0);
        else
            that.scheduleOnce(fun, time);
    },

    f_timer_stop:function(that, fun)
    {
        that.unschedule(fun);
    },


    /*************************** UI  BEGIN ***************************************************/

    f_draw_box:function(nd, px, py , w, h, scale, state, pic)
    {
        var width = w/10;
        var height = h/10;

        if(state)
        {
            this.f_sprite_create_wh(nd, res.dot_t_y_line, px, py+h/2, width-scale, scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_t_y_line, px, py-h/2, width-scale, scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_t_x_line, px-w/2, py, scale, height-scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_t_x_line, px+w/2, py, scale, height-scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_t_left_up, px-w/2, py+h/2, scale, scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_t_left_down, px-w/2, py-h/2, scale, scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_t_right_up, px+w/2, py+h/2, scale, scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_t_right_down, px+w/2, py-h/2, scale, scale, 0, 0);



        }
        else {
            this.f_sprite_create_wh(nd, res.dot_a_y_line, px, py+h/2, width-scale, scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_a_y_line, px, py-h/2, width-scale, scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_a_x_line, px-w/2, py, scale, height-scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_a_x_line, px+w/2, py, scale, height-scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_a_left_up, px-w/2, py+h/2, scale, scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_a_left_down, px-w/2, py-h/2, scale, scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_a_right_up, px+w/2, py+h/2, scale, scale, 0, 0);
            this.f_sprite_create_wh(nd, res.dot_a_right_down, px+w/2, py-h/2, scale, scale, 0, 0);
        }

        if(pic)
            this.f_sprite_create_box(nd,pic,px,py,w-scale*2,h-scale*2,0,0);
    },


    g_notice:function (txt, time)
    {
        if (this.image_bg) return
        this.time = time;
        var image_bg = cc.LayerColor.create(cc.color(0,0,0,150), g_size.width * 0.6 , 80)
        this.addChild(image_bg, 900)
        image_bg.setPosition(g_size.width * 0.2, g_size.height)
        this.image_bg = image_bg

        geek_lib.f_label_create(image_bg, txt, 32, g_size.width * 0.3, 40, g_scale, cc.color.WHITE, 902, 100, cc.AncorPointCenter);

        var px = this.image_bg.getBoundingBox().x;
        var py = g_size.height * 0.8;

        var move1 = cc.moveTo(0.5, cc.p(px, py));
        var move2 = cc.moveTo(this.time, cc.p(px, py));
        var move3 = cc.moveTo(0.5, cc.p(px, g_size.height + 5));
        this.image_bg.runAction(cc.sequence(move1, move2, move3));

        var sp_callback = new cc.CallFunc(function ()   //动作结束事件回调
        {
            this.scheduleOnce(this.g_notice_action, this.time);
        }, this);

    },

    g_notice_action:function()
    {
        this.image_bg.removeFromParent();
        this.image_bg = null
    },



    /*************************** UI  END ***************************************************/

    f_cookie_set:function(c_name,value,expiredays)
    {
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    },

    f_cookie_get:function(c_name)
    {
        if (document.cookie.length>0)
        {
            c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1)
            {
                c_start=c_start + c_name.length+1
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    },



    f_array_rand:function(arr)
    {
        arr.sort(function(){ return 0.5 - Math.random() })

        return arr;
    },


    f_update_geek_pc_layer:function(nd)
    {
        var scalex = 382/640;
        var scaley = 600/1020;
        nd.setScaleX(scalex);
        nd.setScaleY(scaley);
        nd.x = -230;
        nd.y = -72;
    },


    // ------ tanhui: wanxin game functions ----

    /**
     * 设置锚点
     * @param that
     * @param type
     * @returns {*}
     */
    f_set_anchor_point_type:function (that, type) {
        if (type == cc.AncorPointCenter) {
            that.setAnchorPoint(cc.p(0.5,0.5))
        } else if (type == cc.AncorPointTopLeft) {
            that.setAnchorPoint(cc.p(0,1))
        } else if (type == cc.AncorPointTopRight) {
            that.setAnchorPoint(cc.p(1,1))
        } else if (type == cc.AncorPointBottomLeft) {
            that.setAnchorPoint(cc.p(0,0))
        } else if (type == cc.AncorPointBottomRight) {
            that.setAnchorPoint(cc.p(1, 0))
        } else if (type == cc.AncorPointMidLeft) {
            that.setAnchorPoint(cc.p(0, 0.5))
        } else if (type == cc.AncorPointMidRight) {
            that.setAnchorPoint(cc.p(1, 0.5))
        } else if (type == cc.AncorPointTopMid) {
            that.setAnchorPoint(cc.p(0.5, 1))
        } else if (type == cc.AncorPointBottomMid) {
            that.setAnchorPoint(cc.p(0.5, 0))
        }
        return that
    },

    /**
     * 创建 Imageview
     * @param that
     * @param res
     * @param px
     * @param py
     * @param scale
     * @param level
     * @param id
     * @param anchor
     * @returns {res}
     */
    f_imageview_box_create:function(that, res, px, py, width, height, level, id, anchor)
    {
        var img = ccui.ImageView.create(res)
        if(img) {
            img.setPosition(px, py)
            var scalex = width/img.getContentSize().width;
            var scaley = height/img.getContentSize().height;

            img.setScaleX(scalex);
            img.setScaleY(scaley);
        }

        if (anchor){
            geek_lib.f_set_anchor_point_type(img, anchor)
        }

        if (id) {
            that.addChild(img, level, id)
        } else {
            that.addChild(img, level)
        }

        return img;
    },

    /**
     * 创建 Imageview
     * @param that
     * @param res
     * @param px
     * @param py
     * @param scale
     * @param level
     * @param id
     * @param anchor
     * @returns {res}
     */
    f_imageview_create:function(that, res, px, py, scale, level, id, anchor)
    {
        var img = ccui.ImageView.create(res)
        if(img) {
            img.setPosition(px, py)
        }

        if (anchor){
            geek_lib.f_set_anchor_point_type(img, anchor)
        }
        if (scale) {
            img.setScale(scale)
        }
        if (id) {
            that.addChild(img, level, id)
        } else {
            that.addChild(img, level)
        }

        return img;
    },

    /**
     *
     * @param that 父节点
     * @param res 图片
     * @param px x
     * @param py y
     * @param radius 半径
     * @param level
     * @param id
     * @returns {*}
     */
    f_circle_sprite_create: function (that, res, px, py, radius, level, id, img) {
        var stencil = new cc.DrawNode()
        stencil.drawCircle(cc.p(0,0), radius, 360, 100, false, cc.color(0,255,255,255))
        var clippingNode = new cc.ClippingNode();
        clippingNode.setStencil(stencil)
        clippingNode.setInverted(false)
        clippingNode.setAlphaThreshold(0)
        clippingNode.setPosition(px, py)

        if (res){
            geek_lib.f_imageview_box_create(clippingNode, res, 0, 0, radius * 2, radius * 2, 2, 2, cc.AncorPointCenter )
            // geek_lib.f_sprite_create_box(clippingNode, res, 0, 0, radius * 2, radius * 2, 1,2, cc.AncorPointCenter)
        }
        if (img){
            geek_lib.f_imageview_box_create(clippingNode, img, 0, 0, radius * 2, radius * 2, 3, 3, cc.AncorPointCenter )
        }
        if (id){
            that.addChild(clippingNode, level, id)
        } else {
            that.addChild(clippingNode, level)
        }
        return clippingNode
    },

    /**
     * 显示提示消息 （皖新指定）geek_lib.f_show_custom_tip(this, res.s_tip_content_1, "今日次数用完")
     * @param that
     * @param res
     * @param text
     */
    f_show_custom_tip: function (that, res, text) {
        var tip = new g_game_comp_tip_layer(res, text)
        that.addChild(tip, 999)
    },

    /**
     * ImageView更新图片
     * @param sp
     * @param res
     */
    f_update_img_texture: function (sp, res) {
        var rect = sp.getBoundingBox()
        var org_scaleX = sp.getScaleX()
        var org_scaleY = sp.getScaleY()
        console.log(org_scaleX, org_scaleY)
        console.log(rect)
        // var texture = cc.textureCache.addImage(res)
        // var scaleX = texture.width / rect.width
        // var scaleY = texture.height / rect.height
        // sp.setScale(scaleX, scaleY)
        // console.log(sp.getBoundingBox())
        sp.setTextureRect(cc.rect(0, 0, rect.width, rect.height))
        sp.loadTexture(res)
        console.log(sp.getBoundingBox())
        console.log(sp.getContentSize())
        sp.setScaleX(rect.width / sp.getBoundingBox().width)
        sp.setScaleY(rect.height / sp.getBoundingBox().height)
    },

    /**
     * Sprite更新图片
     * @param sp
     * @param res
     */
    f_update_sprite_texture: function (sp, res) {
        var rect = sp.getBoundingBox()
        var org_scaleX = sp.getScaleX()
        var org_scaleY = sp.getScaleY()
        console.log(org_scaleX, org_scaleY)
        console.log(rect)
        var texture = cc.textureCache.addImage(res)
        sp.setTextureRect(cc.rect(0, 0, rect.width, rect.height))
        sp.setTexture(texture)
        sp.setScaleX(rect.width / sp.getBoundingBox().width)
        sp.setScaleY(rect.height / sp.getBoundingBox().height)

    },

    /**
     * 播放背景音乐
     * @param path
     */
    f_play_back_music: function (path) {
        this.audio_ = cc.audioEngine.playEffect(path, true)
        this.effect_play_ = true
    },

    /**
     * 停止播放背景
     */
    f_toggle_back_music: function () {
        console.log(this.music_play_)
        if (this.music_play_) return
        if (!this.audio_ && this.effect_path_) {
            this.f_play_back_music(this.effect_path_)
        } else {
            if (this.effect_play_ ) {
                cc.audioEngine.pauseEffect(this.audio_)
                this.effect_play_ = false
            } else {
                cc.audioEngine.resumeEffect(this.audio_)
                this.effect_play_ = true
            }
        }
    },

    /**
     * 设置音乐是否播放
     * @param flag
     */
    f_play_music:function (flag) {
        this.music_play_ = flag
    },

    /**
     * 设置音效路径
     */
    f_set_effect_path: function (path) {
        this.effect_path_ = path
        if (path) {
            // cc.audioEngine.
        }
    },

    f_pause_effect: function () {
        if (this.audio_) {
            cc.audioEngine.pauseEffect(this.audio_)
        }
    },

    /**
     * 是否在播放背景
     * @returns {boolean}
     */
    f_isplay_effect: function () {
        return this.effect_play_
    },

    /**
     * 设置涂层吞噬事件
     * @param that
     */
    f_swallow_event: function (that) {
        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan : function (touch,event){
                return true
            },
        }, that);
    },

    /**
     * 创建一条线 height 0.6
     * @param that
     * @param color
     * @param posX
     * @param posY
     * @param width
     */
    f_line_create: function (that, color, posX, posY, width , level) {
        var layer = cc.LayerColor.create(color, width, 0.5)
        if (level) {
            that.addChild(layer, level)
        } else {
            that.addChild(layer)
        }
        layer.setPosition(posX, posY)
        return layer
    },

    f_remote_img_sprite_create: function (that, url, default_img, posX, posY, width, height, level, anchor) {
        var image = geek_lib.f_sprite_create_box(that, default_img, posX, posY, width, height, level, 1, anchor)
        cc.loader.loadImg(url, {}, function (err, img) {
            if (err) {
                return
            }
            geek_lib.f_sprite_create_box(that, img, posX, posY, width, height, level, 1, anchor)
        })
        return image
    }
});

cc.AncorPointCenter = 0;
cc.AncorPointTopLeft = 1;
cc.AncorPointTopRight = 2;
cc.AncorPointBottomLeft = 3;
cc.AncorPointBottomRight = 4;
cc.AncorPointMidLeft = 5;
cc.AncorPointMidRight = 6;
cc.AncorPointTopMid = 7;
cc.AncorPointBottomMid = 8;

function g_load_geek_class(that)
{
    var layer = new geek_class_lib();
    layer.init();
    that.addChild(layer, 9999);

    return layer;
}



function g_start_geek_h5(canvas, width, height, fun, state, type)
{
    cc.game.onStart = function(){

        cc.view.adjustViewPort(true);

        var show_model =  cc.ResolutionPolicy.FIXED_WIDTH;

        //if(type )
            //show_model =  cc.ResolutionPolicy.FIXED_WIDTH;

        cc.view.setDesignResolutionSize(width, height, show_model);
        cc.view.resizeWithBrowserSize(true);

        g_size = cc.director.getWinSize();
        g_scale = g_size.height/height;

        if(state)
        {
            cc.LoaderScene.preload(m_resources, function () {

                var MyScene = cc.Scene.extend({
                    onEnter:function () {
                        this._super();
                        var layer = new fun();
                        layer.init();
                        this.addChild(layer);
                    }
                });
                cc.director.runScene(new MyScene());
            }, this);
        }
        else
        {
            var MyScene = cc.Scene.extend({
                onEnter:function () {
                    this._super();
                    var layer = new fun();
                    layer.init();
                    this.addChild(layer);
                }
            });
            cc.director.runScene(new MyScene());
        }
    };
    cc.game.run(canvas);
}







/*

 sp.setAnchorPoint(cc.p(0,0.5));
 var content = edit.getText();





 */














