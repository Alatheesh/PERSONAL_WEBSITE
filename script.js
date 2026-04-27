// ---------------- BACKGROUND ----------------
window.addEventListener("DOMContentLoaded", function () {
  const backgrounds = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920",
    "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?q=80&w=1920",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1920"
  ];

  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  const selectedImage = backgrounds[randomIndex];

  document.body.style.backgroundImage = "url('" + selectedImage + "')";
});

// ---------------- FILE DATA ----------------
let allFiles = [];
const fileList = document.getElementById("fileList");

// Load files
async function loadFiles() {
  const res = await fetch("files.json");
  allFiles = await res.json();
  displayFiles(allFiles);
}

// ---------------- DISPLAY FILES ----------------
function displayFiles(files) {
  fileList.innerHTML = "";

  files.forEach(function (file) {
    fileList.innerHTML +=
      '<div class="file">' +
        '<div>' +
          '<strong>' + file.name + '</strong><br>' +
          '<small>' + file.type + ' • ' + file.category + '</small>' +
        '</div>' +
        '<button onclick="openFile(' + file.id + ')">View Details</button>' +
      '</div>';
  });
}

// ---------------- NAVIGATION ----------------
function openFile(id) {
  window.location.href = "file.html?id=" + id;
}

// ---------------- SEARCH ----------------
document.getElementById("search").addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();

  const filtered = allFiles.filter(function (file) {
    return (
      file.name.toLowerCase().includes(value) ||
      file.category.toLowerCase().includes(value) ||
      file.type.toLowerCase().includes(value)
    );
  });

  displayFiles(filtered);
});

// ---------------- FILTER ----------------
function filterFiles(type) {
  if (type === "All") {
    displayFiles(allFiles);
  } else {
    const filtered = allFiles.filter(function (file) {
      return file.type === type;
    });
    displayFiles(filtered);
  }
}

// ---------------- DARK MODE ----------------
const toggleBtn = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️";
}

// Toggle theme
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

// ---------------- INIT ----------------
loadFiles();
