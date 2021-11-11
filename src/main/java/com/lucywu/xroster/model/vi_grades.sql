create view vi_grades as
(
--personal orgin and total
select *
,rank() over (partition by (subject,exam_id,classno) order by point desc)  as rank_class, rank() over (partition by (subject,exam_id,grade) order by point desc)  as rank_grade
from (
select
tbl_grade.student_id,tbl_student.name,tbl_grade.exam_id,tbl_grade.subject,tbl_grade.point,tbl_student.classno,
substring(tbl_student.classno from 1 for 3) as grade, substring(tbl_student.classno from 4 for 2) as class
FROM
tbl_grade join tbl_student on tbl_grade.student_id=tbl_student.id

UNION
--subject total points
select student_id,name,exam_id,'Total' as subject, sum(point) as point, classno,grade,class from(
select
tbl_grade.student_id,tbl_student.name,tbl_grade.exam_id,tbl_grade.subject,tbl_grade.point,tbl_student.classno,
substring(tbl_student.classno from 1 for 3) as grade, substring(tbl_student.classno from 4 for 2) as class
FROM
tbl_grade join tbl_student on tbl_grade.student_id=tbl_student.id
) as t
group by student_id,exam_id,name,classno, grade,class
) as x


UNION

--class avg
 select null as student_id, name,exam_id, subject, point, classno,grade,class
 , null  as rank_class, rank() over (partition by (subject,exam_id,grade) order by point desc)  as rank_grade
 from (
select null as student_id,classno||' Average' as name,exam_id, subject, avg(point) as point, classno,grade,class from(
select
tbl_grade.student_id,tbl_student.name,tbl_grade.exam_id,tbl_grade.subject,tbl_grade.point,tbl_student.classno,
substring(tbl_student.classno from 1 for 3) as grade, substring(tbl_student.classno from 4 for 2) as class
FROM
tbl_grade join tbl_student on tbl_grade.student_id=tbl_student.id
UNION
select student_id,name,exam_id,'Total' as subject, sum(point) as point, classno,grade,class from(
select
tbl_grade.student_id,tbl_student.name,tbl_grade.exam_id,tbl_grade.subject,tbl_grade.point,tbl_student.classno,
substring(tbl_student.classno from 1 for 3) as grade, substring(tbl_student.classno from 4 for 2) as class
FROM
tbl_grade join tbl_student on tbl_grade.student_id=tbl_student.id
) as t1
group by student_id,exam_id,name,classno, grade,class
) as t2
group by exam_id,subject,classno,grade,class
) as y



UNION

--grade avg
select null as student_id,grade||' Average' as name,exam_id, subject, avg(point) as point, null as classno,grade,null as class
 ,null  as rank_class, null as rank_grade
from(
select
tbl_grade.student_id,tbl_student.name,tbl_grade.exam_id,tbl_grade.subject,tbl_grade.point,tbl_student.classno,
substring(tbl_student.classno from 1 for 3) as grade, substring(tbl_student.classno from 4 for 2) as class
FROM
tbl_grade join tbl_student on tbl_grade.student_id=tbl_student.id
UNION
select student_id,name,exam_id,'Total' as subject, sum(point) as point, classno,grade,class from(
select
tbl_grade.student_id,tbl_student.name,tbl_grade.exam_id,tbl_grade.subject,tbl_grade.point,tbl_student.classno,
substring(tbl_student.classno from 1 for 3) as grade, substring(tbl_student.classno from 4 for 2) as class
FROM
tbl_grade join tbl_student on tbl_grade.student_id=tbl_student.id
) as t3
group by student_id,exam_id,name,classno, grade,class
) as t4
group by exam_id,subject,grade
)