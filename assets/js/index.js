let items = Array.from(document.querySelectorAll(".item"));
let list = document.querySelector(".list");
let resetBtn = document.querySelector(".reset");
resetBtn.onclick = reset;

items.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", (e) => {
    draggable.classList.remove("dragging");
  });
});

list.addEventListener("dragover", dragItem);
//  check order on drop
list.addEventListener("drop", checkOrder);

function dragItem(e) {
  e.preventDefault();
  const draggingItem = list.querySelector(".dragging");
  const siblings = [...list.querySelectorAll(".draggable:not(.dragging)")];

  let nextSibling = siblings.find(
    (sibling) =>
      e.clientY <= sibling.getBoundingClientRect().y + sibling.offsetHeight / 2
  );
  if (nextSibling) list.insertBefore(draggingItem, nextSibling);
  else list.append(draggingItem);
  // we can do that without if else , just inserting before  but an undefined will print out if we drag last item
}
// create checkOrder function
function checkOrder() {
  items = document.querySelectorAll(".item");
  items.forEach((item, i) => {
    if (item.tabIndex == i) {
      item.classList.add("in-place");
      item.classList.remove("not-in-place");
    } else {
      item.classList.remove("in-place");
      item.classList.add("not-in-place");
    }
  });
}

function reset() {
  list.textContent = "";
  originalItem.forEach((item) => list.append(item));
  items.forEach((item) => item.classList.remove("not-in-place", "in-place"));
  checkOrder();
}
