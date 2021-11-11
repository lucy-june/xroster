function initDateInput() {
			$("#birthday,#start_date,#contract_date").datepicker({
			showMonthAfterYear: true, // 月在年之后显示
			changeMonth: true,   // 允许选择月份
			changeYear: true,   // 允许选择年份
			dateFormat:'yy-mm-dd',  // 设置日期格式
			closeText:'关闭',   // 只有showButtonPanel: true才会显示出来
			duration: 'fast',
			showAnim:'fadeIn',
			//showOn:'button',   // 在输入框旁边显示按钮触发，默认为：focus。还可以设置为both
			//buttonImage: 'images/commons/calendar.gif',   // 按钮图标
			//buttonImageOnly: true,        // 不把图标显示在按钮上，即去掉按钮
			buttonText:'选择',
			showButtonPanel: true,
			showOtherMonths: true
			//appendText: '(yyyy-mm-dd)',
            });
}

function loadProperties2(lang){
//    	jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
//    		name:'strings', //资源文件名称
//    		path:'http://localhost:8080/asset/i18n/', //资源文件路径
//    		mode:'map', //用Map的方式使用资源文件中的值
////    		language: 'zh-CN',
//    		language:lang,
//    		callback: function() {//加载成功后设置显示内容
//
//    		}
//    	});
                $('#student_basic_info').html($.i18n.prop('student_basic_info'));
                $('#class_td').html($.i18n.prop('class'));
    		    $('#name_td').html($.i18n.prop('name'));
    		    $('#email_td').html($.i18n.prop('email'));
    		    $('#sex_td').html($.i18n.prop('sex'));
    		    $('#birthday_td').html($.i18n.prop('birthday'));
    		    $('#telephone_td').html($.i18n.prop('telephone'));
    		    $('#location_td').html($.i18n.prop('location'));
    		    $('#guardian_td').html($.i18n.prop('guardian'));
    		    $('relation').html($.i18n.prop('relation'));
                $('job_company').html($.i18n.prop('job_company'));
                $('job_title').html($.i18n.prop('job_title'));
                $('job_duty').html($.i18n.prop('job_duty'));

                $('#submit_btn').html($.i18n.prop('submit'));

                $('#class').attr("placeholder",$.i18n.prop('please_select_classno'));
                $('#name').attr("placeholder",$.i18n.prop('student_name'));
                $('#email').attr("placeholder",$.i18n.prop('student_email'));
                $('#birthday').attr("placeholder",$.i18n.prop('student_birthday'));
                $('#telephone').attr("placeholder",$.i18n.prop('student_telephone'));
                $('#location').attr("placeholder",$.i18n.prop('student_location'));
 }

 function getClassnos(){
        $.ajax({ 'async': true,
                        'url': '/student/getClassList',
                        'type': 'get',
                        'data': {},
                        'datatype': 'html',
                        'timeout': 30000,
                        'error': function (msg) {
                            //alert(JSON.stringify(msg)); 
 				 alert($.i18n.prop('system_error'));
                            return;
                        },
                        'success': function (msg) {
                            $("#class0").empty();
                            $("#class0").append("<option value=''></option>");
                            for(var k=0;k<msg.length;k++){
                                $("#class0").append("<option value='"+msg[k]+"'>"+msg[k]+"</option>");
                            }
                            return;
                        }
                });
 }

 function changeClass(){
    document.getElementById('class').value = document.getElementById('class0').options[document.getElementById('class0').selectedIndex].value;
 }

var classnos=[];




function emailFormatCheck(email){
    if ((email.length > 128) || (email.length < 6)) {
        return false;
    }
    var format = /^[A-Za-z0-9+]+[A-Za-z0-9\.\_\-+]*@([A-Za-z0-9\-]+\.)+[A-Za-z0-9]+$/;
    if (!email.match(format)) {
        return false;
    }
    return true;
}


function inputValidation(){
	var classno=$("#class").val();
    var name=$("#name").val();
    var email=$("#email").val();
    var birthday=$("#birthday").val();
    var telephone=$("#telephone").val();
    var location=$("#location").val();

    if(!classno){
    	alert($.i18n.prop('please_add_classno_info'));
    	return;
    }
    if(classno.length>10){
    	alert($.i18n.prop('classno_out_of_length'));
    	return;
    }
    if(!name){
    	alert($.i18n.prop('please_add_name_info'));
    	return;
    }
    if(name.length>16){
    	alert($.i18n.prop('name_out_of_length'));
    	return;
    }
    if(!email){
    	alert($.i18n.prop('please_add_email_info'));
    	return;
    }
    if(!emailFormatCheck(email)){
    	alert($.i18n.prop('wrong_format_email'));
    	return;
    }
    if(!email.length>32){
    	alert($.i18n.prop('email_out_of_length'));
    	return;
    }
    if(!birthday){
    	alert($.i18n.prop('please_add_birthday_info'));
    	return;
    }
    if(!telephone){
    	alert($.i18n.prop('please_add_telephone_info'));
    	return;
    }
    if(!/^[0-9]*$/.test(telephone)){
        alert($.i18n.prop('wrong_format_telephone'));
        return;
    }
    if(telephone.length>11){
    	alert($.i18n.prop('telephone_out_of_length'));
    	return;
    }
    if(!location){
    	alert($.i18n.prop('please_add_location_info'));
    	return;
    }
    if(location.length>32){
    	alert($.i18n.prop('location_out_of_length'));
    	return;
    }
    
    return true;
}

function addStudent(){
    if(lastsel3 || lastsel3==0) jQuery('#guardiansTable').jqGrid('saveRow',lastsel3);
    lastsel3=null;

	if(!inputValidation()){
		return;
	}
	
    var classno=$("#class").val();
    var name=$("#name").val();
//    var email=$("#email").val();
    var telephone=$("#telephone").val();
    var birthday=$("#birthday").val();
    var sex=$("input[name='sex']:checked").val()
    var location=$("#location").val();
    var email=$("#email").val();

    var options={   name:name,
                    telephone:telephone,
                    birthday:birthday,
                    location:location,
                    sex:sex,
                    classno:classno,
                    email:email
    }

    var guardiansArr=jQuery("#guardiansTable").jqGrid('getGridParam', 'data');
//    alert(JSON.stringify(options));
//    alert(JSON.stringify(guardiansArr));

    var url='/student/addStudent?';
    for(var k=0;k<guardiansArr.length;k++){
        var x=guardiansArr[k];
        if(!x["name"]){
        	alert($.i18n.prop('please_fill_guardian_name_info'));
        	return;
        }
        url+="names="+x["name"]+"&";
        url+="relations="+(x["relation"]?x["relation"]:"@")+"&";
        url+="telephones="+(x["telephone"]?x["telephone"]:"@")+"&";
        url+="birthdays="+(x["birthday"]?x["birthday"]:"@")+"&";
        url+="sexs="+(x["sex"]?x["sex"]:"@")+"&";
        url+="locations="+(x["location"]?x["location"]:"@")+"&";
        url+="job_companies="+(x["job_company"]?x["job_company"]:"@")+"&";
        url+="job_titles="+(x["job_title"]?x["job_title"]:"@")+"&";
        url+="job_duties="+(x["job_duty"]?x["job_duty"]:"@")+"&";
    }
    
//    alert(url);

    $.ajax({ 'async': true,
                            'url': url,
                            'type': 'get',
                            'data': options,
                            'datatype': 'html',
                            'timeout': 30000,
                            'error': function (msg) {
                                //alert(JSON.stringify(msg)); 
 				 alert($.i18n.prop('system_error'));
                                return;
                            },
                            'success': function (msg) {
                            	if(msg=="F")
                            		alert($.i18n.prop("F"));
                            	else{
                                    clearAll();
                                    alert($.i18n.prop("S")+", "+$.i18n.prop("student_id")+": "+msg);
                                }
                                return;
                            }
                    });
}

var guardiansArr=[];
var lastsel3=null;
//一定要添加id字段
function initialTable(){
    lastsel3=null;
	$("#tb_dv").empty();
	$("#tb_dv").html("<table id='guardiansTable'></table> <div id='guardiansDiv'></div>");
    jQuery("#guardiansTable").jqGrid({
            datatype: "local",
            height: 250,
            width: $("#tb_dv").width()*0.95,
//            width:  820,
//            autowidth: true,
//            shrinkToFit: true,
            colNames: [
                $.i18n.prop('name'),
                $.i18n.prop('relation'),
                $.i18n.prop('telephone'),
                $.i18n.prop('birthday'),
                $.i18n.prop('sex'),
                $.i18n.prop('location'),
                $.i18n.prop('job_company'),
                $.i18n.prop('job_title'),
                $.i18n.prop('job_duty')
            ],
            colModel: [
                {name: 'name', index: 'name', editable: true},
                {name: 'relation', index: 'relation', editable: true},
                {name: 'telephone', index: 'telephone', editable: true},

                {name: 'birthday', index: 'birthday', editable: true},
                {name: 'sex', index: 'sex', formatter: 'select', edittype: "select",  editable: true, editoptions: {value: ":;true:"+$.i18n.prop('male')+";false:"+$.i18n.prop('female')}},
//                {name: 'birthday', index: 'birthday', editable: true},
//                {name: 'sex', index: 'sex', editable: true,},
                {name: 'location', index: 'location', editable: true},
                {name: 'job_company', index: 'job_company', editable: true},
                {name: 'job_title', index: 'job_title', editable: true},
                {name: 'job_duty', index: 'job_duty', editable: true}
            ],
            rowNum: 30,
            rowList: [10, 30, 50],
            pager: '#guardiansDiv',
//            viewrecords: true,
//            sortname: 'COLOR',
//            sortorder: "asc",
            caption: "",
//            fitColumns: true,
            editurl: 'clientArray',
    //            cellEdit:true,
    //            cellsubmit:'clientArray',
            onSelectRow: function (id) {
    //                var id = $("#guardiansTable").jqGrid('getGridParam', "selrow");
    //                alert(id);
                if(id && id!==lastsel3){
                     if(lastsel3 || lastsel3==0) jQuery('#guardiansTable').jqGrid('saveRow',lastsel3);
                     jQuery('#guardiansTable').jqGrid('editRow',id);
                     lastsel3=id;
                }
            },
            onSelectAll: function () {
    
            },
            loadComplete: function () {
    
            },
            gridComplete: function () {
    
            }
        });
//        var inlineparams = {
////            addParams: { useFormatter: false },
//            add: true,
//            edit: true,
//            save: true,
//            cancel: false,
//            del: true
//        };
    //        jQuery("#guardiansTable").jqGrid('navGrid', '#guardiansDiv', {search:false});
        jQuery("#guardiansTable").jqGrid('navGrid', "#guardiansDiv", {search: false, refresh: false, edit: false, add: true, del: false}).navButtonAdd('#guardiansDiv', {
            caption: "",
            buttonicon: "ui-icon-trash",
            onClickButton: function () {
                var id = $("#guardiansTable").jqGrid('getGridParam', "selrow");
                if (id == null) {
                    alert($.i18n.prop('please_select_data'));
                    return;
                }
                else {
                    var r=confirm($.i18n.prop('please_confirm_delete'))
                    if (r==true)
                    {
                        $("#guardiansTable").jqGrid("delRowData", id);
                    }
                    else
                    {
                        return;
                    }
                }
            },
            position: "last"
        });
//        jQuery("#guardiansTable").jqGrid('inlineNav', "#guardiansDiv", inlineparams);
        jQuery("#guardiansTable").jqGrid('setGridParam', {data: guardiansArr}).trigger('reloadGrid');
}

function clearAll(){
    $("#name").val("");
    $("#email").val("");
    $("#telephone").val("");
    $("#birthday").val("");
    $("#location").val("");
    $("#class").val("");

    guardiansArr=[];
    jQuery("#guardiansTable").clearGridData();
    jQuery("#guardiansTable").jqGrid('setGridParam', {data: guardiansArr}).trigger('reloadGrid');

    getClassnos();
}


function initialSelect(){
    getClassnos();
}


$(function(){


    	initDateInput();
//    	loadProperties();
//    	loadProperties2();
//      initialSelect();
//    	initialTable();
    	
});