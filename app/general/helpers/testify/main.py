import sys
from modules import word2csv, merge_csv

def main(test_id, file_name, file_path, mysql_conn_str):
    try:
        # convert word to csv
        output_file = word2csv.word2csv(file_path, file_name, test_id)

        if not output_file:
            return 1
        
        # insert records to staging
        table_name = merge_csv.load_csv_to_stg(file_path, output_file, mysql_conn_str)

        if not table_name:
            return 1
        
        return 0

    except Exception as e:
        print(e)
        return 1

if __name__ == '__main__':
    args = sys.argv[1:]
    
    # get arguments
    test_id = args[0]
    file_name = args[1]
    file_path = args[2]
    mysql_conn_str = args[3]

    main(test_id, file_name, file_path, mysql_conn_str)
    

    

