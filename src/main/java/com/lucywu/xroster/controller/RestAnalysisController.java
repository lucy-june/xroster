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

import java.math.BigDecimal;
import java.util.*;

@RestController
public class RestAnalysisController {
	private JdbcTemplate jdbcTemplate;

    @Autowired
    public RestAnalysisController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    ///analysis/getStudents
    @RequestMapping("/analysis/getStudents")
    public List<Map<String,Object>> getStudents() {
        System.out.println("/analysis/getStudents");

        return jdbcTemplate.queryForList("select * from vi_students order by id asc");
    }

    ///analysis/getClasses
    @RequestMapping("/analysis/getClasses")
    public List<Map<String,Object>> getClasses() {
        System.out.println("/analysis/getClasses");
//        return jdbcTemplate.queryForList("select classno, grade from vi_students group by classno,grade order by classno asc");
        return jdbcTemplate.queryForList("select distinct classno, grade from vi_students order by classno asc");
    }

    ///analysis/getGrades
    @RequestMapping("/analysis/getGrades")
    public List<Map<String,Object>> getGrades() {
        System.out.println("/analysis/getGrades");

        return jdbcTemplate.queryForList("select grade from vi_students group by grade order by grade asc");
    }

    ///analysis/getSubjects
    @RequestMapping("/analysis/getSubjects")
    public List<String> getSubjects(){
        System.out.println("/analysis/getSubjects");

        return jdbcTemplate.queryForList("select distinct subject from tbl_grade order by subject asc", String.class);
    }

    ///analysis/getSubjectsubs
    @RequestMapping("/analysis/getSubjectsubs")
    public List<String> getSubjectsubs(Integer exam_id, String subject){
        System.out.println("/analysis/getSubjectsubs "+ exam_id+" "+subject);

        if(exam_id==null || exam_id<=0 || subject==null || subject.isEmpty()){
            return new ArrayList<String>();
        }
        List<String> subjectsubs=jdbcTemplate.queryForList("select distinct subjectsub from tbl_gradesub where exam_id=? and subject=? order by subjectsub",new Object[]{exam_id,subject}, String.class);

        return subjectsubs;
    }


    ///analysis/queryGrades?exam_id=5&grade=M12&classno=M1201&student_id=11
    @RequestMapping("/analysis/queryGrades")
    public List<Map<String,Object>> queryGrades(Integer exam_id,String grade,String classno,Integer student_id){
        System.out.println("/analysis/queryGrades "+exam_id+" "+grade+" "+classno+" "+student_id);

        List<String> subjects=jdbcTemplate.queryForList("select distinct subject from tbl_grade order by subject asc", String.class);
//        List<String> subjects=jdbcTemplate.queryForList("select distinct subject from tbl_grade where exam_id=? order by subject asc",new Object[]{exam_id}, String.class);
        if(student_id!=null && student_id>0){
            String A="";
            for(int k=1;k<=subjects.size();k++) A+=", t"+k+".x as x"+k;
            String B="";
            for(int k=1;k<=subjects.size();k++) B+="full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (student_id="+student_id+" or (student_id is null and classno='"+classno+"') or (student_id is null and classno is null and grade='"+grade+"')) and exam_id="+exam_id+" and subject='"+subjects.get(k-1)+"') as t"+k+" on (coalesce(t.student_id,0)=coalesce(t"+k+".student_id,0) and t.name=t"+k+".name)\n";
            String sql="(select t.student_id, t.name, t.x as x"+A+"\n" +
                    "from\n" +
                    "(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (student_id="+student_id+" or (student_id is null and classno='"+classno+"') or (student_id is null and classno is null and grade='"+grade+"')) and exam_id="+exam_id+" and subject='Total') as t\n" +
                      B+
//                    "where t.student_id is not null order by t.x desc )\n" +
                      "where t.student_id is not null order by cast(substring(t.x from 1 for position('/' in t.x)-1) as float) desc )\n" +
                    "UNION all\n" +
                    "(select t.student_id, t.name, t.x as x"+A+"\n" +
                    "from\n" +
                    "(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (student_id="+student_id+" or (student_id is null and classno='"+classno+"') or (student_id is null and classno is null and grade='"+grade+"')) and exam_id="+exam_id+" and subject='Total') as t\n" +
                      B+
                    "where t.student_id is null order by t.name desc )";

            return jdbcTemplate.queryForList(sql);
        }
        else if(classno!=null && !classno.isEmpty()){
            String A="";
            for(int k=1;k<=subjects.size();k++) A+=", t"+k+".x as x"+k;
            String B="";
            for(int k=1;k<=subjects.size();k++) B+="full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (classno='"+classno+"' or (classno is null and grade='"+grade+"')) and exam_id="+exam_id+" and subject='"+subjects.get(k-1)+"') as t"+k+" on (coalesce(t.student_id,0)=coalesce(t"+k+".student_id,0) and t.name=t"+k+".name)\n";
            String sql="(select t.student_id, t.name, t.x as x"+A+"\n" +
                    "from\n" +
                    "(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (classno='"+classno+"' or (classno is null and grade='"+grade+"')) and exam_id="+exam_id+" and subject='Total') as t\n" +
                    B+
//                    "where t.student_id is not null order by t.x desc )\n" +
                    "where t.student_id is not null order by cast(substring(t.x from 1 for position('/' in t.x)-1) as float) desc )\n" +
                    "UNION all\n" +
                    "(select t.student_id, t.name, t.x as x"+A+"\n" +
                    "from\n" +
                    "(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (classno='"+classno+"' or (classno is null and grade='"+grade+"')) and exam_id="+exam_id+" and subject='Total') as t\n" +
                    B+
                    "where t.student_id is null order by t.name desc )";

            return jdbcTemplate.queryForList(sql);
        }
        else if(grade!=null && !grade.isEmpty()){
            String A="";
            for(int k=1;k<=subjects.size();k++) A+=", t"+k+".x as x"+k;
            String B="";
            for(int k=1;k<=subjects.size();k++) B+="full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where grade='"+grade+"' and exam_id="+exam_id+" and subject='"+subjects.get(k-1)+"') as t"+k+" on (coalesce(t.student_id,0)=coalesce(t"+k+".student_id,0) and t.name=t"+k+".name)\n";
            String sql="(select t.student_id, t.name, t.x as x"+A+"\n" +
                    "from\n" +
                    "(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where  grade='"+grade+"' and exam_id="+exam_id+" and subject='Total') as t\n" +
                    B+
//                    "where t.student_id is not null order by t.x desc )\n" +
                    "where t.student_id is not null order by cast(substring(t.x from 1 for position('/' in t.x)-1) as float) desc )\n" +
                    "UNION all\n" +
                    "(select t.student_id, t.name, t.x as x"+A+"\n" +
                    "from\n" +
                    "(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where grade='"+grade+"' and exam_id="+exam_id+" and subject='Total') as t\n" +
                    B+
                    "where t.student_id is null order by t.name desc )";

            return jdbcTemplate.queryForList(sql);
        }
        return null;
    }


    ///analysis/queryGradesubs?exam_id=42&grade=X19&classno=X1902&subject=数学
    @RequestMapping("/analysis/queryGradesubs")
    public List<Map<String,Object>> queryGradesubs(Integer exam_id,String grade,String classno,Integer student_id,String subject){
        System.out.println("/analysis/queryGradesubs "+exam_id+" "+grade+" "+classno+" "+student_id);

        List<String> subjectsubs=jdbcTemplate.queryForList("select distinct subjectsub from tbl_gradesub where exam_id=? and subject=? order by subjectsub",new Object[]{exam_id,subject}, String.class);
        if(student_id!=null && student_id>0){
            String A="";
            for(int k=1;k<=subjectsubs.size();k++) A+=", t"+k+".x as x"+k;
            String B="";
            for(int k=1;k<=subjectsubs.size();k++) B+="full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_gradesubs where (student_id="+student_id+" or (student_id is null and classno='"+classno+"') or (student_id is null and classno is null and grade='"+grade+"')) and exam_id="+exam_id+" and subject='"+subject+"' and subjectsub='"+subjectsubs.get(k-1)+"') as t"+k+" on (coalesce(t.student_id,0)=coalesce(t"+k+".student_id,0) and t.name=t"+k+".name)\n";
            String sql="(select t.student_id, t.name, t.x as x"+A+"\n" +
                    "from\n" +
                    "(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_gradesubs where (student_id="+student_id+" or (student_id is null and classno='"+classno+"') or (student_id is null and classno is null and grade='"+grade+"')) and exam_id="+exam_id+" and subject='"+subject+"' and subjectsub='Total') as t\n" +
                    B+
//                    "where t.student_id is not null order by t.x desc )\n" +
                    "where t.student_id is not null order by cast(substring(t.x from 1 for position('/' in t.x)-1) as float) desc )\n" +
                    "UNION all\n" +
                    "(select t.student_id, t.name, t.x as x"+A+"\n" +
                    "from\n" +
                    "(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_gradesubs where (student_id="+student_id+" or (student_id is null and classno='"+classno+"') or (student_id is null and classno is null and grade='"+grade+"')) and exam_id="+exam_id+" and subject='"+subject+"' and  subjectsub='Total') as t\n" +
                    B+
                    "where t.student_id is null order by t.name desc )";

            return jdbcTemplate.queryForList(sql);
        }
        else if(classno!=null && !classno.isEmpty()){
            String A="";
            for(int k=1;k<=subjectsubs.size();k++) A+=", t"+k+".x as x"+k;
            String B="";
            for(int k=1;k<=subjectsubs.size();k++) B+="full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_gradesubs where (classno='"+classno+"' or (classno is null and grade='"+grade+"')) and exam_id="+exam_id+" and  subject='"+subject+"' and subjectsub='"+subjectsubs.get(k-1)+"') as t"+k+" on (coalesce(t.student_id,0)=coalesce(t"+k+".student_id,0) and t.name=t"+k+".name)\n";
            String sql="(select t.student_id, t.name, t.x as x"+A+"\n" +
                    "from\n" +
                    "(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_gradesubs where (classno='"+classno+"' or (classno is null and grade='"+grade+"')) and exam_id="+exam_id+" and  subject='"+subject+"' and subjectsub='Total') as t\n" +
                    B+
//                    "where t.student_id is not null order by t.x desc )\n" +
                    "where t.student_id is not null order by cast(substring(t.x from 1 for position('/' in t.x)-1) as float) desc )\n" +
                    "UNION all\n" +
                    "(select t.student_id, t.name, t.x as x"+A+"\n" +
                    "from\n" +
                    "(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_gradesubs where (classno='"+classno+"' or (classno is null and grade='"+grade+"')) and exam_id="+exam_id+" and  subject='"+subject+"' and subjectsub='Total') as t\n" +
                    B+
                    "where t.student_id is null order by t.name desc )";

            return jdbcTemplate.queryForList(sql);
        }
        else if(grade!=null && !grade.isEmpty()){
            String A="";
            for(int k=1;k<=subjectsubs.size();k++) A+=", t"+k+".x as x"+k;
            String B="";
            for(int k=1;k<=subjectsubs.size();k++) B+="full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_gradesubs where grade='"+grade+"' and exam_id="+exam_id+" and  subject='"+subject+"' and subjectsub='"+subjectsubs.get(k-1)+"') as t"+k+" on (coalesce(t.student_id,0)=coalesce(t"+k+".student_id,0) and t.name=t"+k+".name)\n";
            String sql="(select t.student_id, t.name, t.x as x"+A+"\n" +
                    "from\n" +
                    "(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_gradesubs where  grade='"+grade+"' and exam_id="+exam_id+" and  subject='"+subject+"' and subjectsub='Total') as t\n" +
                    B+
//                    "where t.student_id is not null order by t.x desc )\n" +
                    "where t.student_id is not null order by cast(substring(t.x from 1 for position('/' in t.x)-1) as float) desc )\n" +
                    "UNION all\n" +
                    "(select t.student_id, t.name, t.x as x"+A+"\n" +
                    "from\n" +
                    "(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_gradesubs where grade='"+grade+"' and exam_id="+exam_id+" and  subject='"+subject+"' and subjectsub='Total') as t\n" +
                    B+
                    "where t.student_id is null order by t.name desc )";

            return jdbcTemplate.queryForList(sql);
        }
        return null;
    }



    ///analysis/queryRadar?grade=M12&classno=M1201&student_id=11
    @RequestMapping("/analysis/queryRadar")
    public List<Map<String,Object>> queryRadar(String grade,String classno,Integer student_id){
        System.out.println("/analysis/queryRadar "+grade+" "+classno+" "+student_id);

        if(student_id!=null && student_id>0){
            String sql="select * from vi_radar where student_id=?";
            return jdbcTemplate.queryForList(sql,student_id);
        }
        else if(classno!=null && !classno.isEmpty()){
            String sql="select * from vi_radar where student_id is null and classno=?";
            return jdbcTemplate.queryForList(sql,classno);
        }
        else if(grade!=null && !grade.isEmpty()){
            String sql="select * from vi_radar where student_id is null and classno is null and grade=?";
            return jdbcTemplate.queryForList(sql,grade);
        }
        return null;
    }


    ///analysis/queryRadarsub?grade=M12&classno=M1201&student_id=11&subject=数学
    @RequestMapping("/analysis/queryRadarsub")
    public List<Map<String,Object>> queryRadarsub(String grade,String classno,Integer student_id,String subject){
        System.out.println("/analysis/queryRadarsub "+grade+" "+classno+" "+student_id+" "+subject);

        if(student_id!=null && student_id>0){
            String sql="select * from vi_radarsub where student_id=? and subject=?";
            return jdbcTemplate.queryForList(sql,student_id,subject);
        }
        else if(classno!=null && !classno.isEmpty()){
            String sql="select * from vi_radarsub where student_id is null and classno=? and subject=?";
            return jdbcTemplate.queryForList(sql,classno,subject);
        }
        else if(grade!=null && !grade.isEmpty()){
            String sql="select * from vi_radarsub where student_id is null and classno is null and grade=? and subject=?";
            return jdbcTemplate.queryForList(sql,grade,subject);
        }
        return null;
    }


    ///analysis/queryStages?exam_id=41&subject=Chinese&grade=M12&classno=M1201&a=10&b=20&c=30&d=40&e=50&f=60&g=70
    @RequestMapping("/analysis/queryStages")
    public Map<String,Object> queryStages(Integer exam_id,String subject, String grade,String classno,
                                                Double a, Double b, Double c, Double d, Double e, Double f, Double g){
        System.out.println(new Date(System.currentTimeMillis()));

        System.out.println("/analysis/queryStages "+exam_id+" "+subject+" "+grade+" "+classno);
        System.out.println(a+" "+b+" "+c+" "+d+" "+e+" "+f+" "+g);


        if(exam_id==null || exam_id<=0 || subject==null || subject.isEmpty()) return null;
        if(classno!=null && !classno.isEmpty()){
            Map<String,Object> map=new HashMap<String,Object>();
            map=jdbcTemplate.queryForMap("select max(point) as m, min(point) as n  from vi_grades where exam_id="+exam_id+" and subject='"+subject+"' and classno='"+classno+"'");

            System.out.println(new Date(System.currentTimeMillis()));

            double n=((BigDecimal)map.get("n")).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
            double m=((BigDecimal)map.get("m")).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();

            if(!(a!=null && b!=null && c!=null && d!=null && e!=null && f!=null && g!=null)){
                a=new BigDecimal(n+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
                b=new BigDecimal(a+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
                c=new BigDecimal(b+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
                d=new BigDecimal(c+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
                e=new BigDecimal(d+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
                f=new BigDecimal(e+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
                g=new BigDecimal(f+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
            }

            String sql="select "+exam_id+" as exam_id, '"+subject+"' as subject, '"+grade+"' as grade, '"+classno+"' as classno,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and classno='"+classno+"' and point< "+a+") as count1,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and classno='"+classno+"' and point>="+a+" and point< "+b+") as count2,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and classno='"+classno+"' and point>="+b+" and point< "+c+") as count3,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and classno='"+classno+"' and point>="+c+" and point< "+d+") as count4,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and classno='"+classno+"' and point>="+d+" and point< "+e+") as count5,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and classno='"+classno+"' and point>="+e+" and point< "+f+") as count6,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and classno='"+classno+"' and point>="+f+" and point< "+g+") as count7,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and classno='"+classno+"' and point>="+g+" ) as count8,\n" +
                    a+" as a,\n" +
                    b+" as b,\n" +
                    c+" as c,\n" +
                    d+" as d,\n" +
                    e+" as e,\n" +
                    f+" as f,\n" +
                    g+" as g";

            System.out.println(new Date(System.currentTimeMillis()));
            System.out.println(sql);

            return jdbcTemplate.queryForMap(sql);
        }
        else if(grade!=null && !grade.isEmpty()){
            Map<String,Object> map=new HashMap<String,Object>();
            map=jdbcTemplate.queryForMap("select max(point) as m, min(point) as n  from vi_grades where exam_id="+exam_id+" and subject='"+subject+"' and grade='"+grade+"'");

            System.out.println(new Date(System.currentTimeMillis()));

            double n=((BigDecimal)map.get("n")).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
            double m=((BigDecimal)map.get("m")).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();

            if(!(a!=null && b!=null && c!=null && d!=null && e!=null && f!=null && g!=null)){
                a=new BigDecimal(n+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
                b=new BigDecimal(a+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
                c=new BigDecimal(b+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
                d=new BigDecimal(c+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
                e=new BigDecimal(d+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
                f=new BigDecimal(e+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
                g=new BigDecimal(f+(m-n)/8).setScale(1,BigDecimal.ROUND_HALF_UP).doubleValue();
            }

            String sql="select "+exam_id+" as exam_id, '"+subject+"' as subject, '"+grade+"' as grade, '"+classno+"' as classno,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and grade='"+grade+"' and point< "+a+") as count1,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and grade='"+grade+"' and point>="+a+" and point< "+b+") as count2,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and grade='"+grade+"' and point>="+b+" and point< "+c+") as count3,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and grade='"+grade+"' and point>="+c+" and point< "+d+") as count4,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and grade='"+grade+"' and point>="+d+" and point< "+e+") as count5,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and grade='"+grade+"' and point>="+e+" and point< "+f+") as count6,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and grade='"+grade+"' and point>="+f+" and point< "+g+") as count7,\n" +
                    "(select count(*) from vi_grades where  exam_id="+exam_id+" and subject='"+subject+"' and grade='"+grade+"' and point>="+g+" ) as count8,\n" +
                    a+" as a,\n" +
                    b+" as b,\n" +
                    c+" as c,\n" +
                    d+" as d,\n" +
                    e+" as e,\n" +
                    f+" as f,\n" +
                    g+" as g";

            System.out.println(new Date(System.currentTimeMillis()));
            System.out.println(sql);

            return jdbcTemplate.queryForMap(sql);
        }
        return null;
    }


    ///analysis/queryPointRank?subject=Chinese&grade=M12&classno=M1201&student_id=11
    @RequestMapping("/analysis/queryPointRank")
    public List<Map<String,Object>> queryPointRank(String subject, String grade,String classno,Integer student_id){
        System.out.println("/analysis/queryPointRank "+subject+" "+grade+" "+classno+" "+student_id);

        if(subject==null || subject.isEmpty()) return null;

        if(student_id!=null && student_id>0){
            String sql="select * from (select student_id, vi_grades.name,classno,grade, exam_id, tbl_exam.name as exam_name, tbl_exam.start_date as exam_date, subject, round(point,1) as point, rank() over (partition by (subject,exam_id,grade) order by point desc) as rank from vi_grades join tbl_exam on vi_grades.exam_id=tbl_exam.id) as t where subject=? and student_id=? order by exam_date";
            return jdbcTemplate.queryForList(sql,subject,student_id);
        }
        else if(classno!=null && !classno.isEmpty()){
            String sql="select * from (select student_id, vi_grades.name,classno,grade, exam_id, tbl_exam.name as exam_name, tbl_exam.start_date as exam_date, subject, round(point,1) as point, rank() over (partition by (subject,exam_id,grade) order by point desc) as rank from vi_grades join tbl_exam on vi_grades.exam_id=tbl_exam.id) as t where subject=? and student_id is null and classno=? order by exam_date";
            return jdbcTemplate.queryForList(sql,subject,classno);
        }
        else if(grade!=null && !grade.isEmpty()){
            String sql="select * from (select student_id, vi_grades.name,classno,grade, exam_id, tbl_exam.name as exam_name, tbl_exam.start_date as exam_date, subject, round(point,1) as point, rank() over (partition by (subject,exam_id,grade) order by point desc) as rank from vi_grades join tbl_exam on vi_grades.exam_id=tbl_exam.id) as t where subject=? and student_id is null and classno is null and grade=? order by exam_date";
            return jdbcTemplate.queryForList(sql,subject,grade);
        }
        return null;
    }


}
