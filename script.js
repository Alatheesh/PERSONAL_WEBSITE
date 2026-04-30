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

// ---------------- DATA ----------------
let allJsonFiles = [];
let pageCache = {};
let currentFiles = [];
let currentPage = 1;
const itemsPerPage = 10;

const fileList = document.getElementById("fileList");

// ---------------- LOAD JSON ONCE ----------------
async function loadJSON() {
  const res = await fetch("files.json");
  allJsonFiles = await res.json();
}

// ---------------- LOAD PAGE (OPTIMIZED) ----------------
async function loadPage(page) {

  // 🔥 Cache check
  if (pageCache[page]) {
    console.log("⚡ Loaded from cache");
    currentFiles = pageCache[page];
    displayFiles();
    return;
  }

  const startId = (page - 1) * itemsPerPage + 1;
  const endId = page * itemsPerPage;

  console.log(`🔥 Loading IDs ${startId} to ${endId}`);

  // 🔹 JSON FILTER
  const localFiles = allJsonFiles.filter(f =>
    f.id >= startId && f.id <= endId
  );

  // 🔹 FIREBASE QUERY
  const snapshot = await db.collection("files")
    .where("customId", ">=", startId)
    .where("customId", "<=", endId)
    .get();

  const firebaseFiles = snapshot.docs.map(doc => {
    const d = doc.data();
    return {
      id: d.customId,
      name: d.name,
      type: d.type,
      category: d.category,
      description: d.description || "",
      image: d.image || "",
      downloads: d.links || []
    };
  });

  // 🔥 MERGE + SORT
  const pageFiles = [...localFiles, ...firebaseFiles];
  pageFiles.sort((a, b) => b.id - a.id);

  // 🔥 SAVE CACHE
  pageCache[page] = pageFiles;

  currentFiles = pageFiles;

  displayFiles();
}

// ---------------- DISPLAY FILES ----------------
function displayFiles() {
  fileList.innerHTML = "";

  currentFiles.forEach(file => {
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

  // ⚠️ total count (approx)
  const totalItems = allJsonFiles.length + 50; // adjust if needed
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  let html = '<div class="pagination">';

  html += `<button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>← Prev</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="${i === currentPage ? 'active-page' : ''}" onclick="goToPage(${i})">
        ${i}
      </button>
    `;
  }

  html += `<button onclick="goToPage(${currentPage + 1})">Next →</button>`;

  html += '</div>';

  fileList.innerHTML += html;
}

// ---------------- PAGE SWITCH ----------------
function goToPage(page) {
  if (page < 1) return;

  currentPage = page;
  loadPage(page);
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

  const filtered = [];

  // 🔍 Search in cached pages only
  Object.values(pageCache).forEach(page => {
    page.forEach(file => {
      if (
        file.name.toLowerCase().includes(value) ||
        file.category.toLowerCase().includes(value) ||
        file.type.toLowerCase().includes(value)
      ) {
        filtered.push(file);
      }
    });
  });

  currentFiles = filtered;
  displayFiles();
});

// ---------------- FILTER ----------------
function filterFiles(type) {
  if (type === "All") {
    loadPage(currentPage);
    return;
  }

  const filtered = [];

  Object.values(pageCache).forEach(page => {
    page.forEach(file => {
      if (file.type === type) filtered.push(file);
    });
  });

  currentFiles = filtered;
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
(async function init() {
  await loadJSON();
  loadPage(1);
})();
