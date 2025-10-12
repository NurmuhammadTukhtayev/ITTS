from docx.api import Document
import os
from pathlib import Path

def word2csv(doc_path, input_file, test_id):
    try:
        # variables 
        doc_path = Path('./public/') / doc_path
        data_path = doc_path / 'csv'
        file_name = input_file.split('.')[0]
        output_file = f'{file_name}.csv'

        # # create output folder if do not exists
        os.makedirs(data_path, exist_ok=True)

        # read doc and load the table
        document = Document(doc_path / input_file)
        table = document.tables[0]

        data = []

        # manual header
        keys = ("Question", "A", "B", "C", "D")

        for i, row in enumerate(table.rows):
            text = (cell.text for cell in row.cells)

            # uncomment if you have header
            # if i == 0:
            #     keys = tuple(text)
            #     continue

            row_data = dict(zip(keys, text))
            data.append(row_data)

        # Specify UTF-8 encoding here to avoid encoding issues
        with open(data_path / output_file, 'w', encoding='utf-8') as file:
            csv_header = '"test_id","question","option_a","option_b","option_c","option_d"'
            file.write(csv_header)
            file.write('\n')
            for row in data:
                row_text = ""

                question = row["Question"]
                variation1 = row["A"]
                variation2 = row["B"]
                variation3 = row["C"]
                variation4 = row["D"]
                
                row_text += '"' + test_id + '"' + ','
                row_text += '"' + question + '"' + ','
                row_text += '"' + variation1 + '"' + ','
                row_text += '"' + variation2 + '"' + ','
                row_text += '"' + variation3 + '"' + ','
                row_text += '"' + variation4 + '"'
                
                file.write(row_text)
                file.write('\n')

        print("Word has been converted to csv successfully.")
        return output_file
    except Exception as e:
        print(e)
        return None