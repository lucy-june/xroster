select
t.student_id as student_id, num,coalesce(num0,0) as num0,coalesce(num1,0) as num1,coalesce(num2,0) as num2,coalesce(num3,0) as num3,coalesce(num4,0) as num4
from
(select student_id,count(*) as num from tbl_attendance group by student_id) as t
full outer join (select student_id,count(*) as num0 from tbl_attendance where state=0 group by student_id) as t0 on t.student_id=t0.student_id
full outer join (select student_id,count(*) as num1 from tbl_attendance where state=1 group by student_id) as t1 on t.student_id=t1.student_id
full outer join (select student_id,count(*) as num2 from tbl_attendance where state=2 group by student_id) as t2 on t.student_id=t2.student_id
full outer join (select student_id,count(*) as num3 from tbl_attendance where state=3 group by student_id) as t3 on t.student_id=t3.student_id
full outer join (select student_id,count(*) as num4 from tbl_attendance where state=4 group by student_id) as t4 on t.student_id=t4.student_id



select grade, sum(num),sum(num0),sum(num1), sum(num2),sum(num3),sum(num4) from
(select
substring(classno from 1 for 3) as grade,substring(classno from 4 for 2) as class,t.student_id as student_id, num,coalesce(num0,0) as num0,coalesce(num1,0) as num1,coalesce(num2,0) as num2,coalesce(num3,0) as num3,coalesce(num4,0) as num4
from
(select student_id,count(*) as num from tbl_attendance group by student_id) as t
full outer join (select student_id,count(*) as num0 from tbl_attendance where state=0 group by student_id) as t0 on t.student_id=t0.student_id
full outer join (select student_id,count(*) as num1 from tbl_attendance where state=1 group by student_id) as t1 on t.student_id=t1.student_id
full outer join (select student_id,count(*) as num2 from tbl_attendance where state=2 group by student_id) as t2 on t.student_id=t2.student_id
full outer join (select student_id,count(*) as num3 from tbl_attendance where state=3 group by student_id) as t3 on t.student_id=t3.student_id
full outer join (select student_id,count(*) as num4 from tbl_attendance where state=4 group by student_id) as t4 on t.student_id=t4.student_id
join tbl_student on tbl_student.id=t.student_id) as t
group by grade



select grade,class, sum(num),sum(num0),sum(num1), sum(num2),sum(num3),sum(num4) from
(select
substring(classno from 1 for 3) as grade,substring(classno from 4 for 2) as class,t.student_id as student_id, num,coalesce(num0,0) as num0,coalesce(num1,0) as num1,coalesce(num2,0) as num2,coalesce(num3,0) as num3,coalesce(num4,0) as num4
from
(select student_id,count(*) as num from tbl_attendance group by student_id) as t
full outer join (select student_id,count(*) as num0 from tbl_attendance where state=0 group by student_id) as t0 on t.student_id=t0.student_id
full outer join (select student_id,count(*) as num1 from tbl_attendance where state=1 group by student_id) as t1 on t.student_id=t1.student_id
full outer join (select student_id,count(*) as num2 from tbl_attendance where state=2 group by student_id) as t2 on t.student_id=t2.student_id
full outer join (select student_id,count(*) as num3 from tbl_attendance where state=3 group by student_id) as t3 on t.student_id=t3.student_id
full outer join (select student_id,count(*) as num4 from tbl_attendance where state=4 group by student_id) as t4 on t.student_id=t4.student_id
join tbl_student on tbl_student.id=t.student_id) as t
group by grade,class













