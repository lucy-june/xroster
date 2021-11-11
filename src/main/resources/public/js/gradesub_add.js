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

         		    $('#submit_btn').html($.i18n.prop('submit'));
         		    $('#fakeBrowse').html($.i18n.prop('select_file'));
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
	var rows=to_json(wb)["Sheet1"];

	if(lastsel3 || lastsel3==0) jQuery('#gradesTable').jqGrid('saveRow',lastsel3);
	lastsel3=null;
	
	gradesArr=jQuery("#gradesTable").jqGrid('getGridParam', 'data');
	
//	alert(JSON.stringify(gradesArr));
//	alert(JSON.stringify(rows));
	
	for(var k=0;k<rows.length;k++){
		var isFound=0;
		var subjectsubs=[];
		for(var n=0;n<gradesArr.length;n++){
			if(gradesArr[n]['student_id']==rows[k][$.i18n.prop('student_id')]){
//				gradesArr[n]['name']=rows[k][$.i18n.prop('name')]
//				gradesArr[n]['sex']=rows[k][$.i18n.prop('sex')]==$.i18n.prop('male')
//				gradesArr[n]['birthday']=rows[k][$.i18n.prop('birthday')]?new Date((rows[k][$.i18n.prop('birthday')] - (25567+2))*86400*1000).Format("yyyy-MM-dd"):"";
                for(var key in rows[k]){
                    if(key!=$.i18n.prop('student_id') && key!=$.i18n.prop('name') && key!=$.i18n.prop('sex')&& key!=$.i18n.prop('birthday')&& key!=$.i18n.prop('point')&& key!=$.i18n.prop('Total') && key!=$.i18n.prop('total')){
                        gradesArr[n][key]=rows[k][key];
                        if(subjectsubs.indexOf(key)<0){
                            subjectsubs.push(key);
                        }
                    }
                }
				isFound=1;
				break;
			}
		}
//		if(isFound==0 && rows[k][$.i18n.prop('student_id')] && (rows[k][$.i18n.prop('point')]||rows[k][$.i18n.prop('point')]==0)){
//			var obj={};
//			obj['student_id']=rows[k][$.i18n.prop('student_id')];
//			obj['name']=rows[k][$.i18n.prop('name')];
////			obj['sex']=rows[k][$.i18n.prop('sex')]==$.i18n.prop('male');
////			obj['birthday']=rows[k][$.i18n.prop('birthday')]?new Date((rows[k][$.i18n.prop('birthday')] - (25567+2))*86400*1000).Format("yyyy-MM-dd"):"";
//			obj['point']=rows[k][$.i18n.prop('point')]
//
//			gradesArr.push(obj);
//		}
	}
//	alert(JSON.stringify(gradesArr));
//	jQuery("#gradesTable").clearGridData();
//	jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');

     colNames = [
                                        $.i18n.prop('student_id'),
                                        $.i18n.prop('name'),
                                        $.i18n.prop('sex'),
                                        $.i18n.prop('birthday')
                               ];
                    colModel= [
                                        {name: 'student_id', index: 'student_id'},
                                        {name: 'name', index: 'name'},
                                        {name: 'sex', index: 'sex', formatter: 'select', edittype: "select",  editoptions: {value: ":;true:"+$.i18n.prop('male')+";false:"+$.i18n.prop('female')}},
                                        {name: 'birthday', index: 'birthday'}
                              ];
                     for(var k=0;k<subjectsubs.length;k++){
                        colNames.push(subjectsubs[k]);
                        colModel.push({name: subjectsubs[k], index: subjectsubs[k], editable: true})
                     }
                     reloadTable(colNames,colModel);
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
         searchClassno();
  }

  function inputSubject(){
      searchClassno();
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
        searchClassno();
    }

    function inputExam(){
        exam_id=null;
        $("#start_date").val("");
        $("#end_date").val("");
        searchClassno();
    }


function clearAll(){;
     $("#class").val("");
     $("#exam").val("");
     $("#start_date").val("");
     $("#end_date").val("");
     $("#subject").val("");

     gradesArr=[];
     jQuery("#gradesTable").clearGridData();
     jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');

//    getClassnos();
    getSubjects();
    getExams();
    
    searchClassno();
}



function searchClassno(){
    var classno=$("#class").val();
    if(!classno){
    	gradesArr=[];
        jQuery("#gradesTable").clearGridData();
        jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');
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
//                           alert("###"+JSON.stringify(msg));
                           gradesArr=msg.rows;
//                           jQuery("#gradesTable").clearGridData();
//                           jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');
                           //!!!!!!!!!important!!!!!!!!!!!!
                           searchClassnoSubjectExam();
                       }
     });
}

var lastClassno=null;
var isNoRealData=0;
//http://localhost:8080/grade/queryExistedGrades?classno=M1303&exam_id=38&subject=English
function searchClassnoSubjectExam(){
	var classno=$("#class").val();
	var subject=$("#subject").val();
	if(classno && subject && exam_id){
		$.ajax({ 'async': true,
            'url': '/grade/queryExistedGradesubs',
            'type': 'get',
            'data': {classno:classno,subject:subject,exam_id:exam_id},
            'datatype': 'html',
            'timeout': 30000,
            'error': function (msg) {
//                alert("##############");
                //alert(JSON.stringify(msg)); 
 				 alert($.i18n.prop('system_error'));
                return;
            },
            'success': function (msg) {
//            	alert(JSON.stringify(gradesArr));
//                alert("#"+lastClassno+"#"+classno+"#"+isNoRealData+"#");
                if(lastClassno==classno && (!msg||msg.length==0) && (isNoRealData==1)){
                    return;
                }

                var subjectsubs=[];
            	for(var n=0;n<msg.length;n++){
            		for(var k=0;k<gradesArr.length;k++){
            			if(gradesArr[k].student_id==msg[n].student_id){
            			    if(subjectsubs.indexOf(msg[n].subjectsub)<0) subjectsubs.push(msg[n].subjectsub);
            				gradesArr[k][msg[n].subjectsub]=msg[n].point;
            				break;
            			}
            		}
                }

                colNames = [
                                    $.i18n.prop('student_id'),
                                    $.i18n.prop('name'),
                                    $.i18n.prop('sex'),
                                    $.i18n.prop('birthday')
                           ];
                colModel=[
                                    {name: 'student_id', index: 'student_id'},
                                    {name: 'name', index: 'name'},
                                    {name: 'sex', index: 'sex', formatter: 'select', edittype: "select",  editoptions: {value: ":;true:"+$.i18n.prop('male')+";false:"+$.i18n.prop('female')}},
                                    {name: 'birthday', index: 'birthday'}
                          ];
                 for(var k=0;k<subjectsubs.length;k++){
                    colNames.push(subjectsubs[k]);
                    colModel.push({name: subjectsubs[k], index: subjectsubs[k], editable: true})
                 }
                 reloadTable(colNames,colModel);

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

                colNames = [
                                    $.i18n.prop('student_id'),
                                    $.i18n.prop('name'),
                                    $.i18n.prop('sex'),
                                    $.i18n.prop('birthday')
                           ];
                colModel=[
                                    {name: 'student_id', index: 'student_id'},
                                    {name: 'name', index: 'name'},
                                    {name: 'sex', index: 'sex', formatter: 'select', edittype: "select",  editoptions: {value: ":;true:"+$.i18n.prop('male')+";false:"+$.i18n.prop('female')}},
                                    {name: 'birthday', index: 'birthday'}
                          ];
                 reloadTable(colNames,colModel);

        isNoRealData=1;
        lastClassno=classno;
        return;
	}
}


var gradesArr=[];
var lastsel3=null;
function initialGradesTable(){
    lastClassno=null;
    isNoRealData=0;
    lastsel3=null;
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
                    $.i18n.prop('birthday')
//                    $.i18n.prop('point')
                ],
                colModel: [
                    {name: 'student_id', index: 'student_id'},
                    {name: 'name', index: 'name'},
                    {name: 'sex', index: 'sex', formatter: 'select', edittype: "select",  editoptions: {value: ":;true:"+$.i18n.prop('male')+";false:"+$.i18n.prop('female')}},
                    {name: 'birthday', index: 'birthday'}
//                    {name: 'point', index: 'point', editable: true}
                ],
                rowNum: 80,
        		rowList: [30, 80, 150],
                pager: '#gradesDiv',
//                viewrecords: true,
//                sortname: 'student_id',
//                sortorder: "asc",
                caption: "",
//                fitColumns: true,
                editurl: 'clientArray',
//                cellEdit:true,
//                cellsubmit:'clientArray',
                onSelectRow: function (id) {
                    if(id && id!==lastsel3){
                    			if(lastsel3 || lastsel3==0) jQuery('#gradesTable').jqGrid('saveRow',lastsel3);
                    			jQuery('#gradesTable').jqGrid('editRow',id);
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

//            jQuery("#gradesTable").jqGrid('inlineNav', "#gradesDiv", inlineparams);
            jQuery("#gradesTable").jqGrid('navGrid', "#gradesDiv", {search: false, edit: false, add: false, del: false,refresh:false})
            jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');
}

function reloadTable(colNames,colModel){
    lastsel3=null;
    $("#tb_dv").empty();
	$("#tb_dv").html("<table id='gradesTable'></table> <div id='gradesDiv'></div>");
    jQuery("#gradesTable").jqGrid({
                datatype: "local",
                height: 550,
                width: $("#tb_dv").width()*0.95,
//                width:  820,
    //            autowidth: true,
    //            shrinkToFit: true,
                colNames: colNames,
                colModel: colModel,
                rowNum: 80,
        		rowList: [30, 80, 150],
                pager: '#gradesDiv',
//                viewrecords: true,
//                sortname: 'student_id',
//                sortorder: "asc",
                caption: "",
//                fitColumns: true,
                editurl: 'clientArray',
//                cellEdit:true,
//                cellsubmit:'clientArray',
                onSelectRow: function (id) {
                    if(id && id!==lastsel3){
                    			if(lastsel3 || lastsel3==0) jQuery('#gradesTable').jqGrid('saveRow',lastsel3);
                    			jQuery('#gradesTable').jqGrid('editRow',id);
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
    jQuery("#gradesTable").jqGrid('navGrid', "#gradesDiv", {search: false, edit: false, add: false, del: false,refresh:false})
    jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');
}


function addGrades(){
    if(lastsel3 || lastsel3==0) jQuery('#gradesTable').jqGrid('saveRow',lastsel3);
    lastsel3=null;

	var classno=$("#class").val();
    var subject=$("#subject").val();
    var name=$("#exam").val();
    var start_date=$("#start_date").val();
    var end_date=$("#end_date").val();
    
    if(!classno){
    	alert($.i18n.prop("please_select_a_classno"));
    	return;
    }
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

    var options={   subject:subject,
                         name:name,
                         start_date:start_date,
                         end_date:end_date,
                         exam_id:exam_id
         }

//    alert(JSON.stringify(gradesArr));
    gradesArr=jQuery("#gradesTable").jqGrid('getGridParam', 'data');
//    alert(JSON.stringify(options));
//    alert(JSON.stringify(gradesArr));

    reqs(options,gradesArr,0);
}

function reqs(options,gradesArr,start){
    if(start>=gradesArr.length){
        $('.canvasLoader').hide();
        alert($.i18n.prop("S"));
        clearAll();
        return;
    }
    var url='/grade/addGradesubs?';
        for(var k=start;k<Math.min(gradesArr.length,start+5);k++){
            var x=gradesArr[k];
            for(var key in x){
                if(key!='student_id' && key!='name' && key!='sex'&& key!='birthday'&& key!='point'&& key!='Total'&& key!='total' && key!='grade' && key!='class' && key!='classno' && x[key] && x[key]>=0){
                                url+="student_ids="+x["student_id"]+"&";
                                url+="subjectsubs="+key+"&";
                                url+="points="+(x[key]?x[key]:"-1")+"&";
                }
            }
        }

//        alert(url);
//        alert(JSON.stringify(options));

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
//                                	$('.canvasLoader').hide();
//                                    alert($.i18n.prop(msg[0]));
//                                    if(msg[0]=="S"){
//                                        clearAll();
//                                    }
                                    if(msg[0]=="S"){
                                         reqs(options,gradesArr,start+5);
                                    }
                                    else{
                                        $('.canvasLoader').hide();
                                        alert($.i18n.prop("F"));
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

function initialTable(){
	initialGradesTable();
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

    	InitLoadingSpinner();
});