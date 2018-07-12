/**
 * Created by geekge on 15/11/10.
 */

var g_root_layer = cc.Layer.extend({

    init:function () {
        this._super();

        this.g_init_value();
        geek_lib = g_load_geek_class(this);
        geek_lib.f_bgcolor_create(this, geek_lib.v_color(255,55,255));
        geek_lib.f_sprite_create(this,res.s_bg,320,510,1,0,1);

        return true;
    },

    g_init_value:function ()
    {
        // g_root = this;

        // if(user_pic.length == 0)
        // {
        //     user_pic = "http://www.geekge.com/wx_app/image/head.png";
        // }
        // if(user_name.length == 0)
        // {
        //     user_name = "游客";
        // }
    }
});

