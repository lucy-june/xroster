create view vi_students as
(select id as student_id, classno, substring(classno from 1 for 3) as grade from tbl_student)


create view vi_students as
(select id, (id || ' ' || name) as student_id , classno, substring(classno from 1 for 3) as grade from tbl_student)