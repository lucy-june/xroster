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
public class GenerateZhDataTests {
	@Test
	public void contextLoads() {
//		DriverManagerDataSource dataSource=new DriverManagerDataSource();
//		dataSource.setDriverClassName("org.postgresql.Driver");
//		//		 dataSource.setUrl("jdbc:postgresql://localhost:5432/stm?sslmode=disable&currentSchema=ss1604c195_rd2");
//		dataSource.setUrl("jdbc:postgresql://localhost:5432/stm?sslmode=disable&currentSchema=ss1604c195_rd2");
//		dataSource.setUsername("ss1604c195");
//		dataSource.setPassword("7a940306");
//
//		JdbcTemplate jdbcTemplate=new JdbcTemplate(dataSource);

//		for(int k=0;k<30;k++) {
//			System.out.println(RandomTel());
//			System.out.println((String)RandomIn(classnos));
//			System.out.println(RandomBirthday((String)RandomIn(classnos)));
//			System.out.println(RandomBirthday2());
//			for(Date date:RandomStartEndDate()) System.out.println(date);
//			System.out.println(RandomPoint());
//			System.out.println(RandomEventName(new Date(116,3,12)));
//			System.out.println(RandomExamName(new Date(116,3,12)));
//			System.out.println(RandomName());
//		}

//		clearTestData(jdbcTemplate);
//		try{
//			initTestDate(jdbcTemplate);
//		}catch(Exception e){
//			e.printStackTrace();
//		}
	}

	String[] classnos={"C1201","C1202","C1301","C1302","C1303","C1401","C1402","C1403","C1404","C1501","C1502","C1503","C1504"};
	String[] subjects={"??????","??????","??????"};
	String[] family_names={"???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???"};
	String[] family_names2={"Wang","Zhao","Zhang","Li","Liu","Sun","Song","Xi","Peng","Ye","Jiang","Hu","Deng","Wu","Kan","Yu","Chen","Bai","Meng","Bian","Qian","Hong"};
	String[] first_names={"??????","???","???","???","??????","???","???","??????","??????","??????","???","??????","???","??????","??????","???","??????",
			"??????","??????","??????","???","??????","??????","??????","??????","??????","??????","??????","???","??????","??????","??????","??????","??????","??????","???"};
	String[] first_names2={"Lucy","Hao","Shuai","Li","Shishi","Xia","Ming","Chongwei","Chuanqi","Haonan","Shuang","Zhizhou","Fan","Mingguang","Zihan","Fei","Yafei",
			"Chenyang","Minzhe","Qingxiang","Xiang","Haoran","Chunxi","Sisi","Zemin","Jintao","Binyu","Yutao","Wei","Guozhen","Zimo","Xiaoqian","Xiaodan","Xiaoyuan","Tianxiong","Ang"};
	Boolean[] sexs={true,false};
	String[] locations={"??????","??????","??????","??????","????????????","??????","??????","??????","??????","??????","??????","??????","??????","??????"};
	String[] event_names_1={"??????A","??????B","??????C","??????D","??????E","??????F","??????G","??????H"};
	String[] event_names_2={"6","7","1","3","5","9","0","5"};
	String[] event_names_3={"??????","??????","?????????","??????","??????","??????","??????","??????","??????"};
	String[] exam_names1={"??????A","??????B","??????C","??????D","??????E","??????F","??????G"};
	String[] exam_names2={"1","2","3","4","5","6","7"};
	Integer[] states={0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,3,4,4,1,1,1,1,1,1};
	String[] remarks={"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","$$$","??????~","#####","@@@","",""};
	String[] titles={"??????1","??????2","??????3","??????4","??????5","??????6"};
	String[] relations={"???","???"};
	String[] job_companies={"?????????","??????","??????","??????","????????????","??????","???????????????","??????","????????????","????????????", "?????????","????????????",
			"????????????","??????","????????????","??????","????????????","????????????","????????????","????????????","???????????????","???????????????","??????"};
	String[] job_titles={"?????????","?????????","??????","?????????","??????","??????","??????","??????","??????","?????????","???????????????","????????????","???????????????","???????????????","???????????????","?????????","?????????"};
	String[] job_duties={"??????","??????","??????","??????","??????","????????????","??????","??????","??????","??????","??????","??????","??????","??????","??????","??????"};
	String[] subjectsubs={"?????????","?????????","?????????","?????????","?????????"};

	public String RandomEventName(Date date){
		return (String)RandomIn(event_names_1)+" "+(String)RandomIn(event_names_3)+" "+date;
	}

	public String RandomExamName(Date date){
		return (String)RandomIn(exam_names1)+" "+(String)RandomIn(exam_names2)+" "+date;
	}

	public String RandomName(){
		return RandomIn(family_names)+""+RandomIn(first_names);
	}

	public Long RandomTel(){
		int tele_min=100000000;
		int tele_max=999999990;
		return Long.valueOf("13"+(new Random().nextInt(tele_max-tele_min)+tele_min));
	}

	public Date RandomBirthday(String classno){
		String y=classno.substring(1,3);
		int year=Integer.valueOf("20"+y)-new Random().nextInt(1)-1915;
		System.out.println(year);
		int month=new Random().nextInt(12)+1;
		int day=new Random().nextInt(28)+1;
		Date date=new Date(year,month,day);
		return date;
	}

	public Date RandomBirthday2(){
//		String y=classno.substring(1,3);
		int y=new Random().nextInt(8)+85;
		int year=Integer.valueOf("19"+y)-new Random().nextInt(1)-1915;
		System.out.println(year);
		int month=new Random().nextInt(12)+1;
		int day=new Random().nextInt(28)+1;
		Date date=new Date(year,month,day);
		return date;
	}

	public Date[] RandomStartEndDate(){
		Date[] dates=new Date[2];
		int year=Integer.valueOf(116)-new Random().nextInt(3);
		System.out.println(year);
		int month=new Random().nextInt(12);
		if(year==116) month=new Random().nextInt(3);
		int day1=new Random().nextInt(20);
		int day2=day1+new Random().nextInt(7);

		dates[0]=new Date(year,month,day1);
		dates[1]=new Date(year,month,day2);
		return dates;
	}

	public Double RandomPoint() {
//		0~45;
//		45~60
//		60~70
//		70~85
//		85~95;
//      95~100
		int f=new Random().nextInt(20);
		if(f==0){
			return Double.valueOf(new Random().nextInt(45));
		}
		else if(f<=2){
			return Double.valueOf(new Random().nextInt(15)+45);
		}
		else if(f<=6){
			return Double.valueOf(new Random().nextInt(10)+60);
		}
		else if(f<=13){
			return Double.valueOf(new Random().nextInt(15)+70);
		}
		else if(f<=17){
			return Double.valueOf(new Random().nextInt(10)+85);
		}
		else{
			return Double.valueOf(new Random().nextInt(5)+95);
		}
	}

	public Double [] RandomPointSub(){
		double d1=Math.floor(RandomPoint()*0.1);
		double d2=Math.floor(RandomPoint()*0.2);
		double d3=Math.floor(RandomPoint()*0.2);
		double d4=Math.floor(RandomPoint()*0.2);
		double d5=Math.floor(RandomPoint()*0.3);

		Double[]  results=new Double[]{d1,d2,d3,d4,d5};
		return results;
	}

	public Object RandomIn(Object[] objs){
		return objs[new Random().nextInt(objs.length)];
	}


	//test Data Generate #################################################################################################
	public void clearTestData(JdbcTemplate jdbcTemplate){
		List<String > sqls=new ArrayList<String>();

		sqls.add("delete from tbl_account");
		sqls.add("delete from tbl_grade");
		sqls.add("delete from tbl_gradesub");
		sqls.add("delete from tbl_attendance");
		sqls.add("delete from tbl_event");
		sqls.add("delete from tbl_exam");
		sqls.add("delete from tbl_guardian");
		sqls.add("delete from tbl_student");
		sqls.add("delete from tbl_class");
		sqls.add("delete from tbl_teacher");

		for(String sql:sqls){
			jdbcTemplate.execute(sql);
		}

		//generate test account
		jdbcTemplate.execute("insert into tbl_account (email, password, ref_id, role) values('test@qq.com','123',null,0)");
		jdbcTemplate.execute("insert into tbl_account (email, password, ref_id, role) values('sbzx@qq.com','123',null,0)");
		jdbcTemplate.execute("insert into tbl_account (email, password, ref_id, role) values('981088636@qq.com','123',null,0)");
		jdbcTemplate.execute("insert into tbl_account (email, password, ref_id, role) values('1280308419@qq.com','123',null,0)");
		jdbcTemplate.execute("insert into tbl_account (email, password, ref_id, role) values('wlx@qq.com','123',null,1)");
		jdbcTemplate.execute("insert into tbl_account (email, password, ref_id, role) values('wxx@qq.com','123',null,2)");
	}

	public int find(Object[] objs,Object obj){
		for(int k=0;k<objs.length;k++){
			if(objs[k].equals(obj)) return k;
		}
		return -1;
	}

	public void initTestDate(JdbcTemplate jdbcTemplate) throws  Exception{
		int studentsNum=500;
		int examsNum=12;
		int eventsNum=12;

		//generate student data
		Integer student_id=null;
		for(int k=0;k<studentsNum;k++){
			String sql="INSERT INTO tbl_student(\n" +
					"            name, birthday, sex, location, telephone, classno,email)\n" +
					"    VALUES ( ?, ?, ?, ?, ?, ?,?);";
			List<Object> params=new ArrayList<Object>();
			String name=RandomName();
			String classno=(String)RandomIn(classnos);
			Date birthday=RandomBirthday(classno);
			Boolean sex=(Boolean)RandomIn(sexs);
			String location=(String)RandomIn(locations);
			Long telephone=RandomTel();
			String enm=family_names2[find(family_names,name.substring(0,1))]+" "+first_names2[find(first_names,name.substring(1,name.length()))];
			String email=(enm.replace(" ","_")).toLowerCase()+new Random().nextInt(99)+"@qq.com";

			params.add(name);
			params.add(birthday);
			params.add(sex);
			params.add(location);
			params.add(telephone);
			params.add(classno);
			params.add(email);

			System.out.println(params.toString());
			int tmp=JdbcUtil.insertReturnId(jdbcTemplate, sql, params);
			if(student_id==null) student_id=tmp;


			//generate guardians data
			for (int i = 0; i < 2; i++){
				String sql2="INSERT INTO tbl_guardian(\n" +
						"            name, relation, telephone, birthday, sex, location, job_company, \n" +
						"            job_title, job_duty, student_id)\n" +
						"    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);\n";

				List<Object> params2=new ArrayList<Object>();
				String nm=RandomName();
				String name2= i==0? name.substring(0,1)+nm.substring(1,nm.length()):nm;
				String relation2=relations[i];
				Long telephone2=RandomTel();
				Date birthday2=RandomBirthday2();
				Boolean sex2=sexs[i];
				String location2=(String)RandomIn(locations);
				String job_company2=(String)RandomIn(job_companies);
				String job_title2=(String)RandomIn(job_titles);
				String job_duty2=(String)RandomIn(job_duties);

				params2.add(name2);
				params2.add(relation2);
				params2.add(telephone2);
				params2.add(birthday2);
				params2.add(sex2);
				params2.add(location2);
				params2.add(job_company2);
				params2.add(job_title2);
				params2.add(job_duty2);
				params2.add(tmp);

				System.out.println(params2.toString());
				JdbcUtil.insertReturnId(jdbcTemplate, sql2, params2);
			}
		}



		//generate exam data
		Integer exam_id=null;
		for(int k=0;k<examsNum;k++){
			String sql="INSERT INTO tbl_exam(\n" +
					"           name, start_date, end_date)\n" +
					"    VALUES (?, ?, ?);";
			List<Object> params=new ArrayList<Object>();
			Date[] dates=RandomStartEndDate();
			params.add(RandomExamName(dates[0]));
			params.add(dates[0]);
			params.add(dates[1]);
			System.out.println(params.toString());
			int tmp=JdbcUtil.insertReturnId(jdbcTemplate, sql, params);
			if(exam_id==null) exam_id=tmp;
		}
		//generate event data
		Integer event_id=null;
		for(int k=0;k<eventsNum;k++){
			String sql="INSERT INTO tbl_event(\n" +
					"           name, start_date, end_date)\n" +
					"    VALUES (?, ?, ?);";
			List<Object> params=new ArrayList<Object>();
			Date[] dates=RandomStartEndDate();
			params.add(RandomEventName(dates[0]));
			params.add(dates[0]);
			params.add(dates[1]);
			System.out.println(params.toString());
			int tmp=JdbcUtil.insertReturnId(jdbcTemplate, sql, params);
			if(event_id==null) event_id=tmp;
		}
		//generate attendance data
		for(int i=event_id;i<eventsNum+event_id;i++) {
			for (int j = student_id; j < studentsNum+student_id; j++){
				String sql = "INSERT INTO tbl_attendance(\n" +
						"            event_id, student_id, state, remark)\n" +
						"    VALUES (?, ?, ?, ?);\n";
				List<Object> params = new ArrayList<Object>();
				params.add(i);
				params.add(j);
				params.add((Integer)RandomIn(states));
				params.add((String)RandomIn(remarks));
				System.out.println(params.toString());
				JdbcUtil.insertReturnId(jdbcTemplate, sql, params);
			}
		}

		//generate grade data
		for(int i=exam_id;i<examsNum+exam_id;i++) {
			for (int j = student_id; j <studentsNum+student_id; j++){
				for(String subject:subjects){
					Double[] points=RandomPointSub();
					Double point=Double.valueOf(Math.round(points[0]+points[1]+points[2]+points[3]+points[4])+"");

					for(int k=0;k<5;k++){
						String sql = "INSERT INTO tbl_gradesub(\n" +
								"            exam_id, student_id, point,subject,subjectsub)\n" +
								"    VALUES (?, ?, ?, ?,?);\n";
						List<Object> params = new ArrayList<Object>();
						params.add(i);
						params.add(j);
						params.add(points[k]);
						params.add(subject);
						params.add(subjectsubs[k]);
						System.out.println(params.toString());
						JdbcUtil.insertReturnId(jdbcTemplate, sql, params);
					}

					String sql = "INSERT INTO tbl_grade(\n" +
							"            exam_id, student_id, point,subject)\n" +
							"    VALUES (?, ?, ?, ?);\n";
					List<Object> params = new ArrayList<Object>();
					params.add(i);
					params.add(j);
					params.add(point);
					params.add(subject);
					System.out.println(params.toString());
					JdbcUtil.insertReturnId(jdbcTemplate, sql, params);
				}

			}
		}

		int teachersNum=50;

		//generate teachers data
		Integer teacher_id=null;
		for(int k=0;k<teachersNum;k++){
			String sql="INSERT INTO tbl_teacher(\n" +
					"            name, birthday, sex, location, telephone, email,start_date,contract_date,title, subject, is_advisor)\n" +
					"    VALUES ( ?, ?, ?, ?, ?, ?,?,?,?,?,?);";
			List<Object> params=new ArrayList<Object>();
			String name=RandomName();
			String classno=(String)RandomIn(classnos);
			Date birthday=RandomBirthday(classno);
			Boolean sex=(Boolean)RandomIn(sexs);
			String location=(String)RandomIn(locations);
			Long telephone=RandomTel();

			String enm=family_names2[find(family_names,name.substring(0,1))]+" "+first_names2[find(first_names,name.substring(1,name.length()))];
			String email=(enm.replace(" ","_")).toLowerCase()+new Random().nextInt(99)+"@qq.com";

			int year1=Integer.valueOf(115)-new Random().nextInt(5);
			int year2=Integer.valueOf(117)+new Random().nextInt(5);
			int month=new Random().nextInt(12);
			int day=new Random().nextInt(28);
			Date start_date=new Date(year1,month,day);
			Date end_date=new Date(year2,month,day);
			String title=(String)RandomIn(titles);
			String subject=(String)RandomIn(subjects);
			Boolean is_advisor=(Boolean)RandomIn(sexs);

			params.add(name);
			params.add(birthday);
			params.add(sex);
			params.add(location);
			params.add(telephone);
			params.add(email);
			params.add(start_date);
			params.add(end_date);
			params.add(title);
			params.add(subject);
			params.add(is_advisor);
			System.out.println(params.toString());
			int tmp=JdbcUtil.insertReturnId(jdbcTemplate, sql, params);
			if(teacher_id==null) teacher_id=tmp;
		}

		//generate classes data
		for(int i=teacher_id;i<teachersNum+teacher_id;i++) {
			Set<String> cs=new HashSet<String>();
			for( int k=0;k<new Random().nextInt(5);k++){
				cs.add((String)RandomIn(classnos));
			}
			for (String classno:cs){
				String sql = "INSERT INTO tbl_class(\n" +
						"            teacher_id, classno)\n" +
						"    VALUES (?, ?);\n";
				List<Object> params = new ArrayList<Object>();
				params.add(i);
				params.add(classno);
				System.out.println(params.toString());
				JdbcUtil.insertReturnId(jdbcTemplate, sql, params);
			}
		}

	}

//test Data Generate ################################################################################################

}
