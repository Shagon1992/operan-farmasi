function toggleForm(show = null) {
  const form = document.getElementById("form");
  if (show === null) {
    form.style.display = form.style.display === "none" ? "block" : "none";
  } else {
    form.style.display = show ? "block" : "none";
  }
}

function logout() {
  window.location.href = "index.html";
}

function filterTable() {
  const query = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#tableBody tr");
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? "" : "none";
  });
}
