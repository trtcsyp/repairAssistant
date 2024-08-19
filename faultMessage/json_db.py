import pandas as pd

# 讀取 Excel 文件的路徑
file_path = 'D:/repairAssistant/repairDB/repairDB.xlsx'

# 讀取第一個工作表
df = pd.read_excel(file_path, sheet_name=0)  # 使用索引0來讀取第一個工作表

# 創建四級單位與對應姓名的字典
grouped = df.groupby('四級單位')['姓名'].apply(list).reset_index()

# 提取四級單位
station_df = grouped[['四級單位']].drop_duplicates().reset_index(drop=True)

# 將數據框架轉換為 JSON 文件
station_json_data = station_df.to_json(orient='records', force_ascii=False)
personnel_json_data = grouped.to_json(orient='records', force_ascii=False)

# 指定保存 JSON 文件的路徑
station_json_path = 'D:/repairAssistant/faultMessage/stationDB.json'
personnel_json_path = 'D:/repairAssistant/faultMessage/personnelDB.json'

# 保存 JSON 文件
with open(station_json_path, 'w', encoding='utf-8') as f:
    f.write(station_json_data)

with open(personnel_json_path, 'w', encoding='utf-8') as f:
    f.write(personnel_json_data)

print("JSON file has been successfully created and saved")
