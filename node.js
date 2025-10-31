const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const fileList = document.getElementById("fileList");

// Load saved files from localStorage
let uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];

// Display stored files
function displayFiles() {
  fileList.innerHTML = "";
  if (uploadedFiles.length === 0) {
    fileList.innerHTML = "<p>No files uploaded yet.</p>";
    return;
  }

  uploadedFiles.forEach((file, index) => {
    const li = document.createElement("li");

    const fileLink = document.createElement("a");
    fileLink.href = file.data;
    fileLink.download = file.name;
    fileLink.textContent = file.name;
    fileLink.style.color = "#fff";
    fileLink.target = "_blank";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteFile(index);

    li.appendChild(fileLink);
    li.appendChild(deleteBtn);
    fileList.appendChild(li);
  });
}

// Upload files
uploadBtn.addEventListener("click", () => {
  const files = fileInput.files;
  if (files.length === 0) {
    alert("Please select at least one file!");
    return;
  }

  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedFiles.push({
        name: file.name,
        size: file.size,
        data: e.target.result,
      });
      localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
      displayFiles();
    };
    reader.readAsDataURL(file);
  });

  fileInput.value = ""; // reset input
});

// Delete a file
function deleteFile(index) {
  if (confirm("Are you sure you want to delete this file?")) {
    uploadedFiles.splice(index, 1);
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
    displayFiles();
  }
}

// Initialize display
displayFiles();
