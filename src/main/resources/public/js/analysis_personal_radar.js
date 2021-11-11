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
  
  





var data1=[];
var data2=[];


//http://localhost:8080/analysis/queryRadar?grade=M12&classno=M1201&student_id=1125
function query(){
    var grade=$("#grade").val();
    var classno=$("#class").val();
    var student_id=$("#student_id").val();
    
    if(!grade && !classno && !student_id){
    	alert($.i18n.prop("please_select_grade_classno_studentid"));
    	return;
    }

    if(student_id.indexOf(" ")>=0){
            student_id=student_id.substring(0,student_id.indexOf(" "));
        }

    var options={
            grade:grade,
            classno:classno,
            student_id:student_id
         }

//alert(JSON.stringify(options));
//    clearAll();

    $.ajax({ 'async': true,
                           'url': '/analysis/queryRadar',
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
                               data1=msg;
                               loadEchart(data1,data2);
                               return;
                           }
         });
}

//http://localhost:8080/analysis/queryRadar?grade=M12&classno=M1201&student_id=1125
function xquery(){
    var grade=$("#xgrade").val();
    var classno=$("#xclass").val();
    var student_id=$("#xstudent_id").val();

    if(!grade && !classno && !student_id){
    	alert($.i18n.prop("please_select_grade_classno_studentid"));
    	return;
    }

    if(student_id.indexOf(" ")>=0){
            student_id=student_id.substring(0,student_id.indexOf(" "));
        }

    var options={
            grade:grade,
            classno:classno,
            student_id:student_id
         }

//alert(JSON.stringify(options));
//    clearAll();

    $.ajax({ 'async': true,
                           'url': '/analysis/queryRadar',
                           'type': 'get',
                           'data': options,
                           'datatype': 'html',
                           'timeout': 60000,
                           'error': function (msg) {
                               //alert(JSON.stringify(msg)); 
 				 alert($.i18n.prop('system_error'));
                               return;
                           },
                           'success': function (msg) {
                               data2=msg;
                               loadEchart(data1,data2);
                               return;
                           }
         });
}


function loadEchart(data1,data2){
	
	for(var k=0;k<data1.length;k++){
		if(data1[k].k=="ExamBalance"||data1[k].k=="SubjectBalance"){
			data1[k].k=$.i18n.prop(data1[k].k);
		}
	}
	
	for(var k=0;k<data2.length;k++){
		if(data2[k].k=="ExamBalance"||data2[k].k=="SubjectBalance"){
			data2[k].k=$.i18n.prop(data2[k].k);
		}
	}
		
    var titles=[];
    var indicators=[];
    var datas=[];

    var t1="";
    var t2="";
    var tmp1=[];
    var tmp2=[];

    if(data1 && data1.length!=0){
        t1=data1[0].grade+" / ";
        if(data1[0].classno) {
            t1+=data1[0].classno+" / ";
            if(data1[0].student_id) {
                t1+=data1[0].student_id+" / ";
            }
        }
        titles.push(t1);

        for(var k=0;k<data1.length;k++){
            indicators.push({ text: data1[k].k, max: 1000});
            tmp1[data1[k].k]=data1[k];
        }
    }

    if(data2 && data2.length!=0){
        t2=data2[0].grade+"/";
                if(data2[0].classno) {
                    t2+=data2[0].classno+"/";
                    if(data2[0].student_id) {
                        t2+=data2[0].student_id+"/";
                    }
                }
                titles.push(t2);

                for(var k=0;k<data2.length;k++){
                    if(!tmp1[data2[k].k]){
                        indicators.push({ text: data2[k].k, max: 1000});
                    }
                    tmp2[data2[k].k]=data2[k];
                }
    }

    if(data1 && data1.length!=0){
            var obj={value:[],name:t1};
            for(var k=0;k<indicators.length;k++){
                if(!tmp1[indicators[k].text])
                    obj.value.push(0)
                else
                    obj.value.push(tmp1[indicators[k].text].v)
            }
            datas.push(obj);
    }

    if(data2 && data2.length!=0){
            var obj={value:[],name:t2};
            for(var k=0;k<indicators.length;k++){
                if(!tmp2[indicators[k].text])
                    obj.value.push(0)
                else
                    obj.value.push(tmp2[indicators[k].text].v)
            }
            datas.push(obj);
    }

//    alert(JSON.stringify(titles));
//    alert(JSON.stringify(indicators));
//    alert(JSON.stringify(datas));


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
                            'echarts/chart/radar' // require the specific chart type
                        ],
                        function (ec) {
                            // Initialize after dom ready
                            var myChart = ec.init(document.getElementById('main'));








            var option = {
                    title : {
//                        text: '预算 vs 开销（Budget vs spending）'
                        //subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        orient : 'vertical',
                        x : 'left',
                        y : 'top',
                        data: titles
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            restore : {show: true},
                            dataView : {show: true, readOnly: false},
                            saveAsImage : {show: true}
                        }
                    },
                    polar : [
                       {
                           indicator : indicators,
                            center : ['50%','46%'],
                            radius : 190
                        }
                    ],
                    calculable : true,
                    series : [
                        {
                            name: '',
                            type: 'radar',
                            data :datas
                        }
                    ]
                };


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
//            getGrades();
//        	getClasses();
//        	getStudents();
//
//        	getXgrades();
//            getXclasses();
//            getXstudents();
	
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