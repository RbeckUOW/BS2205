// This event listener waits for the DOM (Document Object Model) to be fully loaded before executing the function inside.
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  
  const equipmentName = urlParams.get("name");

  // Set the text content of element with id "equipment-name" to the equipment name from the URL parameter.
  document.getElementById("equipment-name").textContent = equipmentName;
});

// Handle the form submission when making a reservation.
async function handleReservation(event) {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  
  // Extract"id" query parameter from the URL.
  const equipmentId = urlParams.get("id");

  const formData = new FormData(event.target);

  // Create an object to hold the reservation data ready to send to database
  const reservationData = {
    equipmentId,
    name: formData.get("name"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  };

  try {
    // Send a POST request to database with reservation data.
    const response = await fetch("/reservations/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData), // Convert reservation data object to a JSON string and send.
    });

    const result = await response.json();

    // Check if response was successful.
    if (response.ok) {
      // If successful, alert the user with a success message.
      alert(result.message || "Reservation successful!");
      
      // Redirect the user to the home page after successful reservation.
      window.location.href = "/"; 
    } else {
      // If unsuccessful, show error message.
      alert(result.error || "Failed to reserve equipment.");
    }
  } catch (error) {
    // Catch errors that occur during the fetch request
    console.error("Error reserving equipment:", error);
    
    alert("An error occurred. Please try again.");
  }
}
