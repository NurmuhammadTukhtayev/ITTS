import pandas as pd
from pathlib import Path
from sqlalchemy import create_engine, text

def load_csv_to_stg(file_path, file_name = 'rady_data', mysql_conn_str=""):
    try:
        data_path = Path('./public/') / file_path / 'csv'
        table_name = 'stg_questions'

        df = pd.read_csv(
            data_path / file_name,
            dtype={
                'test_id': str,
                'question': str,
                'option_a': str,
                'option_b': str,
                'option_c': str,
                'option_d': str
            }
        )
        
        # drop nulls
        df = df.dropna(subset=['test_id', 'question', 'option_a', 'option_b', 'option_c', 'option_d'])

        # create a connection to mysql
        engine = create_engine(mysql_conn_str)

        # write to sql
        df.to_sql(table_name, con=engine, if_exists='replace', index=False)

        # Change table collation
        with engine.begin() as conn:
            conn.execute(text(f"ALTER TABLE `{table_name}` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"))

        return table_name
    except Exception as e:
        print(e)
        return None