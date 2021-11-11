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

package com.lucywu.xroster;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Date;
import java.util.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.lucywu.xroster.Application;
import com.lucywu.xroster.model.Person;
import com.lucywu.xroster.util.JdbcUtil;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
public class ApplicationTests {

	@Test
	public void contextLoads() {
//		 DriverManagerDataSource dataSource=new DriverManagerDataSource();
//		 dataSource.setDriverClassName("org.postgresql.Driver");
//		dataSource.setUrl("jdbc:postgresql://localhost:5432/stm?sslmode=disable&currentSchema=ss1604c195_rd2");
////		 dataSource.setUrl("jdbc:postgresql://localhost:5432/stm?sslmode=disable&currentSchema=ss1604c195_rd2");
//		 dataSource.setUsername("ss1604c195");
//		 dataSource.setPassword("7a940306");
//
//		 JdbcTemplate jdbcTemplate=new JdbcTemplate(dataSource);


//		 List<Person> personList = jdbcTemplate.query("select * from persons", BeanPropertyRowMapper.newInstance(Person.class));
//		 System.out.println(personList.size());
//
//
//		 Map<String,Object> map=jdbcTemplate.queryForMap("select * from tbl_account where email=?","test@qq.com");
//		 System.out.println(map);
//
//		 String str= jdbcTemplate.queryForObject("select password from tbl_account where email=?",new Object[]{"test@qq.com"}, String.class);
//		 System.out.println(str);


//		List<Map<String,Object>> listaa=jdbcTemplate.queryForList("select distinct classno from tbl_class");
//		System.out.println(listaa);
//
//		List<Map<String,Object>> listbbb=jdbcTemplate.queryForList("select * from tbl_class where classno=?","15");
//		System.out.println(listbbb);

//		List<String> classnos=jdbcTemplate.queryForList("select distinct classno from tbl_class",String.class);
//		System.out.println(classnos);

//		String sql="insert into tbl_teacher (name, email, telephone, birthday, location, start_date, contract_date, title, subject, sex, is_advisor) values ('xiaoliu','a@qq.com',15216711955,'1990-2-1','shanghai','2013-1-1','2020-1-1','B','math',false,true)";
//		jdbcTemplate.execute(sql);


//		String sql="insert into tbl_teacher (name, email, telephone, birthday, location, start_date, contract_date, title, subject, sex, is_advisor) values ('xiaoliu22','a@qq.com',15216711955,'1990-2-1','shanghai','2013-1-1','2020-1-1','B','math',false,true)";

//		String sql="insert into tbl_teacher (name, email, telephone, birthday, location, start_date, contract_date, title, subject, sex, is_advisor) values (?,?,?,?,?,?,?,?,?,?,?)";
//		List<Object> params=new ArrayList<Object>();
//		params.add("x"+new Random().nextInt());
//		params.add("a@qq.com");
//		params.add(Long.valueOf("15216711955"));
//		params.add(Date.valueOf("1990-2-1"));
//		params.add("shanghai");
//		params.add(Date.valueOf("2011-3-3"));
//		params.add(Date.valueOf("2020-1-1"));
//		params.add("M");
//		params.add("math");
//		params.add(Boolean.valueOf("false"));
//		params.add(Boolean.valueOf("true"));
//
//		try{
//			System.out.println(JdbcUtil.insertReturnId(jdbcTemplate,sql,params));
//		}catch (Exception e){
//			e.printStackTrace();
//		}

//		String sql="insert into tbl_class (classno,teacher_id) values(?,?)";
//		List<Object> params=new ArrayList<Object>();
//		params.add("2222");
//		params.add(6);
//		try{
//			System.out.println(JdbcUtil.insertReturnId(jdbcTemplate,sql,params));
//		}catch (Exception e){
//			e.printStackTrace();
//		}

//		Map<String,Object> map=jdbcTemplate.queryForMap("select * from tbl_teacher where id=?",5);
//		System.out.println(map);
//
//		List<Map<String,Object>> list =jdbcTemplate.queryForList("select * from tbl_class,tbl_teacher where tbl_class.teacher_id=tbl_teacher.id and classno=?","2222");
//		System.out.println(list);

//		List<Map<String,Object>> result=jdbcTemplate.queryForList("select\n" +
//				"t.student_id as student_id, num,coalesce(num0,0) as num0,coalesce(num1,0) as num1,coalesce(num2,0) as num2,coalesce(num3,0) as num3,coalesce(num4,0) as num4\n" +
//				"from\n" +
//				"(select student_id,count(*) as num from tbl_attendance group by student_id) as t\n" +
//				"full outer join (select student_id,count(*) as num0 from tbl_attendance where state=0 group by student_id) as t0 on t.student_id=t0.student_id\n" +
//				"full outer join (select student_id,count(*) as num1 from tbl_attendance where state=1 group by student_id) as t1 on t.student_id=t1.student_id\n" +
//				"full outer join (select student_id,count(*) as num2 from tbl_attendance where state=2 group by student_id) as t2 on t.student_id=t2.student_id\n" +
//				"full outer join (select student_id,count(*) as num3 from tbl_attendance where state=3 group by student_id) as t3 on t.student_id=t3.student_id\n" +
//				"full outer join (select student_id,count(*) as num4 from tbl_attendance where state=4 group by student_id) as t4 on t.student_id=t4.student_id");
//		System.out.println(result);

	}

}
