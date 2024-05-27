## การตั้งค่าและใช้งาน
### 1. สร้าง Google Script Project
1. ไปที่ [Google Apps Script](https://script.google.com/)

2. สร้างโปรเจคใหม่

- ตั้งชื่อโครงการหรือชื่อโปรเจ็คของเรา คลิกที่ชื่อดังภาพ(ค่าเริ่มต้นคือ `โครงการไม่มีชื่อ`) จะปรากฏหน้าต่างขึ่นมาให้ตั้งชื่อแล้วเลือก `เปลี่ยนชื่อ`

<img src="https://github.com/zepultula/line_alert_calendar_auto/blob/main/images/action_script-6.png" width="300">

### 2. เพิ่ม Script
คัดลอก `code` ต่อไปนี้และวางลงใน `Script Editor:`

```javascript
function dEventMessageIT() {
    var googleCalendarId = "your calendar id";
    var calendar = CalendarApp.getCalendarById(googleCalendarId);
    var today = new Date();
    var formattedDate = today.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    var dailyEventList = calendar.getEventsForDay(today);
    var message = "📣 แจ้งเตือนกิจกรรมประจำวันที่ " + formattedDate + "\n-----------";
    for (var i = 0; i < dailyEventList.length; i++) {
        var eventTitle = "📋 รายการที่: " + Number(i+1) + " " + "\n📖 เรื่อง :" + " " + dailyEventList[i].getTitle();
        var eventTime = "⏰ เวลา: " + " " + dailyEventList[i].getStartTime().toTimeString().slice(0,8);
        eventTime = eventTime + " - " + dailyEventList[i].getEndTime().toTimeString().slice(0, 8);
        if((dailyEventList[i].getStartTime().toTimeString().slice(0,8) == "00:00:00") && (dailyEventList[i].getEndTime().toTimeString().slice(0, 8) == "00:00:00")){
            eventTime = "⏰ เวลา: ทั้งวัน";
        }
        var eventDescription = "📄 รายละเอียด:" + " " + dailyEventList[i].getDescription() + " \n";
        if(dailyEventList[i].getDescription() == ""){
            eventDescription = "📄 รายละเอียด: ⛔ ไม่ได้ระบุ ⛔";
        }
        message += "\n\n" + eventTitle + "\n" + eventTime + "\n" + eventDescription;
    }
    if (dailyEventList == "") {
        message = "☕ วันนี้ไม่มีรายการแจ้งเตือน 😴";
    }
    if (message !== "") {
        sendMessage(message);
    }
}

function sendMessage(message) {
    var lineNotifyEndPoint = "https://notify-api.line.me/api/notify";
    var accessToken = "your token key"; //ทำการแทรก Token ของตนเอง 
    var formData = {
        "message": message
    };
    var options = {
        "headers" : {"Authorization" : "Bearer " + accessToken},
        "method" : 'post',
        "payload" : formData
    };
    try {
        var response = UrlFetchApp.fetch(lineNotifyEndPoint, options);
    }
    catch (error) {
        Logger.log(error.name + ": " + error.message);
        return;
    }
    if (response.getResponseCode() !== 200) {
        Logger.log("Sending message failed.");
    }
}
```

หลังจากที่ได้ `code` เป็นที่เรียบร้อยแล้ว ในส่วนของ `Access Token ` และ `Calendar ID` ยังว่างอยู่ ไม่ต้องตกใจ

```javascript
var googleCalendarId = "your calendar id"; // ทำการแทรก calendar id ของตนเอง แทน your calendar id
var accessToken = "your token key"; //ทำการแทรก Token ของตนเอง แทน your token key
```

ผู้เขียนจะพาไปสร้าง `Access Token `จาก `Line Notify` กันครับ โดยเริ่มสร้าง [Line Access Token Key](03-สร้าง-Line-Notify-Token.md)