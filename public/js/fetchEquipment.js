// Fetch the equipment data from the server and render it dynamically
async function fetchEquipment() {
  try {
    const response = await fetch("/equipment");
    if (!response.ok) throw new Error("Failed to retrieve equipment data"); 

    const equipmentData = await response.json();

    // Render equipment data to the page
    renderEquipment(equipmentData);
  } catch (error) {
    console.error("Error fetching equipment:", error);

    // Display an error message to the user if an error occurs
    const container = document.getElementById("equipment-container");
    if (container) {
      container.innerHTML = `<p class="error-message">Failed to load equipment data. Please try again later.</p>`;
    }
  }
}

// Render the equipment cards on the page
function renderEquipment(equipmentList) {
  const container = document.getElementById("equipment-container");

  // Check if the container exists or throw an error
  if (!container) {
    console.error("Equipment container not found in HTML!");
    return;
  }

  // Clear any existing content in the container to avoid overlapping or glitches
  container.innerHTML = "";

  // Loop through the equipment list and create cards for each
  equipmentList.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("equipment-card");

    // Destructure required properties from the item 
    const { name, image, availableQuantity, _id } = item;

    // Card HTML structure with lazy loading images for mobile and slower connections
    card.innerHTML = `
      <div class="equipment-card-inner" data-flipped="false">
        <div class="equipment-card-front">
          <img src="${image}" alt="${name}" class="equipment-image" loading="lazy" />
          <h3>${name}</h3>
          <p>Available: ${availableQuantity}</p>
        </div>
        <div class="equipment-card-back">
          <h3>${name}</h3>
          <a href="/reserve-form?id=${_id}&name=${encodeURIComponent(
      name
    )}" class="reserve-button">Reserve</a>
        </div>
      </div>
    `;

    const cardInner = card.querySelector(".equipment-card-inner");

    // Toggle flip on hover (for desktops)
    card.addEventListener("mouseenter", () => {
      cardInner.style.transform = "rotateY(180deg)";
    });
    card.addEventListener("mouseleave", () => {
      cardInner.style.transform = "rotateY(0deg)";
    });

    // Toggle flip on touch (for touch devices)
    card.addEventListener("touchstart", (e) => {
      e.preventDefault(); // Prevent accidental scrolling when trying to flip the card
      const isFlipped = cardInner.getAttribute("data-flipped") === "true";
      cardInner.style.transform = isFlipped
        ? "rotateY(0deg)"
        : "rotateY(180deg)";
      cardInner.setAttribute("data-flipped", !isFlipped);
    });

    // Append the card to the container
    container.appendChild(card);
  });
}

// Ensure the script runs when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", fetchEquipment);
