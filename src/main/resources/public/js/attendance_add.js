function initDateInput() {
			$("#start_date,#end_date").datepicker({
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

            		    $('#class').attr("placeholder",$.i18n.prop('classno'));
            		    $('#student_id').attr("placeholder",$.i18n.prop('student_id'));

            		    $('#event').attr("placeholder",$.i18n.prop('event_name'));
            		    $('#start_date').attr("placeholder",$.i18n.prop('start_date2'));
            		    $('#end_date').attr("placeholder",$.i18n.prop('end_date'));

            		    $('#submit_btn').html($.i18n.prop('submit'));
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
                    $("#class").empty();
                    $("#class").append("<option value=''>"+$.i18n.prop("please_select_classno")+"</option>");
                    for(var k=0;k<msg.length;k++){
                        $("#class").append("<option value='"+msg[k]+"'>"+msg[k]+"</option>");
                    }
                    return;
                }
        });
 }

 function changeClass(){
	 searchClassno();
	
//    document.getElementById('class').value = document.getElementById('class0').options[document.getElementById('class0').selectedIndex].value;
 }



    var events=[];
    var event_id=null;
    function getEvents(){
           $.ajax({ 'async': true,
                   'url': '/attendance/getEventList',
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
                       events=[];
                       $("#event0").empty();
                       $("#event0").append("<option value=''></option>");
                       for(var k=0;k<msg.length;k++){
                            events[msg[k].id]=msg[k];
                           $("#event0").append("<option value='"+msg[k].id+"'>"+msg[k].name+"</option>");
                       }
                       return;
                   }
           });
    }

    function changeEvent(){
        event_id=document.getElementById('event0').options[document.getElementById('event0').selectedIndex].value;
        document.getElementById('event').value = document.getElementById('event0').options[document.getElementById('event0').selectedIndex].text;
        if(event_id){
        	$("#start_date").val(events[event_id].start_date);
            $("#end_date").val(events[event_id].end_date);
        }
        else{
        	$("#start_date").val("");
        	$("#end_date").val("");
        }
        
        searchClassno();

    }

    function inputEvent(){
        event_id=null;
        $("#start_date").val("");
        $("#end_date").val("");
        
        searchClassno();

    }


function clearAll(){;
     $("#class").val("");
     $("#event").val("");
     $("#start_date").val("");
     $("#end_date").val("");

     attendancesArr=[];
     jQuery("#attendancesTable").clearGridData();
     jQuery("#attendancesTable").jqGrid('setGridParam', {data: attendancesArr}).trigger('reloadGrid');

//    getClassnos();
    getEvents();
    
    searchClassno();

}



function searchClassno(){
    var classno=$("#class").val();
    if(!classno){
    	attendancesArr=[];
        jQuery("#attendancesTable").clearGridData();
        jQuery("#attendancesTable").jqGrid('setGridParam', {data: attendancesArr}).trigger('reloadGrid');
        return;
    }
//    alert(classno);
//    http://localhost:8080/student/queryStudentsAdv?classno=F1502&rows=3&page=2&sidx=id&sord=desc

    $.ajax({ 'async': true,
                       'url': '/student/queryStudentsAdv',
                       'type': 'get',
                       'data': {classno:classno,rows:1000,page:1,sidx:"student_id",sord:"asc"},
                       'datatype': 'html',
                       'timeout': 30000,
                       'error': function (msg) {
                           //alert(JSON.stringify(msg)); 
 				 alert($.i18n.prop('system_error'));
                           return;
                       },
                       'success': function (msg) {
                           attendancesArr=msg.rows;
                           for(var k=0;k<attendancesArr.length;k++){
                                attendancesArr[k].state=1;
                           }
//                           jQuery("#attendancesTable").clearGridData();
//                           jQuery("#attendancesTable").jqGrid('setGridParam', {data: attendancesArr}).trigger('reloadGrid');
                           //!!!!!!!!!important!!!!!!!!!!!!
                           searchClassnoEvent();
                           return;
                       }
     });
}

var lastClassno=null;
var isNoRealData=0;
//http://localhost:8080/attendance/queryExistedAttendances?classno=M1303&event_id=38
function searchClassnoEvent(){
	var classno=$("#class").val();
	if(classno && event_id){
		$.ajax({ 'async': true,
            'url': '/attendance/queryExistedAttendances',
            'type': 'get',
            'data': {classno:classno,event_id:event_id},
            'datatype': 'html',
            'timeout': 30000,
            'error': function (msg) {
                //alert(JSON.stringify(msg)); 
 				 alert($.i18n.prop('system_error'));
                return;
            },
            'success': function (msg) {

                if(lastClassno==classno && (!msg||msg.length==0) && (isNoRealData==1)){
                      return;
                }

            	for(var n=0;n<msg.length;n++){
            		for(var k=0;k<attendancesArr.length;k++){
            			if(attendancesArr[k].student_id==msg[n].student_id){
            				attendancesArr[k].state=msg[n].state;
            				attendancesArr[k].remark=msg[n].remark;
            				break;
            			}
            		}
                }
                jQuery("#attendancesTable").clearGridData();
                jQuery("#attendancesTable").jqGrid('setGridParam', {data: attendancesArr}).trigger('reloadGrid');

                if((!msg||msg.length==0)&&(classno)){
                     isNoRealData=1;
                }
                else{
                     isNoRealData=0;
                }
                lastClassno=classno;

                return;
            }
		});
	}
	else if(classno){
    	    if(lastClassno==classno && (isNoRealData==1)){
                  return;
            }
            
            jQuery("#attendancesTable").clearGridData();
            jQuery("#attendancesTable").jqGrid('setGridParam', {data: attendancesArr}).trigger('reloadGrid');

            isNoRealData=1;
            lastClassno=classno;
            return;
    }
}

var attendancesArr=[];
var lastsel3=null;
function initialTable(){
    lastClassno=null;
    isNoRealData=0;
    lastsel3=null;
    $("#tb_dv").empty();
	$("#tb_dv").html("<table id='attendancesTable'></table> <div id='attendancesDiv'></div>");
    jQuery("#attendancesTable").jqGrid({
                datatype: "local",
                height: 550,
                width: $("#tb_dv").width()*0.95,
//                width:  820,
    //            autowidth: true,
    //            shrinkToFit: true,
                colNames: [
                    $.i18n.prop('student_id'),
                    $.i18n.prop('name'),
                    $.i18n.prop('sex'),
                    $.i18n.prop('birthday'),
                    $.i18n.prop('state'),
                    $.i18n.prop('remark'),
                ],
                colModel: [
                    {name: 'student_id', index: 'student_id'},
                    {name: 'name', index: 'name'},
                    {name: 'sex', index: 'sex', formatter: 'select', edittype: "select",  editoptions: {value: ":;true:"+$.i18n.prop('male')+";false:"+$.i18n.prop('female')}},
                    {name: 'birthday', index: 'birthday'},
                    {name: 'state', index: 'state', editable: true,formatter: 'select', edittype: "select", editoptions: {value:
                                                                                                                                "0:"+$.i18n.prop('no_need')+
                                                                                                                                ";1:"+$.i18n.prop('on_time')+
                                                                                                                                ";2:"+$.i18n.prop('late')+
                                                                                                                                ";3:"+$.i18n.prop('uncome')+
                                                                                                                                ";4:"+$.i18n.prop('leave_early')
                                                                                                                           }},
                    {name: 'remark', index: 'remark', editable: true}
                ],
                rowNum: 80,
        		rowList: [30, 80, 150],
                pager: '#attendancesDiv',
//                viewrecords: true,
//                sortname: 'student_id',
//                sortorder: "asc",
                caption: "",
//                fitColumns: true,
                editurl: 'clientArray',
        //            cellEdit:true,
        //            cellsubmit:'clientArray',
                onSelectRow: function (id) {
        //                var id = $("#attendancesTable").jqGrid('getGridParam', "selrow");
        //                alert(id);
                    if(id && id!==lastsel3){
                         if(lastsel3 || lastsel3==0) jQuery('#attendancesTable').jqGrid('saveRow',lastsel3);
                         jQuery('#attendancesTable').jqGrid('editRow',id);
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
////                addParams: { useFormatter: false },
//                add: false,
//                edit: true,
//                save: true,
//                cancel: true,
//                del: false
//            };
//                jQuery("#attendancesTable").jqGrid('navGrid', '#attendancesDiv', {search:false});
//            jQuery("#attendancesTable").jqGrid('navGrid', "#attendancesDiv", {search: false, refresh: false, edit: false, add: false, del: false}).navButtonAdd('#attendancesDiv', {
//                caption: "",
//                buttonicon: "ui-icon-trash",
//                onClickButton: function () {
//                    var id = $("#attendancesTable").jqGrid('getGridParam', "selrow");
//                    if (id == null) {
//                                             alert($.i18n.prop('please_select_data'));
//                                             return;
//                    }
//                    else {
//                        var r=confirm($.i18n.prop('please_confirm_delete'))
//                        if (r==true)
//                        {
//                            $("#attendancesTable").jqGrid("delRowData", id);
//                        }
//                        else
//                        {
//                            return;
//                        }
//                    }
//                },
//                position: "last"
//            });
//            jQuery("#attendancesTable").jqGrid('inlineNav', "#attendancesDiv", inlineparams);
//            jQuery("#attendancesTable").jqGrid('navGrid', "#gradesDiv", {search: false, edit: false, add: false, del: false})
            jQuery("#attendancesTable").jqGrid('navGrid', "#attendancesDiv", {search: false, edit: false, add: false, del: false,refresh:false});
            jQuery("#attendancesTable").jqGrid('setGridParam', {data: attendancesArr}).trigger('reloadGrid');
}

function addAttendances(){
    if(lastsel3 || lastsel3==0) jQuery('#attendancesTable').jqGrid('saveRow',lastsel3);
    lastsel3=null;

	var classno=$("#class").val();
    var name=$("#event").val();
    var start_date=$("#start_date").val();
    var end_date=$("#end_date").val();
    
    if(!classno){
    	alert($.i18n.prop("please_select_a_classno"));
    	return;
    }

    if(!name){
    	alert($.i18n.prop("please_select_or_input_event"));
    	return;
    }
    if(!start_date){
    	alert($.i18n.prop("please_input_event_start_date_or_select_event"));
    	return;
    }
    if(!end_date){
    	alert($.i18n.prop("please_input_event_end_date_or_select_event"));
    	return;
    }

    var options={
                         name:name,
                         start_date:start_date,
                         end_date:end_date,
                         event_id:event_id
         }

    attendancesArr=jQuery("#attendancesTable").jqGrid('getGridParam', 'data');
//    alert(JSON.stringify(options));
//    alert(JSON.stringify(attendancesArr));

    var url='/attendance/addAttendances?';
    for(var k=0;k<attendancesArr.length;k++){
        var x=attendancesArr[k];
        url+="student_ids="+x["student_id"]+"&";
        url+="states="+x["state"]+"&";
        url+="remarks="+(x["remark"]?x["remark"]:"@")+"&";
    }
//    alert(url);

    $.ajax({ 'async': true,
                            'url': url,
                            'type': 'get',
                            'data': options,
                            'datatype': 'html',
                            'timeout': 120000,
                            'error': function (msg) {
                            	$('.canvasLoader').hide();
                            	alert($.i18n.prop("F"));
                                return;
                            },
                            'success': function (msg) {
                            	$('.canvasLoader').hide();
                                alert($.i18n.prop(msg[0]));
                                if(msg[0]=="S"){
                                    clearAll();
                                }
                                return;
                            }
                    });
}


function InitLoadingSpinner(){
    var $loading = $('.canvasLoader').hide();
            $(document)
              .ajaxStart(function () {
                $loading.show();
              })
              .ajaxStop(function () {
                $loading.hide();
    });

    jQuery(function ($) {
                "use strict";

                /**
                 * If canvas loader is bound to an element, then it will be displayed as an overlay and pending in the
                 * element middle.
                 */
                var element = $('<div></div>').css({
                }).appendTo('body');

                /**
                 * If canvas loader is bound to the body element, then it will be displayed as an overlay which covers
                 * the hole screen and stays fixed while body element is scrolling.
                 */
    //            element = $('body');

                /**
                 * Initial display canvas loader
                 */
                element.canvasLoader({
                    color: '#ff0000'
                });

                /**
                 * Remove canvas loader on the origin instance
                 */
                element.canvasLoader(false);

                /**
                 * Reactivate canvas loader on the origin instance
                 */
                element.canvasLoader(true);

                /**
                 * Remove canvas loader by event if the origin instance is not available
                 */
                $(element).trigger('stop.canvasLoader');

                /**
                 * Manipulate options of current canvas loader instance
                 */
                element.canvasLoader.options.color='#008000';

                /**
                 * Reactivate canvas loader by event if the origin instance is not available
                 */
                $(element).trigger('start.canvasLoader');

                /**
                 * Manipulate default options
                 */
                $.fn.canvasLoader.options.color = '#0000ff';

                /**
                 * Get current version.
                 * @type {string}
                 */
                var version = $.fn.canvasLoader.version;

            });
}

function initialSelect(){
        getClassnos();
    	getEvents();
}

$(function(){

    	initDateInput();
//    	loadProperties();
//    	loadProperties2();
//
//    	initialSelect();
//
//    	initialTable();
    	InitLoadingSpinner();

});