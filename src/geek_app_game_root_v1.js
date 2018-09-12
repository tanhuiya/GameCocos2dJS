/**
 * Created by geekge on 15/11/10.
 */

var g_root_layer = cc.Layer.extend({
    indexLayer_: null,
    init:function () {
        this._super();

        this.g_init_value();
        geek_lib = g_load_geek_class(this);
        geek_lib.f_bgcolor_create(this, geek_lib.v_color(255,255,255));

        var layer = geek_lib.f_layer_create(this,g_index_layer,0,0)
        this.indexLayer_ = layer
        return true;
    },

    g_init_value:function ()
    {
        g_root = this
    }
});

