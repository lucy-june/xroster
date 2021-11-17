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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucywu.xroster.util.JdbcUtil;
import com.lucywu.xroster.util.PwdUtil;
import com.lucywu.xroster.util.StringUtil;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class RestStudentController {
	private JdbcTemplate jdbcTemplate;

    @Autowired
    public RestStudentController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    ///student/getClassList
    @RequestMapping("/student/getClassList")
    public List<String> getClassList() {
        System.out.println("/student/getClassList");

        List<String> result=jdbcTemplate.queryForList("select distinct classno from tbl_student order by classno",String.class);
        return result;
    }

    ///student/addStudent?name=xiaoli&email=xiaoli1235@qq.com&birthday=1990-2-3&sex=false&location=beijing&telephone=1383838338&classno=F1502&names=fatherli&relations=father&telephones=1585858558&birthdays=1946-1-1&sexs=true&locations=beijing&job_companies=morgan&job_titles=vp&job_duties=tech&names=motherli&relations=mother&telephones=1565656556&birthdays=1948-2-1&sexs=false&locations=&job_companies=intel&job_titles=an&job_duties=
    @RequestMapping("/student/addStudent")
    public String addStudent(String name,String birthday,String sex,String location, String telephone,String classno,String email,
                             String[] names,String[] relations, String[] telephones,String[] birthdays,String[] sexs,
                             String[] locations, String[] job_companies, String[] job_titles, String[] job_duties) {
        System.out.println("/student/addStudent "+name+" "+birthday+" "+sex+" "+location+" "+telephone+ " "+classno+" "+email);
    	System.out.println(Arrays.toString(names));
    	System.out.println(Arrays.toString(relations));
    	System.out.println(Arrays.toString(telephones));
    	System.out.println(Arrays.toString(birthdays));
    	System.out.println(Arrays.toString(sexs));
    	System.out.println(Arrays.toString(locations));
    	System.out.println(Arrays.toString(job_companies));
    	System.out.println(Arrays.toString(job_titles));
    	System.out.println(Arrays.toString(job_duties));

        String sql="INSERT INTO tbl_student(name, birthday, sex, location, telephone, classno, email)   VALUES (?, ?, ?, ?, ?, ?,?);";
        List<Object> params=new ArrayList<Object>();

        params.add(name);
        params.add(Date.valueOf(birthday));
        params.add(Boolean.valueOf(sex));
        params.add(location);
        params.add(Long.valueOf(telephone));
        params.add(StringUtil.classnoStandardization(classno));
        params.add(email);

        Integer id=null;
        try{
            id= JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
        }catch (Exception e){
            e.printStackTrace();
            return "F";
        }

        if(names!=null){
            for(int k=0;k<names.length;k++){
                String sql2="INSERT INTO tbl_guardian(name, relation, telephone, birthday, sex, location, job_company, job_title, job_duty, student_id)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                List<Object> params2=new ArrayList<Object>();
                params2.add(names[k]);
                params2.add(relations[k].equals("@")?null:relations[k]);
                params2.add(telephones[k].equals("@")?null:Long.valueOf(telephones[k]));
                params2.add(birthdays[k].equals("@")?null:Date.valueOf(birthdays[k]));
                params2.add(sexs[k].equals("@")?null:Boolean.valueOf(sexs[k]));
                params2.add(locations[k].equals("@")?null:locations[k]);
                params2.add(job_companies[k].equals("@")?null:job_companies[k]);
                params2.add(job_titles[k].equals("@")?null:job_titles[k]);
                params2.add(job_duties[k].equals("@")?null:job_duties[k]);
                params2.add(id);
                try{
                    JdbcUtil.insertReturnId(jdbcTemplate,sql2,params2);
                }catch (Exception e){
                    e.printStackTrace();
                    return "F";
                }
            }
        }

        //createAccount
        if(email!=null && !email.isEmpty()){
            String password= PwdUtil.genRandomPwd(6);
            Integer ref_id=id;
            Integer role=2;

            if(jdbcTemplate.queryForList("select * from tbl_account where email=?",email).size()==0){
                try{
                    jdbcTemplate.execute("insert into tbl_account (email,password,ref_id,role) values ('"+email+"','"+password+"',"+ref_id+","+role+")");
                }catch (Exception e){
                    e.printStackTrace();
                    return null;
                }
            }
            else{
                try{
                    jdbcTemplate.execute("update tbl_account set password='"+password+"', ref_id="+ref_id+", role="+role+" where email='"+email+"'");
                }catch (Exception e){
                    e.printStackTrace();
                    return null;
                }
            }
        }

        return ""+id;
    }
    
    ///student/addStudents?names=xiaoli&emails=xiaoli1235@qq.com&birthdays=1990-2-3&sexs=false&locations=beijing&telephones=1383838338&classno=F1502
    @RequestMapping("/student/addStudents")
    public String addStudents(String classno,String[] ids, String[] names,String[] birthdays,String[] sexs,String[] locations, String[] telephones,String[] emails) {
        System.out.println("/student/addStudents "+classno);
    	System.out.println(Arrays.toString(ids));
    	System.out.println(Arrays.toString(names));
    	System.out.println(Arrays.toString(telephones));
    	System.out.println(Arrays.toString(birthdays));
    	System.out.println(Arrays.toString(sexs));
    	System.out.println(Arrays.toString(locations));
    	System.out.println(Arrays.toString(emails));

        if(names!=null){
            for(int k=0;k<names.length;k++){
            	if(ids[k]==null || ids[k].isEmpty() || ids[k].equals("@")){
            		String sql="INSERT INTO tbl_student(name, birthday, sex, location, telephone, classno, email)   VALUES (?, ?, ?, ?, ?, ?,?);";
            		List<Object> params=new ArrayList<Object>();
            		
            		params.add(names[k]);
            		params.add(birthdays[k].equals("@")?null:Date.valueOf(birthdays[k]));
            		params.add(sexs[k].equals("@")?null:Boolean.valueOf(sexs[k]));
                    params.add(locations[k].equals("@")?null:locations[k]);
                    params.add(telephones[k].equals("@")?null:Long.valueOf(telephones[k]));
                    params.add(StringUtil.classnoStandardization(classno));
                    params.add(emails[k].equals("@")?null:emails[k]);

                    Integer tmp_id=null;
                    try{
                        tmp_id=JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
                    }catch (Exception e){
                        e.printStackTrace();
                        return "F";
                    }

                    //createAccount
                    if(!emails[k].equals("@")){
                        String password= PwdUtil.genRandomPwd(6);
                        Integer ref_id=tmp_id;
                        Integer role=1;

                        if(jdbcTemplate.queryForList("select * from tbl_account where email=?",emails[k]).size()==0){
                            try{
                                jdbcTemplate.execute("insert into tbl_account (email,password,ref_id,role) values ('"+emails[k]+"','"+password+"',"+ref_id+","+role+")");
                            }catch (Exception e){
                                e.printStackTrace();
                                return null;
                            }
                        }
                    }
            	}
            	else{
            		List<Map<String,Object>> list=jdbcTemplate.queryForList("select * from tbl_student where id=?",Integer.valueOf(ids[k]));
            		if(list.size()==0){
            			String sql="INSERT INTO tbl_student(id,name, birthday, sex, location, telephone, classno, email)   VALUES (?,?, ?, ?, ?, ?, ?,?);";
                		List<Object> params=new ArrayList<Object>();
                		
                		params.add(Integer.valueOf(ids[k]));
                		params.add(names[k]);
                		params.add(birthdays[k].equals("@")?null:Date.valueOf(birthdays[k]));
                		params.add(sexs[k].equals("@")?null:Boolean.valueOf(sexs[k]));
                        params.add(locations[k].equals("@")?null:locations[k]);
                        params.add(telephones[k].equals("@")?null:Long.valueOf(telephones[k]));
                        params.add(StringUtil.classnoStandardization(classno));
                        params.add(emails[k].equals("@")?null:emails[k]);
                        
                        try{
                            JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
                        }catch (Exception e){
                            e.printStackTrace();
                            return "F";
                        }
            		}
            		else{
            			String sql="update tbl_student set ";
            			sql+="name='"+names[k]+"', ";
            			sql+=birthdays[k].equals("@")?"birthday=null, ":"birthday='"+birthdays[k]+"', ";
            			sql+=sexs[k].equals("@")?"sex=null, ":"sex="+sexs[k]+", ";
            			sql+=locations[k].equals("@")?"location=null, ":"location='"+locations[k]+"', ";
            			sql+=telephones[k].equals("@")?"telephone=null, ":"telephone="+telephones[k]+", ";
            			sql+=emails[k].equals("@")?"email=null, ":"email='"+emails[k]+"', ";
            			sql+="classno='"+StringUtil.classnoStandardization(classno)+"' ";
            			sql+="where id ="+ids[k];
            			
            			System.out.println(sql);
            			try{
            				jdbcTemplate.execute(sql);
            			}catch (Exception e){
                            e.printStackTrace();
                            return "F";
                        }
            		}

                    //createAccount
                    if(!emails[k].equals("@")){
                        String password= PwdUtil.genRandomPwd(6);
                        Integer ref_id=Integer.valueOf(ids[k]);
                        Integer role=1;

                        if(jdbcTemplate.queryForList("select * from tbl_account where email=?",emails[k]).size()==0){
                            try{
                                jdbcTemplate.execute("insert into tbl_account (email,password,ref_id,role) values ('"+emails[k]+"','"+password+"',"+ref_id+","+role+")");
                            }catch (Exception e){
                                e.printStackTrace();
                                return null;
                            }
                        }
                    }

            	}
            }
        }

        return "S";
    }

    ///student/queryStudents?classno=F1502
    @RequestMapping("/student/queryStudents")
    public List<Map<String,Object>> queryTeacher(String classno){
        System.out.println("/student/queryStudents "+classno);

        return jdbcTemplate.queryForList("select * from tbl_student where classno=?",classno);
    }

    ///student/queryStudentsAdv?classno=F1502&rows=3&page=2&sidx=id&sord=desc
    @RequestMapping("/student/queryStudentsAdv")
    public Map<String,Object> queryStudentsAdv(String classno,Integer rows,Integer page,String sidx, String sord){
        System.out.println("/student/queryStudentsAdv "+classno+" "+rows+" "+page+" "+sidx+" "+sord);

        String sql="select * from (select tbl_student.id as student_id, name, classno, sex, birthday  from tbl_student) as t where classno=? ";
        if(sidx!=null && !sidx.isEmpty()){
            sql+="order by "+sidx+" "+sord+" ";
        }
        sql+="LIMIT "+rows+" OFFSET "+((page-1)*rows);
        List<Map<String,Object>> list=jdbcTemplate.queryForList(sql,classno);
        int count=jdbcTemplate.queryForObject("select count(*) from tbl_student where classno=?",new Object[]{classno},Integer.class);

        Map<String,Object> result=new HashMap<String,Object>();
        int total=(int)Math.floor(count/rows)+(count%rows==0?0:1);
        result.put("total",total);
        result.put("count",count);
        result.put("page",page);
        result.put("rows",list);

        return result;
    }

    ///student/queryStudentDetail?id=2
    @RequestMapping("/student/queryStudentDetail")
    public Map<String,Object> queryStudentDetail(Integer id){
        System.out.println("/student/queryStudentDetail "+id);

        return jdbcTemplate.queryForMap("select * from tbl_student where id=?",id);
    }

    ///student/queryStudentGuardians?id=2
    @RequestMapping("/student/queryStudentGuardians")
    public List<Map<String,Object>> queryStudentGuardians(Integer id){
        System.out.println("/student/queryStudentGuardians "+id);

        return jdbcTemplate.queryForList("select * from tbl_guardian where student_id=?",id);
    }

}
