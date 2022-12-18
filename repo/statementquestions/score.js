select	
	a.placeid,
	p."name",
	sum(case when a.answer then w.weight else 0 end) as score
from answers a
join places p on p.id = a.placeid 
join wizardgroups w on w.questionid = a.questionid
where w.wizardid = 1
group by a.placeid, p."name" 
order by score desc