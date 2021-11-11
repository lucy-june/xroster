create view vi_radar as
(
select u.student_id,u.name,u.classno,u.grade,u.k,COALESCE((w.m-u.v)*1000/(w.m-w.n),0) as v from
(
select grade,k,max(v) as m,min(v) as n from
(
--subject_rank
select student_id,name,classno,grade,subject as k,avg(rank_grade) as v from
(select student_id, name,subject,point, classno,grade
,rank() over (partition by (subject,exam_id,grade) order by point desc)  as rank_grade
from vi_grades
) as t
where subject<>'Total'
 group by student_id,name,subject,classno,grade

UNION

--time_variance
 select student_id,name,classno,grade,'ExamBalance' as k,variance(rank_grade) as v from
 (select student_id, name,subject,point, classno,grade
 ,rank() over (partition by (subject,exam_id,grade) order by point desc)  as rank_grade
 from vi_grades where subject='Total'
 ) as t
  group by student_id,name,classno,grade

UNION

--subject_variance
select student_id,name,classno,grade,'SubjectBalance' as k, variance(v) as v FROM
(
select student_id,name,classno,grade,subject as k,avg(rank_grade) as v from
(select student_id, name,subject,point, classno,grade
,rank() over (partition by (subject,exam_id,grade) order by point desc)  as rank_grade
from vi_grades
) as x
 group by student_id,name,subject,classno,grade
) as y
group by student_id,name,classno,grade
) as z
group by grade,k
)
as w

join

(
--subject_rank
select student_id,name,classno,grade,subject as k,avg(rank_grade) as v from
(select student_id, name,subject,point, classno,grade
,rank() over (partition by (subject,exam_id,grade) order by point desc)  as rank_grade
from vi_grades
) as t
where subject<>'Total'
 group by student_id,name,subject,classno,grade

UNION

--time_variance
 select student_id,name,classno,grade,'ExamBalance' as k,variance(rank_grade) as v from
 (select student_id, name,subject,point, classno,grade
 ,rank() over (partition by (subject,exam_id,grade) order by point desc)  as rank_grade
 from vi_grades where subject='Total'
 ) as t
  group by student_id,name,classno,grade

UNION

--subject_variance
select student_id,name,classno,grade,'SubjectBalance' as k, variance(v) as v FROM
(
select student_id,name,classno,grade,subject as k,avg(rank_grade) as v from
(select student_id, name,subject,point, classno,grade
,rank() over (partition by (subject,exam_id,grade) order by point desc)  as rank_grade
from vi_grades
) as x
 group by student_id,name,subject,classno,grade
) as y
group by student_id,name,classno,grade
) as u

on (w.grade=u.grade and w.k=u.k)
)