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

            		    $('#exam').attr("placeholder",$.i18n.prop('exam_name'));
            		    $('#subject').attr("placeholder",$.i18n.prop('subject'))
            		    $('#start_date').attr("placeholder",$.i18n.prop('start_date2'));
            		    $('#end_date').attr("placeholder",$.i18n.prop('end_date'));

            		    $('#query_btn').html($.i18n.prop('query'));
            		    $('#grade').attr("placeholder",$.i18n.prop('grade'));
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
                     $("#subject").empty();
                     $("#subject").append("<option value=''>"+$.i18n.prop('please_select_subject')+"</option>");
                     for(var k=0;k<msg.length;k++){
                         $("#subject").append("<option value='"+msg[k]+"'>"+msg[k]+"</option>");
                     }
                     return;
                 }
         });
  }

 function getGrades(){
        $.ajax({ 'async': true,
                'url': '/analysis/getGrades',
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
                    $("#grade").empty();
                    $("#grade").append("<option value=''>"+$.i18n.prop('please_select_grade')+"</option>");
                    for(var k=0;k<msg.length;k++){
                        $("#grade").append("<option value='"+msg[k].grade+"'>"+msg[k].grade+"</option>");
                    }
                    return;
                }
        });
 }

 function changeGrade(){
    var grade=document.getElementById('grade').options[document.getElementById('grade').selectedIndex].value;
    if(!grade){
        getClasses();
        getStudents();
        return;
    }
    var classnos=classes2[grade];
    var student_ids=student_ids3[grade];

    $("#class").empty();
    $("#class").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
    for(var k=0;k<classnos.length;k++){
        $("#class").append("<option value='"+classnos[k]+"'>"+classnos[k]+"</option>");
    }

    $("#student_id").empty();
    $("#student_id").append("<option value=''>"+$.i18n.prop('please_select_student_id')+"</option>");
    for(var k=0;k<student_ids.length;k++){
       $("#student_id").append("<option value='"+student_ids[k]+"'>"+student_ids[k]+"</option>");
    }
 }

var classes1=[];
var classes2=[];
 function getClasses(){
        $.ajax({ 'async': true,
                'url': '/analysis/getClasses',
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
                	classes1=[];
                	classes2=[];
                	
                    $("#class").empty();
                    $("#class").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
                    for(var k=0;k<msg.length;k++){
                        classes1[msg[k].classno]=msg[k].grade;
                        if(!classes2[msg[k].grade]){
                            classes2[msg[k].grade]=[];
                        }
                        classes2[msg[k].grade].push(msg[k].classno);
                        $("#class").append("<option value='"+msg[k].classno+"'>"+msg[k].classno+"</option>");
                    }
                    return;
                }
        });
 }

 function changeClass(){
    var classno=document.getElementById('class').options[document.getElementById('class').selectedIndex].value;
    if(!classno){
        var grade=document.getElementById('grade').options[document.getElementById('grade').selectedIndex].value;
        if(!grade){
            getClasses();
            getStudents();
            return
        }
        var classnos=classes2[grade];
        var student_ids=student_ids3[grade];

        $("#class").empty();
        $("#class").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
        for(var k=0;k<classnos.length;k++){
                $("#class").append("<option value='"+classnos[k]+"'>"+classnos[k]+"</option>");
        }

        $("#student_id").empty();
        $("#student_id").append("<option value=''>"+$.i18n.prop('please_select_student_id')+"</option>");
        for(var k=0;k<student_ids.length;k++){
               $("#student_id").append("<option value='"+student_ids[k]+"'>"+student_ids[k]+"</option>");
        }
        return;
    }

        var grade=classes1[classno];
        var classnos=classes2[grade];
        var student_ids=student_ids2[classno];

        $("#grade").val(grade);

        $("#class").empty();
        $("#class").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
        for(var k=0;k<classnos.length;k++){
                $("#class").append("<option value='"+classnos[k]+"'>"+classnos[k]+"</option>");
        }
         $("#class").val(classno);

        $("#student_id").empty();
        $("#student_id").append("<option value=''>"+$.i18n.prop('please_select_student_id')+"</option>");
        for(var k=0;k<student_ids.length;k++){
           $("#student_id").append("<option value='"+student_ids[k]+"'>"+student_ids[k]+"</option>");
        }
 }


 var student_ids1=[];
 var student_ids2=[];
 var student_ids3=[];
  function getStudents(){
         $.ajax({ 'async': true,
                 'url': '/analysis/getStudents',
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
                	 student_ids1=[];
                	 student_ids2=[];
                	 student_ids3=[];
                	 
                     $("#student_id").empty();
                     $("#student_id").append("<option value=''>"+$.i18n.prop('please_select_student_id')+"</option>");
                     for(var k=0;k<msg.length;k++){
                         student_ids1[msg[k].student_id]=msg[k];
                         if(!student_ids2[msg[k].classno]){
                              student_ids2[msg[k].classno]=[];
                         }
                         student_ids2[msg[k].classno].push(msg[k].student_id);
                         if(!student_ids3[msg[k].grade]){
                              student_ids3[msg[k].grade]=[];
                         }
                         student_ids3[msg[k].grade].push(msg[k].student_id);
                         $("#student_id").append("<option value='"+msg[k].student_id+"'>"+msg[k].student_id+"</option>");
                     }
                     return;
                 }
         });
  }

  function changeStudent(){
     var student_id=document.getElementById('student_id').options[document.getElementById('student_id').selectedIndex].value;
     if(!student_id){
        var classno=document.getElementById('class').options[document.getElementById('class').selectedIndex].value;
        if(!classno){
                var grade=document.getElementById('grade').options[document.getElementById('grade').selectedIndex].value;
                if(!grade){
                    getClasses();
                    getStudents();
                    return
                }
                var classnos=classes2[grade];
                var student_ids=student_ids3[grade];

                $("#class").empty();
                $("#class").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
                for(var k=0;k<classnos.length;k++){
                        $("#class").append("<option value='"+classnos[k]+"'>"+classnos[k]+"</option>");
                }

                $("#student_id").empty();
                $("#student_id").append("<option value=''>"+$.i18n.prop('please_select_student_id')+"</option>");
                for(var k=0;k<student_ids.length;k++){
                       $("#student_id").append("<option value='"+student_ids[k]+"'>"+student_ids[k]+"</option>");
                }
                return;
            }

                var grade=classes1[classno];
                var classnos=classes2[grade];
                var student_ids=student_ids2[classno];

                $("#grade").val(grade);

                $("#class").empty();
                $("#class").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
                for(var k=0;k<classnos.length;k++){
                        $("#class").append("<option value='"+classnos[k]+"'>"+classnos[k]+"</option>");
                }
                 $("#class").val(classno);

                $("#student_id").empty();
                $("#student_id").append("<option value=''>"+$.i18n.prop('please_select_student_id')+"</option>");
                for(var k=0;k<student_ids.length;k++){
                   $("#student_id").append("<option value='"+student_ids[k]+"'>"+student_ids[k]+"</option>");
                }

        return;
     }
             var classno=student_ids1[student_id].classno;
             var grade=student_ids1[student_id].grade;

             $("#class").val(classno);
             $("#grade").val(grade);


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
                       $("#exam").empty();
                       $("#exam").append("<option value=''>"+$.i18n.prop('please_select_exam')+"</option>");
                       for(var k=0;k<msg.length;k++){
                            exams[msg[k].id]=msg[k];
                           $("#exam").append("<option value='"+msg[k].id+"'>"+msg[k].name+"</option>");
                       }
                       return;
                   }
           });
    }

    function changeExam(){
        exam_id=document.getElementById('exam').options[document.getElementById('exam').selectedIndex].value;
        if(!exam_id){
            $("#start_date").val("");
            $("#end_date").val("");
        }
        else{
                $("#start_date").val(exams[exam_id].start_date);
                $("#end_date").val(exams[exam_id].end_date);
        }
    }



function clearAll(){;
     $("#exam").val("");
     $("#start_date").val("");
     $("#end_date").val("");
     $("#grade").val("");
     $("#class").val("");
     $("#student_id").val("");

     gradesArr=[];
     jQuery("#gradesTable").clearGridData();
     jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');
}

var gradesArr=[];
var subjects=[];
function initialTable(){
    $("#tb_dv").empty();
    $("#tb_dv").html("<table id='gradesTable'></table> <div id='gradesDiv'></div>");
    $.ajax({ 'async': true,
                       'url': '/analysis/getSubjectsubs',
                       'type': 'get',
                       'data': {exam_id: $("#exam").val(), subject:$("#subject").val()},
                       'datatype': 'html',
                       'timeout': 30000,
                       'error': function (msg) {
                           //alert(JSON.stringify(msg)); 
 				 alert($.i18n.prop('system_error'));
                           return;
                       },
                       'success': function (msg) {
                           subjects=msg;
                           var colNames=[$.i18n.prop('student_id'),$.i18n.prop('name')];
                           var colModel=[{name: 'student_id', index: 'student_id'},{name: 'name', index: 'name'}];
                           for(var k=1;k<=msg.length;k++){
                                var subject=subjects[k-1];
                                colNames.push(subject);
                                colModel.push({name: 'x'+k, index: 'x'+k});
                           }
                           colNames.push($.i18n.prop('total_point_rank'));
                           colModel.push({name: 'x', index: 'x', width:250});


                           jQuery("#gradesTable").jqGrid({
                                           datatype: "local",
                                           height: 550,
//                                           width:  1100,
                                           width: $("#tb_dv").width()*0.95,
                               //            autowidth: true,
                               //            shrinkToFit: true,
                                           colNames: colNames,
                                           colModel: colModel,
                                           rowNum: 1000,
                                   		   rowList: [500, 1000, 2000],
                                           pager: '#gradesDiv',
                                           viewrecords: true,
//                                           sortname: 'student_id',
//                                           sortorder: "asc",
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
                                       jQuery("#gradesTable").jqGrid('navGrid', "#gradesDiv", {search: false, edit: false, add: false, del: false})
                                       jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');
                           return;
                       }
     });

}


//http://localhost:8080/analysis/queryGradesubs?exam_id=5&grade=M12&classno=M1201&student_id=11
function queryGrades(){
    var exam_id=$("#exam").val();
    var grade=$("#grade").val();
    var classno=$("#class").val();
    var student_id=$("#student_id").val();
    var subject=$("#subject").val();

    if(!subject){
        	alert($.i18n.prop("please_select_subject_name"));
        	return;
    }
    if(!exam_id){
    	alert($.i18n.prop("please_select_examid"));
    	return;
    }
    if(!grade && !classno && !student_id){
    	alert($.i18n.prop("please_select_grade_classno_studentid"));
    	return;
    }

    if(student_id.indexOf(" ")>=0){
            student_id=student_id.substring(0,student_id.indexOf(" "));
        }

    var options={   exam_id:exam_id,
            grade:grade,
            classno:classno,
            student_id:student_id,
            subject:subject
         }

//alert(JSON.stringify(options));
//    clearAll();

    $.ajax({ 'async': true,
                           'url': '/analysis/queryGradesubs',
                           'type': 'get',
                           'data': options,
                           'datatype': 'html',
                           'timeout': 120000,
                           'error': function (msg) {
                               //alert(JSON.stringify(msg)); 
 				 alert($.i18n.prop('system_error'));
                               return;
                           },
                           'success': function (msg) {
//                                alert(JSON.stringify(msg));
                               parseGradesList(msg);
                               gradesArr=msg;
//                               jQuery("#gradesTable").clearGridData();
//                               jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');
                                initialTable();
                               return;
                           }
         });
}


function parseGradesList(msg){ //parse Average String to Locale
    for(var k=0;k<msg.length;k++){
        if(msg[k].name.indexOf("Average")>=0){
            msg[k].name=msg[k].name.replace("Average",$.i18n.prop("Average"));
        }
    }
}


function initialSelect(){
        getSubjects();
        getExams();
    	getGrades();
    	getClasses();
    	getStudents();
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

$(function(){


    	initDateInput();

//    	loadProperties();
//    	loadProperties2();
//
//    	initialSelect();

//    	initialTable();

        InitLoadingSpinner();

});