fetch("js/data.json")
  .then((response) => response.json())
  .then((items) => {
    let itemContainer = "";
    items.forEach((item) => (itemContainer += sectionItem(item)));
    const portfolioItems = document.querySelector(".portfolio-items");
    portfolioItems.innerHTML = itemContainer;
  });

function sectionItem(item) {
  return `
  <div class="portfolio-item" data-category="front-end">
    <div class="portfolio-item-thumbnail">
      <img src="${item.img}" alt="thumbnail" />
      <button type="button" class="btn more-info-btn">more info</button>
    </div>
    <h3 class="portfolio-item-title">${item.title}</h3>
    <div class="portfolio-item-details">
      <div class="description">
        <p>${item.description}</p>
      </div>
      <div class="general-info">
        <p>Created - <span>${item.created}</span></p>
        <p>Technologies Used - <span>${item.teknologi}</span></p>
        <p>Role - <span>${item.role}</span></p>
        <p>
          View Online - <span><a href="#" target="_blank">${item.domain}</a></span>
        </p>
      </div>
    </div>
  </div>`;
}
