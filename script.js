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

loadFiles();
