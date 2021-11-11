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

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
public class RestAttendanceController {
	private JdbcTemplate jdbcTemplate;

    @Autowired
    public RestAttendanceController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //http://localhost:8080/attendance/getEventList
    @RequestMapping("/attendance/getEventList")
    public List<Map<String,Object>> getEventList() {
        System.out.println("/attendance/getEventList");

        return jdbcTemplate.queryForList("select * from tbl_event order by start_date desc limit 1000;");
    }

    //http://localhost:8080/attendance/addEvent?name=final event of 2015&start_date=2015-11-29&end_date=2015-12-31
    @RequestMapping("/attendance/addEvent")
    public String addEvent(String name, String start_date, String end_date){
        System.out.println("/attendance/addEvent "+name+" "+start_date+" "+end_date);

        String sql="insert into tbl_event (name,start_date,end_date) values(?,?,?)";
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

    //http://localhost:8080/attendance/addAttendance?state=1&remark=&event_id=2&student_id=2
    @RequestMapping("/attendance/addAttendance")
    public String addAttendance(Integer state, String remark, Integer event_id, Integer student_id){
        System.out.println("/attendance/addAttendance "+state+" "+remark+" "+event_id+" "+student_id);

        String sql="insert into tbl_attendance (state,remark,event_id,student_id) values(?,?,?,?)";
        List<Object> params=new ArrayList<Object>();
        params.add(state);
        params.add(remark);
        params.add(event_id);
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

    //http://localhost:8080/attendance/addAttendances?event_id=&name=2018-4-big event&start_date=2018-4-3&end_date=2018-4-4&subject=chemistry&points=98&student_ids=2&points=96&student_ids=3&
    @RequestMapping("/attendance/addAttendances")
    public String addAttendances(Integer event_id, String name, String start_date, String end_date, String[] remarks, Integer[] states, Integer[] student_ids){
        System.out.println("/attendance/addAttendances "+event_id+" "+name+" "+start_date+" "+end_date);
        System.out.println(Arrays.toString(student_ids));
        System.out.println(Arrays.toString(states));
        System.out.println(Arrays.toString(remarks));

        if(event_id==null || event_id<=0){
            String sql="insert into tbl_event (name,start_date,end_date) values(?,?,?)";
            List<Object> params=new ArrayList<Object>();
            params.add(name);
            params.add(Date.valueOf(start_date));
            params.add(Date.valueOf(end_date));
            try{
                event_id= JdbcUtil.insertReturnId(jdbcTemplate,sql,params);
            }catch (Exception e){
                e.printStackTrace();
                return "F";
            }
        }

        for(int k=0;k<student_ids.length;k++){
        	int num=jdbcTemplate.queryForObject("select count(*) from tbl_attendance where student_id=? and event_id=?",
        			new Object[]{student_ids[k],event_id},Integer.class);
        	if(num==0){
        		String sql="insert into tbl_attendance (state,remark,event_id,student_id) values(?,?,?,?)";
                List<Object> params=new ArrayList<Object>();
                params.add(states[k]);
                params.add(remarks[k].equals("@")? "":remarks[k]);
                params.add(event_id);
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
        			jdbcTemplate.execute("update tbl_attendance set state="+states[k]+", remark='"
        					+(remarks[k].equals("@")? "":remarks[k])+"' where student_id="+student_ids[k]+" and event_id="+event_id);
        		}catch (Exception e){
                    e.printStackTrace();
                    return "F";
                }
        	}
        }
        return "S";
    }

    //http://localhost:8080/attendance/queryAttendances?event_id=2&student_id=2&classno=F1510
    @RequestMapping("/attendance/queryAttendances")
    public List<Map<String,Object>> queryAttendances(Integer event_id, Integer student_id, String classno){
        System.out.println("/attendance/queryAttendances "+event_id+" "+student_id+" "+classno);

        String sql="select * from (select tbl_attendance.event_id, tbl_attendance.student_id, tbl_attendance.state,tbl_attendance.remark, " +
                "tbl_student.name, tbl_student.sex,tbl_student.birthday,tbl_student.classno from tbl_attendance,tbl_student " +
                "where tbl_attendance.student_id=tbl_student.id) as t  where ";
        if(event_id!=null && event_id!=0) sql+="event_id="+event_id+" and   ";
        if(student_id!=null && student_id!=0) sql+="student_id="+student_id+" and   ";
        if(classno!=null && !classno.isEmpty()) sql+="classno='"+classno+"' and   ";
        sql=sql.substring(0,sql.length()-6);
        return jdbcTemplate.queryForList(sql);
    }
    
   //http://localhost:8080/attendance/queryExistedAttendances?classno=M1303&event_id=38
    @RequestMapping("/attendance/queryExistedAttendances")
    public List<Map<String,Object>> queryExistedAttendances (Integer event_id, String classno){
        System.out.println("/attendance/queryExistedAttendances "+event_id+" "+classno);

    	String sql="select * from (select t.*, tbl_attendance.event_id,tbl_attendance.state,tbl_attendance.remark from  " +
        		"(select tbl_student.id as student_id, name, classno, sex, birthday  from tbl_student) as t  " +
        		"join tbl_attendance on t.student_id=tbl_attendance.student_id) as x where classno=? and event_id=? ";
        
        return jdbcTemplate.queryForList(sql,classno,event_id);
    }
}
