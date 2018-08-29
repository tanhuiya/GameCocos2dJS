var XTimer = { 
    add: function(time_inval, loop, fun, delay) {
        loop = loop -1;
        if(loop == -2 ){
            loop = cc.REPEAT_FOREVER;
        }
        var hdl = cc.Class({
            extends: cc.Component,
            properties: {},
            func: null
        })

        var handler = new hdl()

        handler.func = fun;
        var scheduler = cc.director.getScheduler();
        delay = delay || 0;
        scheduler.schedule(handler.func, handler, time_inval, loop, delay, false);
        XTimer.hdl_list.push(handler)
        return handler;
    },

    wait: function(checkfunc, cbk) {
        var hdl = XTimer.add(0.01, -1, function() {
            if (checkfunc()) {
                XTimer.rm(hdl)
                cbk()
            }
        })
        XTimer.hdl_list.push(hdl)
    },

    rm: function(handler) {
        cc.director.getScheduler().unschedule(handler.func, handler);
        XTimer.hdl_list.splice(handler)        
    },

    pause: function(handler) {
        cc.director.getScheduler().pauseTarget(handler);
    },

    resume: function(handler) {
        cc.director.getScheduler().resumeTarget(handler);
    },

    removeAll: function() {
        for (var key in XTimer.hdl_list) {
            var hdl = XTimer.hdl_list[key]
            XTimer.rm(hdl)
        }
        XTimer.hdl_list = []
    },

    hdl_list: []
};

module.exports = XTimer;