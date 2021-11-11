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
//		callback: function() {//加载成功后设置显示内容
//
//		}
//	});

            $('#student_basic_info').html($.i18n.prop('student_basic_info'));
			$('#class_td').html($.i18n.prop('class'));
			$('#name_td').html($.i18n.prop('name'));
			$('#email_td').html($.i18n.prop('email'));
			$('#sex_td').html($.i18n.prop('sex'));
			$('#birthday_td').html($.i18n.prop('birthday'));
			$('#telephone_td').html($.i18n.prop('telephone'));
			$('#location_td').html($.i18n.prop('location'));
			$('#student_td').html($.i18n.prop('student'));
			$('relation').html($.i18n.prop('relation'));
			$('job_company').html($.i18n.prop('job_company'));
			$('job_title').html($.i18n.prop('job_title'));
			$('job_duty').html($.i18n.prop('job_duty'));

			$('#class').attr("placeholder",$.i18n.prop('classno'));
			$('#student_id').attr("placeholder",$.i18n.prop('student_id'));
			$('#submit_btn').html($.i18n.prop('submit'));
			$('#fakeBrowse').html($.i18n.prop('select_file'));
}

function handleFile(e) {
	var files = e.target.files;
	var f = files[0];
	var reader = new FileReader();
	var name = f.name;
//	alert("name:"+name);
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
//	alert(JSON.stringify(wb));
//	alert(JSON.stringify(to_json(wb)));
	var rows=to_json(wb)["Sheet1"];
//	alert(JSON.stringify(rows));
	if(lastsel3 || lastsel3==0) jQuery('#studentsTable').jqGrid('saveRow',lastsel3);
	lastsel3=null;

	studentsArr=jQuery("#studentsTable").jqGrid('getGridParam', 'data');
	for(var k=0;k<rows.length;k++){
		var isFound=0;
		for(var n=0;n<studentsArr.length;n++){
			if(studentsArr[n]['id']==rows[k][$.i18n.prop('student_id')]){
				studentsArr[n]['name']=rows[k][$.i18n.prop('name')]
				studentsArr[n]['sex']=rows[k][$.i18n.prop('sex')]?rows[k][$.i18n.prop('sex')]==$.i18n.prop('male'):null;
				studentsArr[n]['birthday']=rows[k][$.i18n.prop('birthday')]?new Date((rows[k][$.i18n.prop('birthday')] - (25567+2))*86400*1000).Format("yyyy-MM-dd"):"";
				studentsArr[n]['telephone']=rows[k][$.i18n.prop('telephone')]
				studentsArr[n]['email']=rows[k][$.i18n.prop('email')]
				studentsArr[n]['location']=rows[k][$.i18n.prop('location')]
				isFound=1;
				break;
			}
		}
		if(isFound==0 && rows[k][$.i18n.prop('student_id')] && rows[k][$.i18n.prop('name')]){
			var obj={};
			obj['id']=rows[k][$.i18n.prop('student_id')];
			obj['name']=rows[k][$.i18n.prop('name')];
			obj['sex']=rows[k][$.i18n.prop('sex')]?rows[k][$.i18n.prop('sex')]==$.i18n.prop('male'):null;
			obj['birthday']=rows[k][$.i18n.prop('birthday')]?new Date((rows[k][$.i18n.prop('birthday')] - (25567+2))*86400*1000).Format("yyyy-MM-dd"):"";
			obj['telephone']=rows[k][$.i18n.prop('telephone')];
			obj['email']=rows[k][$.i18n.prop('email')];
			obj['location']=rows[k][$.i18n.prop('location')];

			studentsArr.push(obj);
		}
	}
//	alert(JSON.stringify(studentsArr));
	jQuery("#studentsTable").clearGridData();
	jQuery("#studentsTable").jqGrid('setGridParam', {data: studentsArr}).trigger('reloadGrid');
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
//	alert("fullPath: "+fullPath);
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
	searchClassno();
}

function inputClass(){
	searchClassno();
}

function clearAll(){;
var classno=$("#class").val();

document.getElementById("filename").value="";
$("#browse").val("");

getClassnos();
document.getElementById('class0').value=classno;
$("#class").val(classno);
searchClassno();

//studentsArr=[];
//jQuery("#studentsTable").clearGridData();
//jQuery("#studentsTable").jqGrid('setGridParam', {data: studentsArr}).trigger('reloadGrid');
}

function searchClassno(){
	var classno=$("#class").val();

	$.ajax({ 'async': true,
		'url': '/student/queryStudents',
		'type': 'get',
		'data': {classno:classno},
		'datatype': 'html',
		'timeout': 30000,
		'error': function (msg) {
			//alert(JSON.stringify(msg)); 
 				 alert($.i18n.prop('system_error'));
			return;
		},
		'success': function (msg) {
			studentsArr=msg;
			jQuery("#studentsTable").clearGridData();
			jQuery("#studentsTable").jqGrid('setGridParam', {data: studentsArr}).trigger('reloadGrid');
			return;
		}
	});
}

function addStudents(){
	if(lastsel3 || lastsel3==0) jQuery('#studentsTable').jqGrid('saveRow',lastsel3);
	lastsel3=null;

	studentsArr=jQuery("#studentsTable").jqGrid('getGridParam', 'data');
	
	var classno=$("#class").val();
	
	if(!classno){
		alert($.i18n.prop('please_select_or_input_class'));
		return;
	}

    var url='/student/addStudents?';
    for(var k=0;k<studentsArr.length;k++){
        var x=studentsArr[k];
        if(!x["name"]){
        	alert($.i18n.prop('please_fill_student_name_info'));
        	return;
        }
        url+="ids="+((x["id"]&&x["id"].indexOf("jqg")!=0)?x["id"]:"@")+"&";
        url+="names="+x["name"]+"&";
        url+="sexs="+(x["sex"]?x["sex"]:"@")+"&";
        url+="birthdays="+(x["birthday"]?x["birthday"]:"@")+"&";
        url+="telephones="+(x["telephone"]?x["telephone"]:"@")+"&";
        url+="emails="+(x["email"]?x["email"]:"@")+"&";
        url+="locations="+(x["location"]?x["location"]:"@")+"&";
   
    }
    
//    alert(url);

    $.ajax({ 'async': true,
                            'url': url,
                            'type': 'get',
                            'data': {classno:classno},
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
                                    alert($.i18n.prop("S"));
                                }
                                return;
                            }
                    });
}

var studentsArr=[];
var lastsel3=null;
function initialTable(){
	$("#tb_dv").empty();
	$("#tb_dv").html("<table id='studentsTable'></table> <div id='studentsDiv'></div>");
	jQuery("#studentsTable").jqGrid({
		datatype: "local",
//		url:"/student/queryStudents?classno=M1510",
//		datatype: "json",
		height: 600,
		width: $("#tb_dv").width()*0.95,
//		width: 900,
//		autowidth: true,
//		shrinkToFit: true,
		colNames: [
		           $.i18n.prop('student_id'),
		           $.i18n.prop('name'),
		           $.i18n.prop('sex'),
		           $.i18n.prop('birthday'),
		           $.i18n.prop('telephone'),
		           $.i18n.prop('email'),
		           $.i18n.prop('location')
//		           $.i18n.prop('title'),
//		           $.i18n.prop('subject')
//		           $.i18n.prop('is_advisor'),
//		           $.i18n.prop('start_date'),
//		           $.i18n.prop('contract_date')
		           ],
		colModel: [
		                      {name: 'id', index: 'id', editable: true},
		                      {name: 'name', index: 'name', editable: true},
		                      {name: 'sex', index: 'sex', editable: true, formatter: 'select', edittype: "select", editoptions: {value: ":;true:"+$.i18n.prop('male')+";false:"+$.i18n.prop('female')}},
		                      {name: 'birthday', index: 'birthday',formatter:dateFormat, editable: true},
		                      {name: 'telephone', index: 'telephone', editable: true},
		                      {name: 'email', index: 'email', editable: true},
		                      {name: 'location', index: 'location', editable: true}
//		                      {name: 'title', index: 'title'},
//		                      {name: 'subject', index: 'subject'},
//		                      {name: 'is_advisor', index: 'is_advisor', formatter: 'select', edittype: "select", editoptions: {value: "0:未支付;4:已支付;5:已支付;6:已支付;7:已支付;8:交易成功;9:交易关闭;10:交易关闭;11:交易关闭;12:交易关闭;13:交易关闭"}},
//		                      {name: 'start_date', index: 'start_date',formatter:dateFormat},
//		                      {name: 'contract_date', index: 'contract_date',formatter:dateFormat}
		                      ],
		rowNum: 80,
		rowList: [30, 80, 150],
		pager: '#studentsDiv',
//		                      viewrecords: true,
//		                      sortname: 'id',
//		                      sortorder: "desc",
		caption: "",
//		                      fitColumns: true,
		editurl: 'clientArray',
		onSelectRow: function (id) {
		     if(id && id!==lastsel3){
		        if(lastsel3 || lastsel3==0) jQuery('#studentsTable').jqGrid('saveRow',lastsel3);
		        jQuery('#studentsTable').jqGrid('editRow',id);
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

	jQuery("#studentsTable").jqGrid('navGrid', "#studentsDiv", {search: false, refresh: false, edit: false, add: true, del: false}).navButtonAdd('#studentsDiv', {
            caption: "",
            buttonicon: "ui-icon-trash",
            onClickButton: function () {
                var id = $("#studentsTable").jqGrid('getGridParam', "selrow");
                if (id == null) {
                    alert($.i18n.prop('please_select_data'));
                    return;
                }
                else {
                    var r=confirm($.i18n.prop('please_confirm_delete'))
                    if (r==true)
                    {
                        $("#studentsTable").jqGrid("delRowData", id);
                    }
                    else
                    {
                        return;
                    }
                }
            },
            position: "last"
        });
	jQuery("#studentsTable").jqGrid('setGridParam', {data: studentsArr}).trigger('reloadGrid');
}

function initialSelect(){
	getClassnos();
}

$(function(){
	initDateInput();
//	loadProperties();
//	loadProperties2();
//
//	initialSelect();
//
//	initialTable();
});