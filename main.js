const dragableElements = document.querySelectorAll(".chart");
const dropZones = document.querySelectorAll(".drop-zone");
const getLocalStorage = JSON.parse(localStorage.getItem("items"));
let storage = [];

if (getLocalStorage) {
  getLocalStorage.forEach((ele) => {
    dropZones[ele.index].appendChild(document.getElementById(ele.id));
  });
}

dragableElements.forEach((dragableElement) => {
  dragableElement.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", dragableElement.id);
  });
});

dropZones.forEach((dropzone, index, array) => {
  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("drop-zone--over");
  });

  dropzone.addEventListener("dragleave", (e) => {
    dropzone.classList.remove("drop-zone--over");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    storage.length = 0;
    const droppedElementId = e.dataTransfer.getData("text/plain");
    const droppedElement = document.getElementById(droppedElementId);

    dropzone.appendChild(droppedElement);

    dropzone.classList.remove("drop-zone--over");

    Array.from(array).map((ele, i) => {
      ele.children.length > 0 &&
        storage.push({ id: ele.children[0].id, index: i });
    });

    localStorage.setItem("items", JSON.stringify(storage));
  });
});
