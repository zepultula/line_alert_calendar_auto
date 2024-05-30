# อธิบาย Code เพิ่มเติม

### ฟังก์ชันพิเศษของ Google ใน Code 
ในเนื้อหานี้ ใช้ฟังก์ชันพิเศษของ **Google Apps Script** ซึ่งเป็น `API` สำหรับการทำงานกับ `Google Services` ต่างๆ โดยเฉพาะ Google Calendar และ UrlFetchApp ในการส่งข้อมูลไปยัง Line Notify โดยสคริปต์นี้ประกอบด้วยสองฟังก์ชันหลัก: `dEventMessageIT` และ `sendMessage` โดยมีฟังก์ชันพิเศษดังต่อไปนี้:

### ฟังก์ชั่นที่ใช้งาน

|ลำดับที่|ชื่อฟังก์ชั่น|คำอธิบาย|
| :----: | :---- | :---- |
|1|`CalendarApp.getCalendarById(calendarId)`|ฟังก์ชันนี้ใช้เพื่อดึงข้อมูลปฏิทินของ Google Calendar ที่มี ID ตรงกับ `calendarId` ฟังก์ชันนี้จะคืนค่าปฏิทินในรูปแบบของ `Object Calendar` ที่สามารถใช้ในการดึงข้อมูลกิจกรรมต่างๆ|
|2|`calendar.getEventsForDay(date)`|ฟังก์ชันนี้ใช้เพื่อดึงกิจกรรมทั้งหมดในวันที่กำหนด (ในรูปแบบ `Date`) จากปฏิทินที่ได้จาก `CalendarApp.getCalendarById` ฟังก์ชันนี้จะคืนค่ารายการของกิจกรรมในรูปแบบของอาร์เรย์ของ `Object CalendarEvent`|
|3|`dailyEventList[i].getTitle()`|ฟังก์ชันนี้ใช้เพื่อดึงชื่อเรื่องของกิจกรรมในรายการที่ i(ข้อมูลวนลูปรายการ)|
|4|`dailyEventList[i].getStartTime()`|ฟังก์ชันนี้ใช้เพื่อดึงเวลาเริ่มต้นของกิจกรรมในรูปแบบของ `Object Date`|
|5|`dailyEventList[i].getEndTime()`|ฟังก์ชันนี้ใช้เพื่อดึงเวลาสิ้นสุดของกิจกรรมในรูปแบบของ `Object Date`|
|6|`dailyEventList[i].getDescription()`|ฟังก์ชันนี้ใช้เพื่อดึงคำอธิบายของกิจกรรม|
|7|`UrlFetchApp.fetch(url, options)`|ฟังก์ชันนี้ใช้เพื่อส่ง `HTTP request` ไปยัง `URL` ที่กำหนด โดยมีการกำหนดตัวเลือกต่างๆ เช่น วิธีการส่ง (`POST`) และข้อมูล `payload` ที่จะส่งไปพร้อมกับ `request`|
|8|`dailyEventList[i].getLocation()`|ฟังก์ชันที่ใช้เพื่อดึงข้อมูลสถานที่ของกิจกรรมจากปฏิทิน Google Calendar |

==========================

### คำอธิบายเพิ่มเติมพร้อม Code
==========================
1. `CalendarApp.getCalendarById(calendarId)`

ฟังก์ชันนี้ใช้เพื่อดึงปฏิทินของ Google Calendar ที่มี ID ตรงกับ `calendarId` ฟังก์ชันนี้จะคืนค่าปฏิทินในรูปแบบของวัตถุ `Calendar` ที่สามารถใช้ในการดึงข้อมูลกิจกรรมต่างๆ ได้

```javascript
var calendar = CalendarApp.getCalendarById(googleCalendarId);
```

2. `calendar.getEventsForDay(date)`

ฟังก์ชันนี้ใช้เพื่อดึงกิจกรรมทั้งหมดในวันที่กำหนด (ในรูปแบบ `Date`) จากปฏิทินที่ได้จาก `CalendarApp.getCalendarById` ฟังก์ชันนี้จะคืนค่ารายการของกิจกรรมในรูปแบบของอาร์เรย์ของวัตถุ `CalendarEvent`

```javascript
var dailyEventList = calendar.getEventsForDay(today);
```

3. `dailyEventList[i].getTitle()`

ฟังก์ชันนี้ใช้เพื่อดึงชื่อเรื่องของกิจกรรมในรายการที่ i

```javascript
var eventTitle = "📋 รายการที่: " + Number(i+1) + " " + "\n📖 เรื่อง :" + " " + dailyEventList[i].getTitle();
```

4. `dailyEventList[i].getStartTime()`

ฟังก์ชันนี้ใช้เพื่อดึงเวลาเริ่มต้นของกิจกรรมในรูปแบบของวัตถุ `Date`

```javascript
var eventTime = "⏰ เวลา: " + " " + dailyEventList[i].getStartTime().toTimeString().slice(0,8);
```

5. `dailyEventList[i].getEndTime()`

ฟังก์ชันนี้ใช้เพื่อดึงเวลาสิ้นสุดของกิจกรรมในรูปแบบของวัตถุ `Date`

```javascript
eventTime = eventTime + " - " + dailyEventList[i].getEndTime().toTimeString().slice(0, 8);
```

6. `dailyEventList[i].getDescription()`

ฟังก์ชันนี้ใช้เพื่อดึงคำอธิบายของกิจกรรม

```javascript
var eventDescription = "📄 รายละเอียด:" + " " + dailyEventList[i].getDescription() + " \n";
```

7. `UrlFetchApp.fetch(url, options)`

ฟังก์ชันนี้ใช้เพื่อส่ง `HTTP request` ไปยัง `URL` ที่กำหนด โดยมีการกำหนดตัวเลือกต่างๆ เช่น วิธีการส่ง `(POST)` และข้อมูล `payload` ที่จะส่งไปพร้อมกับ `request`

```javascript
var response = UrlFetchApp.fetch(lineNotifyEndPoint, options);
```

8. `dailyEventList[i].getLocation()`

เป็นฟังก์ชันที่ใช้เพื่อดึงข้อมูลสถานที่ของกิจกรรมจากปฏิทิน Google Calendar โดยมีการใช้งานในบริบทของการดึงรายละเอียดของกิจกรรมในแต่ละวัน ตัวอย่างโค้ดนี้อยู่ใน Google Apps Script ซึ่งใช้ API ของ Google Calendar ในการทำงาน

```javascript
var eventLocation = dailyEventList[i].getLocation();
```

### ฟังก์ชัน dEventMessageIT
ฟังก์ชันนี้มีหน้าที่ดึงข้อมูลกิจกรรมจาก **Google Calendar** สำหรับวันปัจจุบัน และสร้างข้อความแจ้งเตือนที่จะส่งไปยัง Line Notify

1. `dEventMessageIT`

ดึงปฏิทิน Google Calendar ตาม ID
ดึงกิจกรรมในวันที่ปัจจุบัน
สร้างข้อความแจ้งเตือนเกี่ยวกับกิจกรรมในวันนั้น รวมทั้งเวลาที่เริ่มต้นและสิ้นสุด และรายละเอียดของกิจกรรม
หากไม่มีรายการกิจกรรม จะแจ้งว่าไม่มีรายการ
ส่งข้อความแจ้งเตือนโดยเรียกใช้ฟังก์ชัน `sendMessage`

```javascript
function dEventMessageIT() {
    var googleCalendarId = "calendar id"; // ใส่ Calendar ID ที่ต้องการใช้
    var calendar = CalendarApp.getCalendarById(googleCalendarId); // ดึง Calendar ตาม ID ที่ระบุ
    var today = new Date(); // วันที่ปัจจุบัน
    var formattedDate = today.toLocaleDateString('th-TH', { // รูปแบบวันที่ในภาษาไทย
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    var dailyEventList = calendar.getEventsForDay(today); // ดึงรายการกิจกรรมของวันปัจจุบัน
    var message = "📣 แจ้งเตือนกิจกรรมประจำวันที่ " + formattedDate + "\n-----------";

    // วนลูปผ่านรายการกิจกรรม
    for (var i = 0; i < dailyEventList.length; i++) {
        var eventTitle = "📋 รายการที่: " + Number(i+1) + " " + "\n📖 เรื่อง :" + " " + dailyEventList[i].getTitle();
        var eventTime = "⏰ เวลา: " + " " + dailyEventList[i].getStartTime().toTimeString().slice(0,8);
        eventTime = eventTime + " - " + dailyEventList[i].getEndTime().toTimeString().slice(0, 8);

        // ถ้าเป็นกิจกรรมทั้งวัน
        if((dailyEventList[i].getStartTime().toTimeString().slice(0,8) == "00:00:00") && (dailyEventList[i].getEndTime().toTimeString().slice(0, 8) == "00:00:00")){
            eventTime = "⏰ เวลา: ทั้งวัน";
        }

        var eventDescription = "📄 รายละเอียด:" + " " + dailyEventList[i].getDescription() + " \n";
        if(dailyEventList[i].getDescription() == ""){
            eventDescription = "📄 รายละเอียด: ⛔ ไม่ได้ระบุ ⛔";
        }

        message += "\n\n" + eventTitle + "\n" + eventTime + "\n" + eventDescription;
    }

    // ถ้าไม่มีรายการกิจกรรม
    if (dailyEventList == "") {
        message = "☕ วันนี้ไม่มีรายการแจ้งเตือน 😴";
    }

    if (message !== "") {
        sendMessage(message); // เรียกใช้ฟังก์ชัน sendMessage เพื่อส่งข้อความ
    }
}
```

### ฟังก์ชัน sendMessage
ฟังก์ชันนี้มีหน้าที่ส่งข้อความแจ้งเตือนไปยัง **Line Notify** โดยใช้ **API** ของ **Line Notify**

2. `sendMessage`

กำหนด URL สำหรับส่งข้อมูลไปยัง Line Notify
สร้างข้อมูล payload สำหรับส่งไปยัง API ของ Line Notify
ส่ง request โดยใช้ `UrlFetchApp.fetch`
จัดการกับข้อผิดพลาดที่อาจเกิดขึ้นและตรวจสอบการตอบกลับจาก API

```javascript
function sendMessage(message) {
    var lineNotifyEndPoint = "https://notify-api.line.me/api/notify"; // URL สำหรับส่งข้อความไปยัง Line Notify
    var accessToken = "token key"; // ใส่ Token ของ Line Notify
    var formData = {
        "message": message // ข้อความที่ต้องการส่ง
    };
    var options = {
        "headers" : {"Authorization" : "Bearer " + accessToken}, // ใส่ Token ใน Header
        "method" : 'post', // วิธีการส่งข้อมูลแบบ POST
        "payload" : formData // ข้อมูลที่ต้องการส่ง
    };

    try {
        var response = UrlFetchApp.fetch(lineNotifyEndPoint, options); // ส่งคำขอไปยัง Line Notify
    }
    catch (error) {
        Logger.log(error.name + ": " + error.message); // หากเกิดข้อผิดพลาด
        return;
    }

    if (response.getResponseCode() !== 200) {
        Logger.log("Sending message failed."); // หากส่งข้อความไม่สำเร็จ
    }
}
```

### สรุป
1. **dEventMessageIT:** ฟังก์ชันนี้จะดึงกิจกรรมทั้งหมดจาก Google Calendar ในวันปัจจุบันและสร้างข้อความที่มีรายละเอียดของแต่ละกิจกรรม รวมถึงชื่อ เวลา และคำอธิบายของกิจกรรม จากนั้นจะเรียกใช้ฟังก์ชัน sendMessage เพื่อส่งข้อความนี้ไปยัง Line Notify

2. **sendMessage:** ฟังก์ชันนี้จะส่งข้อความที่ได้รับผ่านทาง Line Notify API โดยใช้ HTTP POST request.
คุณสามารถใช้โค้ดนี้ใน Google Apps Script โดยทำการตั้งค่า googleCalendarId และ accessToken ให้ถูกต้องเพื่อให้ระบบทำงานได้อย่างสมบูรณ์