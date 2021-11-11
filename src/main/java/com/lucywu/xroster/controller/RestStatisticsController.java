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

import java.util.List;
import java.util.Map;

@RestController
public class RestStatisticsController {
	private JdbcTemplate jdbcTemplate;

    @Autowired
    public RestStatisticsController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //http://localhost:8080/statistics/queryStatistics?grade=M12&classno=M1201&student_id=11
    @RequestMapping("/statistics/queryStatistics")
    public Map<String,Object> queryStatistics(String grade,String classno,Integer student_id){
        System.out.println("/statistics/queryStatistics "+grade+" "+classno+" "+student_id);

        if(student_id!=null && student_id>0){
            String sql="select\n" +
                    "t.student_id as student_id, num,coalesce(num0,0) as num0,coalesce(num1,0) as num1,coalesce(num2,0) as num2,coalesce(num3,0) as num3,coalesce(num4,0) as num4\n" +
                    "from\n" +
                    "(select student_id,count(*) as num from tbl_attendance group by student_id) as t\n" +
                    "full outer join (select student_id,count(*) as num0 from tbl_attendance where state=0 group by student_id) as t0 on t.student_id=t0.student_id\n" +
                    "full outer join (select student_id,count(*) as num1 from tbl_attendance where state=1 group by student_id) as t1 on t.student_id=t1.student_id\n" +
                    "full outer join (select student_id,count(*) as num2 from tbl_attendance where state=2 group by student_id) as t2 on t.student_id=t2.student_id\n" +
                    "full outer join (select student_id,count(*) as num3 from tbl_attendance where state=3 group by student_id) as t3 on t.student_id=t3.student_id\n" +
                    "full outer join (select student_id,count(*) as num4 from tbl_attendance where state=4 group by student_id) as t4 on t.student_id=t4.student_id\n" +
                    "where t.student_id="+student_id;
            return jdbcTemplate.queryForMap(sql);
        }
        else if(classno!=null && !classno.isEmpty()){
            String sql="select grade,classno, sum(num) as num,sum(num0) as num0,sum(num1) as num1, sum(num2) as num2,sum(num3) as num3,sum(num4) as num4 from\n" +
                    "(select\n" +
                    "substring(classno from 1 for 3) as grade, classno,t.student_id as student_id, num,coalesce(num0,0) as num0,coalesce(num1,0) as num1,coalesce(num2,0) as num2,coalesce(num3,0) as num3,coalesce(num4,0) as num4\n" +
                    "from\n" +
                    "(select student_id,count(*) as num from tbl_attendance group by student_id) as t\n" +
                    "full outer join (select student_id,count(*) as num0 from tbl_attendance where state=0 group by student_id) as t0 on t.student_id=t0.student_id\n" +
                    "full outer join (select student_id,count(*) as num1 from tbl_attendance where state=1 group by student_id) as t1 on t.student_id=t1.student_id\n" +
                    "full outer join (select student_id,count(*) as num2 from tbl_attendance where state=2 group by student_id) as t2 on t.student_id=t2.student_id\n" +
                    "full outer join (select student_id,count(*) as num3 from tbl_attendance where state=3 group by student_id) as t3 on t.student_id=t3.student_id\n" +
                    "full outer join (select student_id,count(*) as num4 from tbl_attendance where state=4 group by student_id) as t4 on t.student_id=t4.student_id\n" +
                    "join tbl_student on tbl_student.id=t.student_id) as t\n" +
                    "where classno='"+classno+"'\n" +
                    "group by grade,classno\n";
            return jdbcTemplate.queryForMap(sql);
        }
        else if(grade!=null && !grade.isEmpty()){
            String sql="select grade, sum(num) as num,sum(num0) as num0,sum(num1) as num1, sum(num2) as num2,sum(num3) as num3,sum(num4) as num4  from\n" +
                    "(select\n" +
                    "substring(classno from 1 for 3) as grade,substring(classno from 4 for 2) as class,t.student_id as student_id, num,coalesce(num0,0) as num0,coalesce(num1,0) as num1,coalesce(num2,0) as num2,coalesce(num3,0) as num3,coalesce(num4,0) as num4\n" +
                    "from\n" +
                    "(select student_id,count(*) as num from tbl_attendance group by student_id) as t\n" +
                    "full outer join (select student_id,count(*) as num0 from tbl_attendance where state=0 group by student_id) as t0 on t.student_id=t0.student_id\n" +
                    "full outer join (select student_id,count(*) as num1 from tbl_attendance where state=1 group by student_id) as t1 on t.student_id=t1.student_id\n" +
                    "full outer join (select student_id,count(*) as num2 from tbl_attendance where state=2 group by student_id) as t2 on t.student_id=t2.student_id\n" +
                    "full outer join (select student_id,count(*) as num3 from tbl_attendance where state=3 group by student_id) as t3 on t.student_id=t3.student_id\n" +
                    "full outer join (select student_id,count(*) as num4 from tbl_attendance where state=4 group by student_id) as t4 on t.student_id=t4.student_id\n" +
                    "join tbl_student on tbl_student.id=t.student_id) as t\n" +
                    "where grade='"+grade+"'\n" +
                    "group by grade";
            return jdbcTemplate.queryForMap(sql);
        }
        return null;
    }
}
