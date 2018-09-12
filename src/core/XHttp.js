var XHttp = {
    GetWithTimeout: function(url , success_func , fail_func , timeout) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(success_func){
                if(xhr.readyState == 4 && xhr.status == 200) {
                    success_func(xhr.responseText);
                }
            }
        }
        xhr.open("GET" , url , true);
        XTimer.add(timeout , 1 , function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                return;
            }else{
                xhr.abort();
                xhr = null;
                fail_func();
            }
        })
        xhr.send();
    },

    PostWithTimeout: function(url , data , success_func , fail_func , timeout) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(success_func){
                if(xhr.readyState == 4 && xhr.status == 200) {
                    success_func(xhr.responseText);
                }
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;"); 
        var data_json = this.formatData(data);
        xhr.send(data_json);
    },

    
    formatData: function (data) {
        var res = ''
        if (typeof data !== 'object') {
            return ''
        }
        var index = 0
        for (var i in data) {
            index++
            if (index > 1) {
                res = res + '&' + i + '=' + data[i]
            } else {
                res = i + '=' + data[i]
            }
        }
        return res
    }
};