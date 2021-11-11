
function loadProperties(lang){
    	jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
    		name:'strings', //资源文件名称
    		path:'http://localhost:8080/asset/i18n/', //资源文件路径
    		mode:'map', //用Map的方式使用资源文件中的值
//    		language:'zh-CN',
    		language:lang,
    		callback: function() {//加载成功后设置显示内容
    			
    		}
    	});

                        $('title').html($.i18n.prop('XRoster'));
    	                $('#default_opt').html($.i18n.prop('default'));
            		    $('#welcome').html($.i18n.prop('welcome'));
            		    $('#teacher_info').html($.i18n.prop('teacher_info'));
            		    $('#student_info').html($.i18n.prop('student_info'));
            		    $('#grade_management').html($.i18n.prop('grade_management'));
            		    $('#attendance_management').html($.i18n.prop('attendance_management'));
            		    $('#grade_analysis').html($.i18n.prop('grade_analysis'));
            		    $('#attendance_statistics').html($.i18n.prop('attendance_statistics'));
            		    $('#logout').html($.i18n.prop('logout'));

            		    $('#email').attr("placeholder",$.i18n.prop('your_email'));
                        $('#password').attr("placeholder",$.i18n.prop('your_password'));
                        $('#login_bt').html($.i18n.prop('login'));
                        $('#forget').html($.i18n.prop('forget'));

                        $('#account_manage').html($.i18n.prop('account_manage'));
                        $('#account_reset').html($.i18n.prop('account_reset'));
                        $('#account_management').html($.i18n.prop('account_management'));

            		    $('#attendance_add').html($.i18n.prop('attendance_add'));
                        $('#attendance_query').html($.i18n.prop('attendance_query'));
                        $('#custom_import').html($.i18n.prop('custom_import'));
                        $('#grade_add').html($.i18n.prop('grade_add'));
                        $('#grade_query').html($.i18n.prop('grade_query'));
                        $('#gradesub_add').html($.i18n.prop('gradesub_add'));
                        $('#gradesub_query').html($.i18n.prop('gradesub_query'));
                        $('#student_add').html($.i18n.prop('student_add'));
                        $('#student_query').html($.i18n.prop('student_query'));
                        $('#student_import').html($.i18n.prop('student_import'));
                        $('#teacher_add').html($.i18n.prop('teacher_add'));
                        $('#teacher_query').html($.i18n.prop('teacher_query'));

                        $('#analysis_table').html($.i18n.prop('analysis_table'));
                        $('#analysis_table_class').html($.i18n.prop('analysis_table_class'));
                         $('#analysis_tablesub').html($.i18n.prop('analysis_tablesub'));
                        $('#analysis_stage').html($.i18n.prop('analysis_stage'));
                        $('#analysis_stage_class').html($.i18n.prop('analysis_stage_class'));
                        $('#analysis_mark').html($.i18n.prop('analysis_mark'));
                        $('#analysis_mark_class').html($.i18n.prop('analysis_mark_class'));
                        $('#analysis_rank').html($.i18n.prop('analysis_rank'));
                        $('#analysis_rank_class').html($.i18n.prop('analysis_rank_class'));
                        $('#analysis_personal_radar').html($.i18n.prop('analysis_personal_radar'));
                        $('#analysis_personal_radarsub').html($.i18n.prop('analysis_personal_radarsub'));

                        $('#statistics_attendance').html($.i18n.prop('statistics_attendance'));

                        $('#male_lb').html($.i18n.prop('male'));
                        $('#female_lb').html($.i18n.prop('female'));
                        $('#yes_lb').html($.i18n.prop('yes'));
                        $('#no_lb').html($.i18n.prop('no'));
    }



    function forgetPwd(){
        var email=$("#email").val();
        if(!email){
            alert($.i18n.prop('please_input_email'));
            return;
        }


        $.ajax({ 'async': true,
                                   'url': '/account/forgetAccount',
                                   'type': 'get',
                                   'data': {email:email},
                                   'datatype': 'html',
                                   'timeout': 30000,
                                   'error': function (msg) {
                                       //alert(JSON.stringify(msg));
//         				                alert($.i18n.prop('system_error'));
                                        alert($.i18n.prop('email_error'))
                                       return;
                                   },
                                   'success': function (msg) {
                                       if(msg=="S") alert($.i18n.prop('password_sendto_email'));
                                       else alert($.i18n.prop('system_error'));
                                       return;
                                   }
         });
    }

    Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1,                 //月份
                "d+": this.getDate(),                    //日
                "h+": this.getHours(),                   //小时
                "m+": this.getMinutes(),                 //分
                "s+": this.getSeconds(),                 //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

    function dateFormat(cellvalue, options, rowObject) {
                if (!cellvalue) return '';
                return new Date(cellvalue).Format("yyyy-MM-dd");
    }


//##############dynamic add jqgrid lang#################
function loadjscssfile(filename,filetype){
    if(filetype == "js"){
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);
    }else if(filetype == "css"){

        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);
    }
   if(typeof fileref != "undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }

}

//var baseLang;
//if (navigator.userLanguage) {
//     baseLang = navigator.userLanguage.substring(0,2).toLowerCase();
//}
//else {
//     baseLang = navigator.language.substring(0,2).toLowerCase();
//}
//loadjscssfile("http://localhost:8080/lib/jqgrid-5.1.0/js/i18n/grid.locale-"+baseLang+".js","js");


//$(function(){
//    var baseLang;
//    if (navigator.userLanguage) {
//         baseLang = navigator.userLanguage.substring(0,2).toLowerCase();
//    }
//    else {
//         baseLang = navigator.language.substring(0,2).toLowerCase();
//    }
//    loadjscssfile("http://localhost:8080/lib/jqgrid-5.1.0/js/i18n/grid.locale-"+baseLang+".js","js");
//})



//##############dynamic add jqgrid lang#################


function changeLang(){
//    alert("#########");
	var lang=document.getElementById('lang_select').options[document.getElementById('lang_select').selectedIndex].value;
//	alert (lang);
	var baseLang;
	if(navigator){
		if (navigator.userLanguage) {
	         baseLang = navigator.userLanguage.substring(0,2).toLowerCase();
	    }
	    else {
	         baseLang = navigator.language.substring(0,2).toLowerCase();
	    }
	}
	
	loadProperties(lang);

	try{ loadProperties2(lang);}catch(e){}

	
//	jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
//		name:'strings', //资源文件名称
//		language: lang,
//		path:'http://localhost:8080/asset/i18n/', //资源文件路径
//		mode:'map', //用Map的方式使用资源文件中的值
//		callback: function() {//加载成功后设置显示内容
//		}
//	});

	try{  initialSelect();}catch(e){}
	try{  initialTable();}catch(e){}

    for(var k=0;k<$("a").length;k++) {
        var url=$("a").eq(k).attr("href");
        if(url && url!="#"){
            var i=url.indexOf('?');
            if(i<0){
                if(lang){
                    url=url+"?lang="+lang;
                }
            }
            else{
                if(lang){
                    url=url.substring(0,i)+"?lang="+lang;
                }
                else{
                     url=url.substring(0,i);
                }
            }
        }
        $("a").eq(k).attr("href",url);
    }
    
    try{
    	if(lang=="cn"||lang=="zh"||lang=="zh_CN"||lang=="zh-CN"|| ((baseLang=="zh"||baseLang=="cn")&&!lang))
    		$("#index_header").attr("style","background-image: url('http://localhost:8080/image/XRoster_zh.png');background-size:196px;height:100px");
    	else
    		$("#index_header").attr("style","background-image: url('http://localhost:8080/image/XRoster.png');background-size:160px;height:100px");
    }catch(e){}
    
    try{
    	if(lang=="cn"||lang=="zh"||lang=="zh_CN"||lang=="zh-CN"|| ((baseLang=="zh"||baseLang=="cn")&&!lang))
    		$("#logo_a").html("<img src='http://localhost:8080/image/XRoster3_zh.png'/>");
    	else
    		$("#logo_a").html("<img src='http://localhost:8080/image/XRoster3.png'/>");
    }catch(e){}
}


//force async
//$(function(){
//	$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
//	    options.async = true;
//	});
//})
