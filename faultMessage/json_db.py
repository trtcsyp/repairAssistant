import pandas as pd

# 讀取 Excel 文件的路徑
station_file_path = r'C:\Users\User\Desktop\MRT DATA\TRTCrepair\repairDB\station.xlsx'
personnel_file_path = r'C:\Users\User\Desktop\MRT DATA\TRTCrepair\repairDB\Personnel.xlsx'

# 讀取數據
station_df = pd.read_excel(station_file_path)
personnel_df = pd.read_excel(personnel_file_path)

# 將數據框架轉換為 JSON 文件
station_json_data = station_df.to_json(orient='records', force_ascii=False)
personnel_json_data = personnel_df.to_json(orient='records', force_ascii=False)

# 指定保存 JSON 文件的路徑
station_json_path = r'C:\Users\User\Desktop\MRT DATA\TRTCrepair\faultMessage\stationDB.json'
personnel_json_path = r'C:\Users\User\Desktop\MRT DATA\TRTCrepair\faultMessage\personnelDB.json'

# 保存 JSON 文件
with open(station_json_path, 'w', encoding='utf-8') as f:
    f.write(station_json_data)

with open(personnel_json_path, 'w', encoding='utf-8') as f:
    f.write(personnel_json_data)
