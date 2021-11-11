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
//	jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
//		name:'strings', //资源文件名称
//		path:'http://localhost:8080/asset/i18n/', //资源文件路径
//		mode:'map', //用Map的方式使用资源文件中的值
////		language: 'zh-CN',
//		language:lang,
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

            		    $('#class_input_').attr("placeholder",$.i18n.prop('classno'));
            		    $('#student_id').attr("placeholder",$.i18n.prop('student_id'));

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
    document.getElementById('class_input_').value = document.getElementById('class0').options[document.getElementById('class0').selectedIndex].value;
 }

function clearAll(){
     $("#name").val("");
        $("#telephone").val("");
        $("#birthday").val("");
        $("#location").val("");
        $("#class").val("");
        $("#email").val("");
//        $("#class_input_").val("");
         $("input[name='sex']").get(0).checked=true;

        guardiansArr=[];
        jQuery("#guardiansTable").clearGridData();
        jQuery("#guardiansTable").jqGrid('setGridParam', {data: guardiansArr}).trigger('reloadGrid');

//        getClassnos();
}

function searchStudent(){
	if(!$("#student_id").val()){
		alert($.i18n.prop('please_input_studentid_info'));
		return;
	}
	
    clearAll();
    $.ajax({ 'async': true,
            'url': '/student/queryStudentDetail',
            'type': 'get',
            'data': {id: $("#student_id").val()},
            'datatype': 'html',
            'timeout': 30000,
            'error': function (msg) {
            	alert($.i18n.prop('found_nothing'));
                return;
            },
            'success': function (msg) {

                 $.ajax({ 'async': true,
                             'url': '/student/queryStudentGuardians',
                             'type': 'get',
                             'data': {id: $("#student_id").val()},
                             'datatype': 'html',
                             'timeout': 30000,
                             'error': function (msg) {
                                 //alert(JSON.stringify(msg)); 
 				 alert($.i18n.prop('system_error'));
                                 return;
                             },
                             'success': function (msg2) {
                                  $("#name").val(msg.name);
                                  $("#email").val(msg.email);
                                  $("#telephone").val(msg.telephone);
                                  $("#birthday").val(msg.birthday);
                                  $("#location").val(msg.location);
                                  $("input[name='sex']").get(0).checked=msg.sex==true;
                                  $("input[name='sex']").get(1).checked=msg.sex==false;
                                  $("#class").val(msg.classno);

                                  guardiansArr=msg2;
                                  jQuery("#guardiansTable").clearGridData();
                                  jQuery("#guardiansTable").jqGrid('setGridParam', {data: guardiansArr}).trigger('reloadGrid');

                                 return;
                             }
                     });
                return;
            }
    });
}

function searchClassno(id){
    var classno=$("#class_input_"+id.substring(10,id.length)).val();
//    alert(classno);

    if(!classno){
    	$("#students_dv").attr("style","display:none");
    	$("#message_lb").attr("style","");
		$("#message_lb").html($.i18n.prop('please_select_classno_info'));
		$("#studentsModal").attr("style","top: 100px; opacity: 1; visibility: visible;margin-left:20%");
		return;
	}
    else{
		$("#students_dv").attr("style","");
    	$("#message_lb").attr("style","display:none");
    	$("#studentsModal").attr("style","top: 100px; opacity: 1; visibility: visible");
	}
    
    $("#studentsTable").jqGrid('setGridParam', { url: '/student/queryStudentsAdv?classno=' + classno}).trigger('reloadGrid');
}

var guardiansArr=[];
var lastsel3=null;
function initialGuardianTable(){
    lastsel3=null;
    $("#tb_dv").empty();
    $("#tb_dv").html("<table id='guardiansTable'></table> <div id='guardiansDiv'></div>");
    jQuery("#guardiansTable").jqGrid({
                datatype: "local",
                height: 250,
                width: $("#tb_dv").width()*0.95,
//                width:  820,
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
//                viewrecords: true,
//                sortname: 'COLOR',
//                sortorder: "asc",
                caption: "",
//                fitColumns: true,
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
//            var inlineparams = {
//                addParams: { useFormatter: false },
//                add: true,
//                edit: true,
//                save: true,
//                cancel: true,
//                del: true
//            };
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
//            jQuery("#guardiansTable").jqGrid('inlineNav', "#guardiansDiv", inlineparams);
            jQuery("#guardiansTable").jqGrid('setGridParam', {data: guardiansArr}).trigger('reloadGrid');
}

function initialStudentTable(){
    $("#tb_dv2").empty();
    	$("#tb_dv2").html("<table id='studentsTable'></table> <div id='studentsDiv'></div>");
    jQuery("#studentsTable").jqGrid({
                url: null,
                datatype: "json",
                height: 260,
                width: $(window).width()*0.6,
//                width: 1200,
//                autowidth: true,
//                shrinkToFit: true,
                colNames: [
                     $.i18n.prop('student_id'),
                     $.i18n.prop('name'),
                     $.i18n.prop('sex'),
                     $.i18n.prop('birthday')
//                     $.i18n.prop('telephone'),
//                     $.i18n.prop('email'),
//                     $.i18n.prop('location'),
//                     $.i18n.prop('title'),
//                     $.i18n.prop('subject')
//                     $.i18n.prop('is_advisor'),
//                     $.i18n.prop('start_date'),
//                     $.i18n.prop('contract_date')
                ],
                colModel: [
                    {name: 'student_id', index: 'student_id'},
                    {name: 'name', index: 'name'},
                    {name: 'sex', index: 'sex', formatter: 'select', edittype: "select", editoptions: {value: ":;true:"+$.i18n.prop('male')+";false:"+$.i18n.prop('female')}},
                    {name: 'birthday', index: 'birthday',formatter:dateFormat}
//                    {name: 'telephone', index: 'telephone'},
//                    {name: 'email', index: 'email'},
//                    {name: 'location', index: 'location',align:'center', width:80 ,sortable: false},
//                    {name: 'title', index: 'title'},
//                    {name: 'subject', index: 'subject'},
//                    {name: 'is_advisor', index: 'is_advisor', formatter: 'select', edittype: "select", editoptions: {value: "0:未支付;4:已支付;5:已支付;6:已支付;7:已支付;8:交易成功;9:交易关闭;10:交易关闭;11:交易关闭;12:交易关闭;13:交易关闭"}},
//                    {name: 'start_date', index: 'start_date',formatter:dateFormat},
//                    {name: 'contract_date', index: 'contract_date',formatter:dateFormat}
                ],
                rowNum: 30,
                rowList: [10, 30, 50],
                pager: '#studentsDiv',
                viewrecords: true,
                sortname: 'student_id',
                sortorder: "desc",
                caption: "",
                fitColumns: true,
                editurl: 'clientArray',
                onSelectRow: function () {
                    var id = $("#studentsTable").jqGrid('getGridParam', "selrow");
                    var obj = $("#studentsTable").jqGrid('getRowData', id);
                    var studentid=obj.student_id;
                    $("#student_id").val(studentid);
                    searchStudent();
                    $("#studentsModal").trigger('reveal:close')
                },
                onSelectAll: function () {

                },
                loadComplete: function () {

                },
                gridComplete: function () {

                }
            });
            jQuery("#studentsTable").jqGrid('navGrid', "#studentsDiv", {search: false, edit: false, add: false, del: false})
            jQuery("#studentsTable").jqGrid('setGridParam', {data: []}).trigger('reloadGrid');
}

function initialTable(){
	initialGuardianTable();
	initialStudentTable();
}

function initialSelect(){
    getClassnos();
}

$(function(){


    	initDateInput();
//    	loadProperties();
//    	loadProperties2();
//
//    	initialSelect();
//
//    	initialTable();
});