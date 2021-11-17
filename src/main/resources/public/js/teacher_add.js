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

            		    $('#submit_btn').html($.i18n.prop('submit'));


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
    document.getElementById('class').value = document.getElementById('class0').options[document.getElementById('class0').selectedIndex].value;
    addClass();
 }

var classnos=[];

function addClass(){
    var classno=$("#class").val();
    if(!classno) return;
    for(var k=0;k<classnos.length;k++){
        if(classnos[k]==classno) return;
    }
    classnos.push(classno);
    $("#class_content_td").append(
              '<div id="class_div_'+classno+'">'+
              '<div style="float:left;width:150px;height:25px">'+
              '<div style="float:left;margin-top:3px">'+
              '<input type="text"  value="'+classno+'" style="float:left;position:absolute; width:140px;height:22px  border:1px solid"/>'+
              '</div>'+
              '</div>'+
              '<a href="#"><img id="class_img_'+classno+'" style="float:left;" src="/image/delete.png" onclick="deleteClass(this.id)"/></a>'+
              '<div style="clear:both"></div>'+
              '</div>'
    );
}

Array.prototype.indexOf = function(val) {
for (var i = 0; i < this.length; i++) {
if (this[i] == val) return i;
}
return -1;
};

Array.prototype.remove = function(val) {
var index = this.indexOf(val);
if (index > -1) {
this.splice(index, 1);
}
};

 function deleteClass(id){
    var classno=id.substring(10,id.length);
    classnos.remove(classno);
    $("#class_div_"+classno).remove();
//    alert(classnos);
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
	var name=$("#name").val();
    var email=$("#email").val();
    var telephone=$("#telephone").val();
    var birthday=$("#birthday").val();
    var location=$("#location").val();
    var start_date=$("#start_date").val();
    var contract_date=$("#contract_date").val();
    var title=$("#title").val();
    var subject=$("#subject").val();
    var sex=$("input[name='sex']:checked").val()
    var is_advisor=$("input[name='is_advisor']:checked").val()
    
    if(!classnos || classnos.length==0){
    	alert($.i18n.prop('please_add_classno_info'));
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
    if(!title){
    	alert($.i18n.prop('please_add_title_info'));
    	return;
    }
    if(title.length>16){
    	alert($.i18n.prop('title_out_of_length'));
    	return;
    }
    if(!subject){
    	alert($.i18n.prop('please_add_subject_info'));
    	return;
    }
    if(subject.length>16){
    	alert($.i18n.prop('subject_out_of_length'));
    	return;
    }
    if(!start_date){
    	alert($.i18n.prop('please_add_start_date_info'));
    	return;
    }
    if(!contract_date){
    	alert($.i18n.prop('please_add_contract_info'));
    	return;
    }
    
    return true;
}
 
function addTeacher(){
	if(!inputValidation()){
		return;
	}
	
    var name=$("#name").val();
    var email=$("#email").val();
    var telephone=$("#telephone").val();
    var birthday=$("#birthday").val();
    var location=$("#location").val();
    var start_date=$("#start_date").val();
    var contract_date=$("#contract_date").val();
    var title=$("#title").val();
    var subject=$("#subject").val();
    var sex=$("input[name='sex']:checked").val()
    var is_advisor=$("input[name='is_advisor']:checked").val()

    var options={   name:name,
                    email:email,
                    telephone:telephone,
                    birthday:birthday,
                    location:location,
                    start_date:start_date,
                    contract_date:contract_date,
                    title:title,
                    subject:subject,
                    sex:sex,
                    is_advisor:is_advisor
         }
    var url='/teacher/addTeacher?';
    for(var k=0;k<classnos.length;k++) url+="classnos="+classnos[k]+"&";

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
                                    alert($.i18n.prop("S")+", "+$.i18n.prop("teacher_id")+": "+msg);
                                }
                                return;
                            }
                    });
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
    for(var k=0;k<classnos.length;k++){
    	$("#class_div_"+classnos[k]).remove();
    }
    classnos=[];

    getClassnos();
    getSubjects();
}

function initialSelect(){
    getClassnos();
    getSubjects();
}

$(function(){
    	initDateInput();
//    	loadProperties();
//    	loadProperties2();
//
//    	initialSelect();
});