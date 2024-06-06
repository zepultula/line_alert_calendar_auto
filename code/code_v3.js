function dEventMessageIT() {
    var googleCalendarId = "-----------";
    var calendar = CalendarApp.getCalendarById(googleCalendarId);
    var today = new Date();
    var formattedDate = today.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    var dailyEventList = calendar.getEventsForDay(today);
    var message = "\n📣 แจ้งเตือนกิจกรรมอาคารวิทยบริการ\nประจำวันที่ ";
    message += formattedDate + "\n-----------";
    var countList = 0;
  
    for (var i = 0; i < dailyEventList.length; i++) {
      var eventTitle = "📋 รายการที่: " +  Number(i+1) + " " + "\n📖 เรื่อง :" + " " + dailyEventList[i].getTitle();
      var eventTime = "⏰ เวลา: " + " " + dailyEventList[i].getStartTime().toTimeString().slice(0,8);
      eventTime = eventTime + " - " + dailyEventList[i].getEndTime().toTimeString().slice(0, 8);
      if((dailyEventList[i].getStartTime().toTimeString().slice(0,8) == "00:00:00") && (dailyEventList[i].getEndTime().toTimeString().slice(0, 8) == "00:00:00")){
        eventTime = "⏰ เวลา: ทั้งวัน";
      }
  
      var eventDescription = "📄 รายละเอียด: " + dailyEventList[i].getDescription() + " \n";
      if(dailyEventList[i].getDescription() == ""){
        eventDescription = "📄 รายละเอียด: ⛔ ไม่ได้ระบุ ⛔";
      }
  
      var eventLocation = "📍 สถานที่: " + dailyEventList[i].getLocation();
      if (dailyEventList[i].getLocation() == "") {
        eventLocation = "📍 สถานที่: ⛔ ไม่ได้ระบุ ⛔";
      }
  
      // แปลงลิงก์ในรายละเอียดเป็นข้อความธรรมดา
      eventDescription = eventDescription.replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '$1');
  
      message += "\n\n" + eventTitle + "\n" + eventTime + "\n" + eventLocation + "\n" + eventDescription;
    }
  
    if (dailyEventList.length === 0) {
      message = "☕ วันนี้ไม่มีรายการแจ้งเตือน 😴";
      countList = 0;
    } else {
      countList = 1;
    }
    if (message !== "") {
      sendMessage(message, countList);
    }
  }
  
  function sendMessage(message, countList) {
    var lineNotifyEndPoint = "https://notify-api.line.me/api/notify";
    var accessToken = "----------";
  
    var setStickerPackageId = "1";
    var setStickerId = "1";
  
    if(countList > 0){
      setStickerId = "52002735";
      setStickerPackageId = "11537";
    }
    var formData = {
      "message": message,
      "stickerPackageId": setStickerPackageId,
      "stickerId": setStickerId
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
  