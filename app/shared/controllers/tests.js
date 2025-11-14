const { query } = require('../../../database/connction/query');

const shuffleArray = (array) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const start_test = async (req, res, next) => {
    try{
        const { test_id } = req.query;
        const test = await query('select id, test_name from tests where id = ?;', [test_id]);

        if (test.length < 1) return res.render('./shared/error')
        
        res.render('./shared/test_form', {
            test:test[0], title: "Начать тест"
        })
    }catch(e){
        next(e);
    }
}

const start_test_post = async (req, res, next) => {
    try{
        const { first_name, last_name, email, phone, test_id } = req.body;
        
        const result = await query('call usp_handle_start_test(?, ?, ?, ?, ?)',
            [first_name, last_name, email, phone, test_id]
        );

        if (result.err) return res.redirect('/test?error=true&message=Пожалуйста, дважды проверьте введенные вами данные, используйте только уникальную учетную запись электронной почты, а далее ваши данные');

        if(result.affectedRows < 1) return res.redirect('/test?error=true&message=Не удалось запустить тест. Пожалуйста, попробуйте позже. У вас, возможно, нет доступных попыток.');

        const {track_id, tester_id } = result[0][0];
        
        res.redirect(`/test/${test_id}?tester_id=${tester_id}&track_id=${track_id}`);
    }catch(e){
        next(e);
    }
}

const get_test_questions = async (req, res, next) => {
    const {id} = req.params;
    const {tester_id, track_id} = req.query;

    // get test questions
    const [test_result, question_result ] = await Promise.all([
        query('select * from tests where id = ?', [id]),
        query('select * from vw_get_question_list WHERE track_id = ? AND tester_id = ? AND test_id = ? ORDER BY RAND();',
            [track_id, tester_id, id]
        )
    ])

    // let result = await query('select * from tests where id = ?', [id]);
    const {test_name, author_name, created_at, updated_at} = test_result[0];

    let test = {
        id: req.params.id,
        title: test_name,
        author_name,
        created_at, updated_at,
        questions: question_result.map((r) => {
            // Create all options with their original letter IDs
            let options = [
                { id: 'A', text: r.option_a },
                { id: 'B', text: r.option_b },
                { id: 'C', text: r.option_c },
                { id: 'D', text: r.option_d },
            ];

            // Shuffle them randomly
            options = shuffleArray(options);

            return {
                question_id: r.question_id,
                text: r.question_text,
                options: options
            };
        }),

    }
    
    res.render('./shared/test', {
        copyrightYear: res.locals.copyrightYear, 
        learning_material_categories: res.locals.learning_material_categories,
        test, title: test.title
    });
}

const check_answer = async (req, res, next) => {
    try{
        const {answers, tester_id, track_id} = req.body;

        const question_ids = answers.map(q => q.question_id);
        const correct_answers = await query(
        'SELECT id AS question_id, correct_option FROM questions WHERE id IN (?)',
            [question_ids]
        );

        const correct_map = {};
        correct_answers.forEach(q => correct_map[q.question_id] = q.correct_option);

        let score = 0;
        let total = 0;

        for (const q of answers){
            const correct = correct_map[q.question_id];
            const is_correct = q.choosen_option === correct ? 1 : 0;
            if (is_correct) score ++;

            total ++;
        }

        // save results 
        const result = await query('call usp_save_session_results(?, ?)',
            [track_id, score]
        );

        if (result.err) return res.redirect('/test?error=true&message='+result.errData);

        // console.log(answers, question_ids, correct_answers, correct_map);
        
        res.status(200).json({success:true, score, total});
    }catch(e){
        console.log(e)
        res.status(500).json({success:false, message:""});
    }
}

const list_of_test = async (req, res, next) => {
    try{
        const tests = await query('select * from vw_tests order by created_at_raw desc');

        res.render('./shared/test_list', {
            tests, title: "Тестование"
        })
    }catch(e){
        next(e);
    }
}

module.exports = {
    get_test_questions, check_answer, start_test,
    start_test_post, list_of_test
}