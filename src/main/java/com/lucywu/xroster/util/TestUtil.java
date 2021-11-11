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

package com.lucywu.xroster.util;

import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Date;
import java.util.*;

/**
 * Created by lucy on 2018/4/26.
 */
public class TestUtil {
    String[] classnos={"C1201","C1202","C1301","C1302","C1303","C1401","C1402","C1403","C1404","C1501","C1502","C1503","C1504"};
    String[] subjects={"语文","英语","数学"};
    String[] family_names={"王","赵","张","李","刘","孙","宋","习","彭","叶","江","胡","邓","吴","阚","于","陈","白","孟","卞","钱","洪"};
    String[] family_names2={"Wang","Zhao","Zhang","Li","Liu","Sun","Song","Xi","Peng","Ye","Jiang","Hu","Deng","Wu","Kan","Yu","Chen","Bai","Meng","Bian","Qian","Hong"};
    String[] first_names={"小溪","浩","帅","力","诗诗","霞","明","崇伟","传奇","浩南","爽","之舟","帆","明光","子涵","飞","亚飞",
            "成言","闵哲","庆祥","翔","浩然","春熙","思思","泽民","锦涛","斌宇","宇涛","伟","国珍","子墨","小倩","小丹","晓媛","天雄","昂"};
    String[] first_names2={"Lucy","Hao","Shuai","Li","Shishi","Xia","Ming","Chongwei","Chuanqi","Haonan","Shuang","Zhizhou","Fan","Mingguang","Zihan","Fei","Yafei",
            "Chenyang","Minzhe","Qingxiang","Xiang","Haoran","Chunxi","Sisi","Zemin","Jintao","Binyu","Yutao","Wei","Guozhen","Zimo","Xiaoqian","Xiaodan","Xiaoyuan","Tianxiong","Ang"};
    Boolean[] sexs={true,false};
    String[] locations={"闵行","徐汇","黄埔","七宝","中山公园","曹杨","奉贤","金山","宝山","崇明","浦东","松江","张江","紫竹"};
    String[] event_names_1={"事项A","事项B","事项C","事项D","事项E","事项F","事项G","事项H"};
    String[] event_names_2={"6","7","1","3","5","9","0","5"};
    String[] event_names_3={"补课","考试","家长会","活动","聚餐","测试","考试","补课","补课"};
    String[] exam_names1={"考试A","考试B","考试C","考试D","考试E","考试F","考试G"};
    String[] exam_names2={"1","2","3","4","5","6","7"};
    Integer[] states={0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,3,4,4,1,1,1,1,1,1};
    String[] remarks={"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","$$$","备注~","#####","@@@","",""};
    String[] titles={"级别1","级别2","级别3","级别4","级别5","级别6"};
    String[] relations={"父","母"};
    String[] job_companies={"英特尔","大摩","微软","中行","花旗银行","三星","闵行区政府","思科","中信银行","浦发银行", "澳谛华","寰富投资",
            "通用电气","宝马","可口可乐","京东","汇金百货","华山医院","中山医院","复旦大学","崇明造船厂","生物研究所","辉瑞"};
    String[] job_titles={"副总裁","执行官","总监","副总监","专员","专员","专员","组长","工人","咨询员","高级咨询师","高级专员","首席战略官","首席技术官","首席财务官","管理层","合伙人"};
    String[] job_duties={"技术","会计","医药","研究","开发","质量保证","销售","市场","医药","药物","教育","咨询","管理","监管","服务","产品"};
    String[] subjectsubs={"问题一","问题二","问题三","问题四","问题五"};

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
}
