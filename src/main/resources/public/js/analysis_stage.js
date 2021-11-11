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

            		    $('#query_btn').html($.i18n.prop('query'));
            		    $('#xquery_btn').html($.i18n.prop('query'));
            		    $('#grade').attr("placeholder",$.i18n.prop('grade'));
        //    		    $('#exam').attr("placeholder",$.i18n.prop('exam_name'));
        //                $('#subject').attr("placeholder",$.i18n.prop('subject'));
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
                      $("#subject").append("<option value='Total'>"+$.i18n.prop('Total')+"</option>");
                      for(var k=0;k<msg.length;k++){
                          $("#subject").append("<option value='"+msg[k]+"'>"+msg[k]+"</option>");
                      }

                      return;
                  }
          });
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
           $("#start_date").val(exams[exam_id].start_date);
           $("#end_date").val(exams[exam_id].end_date);
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
        getXstudents();
        return;
    }
    var xclassnos=xclasses2[xgrade];
    var xstudent_ids=xstudent_ids3[xgrade];

    $("#xclass").empty();
    $("#xclass").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
    for(var k=0;k<xclassnos.length;k++){
        $("#xclass").append("<option value='"+xclassnos[k]+"'>"+xclassnos[k]+"</option>");
    }

    $("#xstudent_id").empty();
    $("#xstudent_id").append("<option value=''>"+$.i18n.prop('please_select_student_id')+"</option>");
    for(var k=0;k<xstudent_ids.length;k++){
       $("#xstudent_id").append("<option value='"+xstudent_ids[k]+"'>"+xstudent_ids[k]+"</option>");
    }
 }

var xclasses1=[];
var xclasses2=[];
 function getXclasses(){
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
            getXstudents();
            return
        }
        var xclassnos=xclasses2[xgrade];
        var xstudent_ids=xstudent_ids3[xgrade];

        $("#xclass").empty();
        $("#xclass").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
        for(var k=0;k<xclassnos.length;k++){
                $("#xclass").append("<option value='"+xclassnos[k]+"'>"+xclassnos[k]+"</option>");
        }

        $("#xstudent_id").empty();
        $("#xstudent_id").append("<option value=''>"+$.i18n.prop('please_select_student_id')+"</option>");
        for(var k=0;k<xstudent_ids.length;k++){
               $("#xstudent_id").append("<option value='"+xstudent_ids[k]+"'>"+xstudent_ids[k]+"</option>");
        }
        return;
    }

        var xgrade=xclasses1[xclassno];
        var xclassnos=xclasses2[xgrade];
        var xstudent_ids=xstudent_ids2[xclassno];

        $("#xgrade").val(xgrade);

        $("#xclass").empty();
        $("#xclass").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
        for(var k=0;k<xclassnos.length;k++){
                $("#xclass").append("<option value='"+xclassnos[k]+"'>"+xclassnos[k]+"</option>");
        }
         $("#xclass").val(xclassno);

        $("#xstudent_id").empty();
        $("#xstudent_id").append("<option value=''>"+$.i18n.prop('please_select_student_id')+"</option>");
        for(var k=0;k<xstudent_ids.length;k++){
           $("#xstudent_id").append("<option value='"+xstudent_ids[k]+"'>"+xstudent_ids[k]+"</option>");
        }
 }


 var xstudent_ids1=[];
 var xstudent_ids2=[];
 var xstudent_ids3=[];
  function getXstudents(){
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
                	 xstudent_ids1=[];
                	 xstudent_ids2=[];
                	 xstudent_ids3=[];
                	 
                     $("#xstudent_id").empty();
                     $("#xstudent_id").append("<option value=''>"+$.i18n.prop('please_select_student_id')+"</option>");
                     for(var k=0;k<msg.length;k++){
                         xstudent_ids1[msg[k].student_id]=msg[k];
                         if(!xstudent_ids2[msg[k].classno]){
                              xstudent_ids2[msg[k].classno]=[];
                         }
                         xstudent_ids2[msg[k].classno].push(msg[k].student_id);
                         if(!xstudent_ids3[msg[k].grade]){
                              xstudent_ids3[msg[k].grade]=[];
                         }
                         xstudent_ids3[msg[k].grade].push(msg[k].student_id);
                         $("#xstudent_id").append("<option value='"+msg[k].student_id+"'>"+msg[k].student_id+"</option>");
                     }
                     return;
                 }
         });
  }

  function changeXstudent(){
     var xstudent_id=document.getElementById('xstudent_id').options[document.getElementById('xstudent_id').selectedIndex].value;
     if(!xstudent_id){
        var xclassno=document.getElementById('xclass').options[document.getElementById('xclass').selectedIndex].value;
        if(!xclassno){
                var xgrade=document.getElementById('xgrade').options[document.getElementById('xgrade').selectedIndex].value;
                if(!xgrade){
                    getXclasses();
                    getXstudents();
                    return
                }
                var xclassnos=xclasses2[xgrade];
                var xstudent_ids=xstudent_ids3[xgrade];

                $("#xclass").empty();
                $("#xclass").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
                for(var k=0;k<xclassnos.length;k++){
                        $("#xclass").append("<option value='"+xclassnos[k]+"'>"+xclassnos[k]+"</option>");
                }

                $("#xstudent_id").empty();
                $("#xstudent_id").append("<option value=''>"+$.i18n.prop('please_select_student_id')+"</option>");
                for(var k=0;k<xstudent_ids.length;k++){
                       $("#xstudent_id").append("<option value='"+xstudent_ids[k]+"'>"+xstudent_ids[k]+"</option>");
                }
                return;
            }

                var xgrade=xclasses1[xclassno];
                var xclassnos=xclasses2[xgrade];
                var xstudent_ids=xstudent_ids2[xclassno];

                $("#xgrade").val(xgrade);

                $("#xclass").empty();
                $("#xclass").append("<option value=''>"+$.i18n.prop('please_select_classno')+"</option>");
                for(var k=0;k<xclassnos.length;k++){
                        $("#xclass").append("<option value='"+xclassnos[k]+"'>"+xclassnos[k]+"</option>");
                }
                 $("#xclass").val(xclassno);

                $("#xstudent_id").empty();
                $("#xstudent_id").append("<option value=''>"+$.i18n.prop('please_select_student_id')+"</option>");
                for(var k=0;k<xstudent_ids.length;k++){
                   $("#xstudent_id").append("<option value='"+xstudent_ids[k]+"'>"+xstudent_ids[k]+"</option>");
                }

        return;
     }
             var xclassno=xstudent_ids1[xstudent_id].classno;
             var xgrade=xstudent_ids1[xstudent_id].grade;

             $("#xclass").val(xclassno);
             $("#xgrade").val(xgrade);


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


function getAllStudents(){
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
                
                
           	 xstudent_ids1=[];
           	 xstudent_ids2=[];
           	 xstudent_ids3=[];
           	 
                $("#xstudent_id").empty();
                $("#xstudent_id").append("<option value=''>"+$.i18n.prop('please_select_student_id')+"</option>");
                for(var k=0;k<msg.length;k++){
                    xstudent_ids1[msg[k].student_id]=msg[k];
                    if(!xstudent_ids2[msg[k].classno]){
                         xstudent_ids2[msg[k].classno]=[];
                    }
                    xstudent_ids2[msg[k].classno].push(msg[k].student_id);
                    if(!xstudent_ids3[msg[k].grade]){
                         xstudent_ids3[msg[k].grade]=[];
                    }
                    xstudent_ids3[msg[k].grade].push(msg[k].student_id);
                    $("#xstudent_id").append("<option value='"+msg[k].student_id+"'>"+msg[k].student_id+"</option>");
                }
                return;
            }
    });
}
  
  
  





var data1=null;
var data2=null;


//http://localhost:8080/analysis/queryStages?exam_id=41&subject=Chinese&grade=M12&classno=M1201&a=10&b=20&c=30&d=40&e=50&f=60&g=70
function query(){
    var subject=$("#subject").val();
    var grade=$("#grade").val();
    var classno=$("#class").val();
    
    if(!exam_id){
    	alert($.i18n.prop("please_select_examid"));
    	return;
    }
    if(!subject){
    	alert($.i18n.prop("please_select_subject_name"));
    	return;
    }
    if(!grade && !classno){
    	alert($.i18n.prop("please_select_grade_classno"));
    	return;
    }

    var options={
            exam_id:exam_id,
            subject:subject,
            grade:grade,
            classno:classno
         }
    if(data2!=null){
        options.a=data2.a;
        options.b=data2.b;
        options.c=data2.c;
        options.d=data2.d;
        options.e=data2.e;
        options.f=data2.f;
        options.g=data2.g;
    }

//alert(JSON.stringify(options));
//    clearAll();

    $.ajax({ 'async': true,
                           'url': '/analysis/queryStages',
                           'type': 'get',
                           'data': options,
                           'datatype': 'html',
                           'timeout': 30000,
                           'error': function (msg) {
                        	   loadEchart(null,null);
                               return;
                           },
                           'success': function (msg) {
//                               gradesArr=msg;
//                               jQuery("#gradesTable").clearGridData();
//                               jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');
                               data1=msg;
                               loadEchart(data1,data2);
                               return;
                           }
         });
}

//http://localhost:8080/analysis/queryRadar?grade=M12&classno=M1201&student_id=1125
function xquery(){
    var subject=$("#subject").val();
    var grade=$("#xgrade").val();
    var classno=$("#xclass").val();
    
    if(!exam_id){
    	alert($.i18n.prop("please_select_examid"));
    	return;
    }
    if(!subject){
    	alert($.i18n.prop("please_select_subject_name"));
    	return;
    }
    if(!grade && !classno){
    	alert($.i18n.prop("please_select_grade_classno"));
    	return;
    }

    var options={
                exam_id:exam_id,
                subject:subject,
                grade:grade,
                classno:classno
             }
        if(data1!=null){
            options.a=data1.a;
            options.b=data1.b;
            options.c=data1.c;
            options.d=data1.d;
            options.e=data1.e;
            options.f=data1.f;
            options.g=data1.g;
        }

//alert(JSON.stringify(options));
//    clearAll();

    $.ajax({ 'async': true,
                               'url': '/analysis/queryStages',
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
    //                               gradesArr=msg;
    //                               jQuery("#gradesTable").clearGridData();
    //                               jQuery("#gradesTable").jqGrid('setGridParam', {data: gradesArr}).trigger('reloadGrid');
                                   data2=msg;
                                   loadEchart(data1,data2);
                                   return;
                               }
             });
}


function loadEchart(data1,data2){
    var titles=[];
    var series1=
    {
                                    name:'',
                                    type:'pie',
                                    radius : [30, 80],

                        //             for funnel
                                    x: '60%',
                                    width: '35%',
                                    center: ['50%', '43%'],
                                    funnelAlign: 'left',
                                    max: 1048,

                                    data:[

                                    ]
    };
//    {
//                                name:'',
//                                type:'pie',
//                                selectedMode: 'single',
//                                radius : [0, 130],
//
//                    //             for funnel
//                                x: '20%',
//                                width: '40%',
//                                center: ['50%', '35%'],
//                                funnelAlign: 'right',
//                                max: 1548,
//
//                                itemStyle : {
//                                    normal : {
//                                        label : {
//                                            position : 'inner'
//                                        },
//                                        labelLine : {
//                                            show : false
//                                        }
//                                    }
//                                },
//                                data:[
//
//                                ]
//        };

        var series2={
                                name:'',
                                type:'pie',
                                radius : [180, 230],

                    //             for funnel
                                x: '60%',
                                width: '35%',
                                center: ['50%', '43%'],
                                funnelAlign: 'left',
                                max: 1048,

                                data:[

                                ]
        };


    if(data1){
        titles=[
        "< "+data1.a,
        data1.a+" ~ "+data1.b,
        data1.b+" ~ "+data1.c,
        data1.c+" ~ "+data1.d,
        data1.d+" ~ "+data1.e,
        data1.e+" ~ "+data1.f,
        data1.f+" ~ "+data1.g,
        ">= "+data1.g
        ];

        series1.name = data1.grade+" / ";
        if(data1.classno) series1.name+=data1.classno+" / ";

        series1.data.push({value:data1.count1, name:titles[0], selected:true})
        series1.data.push({value:data1.count2, name:titles[1]})
        series1.data.push({value:data1.count3, name:titles[2]})
        series1.data.push({value:data1.count4, name:titles[3]})
        series1.data.push({value:data1.count5, name:titles[4]})
        series1.data.push({value:data1.count6, name:titles[5]})
        series1.data.push({value:data1.count7, name:titles[6]})
        series1.data.push({value:data1.count8, name:titles[7]})
    }

    if(data2){
        titles=[
                "< "+data2.a,
                data2.a+" ~ "+data2.b,
                data2.b+" ~ "+data2.c,
                data2.c+" ~ "+data2.d,
                data2.d+" ~ "+data2.e,
                data2.e+" ~ "+data2.f,
                data2.f+" ~ "+data2.g,
                ">= "+data2.g
        ];

         series2.name = data2.grade+" / ";
         if(data2.classno) series2.name+=data2.classno+" / ";

                series2.data.push({value:data2.count1, name:titles[0], selected:true})
                series2.data.push({value:data2.count2, name:titles[1]})
                series2.data.push({value:data2.count3, name:titles[2]})
                series2.data.push({value:data2.count4, name:titles[3]})
                series2.data.push({value:data2.count5, name:titles[4]})
                series2.data.push({value:data2.count6, name:titles[5]})
                series2.data.push({value:data2.count7, name:titles[6]})
                series2.data.push({value:data2.count8, name:titles[7]})
    }




    require.config({
                        paths: {
                            echarts: 'http://localhost:8080/lib/echarts-2.2.7'
            				//echarts: 'http://echarts.baidu.com/build/dist'
                        }
                    });

                    // use
                    require(
                        [
                            'echarts',
                            'echarts/chart/pie' // require the specific chart type
                        ],
                        function (ec) {
                            // Initialize after dom ready
                            var myChart = ec.init(document.getElementById('main'));






var option = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:titles
    },
    toolbox: {
        show : true,
        feature : {
            restore : {show: true},
            dataView : {show: true, readOnly: false},
            saveAsImage : {show: true}
        }
    },
    calculable : false,
    series : [

    ]
};

if(data1){
    option.series.push(series1);
}
if(data2){
    option.series.push(series2);
}
if(!data1 && !data2){

     option.series.push(
    {
        name:'',
        type:'pie',
        radius : [150, 200],
        x: '60%',
        width: '35%',
        center: ['50%', '43%'],
        funnelAlign: 'left',
        max: 1048,
        data:[]
    });
}




                            // Load data into the ECharts instance
                            myChart.setOption(option);
                        }
                    );
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
        getExams();
        getSubjects();

//    	getGrades();
//    	getClasses();
//    	getStudents();
//
//    	getXgrades();
//        getXclasses();
//        getXstudents();
        
        getAllGrades();
    	getAllClasses();
    	getAllStudents();
}

$(function(){


    	initDateInput();
//    	loadProperties();
//    	loadProperties2();
//
//        initialSelect();

    	loadEchart(data1,data2);

        InitLoadingSpinner();
});