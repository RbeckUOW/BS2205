// Check for stored user preference
const userPrefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");

// Apply the saved theme or system default
if (savedTheme) {
  document.body.classList.add(savedTheme);
} else if (userPrefersDark) {
  document.body.classList.add(
    "dark-mode"
  ); /* displays dark mode if user's system is set to dark */
} else {
  document.body.classList.add(
    "light-mode"
  ); /* displays light mode if user's system is set to light */
}

// Toggle theme on button click
const toggleTheme = () => {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    localStorage.setItem(
      "theme",
      "light-mode"
    ); /* Save preference for light mode */
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    localStorage.setItem(
      "theme",
      "dark-mode"
    ); /* Save preference for dark mode */
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("theme-toggle-button");
  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", toggleTheme);
  }
});
