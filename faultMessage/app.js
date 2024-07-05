document.addEventListener("DOMContentLoaded", () => {
  // 自動設定日期和時間
  let now = new Date();
  let currentDate = now.toISOString().substring(0, 10);
  let currentTime = now.toTimeString().substring(0, 5);

  // 設定通報日期和時間
  document.getElementById("notificationDate").value = currentDate;
  document.getElementById("notificationTime").value = currentTime;

  // 設定出發和抵達時間
  document.getElementById("departureTime").value = currentTime;
  document.getElementById("arrivalTime").value = currentTime;

  // 從 JSON 文件加載選項並更新 select 元素
  fetch("stationDB.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const reportSelect = document.getElementById("report");

      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item["四級單位"];
        option.text = item["四級單位"];
        reportSelect.appendChild(option);
      });

      updatePersonnel();
    })
    .catch((error) => console.error("Error loading station JSON data:", error));

  fetch("personnelDB.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      window.personnelData = data;
    })
    .catch((error) =>
      console.error("Error loading personnel JSON data:", error)
    );

  // 綁定複製按鈕的點擊事件
  document.getElementById("button").addEventListener("click", function () {
    let textToCopy = document.getElementById("result").innerText;
    let tempInput = document.createElement("textarea");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("您的故障訊息已複製: " + textToCopy);
  });
});

function updatePersonnel() {
  const reportSelect = document.getElementById("report");
  const selectedUnit = reportSelect.value;
  const personnelSelect = document.getElementById("personnelSelected");

  // 清空現有選項
  personnelSelect.innerHTML = "";

  // 根據選擇的四級單位添加對應的人員選項
  if (window.personnelData) {
    window.personnelData.forEach((item) => {
      if (item["四級單位"] === selectedUnit) {
        item["姓名"].forEach((name) => {
          const option = document.createElement("option");
          option.value = name;
          option.text = name;
          personnelSelect.appendChild(option);
        });
      }
    });
  }

  updateDetails();
}

function gatherSelections() {
  let reportSelect = document.getElementById("report");
  let reportText = reportSelect.options[reportSelect.selectedIndex].text;

  let reportNumber = document.getElementById("reportNumber").value;
  let notificationDate = document.getElementById("notificationDate").value;
  let notificationTime = document.getElementById("notificationTime").value;
  let incidentDescription = document.getElementById(
    "incidentDescription"
  ).value;

  // Check if the report is complete
  let isComplete = document.getElementById("isComplete").checked;
  let reportStatus = isComplete ? "(完)" : "";

  // Update impact range details
  const delay = document.getElementById("delay").value;
  const influenceInterval = document.getElementById("influenceInterval").value;
  const simpleDescription = document.getElementById("simpleDescription").value;

  // Combine date and time for full datetime
  let formattedDateTime = `${notificationDate} ${notificationTime}`;

  // 處理情況
  const departureTime = document.getElementById("departureTime").value;
  const arrivalTime = document.getElementById("arrivalTime").value;
  const departureLocation = document.getElementById("departureLocation").value;

  const personnelSelect = document.getElementById("personnelSelected");
  const selectedPersonnel = Array.from(personnelSelect.selectedOptions).map(
    (option) => option.text
  );
  const personnelText =
    selectedPersonnel.join("、") + ` 共${selectedPersonnel.length}員`;

  const processDescription =
    document.getElementById("processDescription").value;

  // Compile title and incident report
  const titleText = `${reportText}-第${reportNumber}報${reportStatus}：\n`;
  let resultText = `(1)事件：${formattedDateTime} ${incidentDescription}\n`;

  // (2)影響範圍：
  const impactDetails = `(2)影響範圍：\n⚫延誤否：${delay}\n⚫影響區間：${influenceInterval}\n⚫簡易敘述：${simpleDescription}\n`;

  // (3)處理情況：
  const situation = `(3)處理情況：\n⚫出發時間：${departureTime}\n⚫抵達時間：${arrivalTime}\n⚫出發地點：${departureLocation}\n⚫現場負責人：${personnelText}\n⚫處理過程：\n${processDescription}`;

  // Display the result in the result area
  document.getElementById("result").innerText =
    titleText + resultText + impactDetails + situation;
}

function updateDetails() {
  gatherSelections();
}
