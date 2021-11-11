/*******************************************************************************
 * Copyright (c) 2018-2026 lucywu.com
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Lucy Wu - initial API and implementation
 *******************************************************************************/

package com.lucywu.xroster.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lucywu.xroster.util.JdbcUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.*;

@RestController
public class RestGradeController {
	private JdbcTemplate jdbcTemplate;

    @Autowired
    public RestGradeController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //http://localhost:8080/grade/getExamList
    @RequestMapping("/grade/getExamList")
    public List<Map<String,Object>> getExamList() {
        System.out.println("/grade/getExamList");

        return jdbcTemplate.queryForList("select * from tbl_exam order by start_date  desc limit 1000;");
    }

    //http://localhost:8080/grade/getSubjectList
    @RequestMapping("/grade/getSubjectList")
    public List<String> getSubjectList() {
        System.out.println("/grade/getSubjectList");

        return jdbcTemplate.queryForList("select distinct subject from tbl_teacher union select distinct subject from tbl_grade union select distinct subject from tbl_gradesub;",String.class);
    }


    //http://localhost:8080/grade/addExam?name=final exam of 2015&start_date=2015-11-29&end_date=2015-12-31
    @RequestMapping("/grade/addExam")
    public String addExam(String name, String start_date, String end_date){
        System.out.println("/grade/addExam "+name+" "+start_date+" "+end_date);

        String sql="insert into tbl_exam (name,start_date,end_date) values(?,?,?)";
        List<Object> params=new ArrayList<Object>();
        params.add(name);
        params.add(Date.valueOf(start_date));
        params.add(Date.valueOf(end_date));
        Integer id=null;
        try{
            id= JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
        }catch (Exception e){
            e.printStackTrace();
            return "F";
        }
        return "S";
    }

    //http://localhost:8080/grade/addGrade?subject=math&point=98&exam_id=2&student_id=2
    @RequestMapping("/grade/addGrade")
    public String addGrade(String subject, Double point, Integer exam_id, Integer student_id){
        System.out.println("/grade/addGrade "+subject+" "+point+" "+exam_id+" "+student_id);

        String sql="insert into tbl_grade (subject,point,exam_id,student_id) values(?,?,?,?)";
        List<Object> params=new ArrayList<Object>();
        params.add(subject);
        params.add(point);
        params.add(exam_id);
        params.add(student_id);
        Integer id=null;
        try{
            id= JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
        }catch (Exception e){
            e.printStackTrace();
            return "F";
        }
        return "S";
    }

    //http://localhost:8080/grade/addGrades?exam_id=&name=2018-4-big exam&start_date=2018-4-3&end_date=2018-4-4&subject=chemistry&points=98&student_ids=2&points=96&student_ids=3&
    @RequestMapping("/grade/addGrades")
    public String addGrades(Integer exam_id, String name, String start_date, String end_date, String subject, Double[] points, Integer[] student_ids){
        System.out.println("/grade/addGrades "+exam_id+" "+name+" "+start_date+" "+end_date+" "+subject);
        System.out.println(Arrays.toString(student_ids));
        System.out.println(Arrays.toString(points));

        if(exam_id==null || exam_id<=0){
            String sql="insert into tbl_exam (name,start_date,end_date) values(?,?,?)";
            List<Object> params=new ArrayList<Object>();
            params.add(name);
            params.add(Date.valueOf(start_date));
            params.add(Date.valueOf(end_date));
            try{
                exam_id= JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
            }catch (Exception e){
                e.printStackTrace();
                return "F";
            }
        }

        for(int k=0;k<student_ids.length;k++){
        	if(points[k]<0) continue;//!!!!!!!!!important!!!!!!!!!!!!
        	int num=jdbcTemplate.queryForObject("select count(*) from tbl_grade where student_id=? and exam_id=? and subject=?",
        			new Object[]{student_ids[k],exam_id,subject},Integer.class);
        	if(num==0){
        		String sql="insert into tbl_grade (subject,point,exam_id,student_id) values(?,?,?,?)";
                List<Object> params=new ArrayList<Object>();
                params.add(subject);
                params.add(points[k]);
                params.add(exam_id);
                params.add(student_ids[k]);
                Integer id=null;
                try{
                    id= JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
                }catch (Exception e){
                    e.printStackTrace();
                    return "F";
                }
        	}
        	else{
        		try{
        			jdbcTemplate.execute("update tbl_grade set point="+points[k]+" where student_id="+student_ids[k]+" and exam_id="+exam_id+" and subject='"+subject+"'");
        		}catch (Exception e){
                    e.printStackTrace();
                    return "F";
                }
        	}
        }
        return "S";
    }

    //http://localhost:8080/grade/cstimport?exam_id=&name=2018-4-big exam&start_date=2018-4-3&end_date=2018-4-4&subject=chemistry&objs=[]
    @RequestMapping(value = "/grade/cstimport", method = RequestMethod.POST)
    public String cstimport(Integer exam_id, String name, String start_date, String end_date, String subject, String objs){
        System.out.println("/grade/cstimport "+exam_id+" "+name+" "+start_date+" "+end_date+" "+subject);
        System.out.println(objs);

        if(exam_id==null || exam_id<=0){
            String sql="insert into tbl_exam (name,start_date,end_date) values(?,?,?)";
            List<Object> params=new ArrayList<Object>();
            params.add(name);
            params.add(Date.valueOf(start_date));
            params.add(Date.valueOf(end_date));
            try{
                exam_id= JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
            }catch (Exception e){
                e.printStackTrace();
                return "F";
            }
        }

        List<Map<String,Object>> results=null;
        try{
            results = new ObjectMapper().readValue(objs, List.class);
            System.out.println(results);
        }catch(Exception e){
            e.printStackTrace();
            return "F";
        }

        //fulfill students

        Map<Integer,String> students=new HashMap<Integer,String>();
        Map<Integer,String> student_classno=new HashMap<Integer,String>();
        for(Map<String,Object> result:results) {
            String classno=result.get("classno")+"";
            List<Map<String, Object>> grades = (List<Map<String, Object>>) result.get("grades");
            List<Map<String, Object>> gradesubs = (List<Map<String, Object>>) result.get("gradesubs");

            for(Map<String,Object> grade:grades){
                students.put(Integer.valueOf(grade.get("student_id")+""),grade.get("name")+"");
                student_classno.put(Integer.valueOf(grade.get("student_id")+""),classno);
            }

            for(Map<String,Object> gradesub:gradesubs){
                students.put(Integer.valueOf(gradesub.get("student_id")+""),gradesub.get("name")+"");
                student_classno.put(Integer.valueOf(gradesub.get("student_id")+""),classno);
            }
        }
        for(Map.Entry<Integer,String> student:students.entrySet()){
            int id=student.getKey();
            String nm=student.getValue();
            String classno=student_classno.get(id);

            int num=jdbcTemplate.queryForObject("select count(*) from tbl_student where id=?",new Object[]{id},Integer.class);

            if(num==0){
                String sql="insert into tbl_student(id,name,classno) values(?,?,?)";
                List<Object> params=new ArrayList<Object>();
                params.add(id);
                params.add(nm);
                params.add(classno);
                try{
                    JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
                }catch (Exception e){
                    e.printStackTrace();
                    return "F";
                }
            }
            else{
                String sql="update tbl_student set name='"+nm+"', classno='"+classno+"' where id="+id;
                try{
                    jdbcTemplate.execute(sql);
                }catch (Exception e){
                    e.printStackTrace();
                    return "F";
                }
            }
        }

        for(Map<String,Object> result:results){
            List<Map<String,Object>> grades=(List<Map<String,Object>>)result.get("grades");
            List<Map<String,Object>> gradesubs=(List<Map<String,Object>>)result.get("gradesubs");

            //edit grades
            for(Map<String,Object> grade:grades){
                if(Double.valueOf(grade.get("point")+"")<0) continue;//!!!!!!!!!important!!!!!!!!!!!!
                int num=jdbcTemplate.queryForObject("select count(*) from tbl_grade where student_id=? and exam_id=? and subject=?",
                        new Object[]{Integer.valueOf(grade.get("student_id")+""),exam_id,subject},Integer.class);
                if(num==0){
                    String sql="insert into tbl_grade (subject,point,exam_id,student_id) values(?,?,?,?)";
                    List<Object> params=new ArrayList<Object>();
                    params.add(subject);
                    params.add(Double.valueOf(grade.get("point")+""));
                    params.add(exam_id);
                    params.add(Integer.valueOf(grade.get("student_id")+""));
                    Integer id=null;
                    try{
                        id= JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
                    }catch (Exception e){
                        e.printStackTrace();
                        return "F";
                    }
                }
                else{
                    try{
                        jdbcTemplate.execute("update tbl_grade set point="+(Double.valueOf(grade.get("point")+""))+
                                " where student_id="+(Integer.valueOf(grade.get("student_id")+""))+" and exam_id="+exam_id+" and subject='"+subject+"'");
                    }catch (Exception e){
                        e.printStackTrace();
                        return "F";
                    }
                }
            }

            //edit gradesubs
            for(Map<String,Object> gradesub:gradesubs){
                if(Double.valueOf(gradesub.get("point")+"")<0) continue;
                int num=jdbcTemplate.queryForObject("select count(*) from tbl_gradesub where student_id=? and exam_id=? and subject=? and subjectsub=?",
                        new Object[]{Integer.valueOf(gradesub.get("student_id")+""),exam_id,subject,gradesub.get("subjectsub")+""},Integer.class);
                if(num==0){
                    String sql="insert into tbl_gradesub (subject,point,exam_id,student_id,subjectsub) values(?,?,?,?,?)";
                    List<Object> params=new ArrayList<Object>();
                    params.add(subject);
                    params.add(Double.valueOf(gradesub.get("point")+""));
                    params.add(exam_id);
                    params.add(Integer.valueOf(gradesub.get("student_id")+""));
                    params.add(gradesub.get("subjectsub")+"");
                    Integer id=null;
                    try{
                        id= JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
                    }catch (Exception e){
                        e.printStackTrace();
                        return "F";
                    }
                }
                else{
                    try{
                        jdbcTemplate.execute("update tbl_gradesub set point="+(Double.valueOf(gradesub.get("point")+""))+" where student_id="+
                                (Integer.valueOf(gradesub.get("student_id")+""))+" and exam_id="+exam_id+" and subjectsub='"+
                                (gradesub.get("subjectsub")+"")+"' and subject='"+subject+"'");
                    }catch (Exception e){
                        e.printStackTrace();
                        return "F";
                    }
                }
            }
        }

        return "S";
    }


    //http://localhost:8080/grade/addGradesubs?exam_id=&name=2018-4-big exam&start_date=2018-4-3&end_date=2018-4-4&subject=chemistry&points=98&student_ids=2&points=96&student_ids=3&subjectsubs=reading&subjectsubs=writing
    @RequestMapping("/grade/addGradesubs")
    public String addGradesubs(Integer exam_id, String name, String start_date, String end_date, String subject, Double[] points, Integer[] student_ids,String[] subjectsubs){
        System.out.println("/grade/addGradesubs "+exam_id+" "+name+" "+start_date+" "+end_date+" "+subject);
        System.out.println(Arrays.toString(student_ids));
        System.out.println(Arrays.toString(points));
        System.out.println(Arrays.toString(subjectsubs));

        if(exam_id==null || exam_id<=0){
            String sql="insert into tbl_exam (name,start_date,end_date) values(?,?,?)";
            List<Object> params=new ArrayList<Object>();
            params.add(name);
            params.add(Date.valueOf(start_date));
            params.add(Date.valueOf(end_date));
            try{
                exam_id= JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
            }catch (Exception e){
                e.printStackTrace();
                return "F";
            }
        }

        for(int k=0;k<student_ids.length;k++){
            if(points[k]<0) continue;
            int num=jdbcTemplate.queryForObject("select count(*) from tbl_gradesub where student_id=? and exam_id=? and subject=? and subjectsub=?",
                    new Object[]{student_ids[k],exam_id,subject,subjectsubs[k]},Integer.class);
            if(num==0){
                String sql="insert into tbl_gradesub (subject,point,exam_id,student_id,subjectsub) values(?,?,?,?,?)";
                List<Object> params=new ArrayList<Object>();
                params.add(subject);
                params.add(points[k]);
                params.add(exam_id);
                params.add(student_ids[k]);
                params.add(subjectsubs[k]);
                Integer id=null;
                try{
                    id= JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
                }catch (Exception e){
                    e.printStackTrace();
                    return "F";
                }
            }
            else{
                try{
                    jdbcTemplate.execute("update tbl_gradesub set point="+points[k]+" where student_id="+student_ids[k]+" and exam_id="+exam_id+" and subjectsub='"+subjectsubs[k]+"' and subject='"+subject+"'");
                }catch (Exception e){
                    e.printStackTrace();
                    return "F";
                }
            }
        }
        return "S";
    }

    //http://localhost:8080/grade/queryGrades?subject=math&exam_id=2&student_id=2&classno=F1510
    @RequestMapping("/grade/queryGrades")
    public List<Map<String,Object>> queryGrades(String subject, Integer exam_id, Integer student_id, String classno){
        System.out.println("/grade/queryGrades "+subject+" "+exam_id+" "+student_id+" "+classno);

        String sql="select * from (select tbl_grade.exam_id, tbl_grade.student_id, tbl_grade.subject, tbl_grade.point, " +
                "tbl_student.name, tbl_student.sex,tbl_student.birthday,tbl_student.classno from tbl_grade,tbl_student " +
                "where tbl_grade.student_id=tbl_student.id) as t  where ";
        if(subject!=null && !subject.isEmpty()) sql+="subject='"+subject+"' and   ";
        if(exam_id!=null && exam_id!=0) sql+="exam_id="+exam_id+" and   ";
        if(student_id!=null && student_id!=0) sql+="student_id="+student_id+" and   ";
        if(classno!=null && !classno.isEmpty()) sql+="classno='"+classno+"' and   ";
        sql=sql.substring(0,sql.length()-6);
        return jdbcTemplate.queryForList(sql);
    }
    
   //http://localhost:8080/grade/queryExistedGrades?classno=M1303&exam_id=38&subject=English
    @RequestMapping("/grade/queryExistedGrades")
    public List<Map<String,Object>> queryExistedGrades (String subject, Integer exam_id, String classno){
        System.out.println("/grade/queryExistedGrades "+subject+" "+exam_id+" "+classno);

    	String sql="select * from (select t.*, tbl_grade.exam_id,tbl_grade.point,tbl_grade.subject from  " +
        		"(select tbl_student.id as student_id, name, classno, sex, birthday  from tbl_student) as t  " +
        		"join tbl_grade on t.student_id=tbl_grade.student_id) as x where classno=? and exam_id=? and subject=? ";
        
        return jdbcTemplate.queryForList(sql,classno,exam_id,subject);
    }

    //http://localhost:8080/grade/queryExistedGradesubs?classno=M1303&exam_id=38&subject=English
    @RequestMapping("/grade/queryExistedGradesubs")
    public List<Map<String,Object>> queryExistedGradesubs (String subject, Integer exam_id, String classno){
        System.out.println("/grade/queryExistedGradesubs "+subject+" "+exam_id+" "+classno);

        String sql="select * from (select t.*, tbl_gradesub.exam_id,tbl_gradesub.point,tbl_gradesub.subject,tbl_gradesub.subjectsub from  " +
                "(select tbl_student.id as student_id, name, classno, sex, birthday  from tbl_student) as t  " +
                "join tbl_gradesub on t.student_id=tbl_gradesub.student_id) as x where classno=? and exam_id=? and subject=? ";

        return jdbcTemplate.queryForList(sql,classno,exam_id,subject);
    }
}
