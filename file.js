const params = new URLSearchParams(window.location.search);
let id = parseInt(params.get("id"));

let allFiles = [];

async function loadFile() {
  const res = await fetch("files.json");
  allFiles = await res.json();

  const file = allFiles.find(f => f.id === id);

  if (!file) {
    document.body.innerHTML = "<h2>File not found</h2>";
    return;
  }

  // Title
  document.getElementById("title").textContent = file.name;

  // Image
  document.getElementById("image").src = file.image;

  // Info
  document.getElementById("meta").textContent =
    file.type + " • " + file.category;

  document.getElementById("desc").textContent =
    file.description;

  // Download links
  const downloadsDiv = document.getElementById("downloads");
  downloadsDiv.innerHTML = "";

  file.downloads.forEach((link, index) => {
    downloadsDiv.innerHTML += `
      <a href="${link}" target="_blank" class="download-btn">
        Download Link ${index + 1}
      </a>
    `;
  });
}

// 🔙 Back to previous page (search page with state)
function goBack() {
  window.history.back();
}

// ⬅️ Previous file
function goPrevious() {
  const prev = allFiles.find(f => f.id === id - 1);

  if (prev) {
    window.location.href = "file.html?id=" + prev.id;
  }
}

// ➡️ Next file
function goNext() {
  const next = allFiles.find(f => f.id === id + 1);

  if (next) {
    window.location.href = "file.html?id=" + next.id;
  }
}

// INIT
loadFile();
