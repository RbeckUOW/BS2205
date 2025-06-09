// Fetch user's reservations and display them in a similar way to the equipment cards
async function fetchReservations() {
  try {
    const response = await fetch("/reservations/reservations");

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text(); // Get the response as plain text
      // error code if a JSON is not returned
      throw new Error("Response is not JSON. Here's the raw response: " + text);
    }

    const reservationData = await response.json();
    // Error message if reservations can't be retrieved
    renderReservations(reservationData);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    // Error if the reservations cannot be loaded
    const container = document.getElementById("reservation-container");
    if (container) {
      container.innerHTML = `<p>Failed to load reservation data. Please try again later.</p>`;
    }
  }
}
// Display the reservations on the page
function renderReservations(reservationList) {
  const container = document.getElementById("reservation-container");
  // Error if the container isn't present in the main page to load data into
  if (!container) {
    console.error("Reservation container not found in HTML!");
    return;
  }

  container.innerHTML = ""; // Clear previous content

  if (reservationList.length === 0) {
    // If the reservation list is empty, display a message
    container.innerHTML = `<p>No reservations have been made.</p>`;
    return;
  }
  // Reservation cards display
  reservationList.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("reservation-card");
    // Headings for the reservation card with fallbacks if the details aren't retrieved
    const equipmentName = item.equipmentId?.name || "Unknown Equipment";
    const bookerName = item.name || "Unknown Booker";
    const startDate = new Date(item.startDate).toLocaleDateString();
    const endDate = new Date(item.endDate).toLocaleDateString();
    const reservationId = item._id;

    card.innerHTML = `
      <div class="reservation-card-front">
        <h3>${equipmentName}</h3>
        <p>Booked by: ${bookerName}</p>
        <p>From: ${startDate}</p>
        <p>To: ${endDate}</p>
        <button class="cancel-button" data-id="${reservationId}">Cancel Reservation</button>
      </div>
    `;
    container.appendChild(card);
  });
// Event listeners for when cancel button is pressed
  addCancelButtonListeners();
}

function addCancelButtonListeners() {
  const cancelButtons = document.querySelectorAll(".cancel-button");
  cancelButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const reservationId = e.target.getAttribute("data-id");
      await cancelReservation(reservationId);
    });
  });
}
// Function to cancel the reservation and remove it from the database
async function cancelReservation(reservationId) {
  try {
    const response = await fetch("/reservations/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reservationId }),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message || "Reservation canceled!");
      fetchReservations(); // Refresh the list
    } else {
      alert(result.error || "Failed to cancel reservation.");
    }
  } catch (error) {
    console.error("Error canceling reservation:", error);
  }
}

// Ensure the script runs when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", fetchReservations);
