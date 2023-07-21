let items = Array.from(document.querySelectorAll(".item"));
const initalItems = [...document.querySelectorAll(".item")];
let list = document.querySelector(".list");
let resetBtn = document.querySelector(".reset");

// Load the order from localStorage if available
getItemsFromLS();
//   add dragstart and dragend events on items
items.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", (e) => {
    draggable.classList.remove("dragging");
  });
});

resetBtn.onclick = reset;
list.addEventListener("dragover", dragItem);
list.addEventListener("drop", () => {
  checkOrder();
  saveOrder();
});

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

function checkOrder() {
  let randomOrder = list.querySelectorAll(".item");
  randomOrder.forEach((el, i) => {
    if (el.tabIndex == i) {
      el.classList.add("in-place");
      el.classList.remove("not-in-place");
    } else {
      el.classList.remove("in-place");
      el.classList.add("not-in-place");
    }
  });
}

function reset() {
  list.textContent = "";
  initalItems.forEach((el) => list.append(el));
  items.forEach((el) => el.classList.remove("in-place", "not-in-place"));
  saveOrder();
}

function saveOrder() {
  let array = [...document.querySelectorAll(".item")].map((el) =>
    items.indexOf(el)
  );

  localStorage.setItem("itemsOrder", array.join(","));
}

function getItemsFromLS() {
  const order = localStorage.getItem("itemsOrder");
  if (order) {
    order.split(",").map((index) => list.append(items[index]));
    checkOrder();
  }
}
