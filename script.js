// ---------------- BACKGROUND ----------------
window.addEventListener("DOMContentLoaded", function () {
  const backgrounds = [
    "https://images3.alphacoders.com/137/thumb-1920-1373768.png",
    "https://images8.alphacoders.com/912/thumb-1920-912051.jpg",
    "https://fanart.fanabyss.com/657/thumb-Naruto-87.jpg"
  ];

  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  document.body.style.backgroundImage = `url('${backgrounds[randomIndex]}')`;
});

// ---------------- FILE DATA ----------------
let allFiles = [];
let currentFiles = [];
let currentPage = 1;
const itemsPerPage = 10;

const fileList = document.getElementById("fileList");

// ---------------- LOAD FILES ----------------
async function loadFiles() {
  try {

    // 🔹 LOCAL JSON
    const res = await fetch("files.json");
    const localFiles = await res.json();

    // 🔹 FIREBASE DATA
    const snapshot = await db.collection("files").get();

    const firebaseFiles = [];
    snapshot.forEach(doc => {
      const d = doc.data();

      firebaseFiles.push({
        id: d.customId,
        name: d.name,
        type: d.type,
        category: d.category,
        description: d.description || "",
        image: d.image || "",
        downloads: d.links || []   // ✅ FIXED
      });
    });

    // 🔥 MERGE
    allFiles = [...localFiles, ...firebaseFiles];

    // 🔥 SORT
    allFiles.sort((a, b) => b.id - a.id);

    currentFiles = allFiles;

    displayFiles();

  } catch (err) {
    console.error("Load error:", err);
    fileList.innerHTML = "<p style='color:red;'>Error loading files</p>";
  }
}

// ---------------- DISPLAY FILES ----------------
function displayFiles() {
  fileList.innerHTML = "";

  const totalItems = currentFiles.length;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedFiles = currentFiles.slice(start, end);

  paginatedFiles.forEach(file => {
    fileList.innerHTML += `
      <div class="file">
        <div>
          <strong>${file.name}</strong><br>
          <small>${file.type} • ${file.category}</small>
        </div>
        <button onclick="openFile(${file.id})">View Details</button>
      </div>
    `;
  });

  createPagination();
}

// ---------------- PAGINATION ----------------
function createPagination() {
  const totalItems = currentFiles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  let html = '<div class="pagination">';

  html += `<p class="page-info">Showing ${startItem}–${endItem} of ${totalItems} files</p>`;

  html += `<button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>← Prev</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="${i === currentPage ? 'active-page' : ''}" onclick="goToPage(${i})">
        ${i}
      </button>
    `;
  }

  html += `<button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next →</button>`;

  html += '</div>';

  fileList.innerHTML += html;
}

// ---------------- PAGE SWITCH ----------------
function goToPage(page) {
  const totalPages = Math.ceil(currentFiles.length / itemsPerPage);

  if (page < 1 || page > totalPages) return;

  currentPage = page;
  displayFiles();
}

// ---------------- NAVIGATION ----------------
function openFile(id) {
  window.location.href = "file.html?id=" + id;
}

function goHome() {
  window.location.href = "index.html";
}

// ---------------- SEARCH ----------------
document.getElementById("search").addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();

  currentPage = 1;

  currentFiles = allFiles.filter(file =>
    file.name.toLowerCase().includes(value) ||
    file.category.toLowerCase().includes(value) ||
    file.type.toLowerCase().includes(value)
  );

  displayFiles();
});

// ---------------- FILTER ----------------
function filterFiles(type) {
  currentPage = 1;

  if (type === "All") {
    currentFiles = allFiles;
  } else {
    currentFiles = allFiles.filter(file => file.type === type);
  }

  displayFiles();
}

// ---------------- DARK MODE ----------------
const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙";
    }
  });
}

// ---------------- INIT ----------------
loadFiles();
