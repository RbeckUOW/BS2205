document.addEventListener("DOMContentLoaded", function () {
  const startPicker = flatpickr("#startDate", {
    dateFormat: "Y-m-d",
    minDate: "today", // Prevent past dates being selected
    appendTo: document.querySelector("#startDate").parentNode,
    onChange: function (selectedDates) {
      if (selectedDates.length > 0) {
        // Update the minimum date for return
        endPicker.set("minDate", selectedDates[0]);
      }
    },
  });

  const endPicker = flatpickr("#endDate", {
    dateFormat: "Y-m-d",
    minDate: "today", // Prevent past dates
    appendTo: document.querySelector("#endDate").parentNode,
  });
});
