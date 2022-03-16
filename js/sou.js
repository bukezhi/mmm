$(document).ready(function() {

    //搜索引擎列表【预设】
    var se_list_preinstall = {
        '1':{
            id      :1,
            title   :"百度",
            url     :"https://www.baidu.com/s",
            name    :"wd",
            img     :"./icon/baidu.ico",
        },
        '2':{
            id      :2,
            title   :"谷歌",
            url     :"https://www.google.com/search",
            name    :"q",
            img     :"./icon/google_1.png",
        },
        '3':{
            id      :3,
            title   :"必应",
            url     :"https://cn.bing.com/search",
            name    :"q",
            img     :"./icon/bing.ico",
        },
        '4':{
            id      :4,
            title   :"多吉没了",
            url     :"https://www.dogedoge.com/results",
            name    :"q",
            img     :"./icon/doge_ico.png",
        },
        '5':{
            id      :5,
            title   :"搜狗",
            url     :"https://www.sogou.com/web",
            name    :"query",
            img     :"./icon/sogou.ico",
        },
        '6':{
            id      :6,
            title   :"yandex",
            url     :"https://yandex.com/search/",
            name    :"text",
            img     :"./icon/yandex.png",
        },
    };

    //主页快捷方式【预设】
    var quick_list_preinstall = {
        '1':{
            title   :"全屏显示",
            url     :"https://v.qq.com/search_redirect.html?url=https://www.baomihua.com/go.aspx?url=https://mmm.zone/?tslbaomihua.com",
            img     :"./icon/tsl.png",
            explain :"特斯拉全屏显示",
        },
        '2':{
            title   :"哔哩哔哩",
            url     :"https://www.bilibili.com/",
            img     :"./icon/bilibili.png",
            explain :"哔哩哔哩 (゜-゜)つロ 干杯~",
        },
        '3':{
            title   :"抖音网页",
            url     :"https://www.douyin.com/",
            img     :"./icon/dy.ico",
            explain :"抖音视频在线看",
        },

        '4':{
            title   :"西瓜视频",
            url     :"https://m.ixigua.com/",
            img     :"./icon/xigua.png",
            explain :"西瓜视频",
        },

        '5':{
            title   :"电视直播",
            url     :"https://tv.cctv.com/live/index.shtml",
            img     :"./icon/tv.png",
            explain :"CCTV电视直播网页版",
        },
        '6':{
            title   :"韩剧TV",
            url     :"https://www.kan.cc/",
            img     :"./icon/hanjutv.ico",
            explain :"看韩剧",
        },

        '7':{
            title   :"新闻后续",
            url     :"https://houxu.app/",
            img     :"./icon/houxu.jpg",
            explain :"有记忆的新闻",
        },

        '8':{
            title   :"梨视频",
            url     :"https://www.pearvideo.com/?from=intro",
            img     :"./icon/lsp.ico",
            explain :"梨视频新闻",
        },

        '9':{
            title   :"豆瓣电影",
            url     :"https://m.douban.com/movie/",
            img     :"./icon/douban.png",
            explain :"豆瓣电影评分推荐",
        },

        '10':{
            title   :"虎嗅网",
            url     :"https://www.huxiu.com/",
            img     :"./icon/huxiu.ico",
            explain :"虎嗅网",
        },
        '11':{
            title   :"股市日历",
            url     :"https://xueqiu.com/hq",
            img     :"./icon/mg.ico",
            explain :"股票今天跌了多少",
        },
        '12':{
            title   :"网页快手",
            url     :"https://www.kuaishou.com/",
            img     :"./icon/ks.ico",
            explain :"网页快手视频随心看",
        },

        '13':{
            title   :"每日一文",
            url     :"https://meiriyiwen.com/",
            img     :"./icon/guozhi.ico",
            explain :"每日一文",
        },

        '14':{
            title   :"历史今天",
            url     :"https://hao.360.com/histoday/",
            img     :"./icon/lishi.png",
            explain :"历史上的今天",
        },
        '15':{
            title   :"句子控",
            url     :"https://www.juzikong.com/",
            img     :"./icon/jzk.ico",
            explain :"句子控",
        },
        '16':{
            title   :"名医百科",
            url     :"https://m.baikemy.com/",
            img     :"./icon/mybk.ico",
            explain :"名医百科",
        },
        '17':{
            title   :"今日热榜",
            url     :"https://tophub.today/",
            img     :"./icon/rebang.png",
            explain :"今日热榜",
        },
        '18':{
            title   :"万年历",
            url     :"https://wannianrili.51240.com/",
            img     :"./icon/wannianli.png",
            explain :"万年历",
        },
    };

    //搜索框数据加载
    searchData();

    //快捷方式数据加载
    quickData();

    //判断窗口大小，添加输入框自动完成
    var wid = $("body").width();
    if (wid < 640) {
        $(".wd").attr('autocomplete', 'off');
    }else{
        $(".wd").focus();
    }

    //设置内容加载
    setSeInit();//搜索引擎设置
    setQuickInit();//快捷方式设置


    //获取搜索引擎列表
    function getSeList() {
        var se_list_local = Cookies.get('se_list');
        if (se_list_local !== "{}"&&se_list_local) {
            return JSON.parse(se_list_local);
        } else {
            setSeList (se_list_preinstall);
            return se_list_preinstall;
        }
    }

    //设置搜索引擎列表
    function setSeList (se_list) {
        if(se_list){
           Cookies.set('se_list', se_list, { expires: 36500 });
           return true;
        }
        return false;
    }

    //选择搜索引擎点击事件
    $(document).on('click',function(e){
        if($(".search-engine").is(":hidden") && $(".se").is(e.target)){
            if ($(".se").is(e.target)) {
                seList();
                $(".search-engine").show();
            }
        }else{
            if (!$(".search-engine").is(e.target) && $(".search-engine").has(e.target).length === 0) {
                $(".search-engine").hide();
            }
        }
    });

    //搜索引擎列表点击
    $(".search-engine-list").on("click",".se-li",function(){
        var url = $(this).attr('url');
        var name = $(this).attr('name');
        var img = $(this).attr('img');
        $(".search").attr("action",url);
        $(".wd").attr("name",name);
        $(".se").attr("src",img);
        $(".search-engine").hide();
    });

    //菜单点击
    $("#menu").click(function(event) {
        $(this).toggleClass('on');
        $(".side").toggleClass('closed');
    });
    $("#content").click(function(event) {
        $(".on").removeClass('on');
        $(".side").addClass('closed');
    });

    // 侧栏标签卡切换
    $(".side").rTabs({
        bind: 'click',
        animation: 'left'
    });

    //修改默认搜索引擎
    $(".se_list_table").on("click",".set_se_default",function(){
        var name = $(this).val();
        Cookies.set('se_default', name, { expires: 36500 });
        setSeInit();
    });

    //获得默认搜索引擎
    function getSeDefault(){
        var se_default = Cookies.get('se_default');
        return se_default?se_default:1;
    }

    //搜索框数据加载
    function searchData() {
        var se_default =getSeDefault();
        var se_list = getSeList();
        var defaultSe = se_list[se_default];
        if (defaultSe){
            $("#search").attr("action", defaultSe["url"]);
            $(".se").attr("src", defaultSe["img"]);
            $(".wd").attr("name", defaultSe["name"]);
        }

    }

    //搜索引擎列表加载
    function seList() {
        var html = "";
        var se_list = getSeList();
        for(var i in se_list){
            html+="<li class='se-li' url='"+se_list[i]["url"]+"' name='"+se_list[i]["name"]+"' img='"+se_list[i]["img"]+"'><img src='"+se_list[i]["img"]+"'></img>"+se_list[i]["title"]+"</li>";
        }
        $(".search-engine-list").html(html);
    }

    //设置-搜索引擎列表加载
    function setSeInit () {
        var se_default = getSeDefault();
        var se_list  = getSeList();
        var html = "";
        for(var i in se_list){
            var tr = "<tr><td></td>";
            if(i == se_default){
                tr ="<tr><td><span class='iconfont iconhome'></span></td>";
            }
            tr += "<td>"+i+". "+ se_list[i]["title"] +"</td><td><button class='set_se_default' value='"+i+"'><span class='iconfont iconstrore-add'></span></button><button class='edit_se' value='"+i+"'><span class='iconfont iconbook-edit'></span></button> <button class='delete_se' value='"+i+"'><span class='iconfont icondelete'></span></button></td></tr>";
            html+=tr;
        }
        $(".se_list_table").html(html);
    }

    //搜索引擎添加
    $(".set_se_list_add").click(function () {
        $(".se_add_content input").val("");
        $(".se_add_content").show();
    });

    //搜索引擎保存
    $(".se_add_save").click(function () {
        var key_inhere = $(".se_add_content input[name='key_inhere']").val();
        var key = $(".se_add_content input[name='key']").val();
        var title = $(".se_add_content input[name='title']").val();
        var url = $(".se_add_content input[name='url']").val();
        var name = $(".se_add_content input[name='name']").val();
        var img = $(".se_add_content input[name='img']").val();

        var num = /^\+?[1-9][0-9]*$/;
        if (!num.test(key)){
            alert("顺序："+key+" 不是正数数！");
            return;
        }

        var se_list = getSeList();

        if (se_list[key]) {
            alert("顺序:"+key+" 已有数据，不可用");
            return;
        }

        if (key_inhere && key != key_inhere) {
            delete se_list[key_inhere];
        }

        se_list[key] = {
            title: title,
            url: url,
            name: name,
            img: img,
        };
        setSeList(se_list);
        setSeInit();
        $(".se_add_content").hide();

    });

    //关闭表单
    $(".se_add_cancel").click(function () {
        $(".se_add_content").hide();
    });

    //搜索引擎修改
    $(".se_list").on("click",".edit_se",function(){

        var se_list = getSeList();
        var key = $(this).val();
        $(".se_add_content input[name='key_inhere']").val(key);
        $(".se_add_content input[name='key']").val(key);
        $(".se_add_content input[name='title']").val(se_list[key]["title"]);
        $(".se_add_content input[name='url']").val(se_list[key]["url"]);
        $(".se_add_content input[name='name']").val(se_list[key]["name"]);
        $(".se_add_content input[name='img']").val(se_list[key]["img"]);

        $(".se_add_content").show();
    });

    //搜索引擎删除
    $(".se_list").on("click",".delete_se",function(){
        var se_default = getSeDefault();
        var key = $(this).val();
        if (key==se_default){
            alert("默认搜索引擎不可删除！");
        } else {
            var r = confirm("顺序 "+key+" 是否删除！");
            if (r) {
                var se_list = getSeList();
                delete se_list[key];
                setSeList(se_list);
                setSeInit();
            }
        }
    });

    //恢复预设搜索引擎
    $(".set_se_list_preinstall").click(function () {
         var r=confirm("现有设置和数据将被清空！");
         if (r) {
             setSeList (se_list_preinstall);
             Cookies.set('se_default', 1, { expires: 36500 });
             setSeInit();
         }
    });

    //获取快捷方式列表
    function getQuickList() {
        var quick_list_local = Cookies.get('quick_list');
        if (quick_list_local !== "{}" && quick_list_local) {
            return JSON.parse(quick_list_local);
        } else {
            setQuickList(quick_list_preinstall);
            return quick_list_preinstall;
        }
    }

    //设置快捷方式列表
    function setQuickList(quick_list) {
        if(quick_list){
           Cookies.set('quick_list', quick_list, {expires: 36500});
           return true;
        }
        return false;
    }

    //快捷方式数据加载
    function quickData() {
        var html = "";
        var quick_list = getQuickList();
        for (var i in quick_list) {
            html += "<li class='quick' target='_blank' title='"+quick_list[i]['explain']+"'>\
                        <a href='"+quick_list[i]['url']+"'>\
                            <i style='background-image: url("+quick_list[i]['img']+");'></i>\
                            "+quick_list[i]['title']+"\
                        </a>\
                     </li>";
        }
        $(".quick-ul").html(html);
    }

    //设置-快捷方式加载
    function setQuickInit () {

        var quick_list  = getQuickList();
        var html = "";
        for(var i in quick_list){
            tr ="<tr>\
                    <td>"+i+".&nbsp;</td>\
                    <td>"+quick_list[i]['title']+"</td>\
                    <td>\
                        <button class='edit_quick' value='"+i+"'><span class='iconfont iconbook-edit'></span></button>\
                        &nbsp;\
                        <button class='delete_quick' value='"+i+"'><span class='iconfont icondelete'></span></button>\
                    </td>\
                </tr>";
            html+=tr;
        }
        $(".quick_list_table").html(html);
    }

    //设置-快捷方式添加
    $(".set_quick_list_add").click(function () {
        $(".quick_add_content input").val("");
        $(".quick_add_content").show();
    });

    //设置-快捷方式保存
    $(".quick_add_save").click(function () {
        var key_inhere = $(".quick_add_content input[name='key_inhere']").val();
        var key = $(".quick_add_content input[name='key']").val();
        var title = $(".quick_add_content input[name='title']").val();
        var url = $(".quick_add_content input[name='url']").val();
        var img = $(".quick_add_content input[name='img']").val();

        var num = /^\+?[1-9][0-9]*$/;
        if (!num.test(key)){
            alert("顺序："+key+" 不是正数数！");
            return;
        }

        var quick_list = getQuickList();

        if (quick_list[key]) {
            alert("顺序:"+key+" 已有数据，不可用");
            return;
        }

        if (key_inhere && key != key_inhere) {
            delete quick_list[key_inhere];
        }

        quick_list[key] = {
            title: title,
            url: url,
            img: img,
        };
        setQuickList(quick_list);
        setQuickInit();
        $(".quick_add_content").hide();
    });

    //设置-快捷方式关闭添加表单
    $(".quick_add_cancel").click(function () {
        $(".quick_add_content").hide();
    });

    //恢复预设快捷方式
    $(".set_quick_list_preinstall").click(function () {
         var r=confirm("现有设置和数据将被清空！");
         if (r) {
             setQuickList (quick_list_preinstall);
             setQuickInit();
         }
    });

    //快捷方式修改
    $(".quick_list").on("click",".edit_quick",function(){

        var quick_list = getQuickList();
        var key = $(this).val();
        $(".quick_add_content input[name='key_inhere']").val(key);
        $(".quick_add_content input[name='key']").val(key);
        $(".quick_add_content input[name='title']").val(quick_list[key]["title"]);
        $(".quick_add_content input[name='url']").val(quick_list[key]["url"]);
        $(".quick_add_content input[name='img']").val(quick_list[key]["img"]);

        $(".quick_add_content").show();
    });

    //快捷方式删除
    $(".quick_list").on("click",".delete_quick",function(){

        var key = $(this).val();

        var r = confirm("顺序 "+key+" 是否删除！");
        if (r) {
            var quick_list = getQuickList();
            delete quick_list[key];
            setQuickList(quick_list);
            setQuickInit();
        }
    });

    //我的数据导出
    $("#my_data_out").click(function () {
        var se = getSeList();
        var se_default = getSeDefault();
        var quick = getQuickList();

        var mydata = {"se":se,"se_default":se_default,"quick":quick};
        var json = JSON.stringify(mydata);
        $("#data_txt").val(json);
    });

    //我的数据导入
    $("#my_data_in").click(function () {
        var json = $("#data_txt").val();

        //json 格式校验
        try {
            var mydata = JSON.parse(json);
        } catch (e) {
            alert("数据解析异常");
            black;
        }
        if (typeof mydata != 'object') {
            alert("数据格式错误");
            black;
        }

        if(confirm("当前数据将被覆盖！是否继续导入？")){
            setSeList(mydata["se"]);
            if (mydata["se_default"]) {
                Cookies.set('se_default', mydata["se_default"], {expires: 36500});
            }
            setQuickList(mydata["quick"]);

            searchData();
            quickData();
            setSeInit();
            setQuickInit();

            alert("导入成功");
        }

    });
});
