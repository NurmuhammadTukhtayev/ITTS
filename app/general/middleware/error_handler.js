const dotenv = require('dotenv');
dotenv.config();

module.exports = (err, req, res, next) => {
  try{
    console.error('Error here:', err.stack); // log stack for debugging
  
    // let Express handle if headers already sent
    if (res.headersSent) return next(err); 
    
    // res.status(err.status || 500);
    let error_content = "";

    if (process.env.ENV === 'DEV') error_content = err.stack;
    
    res.render('./shared/error_500', {
      error_content, title: "Ошибка"
    });
  }catch(e){
    next(e);
  }
}
 