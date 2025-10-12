const { spawn } = require('child_process');
const path = require('path');

/**
 * Loads a Word document into a MySQL database.
 * 
 * This function processes a Word (.docx) file, extracts its content,
 * and inserts it into the specified MySQL database using a Python script.
 *
 * Example usage:
 * @example
 *  result = load_word_to_mysql(
 *      {
 *          test_id: '1',
 *          document_name: '6dde1e6778e9601339a6fa600a1fe28b.docx',
 *          file_path: 'uploads/tests/docs'
 *      },
 *      './testify/.venv/Scripts/python.exe',
 *      'mysql+pymysql://username:password@localhost:3306/db_name'
 * );
 *
 * @param {Object} params - The parameters for document processing.
 * @param {string} params.test_id - The test ID associated with the document.
 * @param {string} params.document_name - The name of the Word document file.
 * @param {string} params.file_path - The relative or absolute path to the file.
 * @param {string} pythonPath - The path to the Python interpreter (used to execute the script).
 * @param {string} mysqlConnectionString - The MySQL connection URI in SQLAlchemy format.
 * 
 * @returns {Promise<Object>} Result of the document loading operation.
 * The returned object may include success status, inserted record info, or error details.
 */

const load_word_to_mysql = (data, python_path, sql_conn_str) => {
  return new Promise((resolve, reject) => {
    try {
      // if python_path is absolute, use it as-is, otherwise resolve relative to this file
      const pythonPath = path.isAbsolute(python_path)
        ? python_path
        : path.join(__dirname, python_path);

      const { test_id, document_name, file_path } = data;

      const scriptPath = path.join(__dirname, 'testify', 'main.py');

      // arguments passed to the python script
      const args = [scriptPath, test_id, document_name, file_path, sql_conn_str];

      const py = spawn(pythonPath, args);

      let stdout = '';
      let stderr = '';

      py.stdout.on('data', chunk => { stdout += chunk.toString(); });
      py.stderr.on('data', chunk => { stderr += chunk.toString(); });

      py.on('error', err => {
        // spawn failure, e.g. wrong executable path or permissions
        reject({ type: 'spawn_error', error: err, stderr });
      });

      py.on('close', code => {
        if (code !== 0) {
          // Non-zero exit, treat as failure and include stderr for debugging
          return reject({ type: 'exit_error', code, stdout, stderr });
        }
        // success
        resolve({ code, stdout, stderr });
      });
    } catch (e) {
      reject({ type: 'internal_error', error: e });
    }
  });
};



module.exports = load_word_to_mysql;
