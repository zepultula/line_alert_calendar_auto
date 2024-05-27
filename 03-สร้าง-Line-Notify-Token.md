### 3. สร้าง Line Notify Token
#### เปิด `Web Browser` 
- ช่อง `URL` พิมพ์: https://notify-bot.line.me/th/ หรือคลิก >>> [Line Notify](https://notify-bot.line.me/th/) จะปรากฏหน้าตาเว็บไซต์ของ line notify ดังภาพข้างล่างนี้

<img src="https://github.com/zepultula/line_alert_calendar_auto/blob/main/images/line-notify-login.png" width="400">

- คลิกที่เข้าสู่ระบบ ท่านจะพบหน้าฟอร์มดังภาพ ให้ทำการ `Login` ด้วย `Email` และ `Password` ที่ได้ลงทะเบียนเอาไว้ หรือใครจะเข้าผ่าน QR-Code ก็ได้

<img src="https://github.com/zepultula/line_alert_calendar_auto/blob/main/images/form-login.png" width="300">

- คลิกเลือกที่ `My Page`

<img src="https://github.com/zepultula/line_alert_calendar_auto/blob/main/images/mypage.png" width="300">

- หลังจากที่คลิกเลือก `My Page` แล้วระบบจะนำท่านมาสู่หน้านี้ ซึ่งหากท่านมีหลาย `Token Key` ระบบจะแสดงรายการบริการของท่าน ว่ามีบริการอะไรบ้างที่ได้ออก `Personal Access Token` ไปแล้ว

- ทำการออก `Token` โดยการกดปุ่มเลือกที่ `Generate token`

<img src="https://github.com/zepultula/line_alert_calendar_auto/blob/main/images/gentoken.png" width="400">

- ทำการกำหนดค่าที่จำเป็น
    1. ตั้งชื่อบริการที่ท่านต้องการ ในที่นี้จะเป็น `ชื่อที่แสดงถึงบริการ` เมื่อมีการแจ้งเตือนเข้าระบบไลน์ ตัวอย่างเช่น `เลขาส่วนตัว` หรือ `ระบบแจ้งเตือนกิจกรรม`
    2. เลือกการเชื่อมต่อ เช่น ท่านต้องการใช้งานแบบ 1 ต่อ 1 หรือจะแจ้งเตือนเข้ากลุ่ม ได้จากรายการด้านล่าง
    3. เลือก `Generate token`

<img src="https://github.com/zepultula/line_alert_calendar_auto/blob/main/images/gentoken-2.png" width="400">

- เมื่อดำเนินการ `Generate token` สำเร็จ ที่ Line ของท่านจะมีการแจ้งเตือนจาก `Line Notify` ว่ามีการ `ออก Personal Access Token` ดังภาพข้างล่าง

<img src="https://github.com/zepultula/line_alert_calendar_auto/blob/main/images/gentoken-3.png" width="400">

- ในหน้าที่เรา `Generate token` จะปรากฏหน้าต่างแจ้งถึง `​Token key` ซึ่งตรงนี้สำคัญมาก จะแสดงออกมาเพียงแค่ครั้งเดียว ดังนั้นกดที่ปุ่ม `Copy` และเอาไปวางไว้ใน `txt` หรือ `notepad` ไว้ก่อน เดี๋ยวจะหาย หรือเอาไปว่างไว้ที่ `script` ของเราได้เลย 

<img src="https://raw.githubusercontent.com/zepultula/line_alert_calendar_auto/main/images/finish.png" alt="Logo" width="400"/>

```javascript
var accessToken = "your token key"; // ทำการแทรก Token ของตนเอง
```

จากวิธีการข้างต้นท่านจะได้ `Token key` ของ Line Notify เป็นที่เรียบร้อยแล้ว ถัดไป จะนำท่านไปยังส่วนของ [การสร้างปฏิทิน เพื่อเอาค่า Calendar ID](04-การสร้าง-Google-Calendar.md)