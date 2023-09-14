$(document).ready(function () {
  const timeBlock = $(".time-block");
  const saveBtn = $("button");
  const message = $("h2");
  const currentDay = dayjs().format("dddd, MMMM D");
  const currentHour = dayjs().hour();
  const scheduleData = JSON.parse(localStorage.getItem("data")) || [];

  $("#currentDay").text(currentDay);

  saveBtn.on("click", function () {
    const text = $(this).siblings("textarea").val();
    const parentId = $(this).parent().attr("id");

    scheduleData.forEach((data) => {
      if (data.id === parentId) {
        const index = scheduleData.indexOf(data);
        scheduleData.splice(index, 1);
      }
    });

    if (text) {
      message.css("opacity", "1");
      scheduleData.push({ id: parentId, text });
      localStorage.setItem("data", JSON.stringify(scheduleData));
    } else {
      message.css("opacity", "0");
    }
  });

  timeBlock.each(function () {
    const blockId = $(this).attr("id");

    if (+blockId === currentHour) {
      $(this).addClass("present");
    } else if (+blockId > currentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("past");
      $(this).children().attr("disabled", "true");
    }

    scheduleData.forEach((data) => {
      data.id === blockId && $(this).children().eq(1).val(data.text);
    });
  });
});

