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

import java.util.*;

@RestController
public class RestTeacherController {
	private JdbcTemplate jdbcTemplate;

    @Autowired
    public RestTeacherController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //http://localhost:8080/teacher/getClassList
    @RequestMapping("/teacher/getClassList")
    public List<String> getClassList() {
        System.out.println("/teacher/getClassList");

        List<String> result=jdbcTemplate.queryForList("select distinct classno from tbl_class order by classno",String.class);
        return result;
    }

    //http://localhost:8080/teacher/addTeacher?name=lucy&email=abc@qq.com&telephone=15216711966&birthday=1991-1-1&location=usa&start_date=2015-1-1&contract_date=2018-10-1&title=vp&subject=english&sex=true&is_advisor=true&classno=F1308&classno=F1510
    @RequestMapping("/teacher/addTeacher")
    public String addTeacher(String[] classnos,String name,String email,String telephone, String birthday, String location,
                                   String start_date, String contract_date, String title, String subject,
                                   String sex, String is_advisor) {
        System.out.println("/teacher/addTeacher "+name+" "+email+" "+telephone+" "+birthday+" "+location+" "+start_date+" "+contract_date+" "+title+" "+subject+" "+sex+" "+is_advisor);
        System.out.println(Arrays.toString(classnos));

        String sql="insert into tbl_teacher (name, email, telephone, birthday, location, start_date, contract_date, title, subject, sex, is_advisor) values (?,?,?,?,?,?,?,?,?,?,?)";
		List<Object> params=new ArrayList<Object>();
		params.add(name);
		params.add(email);
		params.add(Long.valueOf(telephone));
		params.add(Date.valueOf(birthday));
		params.add(location);
		params.add(Date.valueOf(start_date));
		params.add(Date.valueOf(contract_date));
		params.add(title);
		params.add(subject);
		params.add(Boolean.valueOf(sex));
		params.add(Boolean.valueOf(is_advisor));

        Integer id=null;
		try{
			id= JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
		}catch (Exception e){
            e.printStackTrace();
            return "F";
		}

        for(String classno:classnos){
            String sql2="insert into tbl_class (classno,teacher_id) values(?,?)";
            List<Object> params2=new ArrayList<Object>();
            params2.add(StringUtil.classnoStandardization(classno));
            params2.add(id);
            try{
                JdbcUtil.insertReturnId(jdbcTemplate,sql2,params2);
            }catch (Exception e){
                e.printStackTrace();
                return "F";
            }
        }

        //createAccount
        if(email!=null && !email.isEmpty()){
            String password= PwdUtil.genRandomPwd(6);
            Integer ref_id=id;
            Integer role=1;

            if(jdbcTemplate.queryForList("select * from tbl_account where email=?",email).size()==0){
                try{
                    jdbcTemplate.execute("insert into tbl_account (email,password,ref_id,role) values ('"+email+"','"+password+"',"+ref_id+","+role+")");
                }catch (Exception e){
                    e.printStackTrace();
                    return null;
                }
            }
        }

        return ""+id;
    }

    //http://localhost:8080/teacher/queryTeachers?classno=2222
    @RequestMapping("/teacher/queryTeachers")
    public List<Map<String,Object>> queryTeachers(String classno){
        System.out.println("/teacher/queryTeachers "+classno);

        return jdbcTemplate.queryForList("select * from tbl_class,tbl_teacher where tbl_class.teacher_id=tbl_teacher.id and classno=?",classno);
    }

    //http://localhost:8080/teacher/queryTeachersAdv?classno=F1510&rows=3&page=2&sidx=id&sord=desc
    @RequestMapping("/teacher/queryTeachersAdv")
    public Map<String,Object> queryTeachersAdv(String classno,Integer rows,Integer page,String sidx, String sord){
        System.out.println("/teacher/queryTeachersAdv "+classno+" "+rows+" "+page+" "+sidx+" "+sord);

        String sql="select * from (select tbl_teacher.id as teacher_id, name, classno, sex, birthday, telephone, subject,email from tbl_class, tbl_teacher where tbl_class.teacher_id=tbl_teacher.id) as t where classno=? ";
        if(sidx!=null && !sidx.isEmpty()){
            sql+="order by "+sidx+" "+sord+" ";
        }
        sql+="LIMIT "+rows+" OFFSET "+((page-1)*rows);
        List<Map<String,Object>> list=jdbcTemplate.queryForList(sql,classno);
        int count=jdbcTemplate.queryForObject("select count(*) from tbl_class,tbl_teacher where tbl_class.teacher_id=tbl_teacher.id and classno=?",new Object[]{classno},Integer.class);

        Map<String,Object> result=new HashMap<String,Object>();
        int total=(int)Math.floor(count/rows)+(count%rows==0?0:1);
        result.put("total",total);
        result.put("count",count);
        result.put("page",page);
        result.put("rows",list);

        return result;
    }

    //http://localhost:8080/teacher/queryTeacherDetail?id=5
    @RequestMapping("/teacher/queryTeacherDetail")
    public Map<String,Object> queryTeacherDetail(Integer id){
        System.out.println("/teacher/queryTeacherDetail "+id);

        return jdbcTemplate.queryForMap("select * from tbl_teacher where id=?",id);
    }

    //http://localhost:8080/teacher/queryClassnos?id=9
    @RequestMapping("/teacher/queryClassnos")
    public List<String> queryClassnos(Integer id){
        System.out.println("/teacher/queryClassnos "+id);

        return jdbcTemplate.queryForList("select classno from tbl_class where teacher_id=?",new Object[]{id},String.class);
    }
}
