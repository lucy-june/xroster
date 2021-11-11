select * from vi_grades where exam_id=41 and subject='Chinese' and grade='M12'

select max(point) as m, min(point) as n  from vi_grades where exam_id=41 and subject='Chinese' and grade='M12'

select count(*) from vi_grades where exam_id=41 and subject='Chinese' and grade='M12' and point between 9 and 99

select 41 as exam_id, 'Chinese' as subject, 'M12' as grade, 'M1201' as classno,
(select count(*) from vi_grades where exam_id=41 and subject='Chinese' and grade='M12' and point>=9 and point< 99) as count1,
(select count(*) from vi_grades where exam_id=41 and subject='Chinese' and grade='M12' and point>=9 and point< 99) as count2,
(select count(*) from vi_grades where exam_id=41 and subject='Chinese' and grade='M12' and point>=9 and point< 99) as count3,
(select count(*) from vi_grades where exam_id=41 and subject='Chinese' and grade='M12' and point>=9 and point< 99) as count4,
(select count(*) from vi_grades where exam_id=41 and subject='Chinese' and grade='M12' and point>=9 and point< 99) as count5,
(select count(*) from vi_grades where exam_id=41 and subject='Chinese' and grade='M12' and point>=9 and point< 99) as count6

