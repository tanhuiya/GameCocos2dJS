/**
 * Created by geekge on 15/11/10.
 */

var g_root_layer = cc.Layer.extend({

    init:function () {
        this._super();

        this.g_init_value();
        geek_lib = g_load_geek_class(this);
        geek_lib.f_bgcolor_create(this, geek_lib.v_color(255,255,255));

        // geek_lib.f_layer_create(this,g_index_layer,0,0)
        // geek_lib.f_layer_create(this,g_question_1_layer,0,0)
        geek_lib.f_layer_create(this,g_game_introduce_layer,0,0)
        return true;
    },

    g_init_value:function ()
    {
        g_root = this
    }
});

