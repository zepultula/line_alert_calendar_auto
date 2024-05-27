### 5. การกำหนดค่า Token Key ของ Line Notify และการกำหนดค่า Calendar ID

จาก code ใน [การสร้าง Google Script Project](02-การสร้าง-Google-Script-Project.md) นั้น ท่านไม่จำเป็นต้องแก้ไขอะไรมากมาย เพียงแค่กำหนดค่าของ `token key` ที่ได้จาก line notify และกำหนดค่า `Calendar ID` ที่ได้จาก Google Calendar

- กำหนด `token key` ที่ได้จากการ `Generate token` ในเนื้อหา [การสร้าง Line Notify Token](03-สร้าง-Line-Notify-Token.md)

```javascript
var accessToken = "token key"; // ทำการแทรก Token ของตนเอง
```

- ทำการกำหนด `Calendar ID` ที่ท่านคัดลอกมาจาก `การตั้งค่าและการแชร์` ในเนื้อหา [การสร้าง Google Calendar](04-การสร้าง-Google-Calendar.md)

```javascript
var googleCalendarId = "calendar id"; // ใส่ Calendar ID ที่ต้องการใช้
```

- กด  <img src="https://raw.githubusercontent.com/zepultula/line_alert_calendar_auto/main/images/save.png" alt="save" width="24" /> ( `บันทึก` ) เพื่อบันทึกงาน
- ทดสอบโดยการกด  <img src="https://raw.githubusercontent.com/zepultula/line_alert_calendar_auto/main/images/call.png" alt="call" width="50" /> ( `เรียกใช้` ) ***หากดำเนินการครั้งแรก*** ระบบอาจจะปรากฏข้อความสอบถามถึงสิทธิ์ต่างๆ ให้ท่านเลือกบัญชีตัวเองหรือบัญชีที่ท่านต้องการ ***แนะนำเป็นบัญชีตัวเองเพื่อการกำหนดสิทธิ์ที่ง่าย***

<img src="https://raw.githubusercontent.com/zepultula/line_alert_calendar_auto/main/images/action_script-7.png" alt="Logo" width="400"/>

- บางท่านยังไม่ทันตั้งชื่อ หรือตั้งชื่อแล้วอาจจะปรากฏหน้าต่างดังภาพข้างล่างนี้ ให้เลือก `ขั้นสูง`

<img src="https://raw.githubusercontent.com/zepultula/line_alert_calendar_auto/main/images/action_script-8.png" alt="Logo" width="400"/>

- เลือก `ไปที่ โครงการไม่มีชื่อ(ไม่ปลอดภัย)` หรืออาจจะเป็นชื่ออื่นๆ

<img src="https://raw.githubusercontent.com/zepultula/line_alert_calendar_auto/main/images/action_script-9.png" alt="Logo" width="400"/>

- เลือก `อนุญาต`

<img src="https://raw.githubusercontent.com/zepultula/line_alert_calendar_auto/main/images/action_script-10.png" alt="Logo" width="400"/>

- จากนั้น เลือกกด <img src="https://raw.githubusercontent.com/zepultula/line_alert_calendar_auto/main/images/call.png" alt="call" width="50" /> (`เรียกใช้`) อีกครั้งเพื่อดำเนินการ 
- ด้านล่างของหน้าจอ Script Editor และใน Line ของท่านมีการแจ้งเตือน ปรากฏดังภาพถือว่าส่งคำแจ้งคือสำเร็จ

<img src="https://raw.githubusercontent.com/zepultula/line_alert_calendar_auto/main/images/action_script-11.png" alt="Logo" width="400"/>

> ภาพการแสดง Logger ของ Script


<img src="https://raw.githubusercontent.com/zepultula/line_alert_calendar_auto/main/images/action_script-12.png" alt="Logo" width="400"/>

> ภาพการแสดงการแจ้งเตือนของ Line Application


### ดังนั้น

 ท่านสามารถใช้งาน Code Script ได้แล้ว และระบบการแจ้งเตือนนั้นก็สามารถทำงานได้เป็นอย่างดี แต่สิ่งที่ขาดไม่ได้เลยคือการทำให้ระบบแจ้งเตือนของท่านนั้นทำงานได้อย่างอัตโนมัติ ในที่นี้จะใช้ [Trigger](06-Trigger.md) เป็นตัวช่วยในการเรียกใช้ Script ตามเงื่อนไขที่กำหนด ท่านสามารถเรียนรู้เพิ่มเติมได้จากเนื้อหา >>> [การกำหนดค่า Trigger](06-Trigger.md) 