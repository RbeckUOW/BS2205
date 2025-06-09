document.addEventListener("DOMContentLoaded", () => {
  const navDetails = document.getElementById("nav-details");
  const menuItems = document.querySelectorAll("nav ul li a");

  // Function to set the details open attribute based on screen size
  function setDetailsOpen() {
    let mql = window.matchMedia("(width <= 768px)");

    if (mql.matches) {
      navDetails.open = false; // start closed on mobile
    } else {
      navDetails.open = true; // start closed on desktop
    }
  }

  // Initial check
  setDetailsOpen();

  // Add event listener to handle window resize
  window.addEventListener("resize", setDetailsOpen);

  /* Effect when a heading is pressed on a touchscreen */
  menuItems.forEach((item) => {
    item.addEventListener("touchstart", (e) => {
      e.target.classList.add("active"); // Add active class on touch
    });

    item.addEventListener("touchend", (e) => {
      e.target.classList.remove("active"); // Remove active class when touch ends
    });
  });
});
