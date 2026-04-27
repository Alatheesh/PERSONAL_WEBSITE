const files = [
  { name: "Math Notes", link: "https://example.com/math.pdf" },
  { name: "Physics Notes", link: "https://example.com/physics.pdf" },
  { name: "EEE Questions", link: "https://example.com/eee.pdf" }
];

const fileList = document.getElementById("fileList");

function showFiles(data) {
  fileList.innerHTML = "";

  data.forEach(file => {
    fileList.innerHTML += `
      <div class="file">
        <span>${file.name}</span>
        <a href="${file.link}" target="_blank">Download</a>
      </div>
    `;
  });
}

showFiles(files);

const search = document.getElementById("search");

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();

  const filtered = files.filter(file =>
    file.name.toLowerCase().includes(value)
  );

  showFiles(filtered);
});