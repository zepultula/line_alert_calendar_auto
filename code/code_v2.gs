//สร้างฟังก์ชัน dEvenMessageIT() หรือเปลี่ยนชื่อให้สอดคล้องกับระบบที่ทำ
function dEventMessageIT() {

//ประกาศตัวแปร googleCaelndarId หมายถึง รหัสปฏิทิน (ใส่ในช่อง "xxxxxxxxxxxxxxx" ภายใน " " )
  var googleCalendarId = "Your calendar ID";


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
  var message = "\n📣 แจ้งเตือนกิจกรรมอาคารวิทยบริการ\nประจำวันที่ ";
  message += formattedDate + "\n-----------";

//นับรายการ
  var countList = 0;

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

      // เพิ่มข้อมูลเกี่ยวกับสถานที่
      var eventLocation = "📍 สถานที่: " + dailyEventList[i].getLocation();
      if (dailyEventList[i].getLocation() == "") {
        eventLocation = "📍 สถานที่: ⛔ ไม่ได้ระบุ ⛔";
      }

      message += "\n\n" + eventTitle + "\n" + eventTime + "\n" + eventLocation + "\n" + eventDescription;
    }

//หากไม่มีกิจกรรม ให้แจ้งว่า "วันนี้ไม่มีกิจกรรมนะ"
    if (dailyEventList == "") {
      message = "☕ วันนี้ไม่มีรายการแจ้งเตือน 😴";
      countList = 0;
    }else{
      countList = 1;
    }
    if (message !== "") {
      //Logger.log(message);
      sendMessage(message, countList);
    }
}

function sendMessage(message, countList) {
  var lineNotifyEndPoint = "https://notify-api.line.me/api/notify";
  var accessToken = "Your Token KEY"; //ทำการแทรก Token ของตนเอง 

  var setStickerPackageId = "1";
  var setStickerId = "1";

  if(countList > 0){
    setStickerId = "52002735";
    setStickerPackageId = "11537";
  }
  var formData = {
    "message": message,
    "stickerPackageId": setStickerPackageId,  // ใส่ค่า package id ของสติกเกอร์ที่ต้องการใช้
    "stickerId": setStickerId          // ใส่ค่า id ของสติกเกอร์ที่ต้องการใช้
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