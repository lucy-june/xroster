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
            		    $('#subject').attr("placeholder",$.i18n.prop('subject'))
            		    $('#start_date').attr("placeholder",$.i18n.prop('start_date2'));
            		    $('#end_date').attr("placeholder",$.i18n.prop('end_date'));

            		    $('#query_btn').html($.i18n.prop('create_account_for_student'));
            		    $('#xquery_btn').html($.i18n.prop('create_account_for_teacher'));
            		    $('#grade').attr("placeholder",$.i18n.prop('grade'));
            		    $('#teacher_id').attr("placeholder",$.i18n.prop('teacher_id'));
        //    		    $('#exam').attr("placeholder",$.i18n.prop('exam_name'));
        //                $('#subject').attr("placeholder",$.i18n.prop('subject'));

        $('#name_lb').html($.i18n.prop('name_lb'));
        $('#account_lb').html($.i18n.prop('account_lb'));
        $('#password_lb').html($.i18n.prop('password_lb'));
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




 function getXgrades(){
        $.ajax({ 'async': true,
                'url': '/account/getGrades',
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
                    $("#xgrade").empty();
                    $("#xgrade").append("<option value=''>"+$.i18n.prop('please_select_grade')+"</option>");
                    for(var k=0;k<msg.length;k++){
                        $("#xgrade").append("<option value='"+msg[k].grade+"'>"+msg[k].grade+"</option>");
                    }
                    return;
                }
        });
 }

 function changeXgrade(){
    var xgrade=document.getElementById('xgrade').options[document.getElementById('xgrade').selectedIndex].value;
    if(!xgrade){
        getXclasses();
        getTeachers();
        return;
    }
    var xclassnos=xclasses2[xgrade];
    var teacher_ids=teacher_ids3[xgrade];

    $("#xclass").empty();
    $("#xclass").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
    for(var k=0;k<xclassnos.length;k++){
        $("#xclass").append("<option value='"+xclassnos[k]+"'>"+xclassnos[k]+"</option>");
    }

    $("#teacher_id").empty();
    $("#teacher_id").append("<option value=''>"+$.i18n.prop('please_select_teacher_id')+"</option>");
    for(var k=0;k<teacher_ids.length;k++){
       $("#teacher_id").append("<option value='"+teacher_ids[k]+"'>"+teacher_ids[k]+"</option>");
    }
 }

var xclasses1=[];
var xclasses2=[];
 function getXclasses(){
        $.ajax({ 'async': true,
                'url': '/account/getClasses',
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
                	xclasses1=[];
                	xclasses2=[];
                	
                    $("#xclass").empty();
                    $("#xclass").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
                    for(var k=0;k<msg.length;k++){
                        xclasses1[msg[k].classno]=msg[k].grade;
                        if(!xclasses2[msg[k].grade]){
                            xclasses2[msg[k].grade]=[];
                        }
                        xclasses2[msg[k].grade].push(msg[k].classno);
                        $("#xclass").append("<option value='"+msg[k].classno+"'>"+msg[k].classno+"</option>");
                    }
                    return;
                }
        });
 }

 function changeXclass(){
    var xclassno=document.getElementById('xclass').options[document.getElementById('xclass').selectedIndex].value;
    if(!xclassno){
        var xgrade=document.getElementById('xgrade').options[document.getElementById('xgrade').selectedIndex].value;
        if(!xgrade){
            getXclasses();
            getTeachers();
            return
        }
        var xclassnos=xclasses2[xgrade];
        var teacher_ids=teacher_ids3[xgrade];

        $("#xclass").empty();
        $("#xclass").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
        for(var k=0;k<xclassnos.length;k++){
                $("#xclass").append("<option value='"+xclassnos[k]+"'>"+xclassnos[k]+"</option>");
        }

        $("#teacher_id").empty();
        $("#teacher_id").append("<option value=''>"+$.i18n.prop('please_select_teacher_id')+"</option>");
        for(var k=0;k<teacher_ids.length;k++){
               $("#teacher_id").append("<option value='"+teacher_ids[k]+"'>"+teacher_ids[k]+"</option>");
        }
        return;
    }

        var xgrade=xclasses1[xclassno];
        var xclassnos=xclasses2[xgrade];
        var teacher_ids=teacher_ids2[xclassno];

        $("#xgrade").val(xgrade);

        $("#xclass").empty();
        $("#xclass").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
        for(var k=0;k<xclassnos.length;k++){
                $("#xclass").append("<option value='"+xclassnos[k]+"'>"+xclassnos[k]+"</option>");
        }
         $("#xclass").val(xclassno);

        $("#teacher_id").empty();
        $("#teacher_id").append("<option value=''>"+$.i18n.prop('please_select_teacher_id')+"</option>");
        for(var k=0;k<teacher_ids.length;k++){
           $("#teacher_id").append("<option value='"+teacher_ids[k]+"'>"+teacher_ids[k]+"</option>");
        }
 }


 var teachers=[];
 var distinct_teachers=[];
 var teacher_ids1=[];
 var teacher_ids2=[];
 var teacher_ids3=[];
  function getTeachers(){
         $.ajax({ 'async': true,
                 'url': '/account/getTeachers',
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
                	 teacher_ids1=[];
                	 teacher_ids2=[];
                	 teacher_ids3=[];
                	 distinct_teachers=[];
                	 
                	 teachers=msg;
                     $("#teacher_id").empty();
                     $("#teacher_id").append("<option value=''>"+$.i18n.prop('please_select_teacher_id')+"</option>");
                     for(var k=0;k<msg.length;k++){
                         teacher_ids1[msg[k].teacher_id]=msg[k];
                         if(!teacher_ids2[msg[k].classno]){
                              teacher_ids2[msg[k].classno]=[];
                         }
                         teacher_ids2[msg[k].classno].push(msg[k].teacher_id);
                         if(!teacher_ids3[msg[k].grade]){
                              teacher_ids3[msg[k].grade]=[];
                         }
                         teacher_ids3[msg[k].grade].push(msg[k].teacher_id);
                         if(distinct_teachers.indexOf(msg[k].teacher_id)>=0) continue;
                         distinct_teachers.push(msg[k].teacher_id);
                         $("#teacher_id").append("<option value='"+msg[k].teacher_id+"'>"+msg[k].teacher_id+"</option>");
                     }
                     return;
                 }
         });
  }

  function changeTeacher(){
//     var teacher_id=document.getElementById('teacher_id').options[document.getElementById('teacher_id').selectedIndex].value;
//     if(!teacher_id){
//        var xclassno=document.getElementById('xclass').options[document.getElementById('xclass').selectedIndex].value;
//        if(!xclassno){
//                var xgrade=document.getElementById('xgrade').options[document.getElementById('xgrade').selectedIndex].value;
//                if(!xgrade){
//                    getXclasses();
//                    getTeachers();
//                    return
//                }
//                var xclassnos=xclasses2[xgrade];
//                var teacher_ids=teacher_ids3[xgrade];
//
//                $("#xclass").empty();
//                $("#xclass").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
//                for(var k=0;k<xclassnos.length;k++){
//                        $("#xclass").append("<option value='"+xclassnos[k]+"'>"+xclassnos[k]+"</option>");
//                }
//
//                $("#teacher_id").empty();
//                $("#teacher_id").append("<option value=''>"+$.i18n.prop('please_select_teacher_id')+"</option>");
//                for(var k=0;k<teacher_ids.length;k++){
//                       $("#teacher_id").append("<option value='"+teacher_ids[k]+"'>"+teacher_ids[k]+"</option>");
//                }
//                return;
//            }
//
//                var xgrade=xclasses1[xclassno];
//                var xclassnos=xclasses2[xgrade];
//                var teacher_ids=teacher_ids2[xclassno];
//
//                $("#xgrade").val(xgrade);
//
//                $("#xclass").empty();
//                $("#xclass").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
//                for(var k=0;k<xclassnos.length;k++){
//                        $("#xclass").append("<option value='"+xclassnos[k]+"'>"+xclassnos[k]+"</option>");
//                }
//                 $("#xclass").val(xclassno);
//
//                $("#teacher_id").empty();
//                $("#teacher_id").append("<option value=''>"+$.i18n.prop('please_select_teacher_id')+"</option>");
//                for(var k=0;k<teacher_ids.length;k++){
//                   $("#teacher_id").append("<option value='"+teacher_ids[k]+"'>"+teacher_ids[k]+"</option>");
//                }
//
//        return;
//     }
//             var xclassno=teacher_ids1[teacher_id].classno;
//             var xgrade=teacher_ids1[teacher_id].grade;
//
//             $("#xclass").val(xclassno);
//             $("#xgrade").val(xgrade);
	  
	  var xgrade=document.getElementById('xgrade').options[document.getElementById('xgrade').selectedIndex].value;
	  var xclassno=document.getElementById('xclass').options[document.getElementById('xclass').selectedIndex].value;
	  var teacher_id=document.getElementById('teacher_id').options[document.getElementById('teacher_id').selectedIndex].value;
//	  alert("###"+xgrade+"$$$"+xclassno+"&&"+teacher_id);
	 
	  if(!xgrade){
		  for(var k=0;k<teachers.length;k++){
//			  alert(JSON.stringify(teachers[k]));
			  if(teachers[k].teacher_id==teacher_id){
				  $("#xclass").val(teachers[k].classno);
				  $("#xgrade").val(teachers[k].grade);
				  break;
			  }
		  }
	  }
	  else if(!xclassno){
		  for(var k=0;k<teachers.length;k++){
//			  alert(JSON.stringify(teachers[k]));
			  if(teachers[k].grade==xgrade && teachers[k].teacher_id==teacher_id){
				  $("#xclass").val(teachers[k].classno);
				  break;
			  }
		  }
	  }
  }


  
  
  
  function getAllGrades(){
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
                  
                  $("#xgrade").empty();
                  $("#xgrade").append("<option value=''>"+$.i18n.prop('please_select_grade')+"</option>");
                  for(var k=0;k<msg.length;k++){
                      $("#xgrade").append("<option value='"+msg[k].grade+"'>"+msg[k].grade+"</option>");
                  }
                  return;
              }
      });
}

function getAllClasses(){
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
                  
                  
              	xclasses1=[];
              	xclasses2=[];
              	
                  $("#xclass").empty();
                  $("#xclass").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
                  for(var k=0;k<msg.length;k++){
                      xclasses1[msg[k].classno]=msg[k].grade;
                      if(!xclasses2[msg[k].grade]){
                          xclasses2[msg[k].grade]=[];
                      }
                      xclasses2[msg[k].grade].push(msg[k].classno);
                      $("#xclass").append("<option value='"+msg[k].classno+"'>"+msg[k].classno+"</option>");
                  }
                  return;
              }
      });
}

  




function query(){
    var student_id=$("#student_id").val();
    if(!student_id){
    	$("#account_tb").attr("style","display:none");
		$("#message_lb").attr("style","");
		$("#message_lb").html($.i18n.prop('no_select_student_id'));
    	return;
    }

    if(student_id.indexOf(" ")>=0){
        student_id=student_id.substring(0,student_id.indexOf(" "));
    }
    var options={
            student_id:student_id
    }

//alert(JSON.stringify(options));
//    clearAll();

    $.ajax({ 'async': true,
                           'url': '/account/createAccount',
                           'type': 'get',
                           'data': options,
                           'datatype': 'html',
                           'timeout': 30000,
                           'error': function (msg) {
                               //alert(JSON.stringify(msg)); 
                               $("#account_tb").attr("style","display:none");
                               $("#message_lb").attr("style","");
                               $("#message_lb").html($.i18n.prop('system_error'));
                               return;
                           },
                           'success': function (msg) {
//                               gradesArr=msg;
//                               jQuery("#gradesTable").clearGridData();
//                               jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');
                               if(!msg || !msg.email){
                                        $("#account_tb").attr("style","display:none");
                                        $("#message_lb").attr("style","");
                                        $("#message_lb").html($.i18n.prop('no_email'));
                                        return;
                               }
                               displayAccount(msg);
                               jQuery("#accountsTable").clearGridData();
                               jQuery("#accountsTable").jqGrid('setGridParam', {data: []}).trigger('reloadGrid');

                               return;
                           }
         });
}

//http://localhost:8080/analysis/queryRadar?grade=M12&classno=M1201&student_id=1125
function xquery(){
    var teacher_id=$("#teacher_id").val();
    if(!teacher_id){
    	$("#account_tb").attr("style","display:none");
		$("#message_lb").attr("style","");
		$("#message_lb").html($.i18n.prop('no_select_teacher_id'));
    	return;
    }

    if(teacher_id.indexOf(" ")>=0){
            teacher_id=teacher_id.substring(0,teacher_id.indexOf(" "));
    }
    
        var options={
                teacher_id:teacher_id
        }

    //alert(JSON.stringify(options));
    //    clearAll();

    $.ajax({ 'async': true,
                               'url': '/account/createAccount',
                               'type': 'get',
                               'data': options,
                               'datatype': 'html',
                               'timeout': 30000,
                               'error': function (msg) {
                                   //alert(JSON.stringify(msg));
                                   $("#account_tb").attr("style","display:none");
                                   $("#message_lb").attr("style","");
                                   $("#message_lb").html($.i18n.prop('system_error'));
                                   return;
                               },
                               'success': function (msg) {
    //                               gradesArr=msg;
    //                               jQuery("#gradesTable").clearGridData();
    //                               jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');
                                    if(!msg || !msg.email){
                                        $("#account_tb").attr("style","display:none");
                                        $("#message_lb").attr("style","");
                                        $("#message_lb").html($.i18n.prop('no_email'));
                                        return;
                                    }
                                   displayAccount(msg);
                                   jQuery("#accountsTable").clearGridData();
                                   jQuery("#accountsTable").jqGrid('setGridParam', {data: []}).trigger('reloadGrid');

                                   return;
                               }
    });
}




function displayAccount(msg){
	if(msg){
		$("#account_tb").attr("style","");
		$("#message_lb").attr("style","display:none");
	}
    $("#name_ip").val(msg.name);
    $("#account_ip").val(msg.email);
    $("#password_ip").val(msg.password);
}






function initialTable(){
    $("#tb_dv").empty();
    $("#tb_dv").html("<table id='accountsTable'></table> <div id='accountsDiv'></div>");
    jQuery("#accountsTable").jqGrid({
                url:"/account/queryAccounts",
                datatype: "json",
                height: 460,
                width: $("#tb_dv").width()*0.95,
                colNames: [
                     $.i18n.prop('id'),
                     $.i18n.prop('role'),
                     $.i18n.prop('ref_id'),
                     $.i18n.prop('account_name'),
                     $.i18n.prop('password')
                ],
                colModel: [
                    {name: 'id', index: 'id'},
                    {name: 'role', index: 'role', formatter: 'select', edittype: "select", editoptions: {value: "0:"+$.i18n.prop('admin_role')+";1:"+$.i18n.prop('teacher_role')+";2:"+$.i18n.prop('student_role')}},
                    {name: 'ref_id', index: 'ref_id'},
                    {name: 'email', index: 'email'},
                    {name: 'password', index: 'password'}
                ],
                rowNum: 30,
                rowList: [10, 30, 50],
                pager: '#accountsDiv',
                viewrecords: true,
                sortname: 'id',
                sortorder: "desc",
                caption: "",
                fitColumns: true,
                editurl: 'clientArray',
                onSelectRow: function () {

                },
                onSelectAll: function () {

                },
                loadComplete: function () {

                },
                gridComplete: function () {

                }
            });
            jQuery("#accountsTable").jqGrid('navGrid', "#accountsDiv", {search: false, edit: false, add: false, del: false})
            jQuery("#accountsTable").jqGrid('setGridParam', {data: []}).trigger('reloadGrid');
}


function initialSelect(){
//			getAllGrades();
//			getAllClasses();

            getGrades();
        	getClasses();
        	getStudents();

        	getXgrades();
            getXclasses();
            getTeachers();
}


$(function(){
    	initDateInput();
//    	loadProperties();
//    	loadProperties2();
//
//    	initialSelect();
//
//        initialTable();
});