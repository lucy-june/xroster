delete from tbl_student where substring(classno from 1 for 1)<>'M';
delete from tbl_grade where tbl_grade.student_id not in (select id from tbl_student);
delete from tbl_attendance where tbl_attendance.student_id not in (select id from tbl_student);