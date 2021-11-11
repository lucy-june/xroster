create view vi_radarsub as
(
select u.student_id,u.name,u.classno,u.grade,subject,u.k,COALESCE((w.m-u.v)*1000/(w.m-w.n),0) as v from
(
select grade,k,max(v) as m,min(v) as n from
(
--subjectsub_rank
select student_id,name,classno,grade,subject,subjectsub as k,avg(rank_grade) as v from
(select student_id, name,subject,subjectsub,point, classno,grade
,rank() over (partition by (subject,subjectsub,exam_id,grade) order by point desc)  as rank_grade
from vi_gradesubs
) as t
where subjectsub<>'Total'
 group by student_id,name,subject,subjectsub,classno,grade

UNION

--time_variance
 select student_id,name,classno,grade,subject,'ExamBalance' as k,variance(rank_grade) as v from
 (select student_id, name,subject,subjectsub, point, classno,grade
 ,rank() over (partition by (subject,subjectsub,exam_id,grade) order by point desc)  as rank_grade
 from vi_gradesubs where subjectsub='Total'
 ) as t
  group by student_id,name,classno,grade,subject

UNION

--subjectsub_variance
select student_id,name,classno,grade,subject,'ItemBalance' as k, variance(v) as v FROM
(
select student_id,name,classno,grade,subject,subjectsub as k,avg(rank_grade) as v from
(select student_id, name,subject,subjectsub,point, classno,grade
,rank() over (partition by (subject,subjectsub,exam_id,grade) order by point desc)  as rank_grade
from vi_gradesubs
) as x
 group by student_id,name,subject,subjectsub,classno,grade
) as y
group by student_id,name,classno,grade,subject
) as z
group by grade,k,subject
)
as w

join

(
--subjectsub_rank
select student_id,name,classno,grade,subject,subjectsub as k,avg(rank_grade) as v from
(select student_id, name,subject,subjectsub,point, classno,grade
,rank() over (partition by (subject,subjectsub,exam_id,grade) order by point desc)  as rank_grade
from vi_gradesubs
) as t
where subjectsub<>'Total'
 group by student_id,name,subject,subjectsub,classno,grade

UNION

--time_variance
 select student_id,name,classno,grade,subject,'ExamBalance' as k,variance(rank_grade) as v from
 (select student_id, name,subject,subjectsub,point, classno,grade
 ,rank() over (partition by (subject,subjectsub,exam_id,grade) order by point desc)  as rank_grade
 from vi_gradesubs where subjectsub='Total'
 ) as t
  group by student_id,name,classno,grade,subject

UNION

--subjectsub_variance
select student_id,name,classno,grade,subject,'ItemBalance' as k, variance(v) as v FROM
(
select student_id,name,classno,grade,subject,subjectsub as k,avg(rank_grade) as v from
(select student_id, name,subject,subjectsub,point, classno,grade
,rank() over (partition by (subject,subjectsub,exam_id,grade) order by point desc)  as rank_grade
from vi_gradesubs
) as x
 group by student_id,name,subject,subjectsub,classno,grade
) as y
group by student_id,name,classno,grade,subject
) as u

on (w.grade=u.grade and w.k=u.k)
)