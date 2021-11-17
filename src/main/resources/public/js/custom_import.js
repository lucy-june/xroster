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

         		    $('#submit_btn').html($.i18n.prop('submit'));
         		    $('#fakeBrowse').html($.i18n.prop('select_file_sbzx'));
 }

function handleFile(e) {
	var files = e.target.files;
	var f = files[0];
	var reader = new FileReader();
	var name = f.name;
	reader.onload = function(e) {
		var data = e.target.result;
		var wb;
		var arr = fixdata(data);
		wb = XLSX.read(btoa(arr), {type: 'base64'});
		process_wb(wb);
	};
	reader.readAsArrayBuffer(f);
	$("#browse").val("");
}

function fixdata(data) {
	var o = "", l = 0, w = 10240;
	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
	o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
	return o;
}

function to_json(workbook) {
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
		}
	});
	return result;
}

function process_wb(wb) {
    var sheets=to_json(wb);

    var objs=[];

    try{
        for(var k in sheets){
                var classno=null;
                var keypoint=null;
                if(sheets[k][0]){
                    for(var key in sheets[k][0]){
                        if(key.indexOf("届")>=0 && key.indexOf("班")>=0){
                            classno=parseClassno(key);
                            keypoint=key;
                            break;
                        }
                    }
                }
                if(classno){
        //            alert(classno);
                    var obj={classno:classno,grades:[],gradesubs:[]};
                    for(var n=0;n<sheets[k].length;n++){
                        if(!sheets[k][n][keypoint]) continue;
                        if(sheets[k][n]["总分"]) obj.grades.push({student_id:sheets[k][n][keypoint],name:sheets[k][n][undefined],point:sheets[k][n]["总分"]});

                        for(var key in sheets[k][n]){
                            if(key && key!=undefined && key!="undefined" && key!=keypoint && key!="总分" && sheets[k][n][key]){
                                 obj.gradesubs.push({student_id:sheets[k][n][keypoint],name:sheets[k][n][undefined],point:sheets[k][n][key],subjectsub:key});
                            }
                        }
                    }
                    objs.push(obj);
                }
            }
    }catch(exp){
        alert("Excel格式有误");
        return;
    }

//    alert(JSON.stringify(objs));
    addGrades(objs);
}

function parseClassno(key){
    var s1=key.substring(0,key.indexOf("届"));
    var s2=key.substring(key.indexOf("届")+1,key.indexOf("班"))
    var maps={ '一':'1','二':'2','三':'3','四':'4','五':'5','六':'6','七':'7','八':'8','九':'9','零':'0',
        '十':'10','十一':'11','十二':'12','十三':'13','十四':'14','十五':'15','十六':'16','十七':'17','十八':'18','十九':'19'};
    s1=maps[s1]?maps[s1]:s1;
    s2=maps[s2]?maps[s2]:s2;
    var classno="X"+s1+((s2.length==2)?"":"0")+s2;
    return classno;
}

function HandleBrowseClick()
{
	var fileinput = document.getElementById("browse");
	fileinput.click();
}

function Handlechange(e)
{
	var fileinput = document.getElementById("browse");
	var textinput = document.getElementById("filename");

	var filename;
	var fullPath = fileinput.value;
	if (fullPath) {
		var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
		filename = fullPath.substring(startIndex);
		if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			filename = filename.substring(1);
		}
	}

	textinput.value = filename?filename:"";
	handleFile(e);
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
           exam_id=null;
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
        if(exam_id){
        	$("#start_date").val(exams[exam_id].start_date);
        	$("#end_date").val(exams[exam_id].end_date);
    	}
    	else{
    		$("#start_date").val("");
    		$("#end_date").val("");
    	}
    }

    function inputExam(){
        exam_id=null;
        $("#start_date").val("");
        $("#end_date").val("");
    }


function clearAll(){;
     $("#exam").val("");
     $("#start_date").val("");
     $("#end_date").val("");
     $("#subject").val("");
     $("#filename").val("");

    getSubjects();
    getExams();
}

function addGrades(objs){
    var subject=$("#subject").val();
    var name=$("#exam").val();
    var start_date=$("#start_date").val();
    var end_date=$("#end_date").val();

    if(!subject){
    	alert($.i18n.prop("please_select_or_input_subject"));
    	return;
    }
    if(!name){
    	alert($.i18n.prop("please_select_or_input_exam"));
    	return;
    }
    if(!start_date){
    	alert($.i18n.prop("please_input_exam_start_date_or_select_exam"));
    	return;
    }
    if(!end_date){
    	alert($.i18n.prop("please_input_exam_end_date_or_select_exam"));
    	return;
    }

    $.ajax({ 'async': true,
         'url': "/grade/cstimport",
         'type': 'post',
         'data': {subject:subject,exam_id:exam_id,name:name,start_date:start_date,end_date:end_date,objs:JSON.stringify(objs)},
         'datatype': 'html',
         'timeout': 120000,
         'error': function (msg) {
         	$('.canvasLoader').hide();
         	alert($.i18n.prop("F"));
         	clearAll();
             return;
         },
         'success': function (msg) {
             if(msg[0]=="S"){
                  $('.canvasLoader').hide();
                  alert($.i18n.prop("S"));
                  clearAll();
             }
             else{
                 $('.canvasLoader').hide();
                 alert($.i18n.prop("F"));
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
    	getSubjects();
    	getExams();
}

$(function(){

    	initDateInput();

    	InitLoadingSpinner();
});