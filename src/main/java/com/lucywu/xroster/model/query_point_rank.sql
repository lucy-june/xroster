select student_id, vi_grades.name,classno,grade, exam_id, tbl_exam.name as exam_name, tbl_exam.start_date as exam_date, subject, round(point,1) as point,
rank() over (partition by (subject,exam_id,grade) order by point desc) as rank
from vi_grades join tbl_exam on vi_grades.exam_id=tbl_exam.id
order by exam_date