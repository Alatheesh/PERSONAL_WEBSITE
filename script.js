// ---------------- BACKGROUND ----------------
window.addEventListener("DOMContentLoaded", function () {
  const backgrounds = [
    "https://th.wallhaven.cc/small/8x/8xlylk.jpg",
    "https://th.wallhaven.cc/small/2k/2k73wm.jpg"
  ];

  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  document.body.style.backgroundImage = `url('${backgrounds[randomIndex]}')`;
});

// ---------------- FILE DATA ----------------
let allFiles = [];
let currentFiles = []; // 🔥 IMPORTANT (tracks filtered/search data)
let currentPage = 1;
const itemsPerPage = 10;

const fileList = document.getElementById("fileList");

// ---------------- LOAD FILES ----------------
async function loadFiles() {
  const res = await fetch("files.json");
  allFiles = await res.json();
  currentFiles = allFiles; // 🔥 set default
  displayFiles();
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

  // 📊 FILE COUNT
  html += `<p class="page-info">Showing ${startItem}–${endItem} of ${totalItems} files</p>`;

  // ⏮ PREV
  html += `<button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>← Prev</button>`;

  // 🔢 PAGE NUMBERS
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button 
        class="${i === currentPage ? 'active-page' : ''}" 
        onclick="goToPage(${i})">
        ${i}
      </button>
    `;
  }

  // ⏭ NEXT
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

// 🔙 BACK BUTTON
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
