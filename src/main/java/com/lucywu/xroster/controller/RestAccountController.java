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

import com.lucywu.xroster.util.EmailUtil;
import com.lucywu.xroster.util.PwdUtil;
import com.lucywu.xroster.util.TestUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class RestAccountController {
	private JdbcTemplate jdbcTemplate;

    @Autowired
    public RestAccountController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //http://localhost:8080/account/getTeachers
    @RequestMapping("/account/getTeachers")
    public List<Map<String,Object>> getTeachers() {
        System.out.println("/account/getTeachers");

        return jdbcTemplate.queryForList("select * from vi_teachers order by id asc");
    }

    //http://localhost:8080/account/getClasses
    @RequestMapping("/account/getClasses")
    public List<Map<String,Object>> getClasses() {
        System.out.println("/account/getClasses");

//        return jdbcTemplate.queryForList("select classno, grade from vi_teachers group by classno,grade order by classno asc");
    	return jdbcTemplate.queryForList("select distinct classno, grade from vi_teachers order by classno asc");
    }

    //http://localhost:8080/account/getGrades
    @RequestMapping("/account/getGrades")
    public List<Map<String,Object>> getGrades() {
        System.out.println("/account/getGrades");

        return jdbcTemplate.queryForList("select grade from vi_teachers group by grade order by grade asc");
    }

    //http://localhost:8080/account/queryAccounts?rows=3&page=2&sidx=id&sord=desc
    @RequestMapping("/account/queryAccounts")
    public Map<String,Object> queryAccounts(Integer rows,Integer page,String sidx, String sord){
        System.out.println("/account/queryAccounts "+rows+" "+page+" "+sidx+" "+sord);

        String sql="select * from tbl_account ";
        if(sidx!=null && !sidx.isEmpty()){
            sql+="order by "+sidx+" "+sord+" ";
        }
        sql+="LIMIT "+rows+" OFFSET "+((page-1)*rows);
        List<Map<String,Object>> list=jdbcTemplate.queryForList(sql);
        int count=jdbcTemplate.queryForObject("select count(*) from tbl_account",new Object[]{},Integer.class);

        Map<String,Object> result=new HashMap<String,Object>();
        int total=(int)Math.floor(count/rows)+(count%rows==0?0:1);
        result.put("total",total);
        result.put("count",count);
        result.put("page",page);
        result.put("rows",list);

        return result;
    }

    //http://localhost:8080/account/createAccount?teacher_id=123&student_id=1129
    @RequestMapping("/account/createAccount")
    public Map<String,Object> createAccount(Integer teacher_id, Integer student_id){
        System.out.println("/account/createAccount "+teacher_id+" "+student_id);

        Map<String,Object> map=new HashMap<String,Object>();
        if(teacher_id!=null && teacher_id>0){
            Map<String,Object> tmp=jdbcTemplate.queryForMap("select * from tbl_teacher where id=? ",teacher_id);
            String email=(String)tmp.get("email");
            if(email==null || email.isEmpty()) return map;
            String name=(String)tmp.get("name");
            String password= PwdUtil.genRandomPwd(6);
            Integer ref_id=teacher_id;
            Integer role=1;

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

            map.put("email",email);
            map.put("name",name);
            map.put("password",password);
            map.put("ref_id",ref_id);
            map.put("role",role);

            return map;
        }
        else if(student_id!=null && student_id>0){
            Map<String,Object> tmp=jdbcTemplate.queryForMap("select * from tbl_student where id=?",student_id);
            String email=(String)tmp.get("email");
            String name=(String)tmp.get("name");
            String password= PwdUtil.genRandomPwd(6);
            Integer ref_id=student_id;
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

            map.put("email",email);
            map.put("name",name);
            map.put("password",password);
            map.put("ref_id",ref_id);
            map.put("role",role);

            return map;
        }

        return null;
    }

    //http://localhost:8080/account/forgetAccount?email=981088636@qq.com
    @RequestMapping("/account/forgetAccount")
    public String forgetAccount(String email){
        String str= jdbcTemplate.queryForObject("select password from tbl_account where email=?",new Object[]{email}, String.class);

        if(EmailUtil.sendEmail(email,"[校悉网]账户密码",str)) return "S";
        return "F";
    }

    //http://localhost:8080/account/reset
    @RequestMapping("/account/reset")
    public String reset() {
        System.out.println("/account/reset");

        try{
            TestUtil testUtil=new TestUtil();
            testUtil.clearTestData(jdbcTemplate);
        }catch (Exception e){
            e.printStackTrace();
            return "F";
        }
        return "S";
    }

    //http://localhost:8080/account/test
    @RequestMapping("/account/test")
    public String test() {
        System.out.println("/account/test");

        try{
            TestUtil testUtil=new TestUtil();
            testUtil.clearTestData(jdbcTemplate);
            testUtil.initTestDate(jdbcTemplate);
        }catch (Exception e){
            e.printStackTrace();
            return "F";
        }
        return "S";
    }


}
