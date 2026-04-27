const backgrounds = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
];

function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  const selectedImage = backgrounds[randomIndex];

  document.body.style.backgroundImage = `url('${selectedImage}')`;
}

setRandomBackground();

const fileList = document.getElementById("fileList");

async function loadFiles() {
  const res = await fetch("files.json");
  const files = await res.json();

  displayFiles(files);
}

function displayFiles(files) {
  fileList.innerHTML = "";

  files.forEach(file => {
    fileList.innerHTML += `
      <div class="file">
        <div>
          <strong>${file.name}</strong><br>
          <small>${file.type} • ${file.category}</small>
        </div>
        <a href="${file.link}" target="_blank">Download</a>
      </div>
    `;
  });
}

let allFiles = [];

async function loadFiles() {
  const res = await fetch("files.json");
  allFiles = await res.json();
  displayFiles(allFiles);
}

document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = allFiles.filter(file =>
    file.name.toLowerCase().includes(value) ||
    file.category.toLowerCase().includes(value) ||
    file.type.toLowerCase().includes(value)
  );

  displayFiles(filtered);
});

loadFiles();

function filterFiles(type) {
  if (type === "All") {
    displayFiles(allFiles);
  } else {
    const filtered = allFiles.filter(file => file.type === type);
    displayFiles(filtered);
  }
}

const toggleBtn = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙 Dark Mode";
  }
});
