function loadPage(section) {
  const content = document.getElementById("content");

  // Save the current section in localStorage
  localStorage.setItem("currentPage", section);

  fetch(`${section}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Could not load ${section}.html`);
      }
      return response.text();
    })
    .then(data => {
      content.innerHTML = data;

      // 🔑 Reset animation class so it can re-trigger
      content.classList.remove("fade-in");
      void content.offsetWidth; // force reflow
      content.classList.add("fade-in");
    })
    .catch(error => {
      content.innerHTML = `<p style="color:red;">Error loading ${section} page.</p>`;
      console.error(error);
    });
}

// Load last visited page or default to home
window.onload = () => {
  const lastPage = localStorage.getItem("currentPage") || "home";
  loadPage(lastPage);
};