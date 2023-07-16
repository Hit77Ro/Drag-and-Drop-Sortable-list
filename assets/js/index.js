let items = document.querySelectorAll(".item");
const list = items[0].parentElement;
console.log(list);

items.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    setTimeout(() => draggable.classList.add("dragging"), 0);
  });

  draggable.addEventListener("dragend", (e) => {
    draggable.classList.remove("dragging");
  });
});

const dragItem = (e) => {
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
};

list.addEventListener("dragover", dragItem);
