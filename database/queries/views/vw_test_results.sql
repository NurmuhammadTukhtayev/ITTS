DROP VIEW IF EXISTS vw_test_results;

CREATE VIEW vw_test_results AS
with test_session_cte as (
	select distinct 
		test_result_id,
        test_id
	from test_session    
), ranked_results as (
	select
		tr.tester_id,
		tsc.test_id,
		t.first_name,
		t.last_name,
        t.email,
        t.phone,
		tr.test_completed,
		tr.score as test_score,
		SEC_TO_TIME(tr.time_taken) as time_taken,
		DATE_FORMAT(tr.created_at, '%M %e, %Y')  as started_at,
        row_number() over (partition by t.first_name, t.last_name, t.email, t.phone order by tr.created_at desc) as rnk
	from test_results tr
	left join testers t on t.id = tr.tester_id
	left join test_session_cte tsc on tr.id = tsc.test_result_id
	where tr.test_completed = 1
)
select 
	tester_id,
    test_id,
    first_name,
    last_name,
    email,
    phone,
    test_completed,
    test_score,
    time_taken,
    started_at
from ranked_results	
where rnk = 1;
