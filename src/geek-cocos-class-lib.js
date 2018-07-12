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


    f_sprite_create:function(that, pic, px, py, scale, level, id)
    {
        var sp = cc.Sprite.create(pic);
        if(sp)
        {
            sp.x = px;
            sp.y = py;
            if(scale)
                sp.setScale(scale);
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

    f_sprite_create_box:function(that, pic, px, py, width, height, level, id)
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
    f_btn_create:function(that, url, txt, px, py, scale, level, id)
    {
        var btn = new ccui.Button(url);
        if(btn)
        {
            if(txt != "")
            {
                btn.setTitleText(txt);
                btn.setContentSize(cc.size(150, 150));
            }

            btn.setTouchEnabled(true);
            btn.x = px;
            btn.y = py;
            if(scale)
                btn.setScale(scale);
            btn.addTouchEventListener(that.ctl_button_event, that);

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
    f_label_create:function(that, txt, size, px, py, scale, col, level, id)
    {
        var label = new cc.LabelTTF(txt, "Arial", size);
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
    f_edit_create:function(that, px, py, width, height, fontsize, holderfontsize,  pic_url, input_txt, max_lenght)
    {
        var ss_edit = new cc.EditBox(cc.size(width, height), new cc.Scale9Sprite(pic_url));
        ss_edit.x = px;
        ss_edit.y = py;
        ss_edit.setFontSize(fontsize);
        ss_edit.setFontColor(cc.color(0,0,0));
        ss_edit.setPlaceHolder(input_txt);
        ss_edit.setPlaceholderFont("Paint Boy", holderfontsize);
        ss_edit.setDelegate(that);
        ss_edit.setMaxLength(max_lenght);
        that.addChild(ss_edit);

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


    f_network_get_json_jq:function (url, v1, v2, v3, callback)
    {
        $.ajax({
            type:'POST',
            url: url,
            datatype: "json",
            data:{val1:v1, val2:v2, val3:v3},
            success:function(data){

            }
        });

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


    g_notice:function (txt, time, move)
    {

        this.time = time;
        this.move = move;
        this.image_bg = geek_lib.f_sprite_create(this, res.s_pub_notice_bg, g_size.width/2, g_size.height+30*g_scale, g_scale, 900);

        this.image = geek_lib.f_sprite_create(this, res.s_pub_notice, g_size.width/2-270, g_size.height+30*g_scale, g_scale, 900);

        this.txt_label = geek_lib.f_label_create(this, txt, 26, g_size.width/2-235, g_size.height+30*g_scale, g_scale, cc.color(255, 241, 0), 901);
        this.txt_label.setAnchorPoint(0,0.5);
        this.g_notice_show();
    },

    g_notice_show:function()
    {

        var px = g_size.width/2;
        var py = g_size.height-30*g_scale;

        if(this.move)
            py = g_size.height-this.move;


        var move1 = cc.moveTo(0.5, cc.p(px, py));
        var move2 = cc.moveTo(this.time, cc.p(px, py));
        var move3 = cc.moveTo(0.5, cc.p(px, g_size.height+30*g_scale));
        this.image_bg.runAction(cc.sequence(move1, move2, move3));

        px = g_size.width/2-270;
        move1 = cc.moveTo(0.5, cc.p(px, py));
        move2 = cc.moveTo(this.time, cc.p(px, py));
        move3 = cc.moveTo(0.5, cc.p(px, g_size.height+30*g_scale));
        this.image.runAction(cc.sequence(move1, move2, move3));

        px = g_size.width/2-235;
        move1 = cc.moveTo(0.5, cc.p(px, py));
        move2 = cc.moveTo(this.time, cc.p(px, py));
        move3 = cc.moveTo(0.5, cc.p(px, g_size.height+30*g_scale));

        var sp_callback = new cc.CallFunc(function ()   //动作结束事件回调
        {
            this.scheduleOnce(this.g_notice_action, this.time);
        }, this);
        this.txt_label.runAction(cc.sequence(move1, move2, move3, sp_callback));

    },

    g_notice_action:function()
    {
        this.image_bg.removeFromParent();
        this.image.removeFromParent();
        this.txt_label.removeFromParent();
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
    }

});



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

        var show_model =  cc.ResolutionPolicy.SHOW_ALL;

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













