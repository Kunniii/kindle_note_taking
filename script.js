const noteNameInput = document.getElementById("noteName");
const noteTextarea = document.getElementById("note");
const fileInput = document.getElementById("fileInput");
const clearModal = document.getElementById("clearModal");

// Load from localStorage on page load
window.addEventListener("load", () => {
  const savedNoteData = localStorage.getItem("noteData");
  if (savedNoteData) {
    const noteData = JSON.parse(savedNoteData);
    noteNameInput.value = noteData.name;
    noteTextarea.value = noteData.content;
  }
});

noteNameInput.addEventListener("input", updateNote);
noteTextarea.addEventListener("input", updateNote);
fileInput.addEventListener("change", handleFileSelect);

function updateNote() {
  const noteName = noteNameInput.value;
  const noteContent = noteTextarea.value;
  localStorage.setItem(
    "noteData",
    JSON.stringify({ name: noteName, content: noteContent })
  );
}

function exportToTxt() {
  const noteName = noteNameInput.value || "untitled";
  const noteContent = noteTextarea.value;
  const blob = new Blob([noteContent], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${noteName}.txt`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function openClearModal() {
  clearModal.style.display = "flex";
}

function closeModal() {
  clearModal.style.display = "none";
}

function saveAndClear() {
  exportToTxt(); // Save the note first
  clearText();
  closeModal();
}

function deleteAnyway() {
  clearText();
  closeModal();
}

function clearText() {
  noteTextarea.value = "";
  noteNameInput.value = "";
  localStorage.removeItem("noteData");
}
