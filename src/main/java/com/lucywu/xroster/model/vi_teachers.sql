create view vi_teachers as
(select  teacher_id, classno, substring(classno from 1 for 3) as grade from tbl_teacher,tbl_class where tbl_teacher.id=tbl_class.teacher_id)


create view vi_teachers as
(select teacher_id as id, (teacher_id || ' ' || name) as teacher_id, classno, substring(classno from 1 for 3) as grade from tbl_teacher,tbl_class where tbl_teacher.id=tbl_class.teacher_id)


