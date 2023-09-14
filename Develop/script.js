$(document).ready(function () {
  const timeBlock = $(".time-block");
  const saveBtn = $("button");
  const message = $("h2");
  const currentDay = dayjs().format("dddd, MMMM D");
  const currentHour = dayjs().hour();
  const scheduleData = JSON.parse(localStorage.getItem("data")) || [];

  $("#currentDay").text(currentDay);

  // Add addEventListener to the button for saving the data.
  saveBtn.on("click", function () {
    const text = $(this).siblings("textarea").val();
    const parentId = $(this).parent().attr("id");

  // Remove old data if it was changed
    scheduleData.forEach((data) => {
      if (data.id === parentId) {
        const index = scheduleData.indexOf(data);
        scheduleData.splice(index, 1);
      }
    });

  // Save in the localStorage and display message only if the input is not empty.
    if (text) {
      message.css("opacity", "1");
      scheduleData.push({ id: parentId, text });
      localStorage.setItem("data", JSON.stringify(scheduleData));
    } else {
      message.css("opacity", "0");
    }
  });

  // Add class to each timeBlock based on current hour.
  timeBlock.each(function () {
    const blockId = $(this).attr("id");

    if (+blockId === currentHour) {
      $(this).addClass("present");
    } else if (+blockId > currentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("past");
    }

    // Add to the timeBlock its corresponding text.
    scheduleData.forEach((data) => {
      data.id === blockId && $(this).children().eq(1).val(data.text);
    });
  });
});


