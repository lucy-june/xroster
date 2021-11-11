//学生的成绩大表
(select t1.student_id, t1.name, t1.x as x1, t2.x as x2, t3.x as x3, t4.x as x4, t5.x as x5
from
(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (student_id=11 or (student_id is null and classno='M1201') or (student_id is null and classno is null and grade='M12')) and exam_id=5 and subject='Total') as t1

full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (student_id=11 or (student_id is null and classno='M1201') or (student_id is null and classno is null and grade='M12')) and exam_id=5 and subject='English') as t2 on (coalesce(t1.student_id,0)=coalesce(t2.student_id,0) and t1.name=t2.name)

full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (student_id=11 or (student_id is null and classno='M1201') or (student_id is null and classno is null and grade='M12')) and exam_id=5 and subject='Math') as t3 on (coalesce(t1.student_id,0)=coalesce(t3.student_id,0) and t1.name=t3.name)

full outer join(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (student_id=11 or (student_id is null and classno='M1201') or (student_id is null and classno is null and grade='M12')) and exam_id=5 and subject='Politics') as t4 on (coalesce(t1.student_id,0)=coalesce(t4.student_id,0) and t1.name=t4.name)

full outer join(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (student_id=11 or (student_id is null and classno='M1201') or (student_id is null and classno is null and grade='M12')) and exam_id=5 and subject='Chinese') as t5 on (coalesce(t1.student_id,0)=coalesce(t5.student_id,0) and t1.name=t5.name)

where t1.student_id is not null order by t1.x desc )

UNION all

(select t1.student_id, t1.name, t1.x as x1, t2.x as x2, t3.x as x3, t4.x as x4, t5.x as x5
from
(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (student_id=11 or (student_id is null and classno='M1201') or (student_id is null and classno is null and grade='M12')) and exam_id=5 and subject='Total') as t1

full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (student_id=11 or (student_id is null and classno='M1201') or (student_id is null and classno is null and grade='M12')) and exam_id=5 and subject='English') as t2 on (coalesce(t1.student_id,0)=coalesce(t2.student_id,0) and t1.name=t2.name)

full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (student_id=11 or (student_id is null and classno='M1201') or (student_id is null and classno is null and grade='M12')) and exam_id=5 and subject='Math') as t3 on (coalesce(t1.student_id,0)=coalesce(t3.student_id,0) and t1.name=t3.name)

full outer join(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (student_id=11 or (student_id is null and classno='M1201') or (student_id is null and classno is null and grade='M12')) and exam_id=5 and subject='Politics') as t4 on (coalesce(t1.student_id,0)=coalesce(t4.student_id,0) and t1.name=t4.name)

full outer join(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (student_id=11 or (student_id is null and classno='M1201') or (student_id is null and classno is null and grade='M12')) and exam_id=5 and subject='Chinese') as t5 on (coalesce(t1.student_id,0)=coalesce(t5.student_id,0) and t1.name=t5.name)

where t1.student_id is null order by name desc )








//班级成绩大表
(select t1.student_id, t1.name, t1.x as x1, t2.x as x2, t3.x as x3, t4.x as x4, t5.x as x5
from
(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (classno='M1201' or (classno is null and grade='M12')) and exam_id=5 and subject='Total') as t1

full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (classno='M1201' or (classno is null and grade='M12')) and exam_id=5 and subject='English') as t2 on (coalesce(t1.student_id,0)=coalesce(t2.student_id,0) and t1.name=t2.name)

full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (classno='M1201' or (classno is null and grade='M12')) and exam_id=5 and subject='Math') as t3 on (coalesce(t1.student_id,0)=coalesce(t3.student_id,0) and t1.name=t3.name)

full outer join(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (classno='M1201' or (classno is null and grade='M12')) and exam_id=5 and subject='Politics') as t4 on (coalesce(t1.student_id,0)=coalesce(t4.student_id,0) and t1.name=t4.name)

full outer join(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (classno='M1201' or (classno is null and grade='M12')) and exam_id=5 and subject='Chinese') as t5 on (coalesce(t1.student_id,0)=coalesce(t5.student_id,0) and t1.name=t5.name)

where t1.student_id is not null order by t1.x desc )

UNION all

(select t1.student_id, t1.name, t1.x as x1, t2.x as x2, t3.x as x3, t4.x as x4, t5.x as x5
from
(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (classno='M1201' or (classno is null and grade='M12')) and exam_id=5 and subject='Total') as t1

full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (classno='M1201' or (classno is null and grade='M12')) and exam_id=5 and subject='English') as t2 on (coalesce(t1.student_id,0)=coalesce(t2.student_id,0) and t1.name=t2.name)

full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (classno='M1201' or (classno is null and grade='M12')) and exam_id=5 and subject='Math') as t3 on (coalesce(t1.student_id,0)=coalesce(t3.student_id,0) and t1.name=t3.name)

full outer join(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (classno='M1201' or (classno is null and grade='M12')) and exam_id=5 and subject='Politics') as t4 on (coalesce(t1.student_id,0)=coalesce(t4.student_id,0) and t1.name=t4.name)

full outer join(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where (classno='M1201' or (classno is null and grade='M12')) and exam_id=5 and subject='Chinese') as t5 on (coalesce(t1.student_id,0)=coalesce(t5.student_id,0) and t1.name=t5.name)

where t1.student_id is null order by name desc )














//年级成绩大表
(select t1.student_id, t1.name, t1.x as x1, t2.x as x2, t3.x as x3, t4.x as x4, t5.x as x5
from
(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where grade='M12' and exam_id=5 and subject='Total') as t1

full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where grade='M12' and exam_id=5 and subject='English') as t2 on (coalesce(t1.student_id,0)=coalesce(t2.student_id,0) and t1.name=t2.name)

full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where grade='M12' and exam_id=5 and subject='Math') as t3 on (coalesce(t1.student_id,0)=coalesce(t3.student_id,0) and t1.name=t3.name)

full outer join(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where grade='M12' and exam_id=5 and subject='Politics') as t4 on (coalesce(t1.student_id,0)=coalesce(t4.student_id,0) and t1.name=t4.name)

full outer join(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where grade='M12' and exam_id=5 and subject='Chinese') as t5 on (coalesce(t1.student_id,0)=coalesce(t5.student_id,0) and t1.name=t5.name)

where t1.student_id is not null order by t1.x desc )

UNION all

(select t1.student_id, t1.name, t1.x as x1, t2.x as x2, t3.x as x3, t4.x as x4, t5.x as x5
from
(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where grade='M12' and exam_id=5 and subject='Total') as t1

full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where grade='M12' and exam_id=5 and subject='English') as t2 on (coalesce(t1.student_id,0)=coalesce(t2.student_id,0) and t1.name=t2.name)

full outer join (select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where grade='M12' and exam_id=5 and subject='Math') as t3 on (coalesce(t1.student_id,0)=coalesce(t3.student_id,0) and t1.name=t3.name)

full outer join(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where grade='M12' and exam_id=5 and subject='Politics') as t4 on (coalesce(t1.student_id,0)=coalesce(t4.student_id,0) and t1.name=t4.name)

full outer join(select student_id, name, ''||round(point,1)||' / '||coalesce(rank_class,0)||' / '||coalesce(rank_grade,0) as x from vi_grades where grade='M12' and exam_id=5 and subject='Chinese') as t5 on (coalesce(t1.student_id,0)=coalesce(t5.student_id,0) and t1.name=t5.name)

where t1.student_id is null order by name desc )











