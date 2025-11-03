const { query } = require("../../../database/connction/query");
const upload_test = require('../../general/helpers/upload_test');
const dotenv = require('dotenv');

// env variables
dotenv.config();

// get test list 
const get_tests = async (req, res, next) => {
    try {
        const test_list = await query('select * from vw_tests order by created_at_raw desc');

        res.render('./admin/tests', {
            materials: test_list
        })
    } catch (err) {
        next(err)
    }
}

// add test manual
const add_test = async (req, res, next) => {
    try {
        const { test_name, author_name, attempts_allowed } = req.body;

        const result = await query('insert into tests(test_name, author_name, attempts_allowed) values(?, ?, ?)',
            [test_name, author_name, attempts_allowed]
        );

        if (result.err) return res.redirect(`/@admin/test?error=true&message=${result.errData}`);

        res.redirect('/@admin/test')
    } catch (e) {
        next(e);
    }
}

// delete test
const delete_test = async (req, res, next) => {
    try{
        result = await query('delete from tests where id = ?',
            [req.params.id]
        );

        if (result.err) return res.redirect(`/@admin/test?error=true&message=${result.errData}`);

        res.redirect('/@admin/test')
    }catch(e){
        next(e);
    }
}

const get_test = async (req, res, next) => {
    try{
        const check_test = await query('select * from tests where id = ?', [req.params.id]);
        if (check_test.length < 1) return res.render('./admin/error');

        const test_questions = await query('select * from vw_test_questions where test_id = ?',
            [req.params.id]
        );


        res.render('./admin/test_questions', {
            materials: test_questions
        })
    }catch(e){
        next(e);
    }
}

const modify_test = async (req, res, next) => {
    try{
        const {id, test_name, author_name, attempts_allowed} = req.body;

        const result = await query('update tests set test_name = ?, author_name = ?, attempts_allowed = ? where id = ?',
            [test_name, author_name, attempts_allowed, id]
        );

        if (result.err) return res.redirect(`/@admin/test?error=1&message=${result.errData}`);

        res.redirect('/@admin/test');
    }catch(e){
        next(e);
    }
}

const add_question = async (req, res, next) => {
    try{
        const {question_text, option_a, option_b, option_c, option_d, correct_option} = req.body;

        const result = await query('call usp_add_question(?, ?, ?, ?, ?, ?, ?)',
            [req.params.id, question_text, option_a, option_b, option_c, option_d, correct_option]
        );

        if (result.err) return res.redirect(`/@admin/test/${req.params.id}?error=true&message=${result.errData}`);

        res.redirect(`/@admin/test/${req.params.id}`);
    }catch(e){
        next(e)
    }
}

const modify_question = async (req, res, next) => {
    try{
        const {id, question_text, option_a, option_b, option_c, option_d, correct_option} = req.body;

        const result = await query('call usp_update_questions(?, ?, ?, ?, ?, ?, ?)',
            [id, question_text, option_a, option_b, option_c, option_d, correct_option]
        );

        if (result.err) return res.redirect(`/@admin/test/${req.params.id}?error=true&message=${result.errData}`);

        res.redirect(`/@admin/test/${req.params.id}`);
    }catch(e){
        next(e);
    }
}

const delete_question = async (req, res, next) => {
    try{
        result = await query('delete from questions where id = ?',
            [req.params.question_id]
        );

        if (result.err) return res.redirect(`/@admin/test?error=true&message=${result.errData}`);

        res.redirect(`/@admin/test/${req.params.id}`)
    }catch(e){
        next(e);
    }
}

const upload_test_file = async(req, res, next) => {
    try{
        const {test_name, author_name, attempts_allowed} = req.body;
        const document_name = req.docx;

        let result = await query('call usp_add_uploaded_docs(?,?,?,?);',
            [test_name, author_name, document_name, attempts_allowed]
        );
        
        if(result.err) return res.redirect(`/@admin/test?error=1&message=${result.errData}`);

        let inserted_row = result[0][0];
        inserted_row = {
            test_id: inserted_row.test_id,
            document_name: inserted_row.document_name,
            file_path: inserted_row.file_path
        }

        if (!inserted_row.test_id) return res.redirect(`/@admin/test?error=1&message=${result[0][0].error_msg}`);

        let status = await upload_test(
            inserted_row,
            process.env.PYTHON_PATH,
            `mysql+pymysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
        );

        if(status.code !== 0) return res.redirect('/@admin/test?error=true&message=Error' + status.stderr)

        // execute merge
        result = await query('call usp_merge_stg_questions()');

        if(result.err || result[0][0].error_msg) return res.redirect(`/@admin/test?error=1&message=${result.errData || result[0][0].error_msg}`);

        res.redirect('/@admin/test');
    }catch(e){
        next(e);
    }
}

module.exports = {
    get_tests, add_test, delete_test, modify_test, upload_test_file,
    get_test, add_question, modify_question, delete_question
};
