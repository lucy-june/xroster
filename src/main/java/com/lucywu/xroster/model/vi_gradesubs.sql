create view vi_gradesubs as
(
--personal orgin and total
select *
,rank() over (partition by (subject,subjectsub,exam_id,classno) order by point desc)  as rank_class, rank() over (partition by (subject,subjectsub,exam_id,grade) order by point desc)  as rank_grade
from (
select
tbl_gradesub.student_id,tbl_student.name,tbl_gradesub.exam_id,tbl_gradesub.subject,tbl_gradesub.subjectsub,tbl_gradesub.point,tbl_student.classno,
substring(tbl_student.classno from 1 for 3) as grade, substring(tbl_student.classno from 4 for 2) as class
FROM
tbl_gradesub join tbl_student on tbl_gradesub.student_id=tbl_student.id

UNION
--subject subjectsub total points
select student_id,name,exam_id,subject,'Total' as subjectsub, sum(point) as point, classno,grade,class from(
select
tbl_gradesub.student_id,tbl_student.name,tbl_gradesub.exam_id,tbl_gradesub.subject,tbl_gradesub.subjectsub,tbl_gradesub.point,tbl_student.classno,
substring(tbl_student.classno from 1 for 3) as grade, substring(tbl_student.classno from 4 for 2) as class
FROM
tbl_gradesub join tbl_student on tbl_gradesub.student_id=tbl_student.id
) as t
group by student_id,exam_id,name,classno, grade,class,subject
) as x


UNION

--class avg
 select null as student_id, name,exam_id, subject,subjectsub, point, classno,grade,class
 , null  as rank_class, rank() over (partition by (subject,subjectsub,exam_id,grade) order by point desc)  as rank_grade
 from (
select null as student_id,classno||' Average' as name,exam_id, subject,subjectsub, avg(point) as point, classno,grade,class from(
select
tbl_gradesub.student_id,tbl_student.name,tbl_gradesub.exam_id,tbl_gradesub.subject,tbl_gradesub.subjectsub,tbl_gradesub.point,tbl_student.classno,
substring(tbl_student.classno from 1 for 3) as grade, substring(tbl_student.classno from 4 for 2) as class
FROM
tbl_gradesub join tbl_student on tbl_gradesub.student_id=tbl_student.id
UNION
select student_id,name,exam_id,subject,'Total' as subjectsub, sum(point) as point, classno,grade,class from(
select
tbl_gradesub.student_id,tbl_student.name,tbl_gradesub.exam_id,tbl_gradesub.subject,tbl_gradesub.subjectsub,tbl_gradesub.point,tbl_student.classno,
substring(tbl_student.classno from 1 for 3) as grade, substring(tbl_student.classno from 4 for 2) as class
FROM
tbl_gradesub join tbl_student on tbl_gradesub.student_id=tbl_student.id
) as t1
group by student_id,exam_id,name,classno, grade,class,subject
) as t2
group by exam_id,subject,subjectsub,classno,grade,class
) as y



UNION

--grade avg
select null as student_id,grade||' Average' as name,exam_id, subject,subjectsub, avg(point) as point, null as classno,grade,null as class
 ,null  as rank_class, null as rank_grade
from(
select
tbl_gradesub.student_id,tbl_student.name,tbl_gradesub.exam_id,tbl_gradesub.subject,tbl_gradesub.subjectsub,tbl_gradesub.point,tbl_student.classno,
substring(tbl_student.classno from 1 for 3) as grade, substring(tbl_student.classno from 4 for 2) as class
FROM
tbl_gradesub join tbl_student on tbl_gradesub.student_id=tbl_student.id
UNION
select student_id,name,exam_id,subject,'Total' as subjectsub, sum(point) as point, classno,grade,class from(
select
tbl_gradesub.student_id,tbl_student.name,tbl_gradesub.exam_id,tbl_gradesub.subject,tbl_gradesub.subjectsub,tbl_gradesub.point,tbl_student.classno,
substring(tbl_student.classno from 1 for 3) as grade, substring(tbl_student.classno from 4 for 2) as class
FROM
tbl_gradesub join tbl_student on tbl_gradesub.student_id=tbl_student.id
) as t3
group by student_id,exam_id,name,classno, grade,class,subject
) as t4
group by exam_id,subject,subjectsub,grade
)