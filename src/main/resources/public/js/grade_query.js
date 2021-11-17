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
//		path:'/asset/i18n/', //资源文件路径
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

            		    $('#exam').attr("placeholder",$.i18n.prop('exam_name'));
            		    $('#subject').attr("placeholder",$.i18n.prop('subject'))
            		    $('#start_date').attr("placeholder",$.i18n.prop('start_date2'));
            		    $('#end_date').attr("placeholder",$.i18n.prop('end_date'));

            		    $('#query_btn').html($.i18n.prop('query'));
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
//    document.getElementById('class').value = document.getElementById('class0').options[document.getElementById('class0').selectedIndex].value;
 }

  function getSubjects(){
         $.ajax({ 'async': true,
                 'url': '/grade/getSubjectList',
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
                     $("#subject0").empty();
                     $("#subject0").append("<option value=''></option>");
                     for(var k=0;k<msg.length;k++){
                         $("#subject0").append("<option value='"+msg[k]+"'>"+msg[k]+"</option>");
                     }
                     return;
                 }
         });
  }

  function changeSubject(){
         document.getElementById('subject').value = document.getElementById('subject0').options[document.getElementById('subject0').selectedIndex].value;
      }


    var exams=[];
    var exam_id=null;
    function getExams(){
           $.ajax({ 'async': true,
                   'url': '/grade/getExamList',
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
                       exams=[];
                       $("#exam0").empty();
                       $("#exam0").append("<option value=''></option>");
                       for(var k=0;k<msg.length;k++){
                            exams[msg[k].id]=msg[k];
                           $("#exam0").append("<option value='"+msg[k].id+"'>"+msg[k].name+"</option>");
                       }
                       return;
                   }
           });
    }

    function changeExam(){
        exam_id=document.getElementById('exam0').options[document.getElementById('exam0').selectedIndex].value;
        document.getElementById('exam').value = document.getElementById('exam0').options[document.getElementById('exam0').selectedIndex].text;
        $("#start_date").val(exams[exam_id].start_date);
        $("#end_date").val(exams[exam_id].end_date);
    }

    function inputExam(){
        exam_id=null;
        $("#start_date").val("");
        $("#end_date").val("");
    }


function clearAll(){;
//     $("#class").val("");
//     $("#exam").val("");
//     $("#start_date").val("");
//     $("#end_date").val("");
//     $("#subject").val("");

     gradesArr=[];
     jQuery("#gradesTable").clearGridData();
     jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');

    getClassnos();
    getSubjects();
    getExams();
}

var gradesArr=[];
function initialTable(){
    $("#tb_dv").empty();
	$("#tb_dv").html("<table id='gradesTable'></table> <div id='gradesDiv'></div>");
    jQuery("#gradesTable").jqGrid({
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
                    $.i18n.prop('point')
                ],
                colModel: [
                    {name: 'student_id', index: 'student_id'},
                    {name: 'name', index: 'name'},
                    {name: 'sex', index: 'sex', formatter: 'select', edittype: "select", editoptions: {value: ":;true:"+$.i18n.prop('male')+";false:"+$.i18n.prop('female')}},
                    {name: 'birthday', index: 'birthday'},
                    {name: 'point', index: 'point', editable: true}
                ],
                rowNum: 80,
        		rowList: [30, 80, 150],
                pager: '#gradesDiv',
                viewrecords: true,
                sortname: 'student_id',
                sortorder: "asc",
                caption: "",
                fitColumns: true,
                editurl: 'clientArray',
        //            cellEdit:true,
        //            cellsubmit:'clientArray',
                onSelectRow: function () {
        //                var id = $("#gradesTable").jqGrid('getGridParam', "selrow");
        //                alert(id);
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
//                jQuery("#gradesTable").jqGrid('navGrid', '#gradesDiv', {search:false});
//            jQuery("#gradesTable").jqGrid('navGrid', "#gradesDiv", {search: false, refresh: false, edit: false, add: false, del: false}).navButtonAdd('#gradesDiv', {
//                caption: "",
//                buttonicon: "ui-icon-trash",
//                onClickButton: function () {
//                    var id = $("#gradesTable").jqGrid('getGridParam', "selrow");
//                    if (id == null) {
//                                             alert($.i18n.prop('please_select_data'));
//                                             return;
//                    }
//                    else {
//                        var r=confirm($.i18n.prop('please_confirm_delete'))
//                        if (r==true)
//                        {
//                            $("#gradesTable").jqGrid("delRowData", id);
//                        }
//                        else
//                        {
//                            return;
//                        }
//                    }
//                },
//                position: "last"
//            });
            jQuery("#gradesTable").jqGrid('navGrid', "#gradesDiv", {search: true, edit: false, add: false, del: false})
            jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');
}


///grade/queryGrades?subject=math&exam_id=2&student_id=2&classno=F1510
function queryGrades(){
    var classno=$("#class").val();
    var subject=$("#subject").val();
    if(!classno){
    	alert($.i18n.prop("please_select_a_classno"));
    	return;
    }
    if(!subject){
    	alert($.i18n.prop("please_select_subject_name"));
    	return;
    }
    if(!exam_id){
    	alert($.i18n.prop("please_select_examid"));
    	return;
    }

    var options={   subject:subject,
                    classno:classno,
                    exam_id:exam_id
         }

//    clearAll();

    gradesArr=[];
         jQuery("#gradesTable").clearGridData();
         jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');

    $.ajax({ 'async': true,
                           'url': '/grade/queryGrades',
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
                               gradesArr=msg;
                               jQuery("#gradesTable").clearGridData();
                               jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');
                               return;
                           }
         });
}

function initialSelect(){
            getClassnos();
           	getSubjects();
           	getExams();
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