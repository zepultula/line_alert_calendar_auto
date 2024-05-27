// สร้างฟังก์ชัน dEvenMessageIT() หรือเปลี่ยนชื่อให้สอดคล้องกับระบบที่ทำ
function dEventMessageIT() {

//ประกาศตัวแปร googleCaelndarId หมายถึง รหัสปฏิทิน (ใส่ในช่อง "xxxxxxxxxxxxxxx" ภายใน " " )
  var googleCalendarId = "calendar id";


//ประกาศตัวแปร calendar เป็นการเรียก API(CalendarApp) มาทำงานโดยดึงค่า getCalendarById จาก (googleCalendarId) มาใช้งาน
  var calendar = CalendarApp.getCalendarById(googleCalendarId);


//ประกาศตัวแปร today โดยตั้งค่าให้อยู่ในรูปแบบ Date
  var today = new Date();

// ดึงวันที่ปัจจุบันในรูปแบบวันที่ที่ต้องการ
  var formattedDate = today.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

//ประกาศตัวแปร dailyEventList โดยให้ดึงข้อมูลทั้งหมด Event ในปฏิทินของวันที่กำหนด (today)
  var dailyEventList = calendar.getEventsForDay(today);
  

//ประกาศตัวแปร message เป็นข้อความที่แจ้งเตือนไปในไลน์
  var message = "📣 แจ้งเตือนกิจกรรมประจำวันที่ ";
  message += formattedDate + "\n-----------";

//ถ้ามีกิจกรรม ระบบจำทำการวนลูปหาข้อมูล และทำการแจ้งเตือนไปในไลน์
    for (var i = 0; i < dailyEventList.length; i++) {
      var eventTitle = "📋 รายการที่: " +  Number(i+1) + " " + "\n📖 เรื่อง :" + " " + dailyEventList[i].getTitle();
      var eventTime = "⏰ เวลา: " + " " + dailyEventList[i].getStartTime().toTimeString().slice(0,8);
      eventTime = eventTime + " - " + dailyEventList[i].getEndTime().toTimeString().slice(0, 8);
      
      //หากเป็นเวลาทั้งวัน ระบบจะแจ้ง 00:00:00 เข้ามาทั้ง StartTime และ EndTime เพื่อไม่ให้แสดง ทำการตรวจสอบหากพบก็ให้ระบุว่ากินเวลาทั้งวัน 
      if((dailyEventList[i].getStartTime().toTimeString().slice(0,8) == "00:00:00") && (dailyEventList[i].getEndTime().toTimeString().slice(0, 8) == "00:00:00")){
        eventTime = "⏰ เวลา: ทั้งวัน";
      }
      var eventDescription = "📄 รายละเอียด:" + " " + dailyEventList[i].getDescription() + " \n";
      if(dailyEventList[i].getDescription() == ""){
        eventDescription = "📄 รายละเอียด: ⛔ ไม่ได้ระบุ ⛔";
      }
      message += "\n\n" + eventTitle + "\n" + eventTime + "\n" + eventDescription;
    }

//หากไม่มีกิจกรรม ให้แจ้งว่า "วันนี้ไม่มีกิจกรรมนะ"
    if (dailyEventList == "") {
      message = "☕ วันนี้ไม่มีรายการแจ้งเตือน 😴";
    }
    if (message !== "") {
      //Logger.log(message);
      sendMessage(message);
    }
}

function sendMessage(message) {
  var lineNotifyEndPoint = "https://notify-api.line.me/api/notify";
  var accessToken = "token key"; //ทำการแทรก Token ของตนเอง 
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