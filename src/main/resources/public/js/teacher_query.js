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
//		path:'/asset/i18n/', //资源文件路径
//		mode:'map', //用Map的方式使用资源文件中的值
////		language: 'zh-CN',
//		language:lang,
//    		callback: function() {//加载成功后设置显示内容
//
//    		}
//    	});

         $('#teacher_basic_info').html($.i18n.prop('teacher_basic_info'));
                        $('#class_td').html($.i18n.prop('class'));
            		    $('#name_td').html($.i18n.prop('name'));
            		    $('#email_td').html($.i18n.prop('email'));
            		    $('#sex_td').html($.i18n.prop('sex'));
            		    $('#birthday_td').html($.i18n.prop('birthday'));
            		    $('#telephone_td').html($.i18n.prop('telephone'));
            		    $('#location_td').html($.i18n.prop('location'));
            		    $('#title_td').html($.i18n.prop('title'));
            		    $('#subject_td').html($.i18n.prop('subject'));
            		    $('#is_advisor_td').html($.i18n.prop('is_advisor'));
            		    $('#start_date_td').html($.i18n.prop('start_date'));
            		    $('#contract_date_td').html($.i18n.prop('contract_date'));

            		    $('#class_input_').attr("placeholder",$.i18n.prop('classno'));
            		    $('#teacher_id').attr("placeholder",$.i18n.prop('teacher_id'));


            		    $('#class').attr("placeholder",$.i18n.prop('please_select_classno'));
                                                $('#name').attr("placeholder",$.i18n.prop('teacher_name'));
                                                $('#email').attr("placeholder",$.i18n.prop('teacher_email'));
                                                $('#birthday').attr("placeholder",$.i18n.prop('teacher_birthday'));
                                                $('#telephone').attr("placeholder",$.i18n.prop('teacher_telephone'));
                                                $('#location').attr("placeholder",$.i18n.prop('teacher_location'));
                                                $('#title').attr("placeholder",$.i18n.prop('teacher_title'));
                                                $('#start_date').attr("placeholder",$.i18n.prop('teacher_startdate'));
                                                $('#contract_date').attr("placeholder",$.i18n.prop('teacher_contractdate'));
                                                $('#subject').attr("placeholder",$.i18n.prop('teacher_subject'));
 }

 function getClassnos(){
        $.ajax({ 'async': true,
                'url': '/teacher/getClassList',
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
    $("#email").val("");
    $("#telephone").val("");
    $("#birthday").val("");
    $("#location").val("");
    $("#start_date").val("");
    $("#contract_date").val("");
    $("#title").val("");
    $("#subject").val("");
    $("input[name='sex']").get(0).checked=true;
    $("input[name='is_advisor']").get(0).checked=true;
    $("#class").val("");
//    $("#class_input_").val("");

    $("#class_content_td").empty();

//    getClassnos();
}

function searchTeacher(){
	if(!$("#teacher_id").val()){
		alert($.i18n.prop('please_input_teacherid_info'));
		return;
	}
	
    clearAll();
    $.ajax({ 'async': true,
            'url': '/teacher/queryTeacherDetail',
            'type': 'get',
            'data': {id: $("#teacher_id").val()},
            'datatype': 'html',
            'timeout': 30000,
            'error': function (msg) {
            	alert($.i18n.prop('found_nothing'));
                return;
            },
            'success': function (msg) {

                 $.ajax({ 'async': true,
                             'url': '/teacher/queryClassnos',
                             'type': 'get',
                             'data': {id: $("#teacher_id").val()},
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
                                  $("#start_date").val(msg.start_date);
                                  $("#contract_date").val(msg.contract_date);
                                  $("#title").val(msg.title);
                                  $("#subject").val(msg.subject);
                                  $("input[name='sex']").get(0).checked=msg.sex==true;
                                  $("input[name='sex']").get(1).checked=msg.sex==false;
                                  $("input[name='is_advisor']").get(0).checked=msg.is_advisor==true;
                                  $("input[name='is_advisor']").get(1).checked=msg.is_advisor==false;

                                  for(var k=0;k<msg2.length;k++){
                                        var classno=msg2[k];
                                        $("#class_content_td").append(
                                                      '<div id="class_div_'+classno+'">'+
                                                      '<div style="float:left;width:150px;height:25px">'+
                                                      '<div style="float:left;margin-top:3px">'+
                                                      '<input type="text" id="class_input_'+classno+'"  value="'+classno+'" style="float:left;position:absolute; width:140px;height:22px  border:1px solid"/>'+
                                                      '</div>'+
                                                      '</div>'+
                                                      '<a href="#" class="big-link" data-reveal-id="teachersModal">'+
                                                      '<img id="class_img_'+classno+'" style="float:left;" src="/image/search.png" onclick="searchClassno(this.id)"/>'+
                                                      '</a>'+
                                                      '<div style="clear:both"></div>'+
                                                      '</div>'
                                            );
                                  }
                                 return;
                             }
                     });

                 $("#name").val(msg.name);
                 $("#email").val(msg.email);
                 $("#telephone").val(msg.telephone);
                 $("#birthday").val(msg.birthday);
                 $("#location").val(msg.location);
                 $("#start_date").val(msg.start_date);
                 $("#contract_date").val(msg.contract_date);
                 $("#title").val(msg.title);
                 $("#subject").val(msg.subject);
                 $("input[name='sex']").attr("checked",msg.sex);
                 $("input[name='is_advisor']").attr("checked",msg.is_advisor);

                return;
            }
    });


}

function searchClassno(id){
    var classno=$("#class_input_"+id.substring(10,id.length)).val();
//    alert(classno);
    
    if(!classno){
    	$("#teachers_dv").attr("style","display:none");
    	$("#message_lb").attr("style","");
		$("#message_lb").html($.i18n.prop('please_select_classno_info'));
		$("#teachersModal").attr("style","top: 100px; opacity: 1; visibility: visible;margin-left:20%");
		return;
	}
    else{
		$("#teachers_dv").attr("style","");
    	$("#message_lb").attr("style","display:none");
    	$("#teachersModal").attr("style","top: 100px; opacity: 1; visibility: visible");
	}

    $("#teachersTable").jqGrid('setGridParam', { url: '/teacher/queryTeachersAdv?classno=' + classno}).trigger('reloadGrid');
}

function initialTable(){
    $("#tb_dv").empty();
	$("#tb_dv").html("<table id='teachersTable'></table> <div id='teachersDiv'></div>");
    jQuery("#teachersTable").jqGrid({
                url: null,
                datatype: "json",
                height: 260,
                width: $(window).width()*0.6,
//                width: 1200,
//                autowidth: true,
//                shrinkToFit: true,
                colNames: [
                     $.i18n.prop('teacher_id'),
                     $.i18n.prop('name'),
                     $.i18n.prop('sex'),
                     $.i18n.prop('birthday'),
//                     $.i18n.prop('telephone'),
//                     $.i18n.prop('email'),
//                     $.i18n.prop('location'),
//                     $.i18n.prop('title'),
                     $.i18n.prop('subject')
//                     $.i18n.prop('is_advisor'),
//                     $.i18n.prop('start_date'),
//                     $.i18n.prop('contract_date')
                ],
                colModel: [
                    {name: 'teacher_id', index: 'teacher_id'},
                    {name: 'name', index: 'name'},
                    {name: 'sex', index: 'sex', formatter: 'select', edittype: "select", editoptions: {value: ":;true:"+$.i18n.prop('male')+";false:"+$.i18n.prop('female')}},
                    {name: 'birthday', index: 'birthday',formatter:dateFormat},
//                    {name: 'telephone', index: 'telephone'},
//                    {name: 'email', index: 'email'},
//                    {name: 'location', index: 'location',align:'center', width:80 ,sortable: false},
//                    {name: 'title', index: 'title'},
                    {name: 'subject', index: 'subject'}
//                    {name: 'is_advisor', index: 'is_advisor', formatter: 'select', edittype: "select", editoptions: {value: "0:未支付;4:已支付;5:已支付;6:已支付;7:已支付;8:交易成功;9:交易关闭;10:交易关闭;11:交易关闭;12:交易关闭;13:交易关闭"}},
//                    {name: 'start_date', index: 'start_date',formatter:dateFormat},
//                    {name: 'contract_date', index: 'contract_date',formatter:dateFormat}
                ],
                rowNum: 30,
                rowList: [10, 30, 50],
                pager: '#teachersDiv',
                viewrecords: true,
                sortname: 'teacher_id',
                sortorder: "desc",
                caption: "",
                fitColumns: true,
                editurl: 'clientArray',
                onSelectRow: function () {
                    var id = $("#teachersTable").jqGrid('getGridParam', "selrow");
                    var obj = $("#teachersTable").jqGrid('getRowData', id);
                    var teacherid=obj.teacher_id;
                    $("#teacher_id").val(teacherid);
                    searchTeacher();
                    $("#teachersModal").trigger('reveal:close')
                },
                onSelectAll: function () {

                },
                loadComplete: function () {

                },
                gridComplete: function () {

                }
            });
            jQuery("#teachersTable").jqGrid('navGrid', "#teachersDiv", {search: false, edit: false, add: false, del: false})
            jQuery("#teachersTable").jqGrid('setGridParam', {data: []}).trigger('reloadGrid');
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