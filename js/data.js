window.addEventListener("load", async function () {
  const portfolioItem = await getData();
  updateUI(portfolioItem);
});

function getData() {
  return fetch("js/data.json")
    .then((response) => response.json())
    .then((items) => items);
}

function updateUI(items) {
  let itemContainer = "";
  items.forEach((item) => (itemContainer += sectionItem(item)));
  const pi = document.querySelector(".portfolio-items");
  pi.innerHTML = itemContainer;
}
