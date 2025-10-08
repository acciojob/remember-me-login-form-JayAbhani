(function () {
  const LS_KEY = "loginCreds";

  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const rememberCheckbox = document.getElementById("checkbox");
  const existingBtn = document.getElementById("existing");

  // Helper: show/hide the "Login as existing user" button
  function updateExistingVisibility() {
    const saved = localStorage.getItem(LS_KEY);
    existingBtn.style.display = saved ? "block" : "none";
  }

  // On load: ensure fields are empty, checkbox unchecked, and visibility is correct
  window.addEventListener("DOMContentLoaded", () => {
    usernameInput.value = "";
    passwordInput.value = "";
    rememberCheckbox.checked = false;
    updateExistingVisibility();
  });

  // Submit behavior
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value; // allow empty if needed by tests

    // Always alert login with current username
    alert(`Logged in as ${username}`);

    if (rememberCheckbox.checked) {
      // Save credentials
      localStorage.setItem(LS_KEY, JSON.stringify({ username, password }));
    } else {
      // Remove previously saved credentials
      localStorage.removeItem(LS_KEY);
    }

    updateExistingVisibility();
  });

  // Existing user login
  existingBtn.addEventListener("click", () => {
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) return; // Safety
    const { username } = JSON.parse(saved);
    alert(`Logged in as ${username}`);
  });
})();
