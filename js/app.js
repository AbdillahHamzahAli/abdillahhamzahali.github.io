window.addEventListener("load", async function () {
  pageLoader();
  bgAnimationItems();
  const portfolioItem = await getData();
  updateUI(portfolioItem);
  /* ------------------ Filter Portfolio Items ----------------*/
  const filterBtnsContainer = document.querySelector(".portfolio-filter");
  let portfolioItems;
  filterBtnsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("portfolio-filter-btn") && !e.target.classList.contains("active")) {
      filterBtnsContainer.querySelector(".active").classList.remove("active");
      e.target.classList.add("active");
      toggleBodyScrolling();
      document.querySelector(".filter-status").classList.add("active");
      document.querySelector(".filter-status p").innerHTML = `filtering <span>${e.target.innerHTML}</span> works`;
      setTimeout(() => {
        filterItems(e.target);
      }, 400);
      setTimeout(() => {
        document.querySelector(".filter-status").classList.remove("active");
        toggleBodyScrolling();
      }, 800);
    }
  });

  function filterItems(filterBtn) {
    const selectedCategory = filterBtn.getAttribute("data-filter");
    document.querySelectorAll(".portfolio-item").forEach((item) => {
      const category = item.getAttribute("data-category").split(",");
      if (category.indexOf(selectedCategory) !== -1 || selectedCategory === "all") {
        item.classList.add("show");
      } else {
        item.classList.remove("show");
      }
    });
    portfolioItems = document.querySelectorAll(".portfolio-item.show");
  }
  // filtet Active Categoty Portfolio Items
  filterItems(document.querySelector(".portfolio-filter-btn.active"));

  /*------------------ Portofolio Item Details Popup -------------*/
  let portfolioItemIndex;
  document.addEventListener("click", (e) => {
    if (e.target.closest(".portfolio-item")) {
      const currentItem = e.target.closest(".portfolio-item");
      portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
      togglePopup();
      portfolioItemsDetails();
      updateNextPrevItem();
    }
  });

  function togglePopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    toggleBodyScrolling();
  }
  document.querySelector(".pp-close-btn").addEventListener("click", togglePopup);

  function portfolioItemsDetails() {
    // img
    document.querySelector(".pp-thumbnail img").src = portfolioItems[portfolioItemIndex].querySelector("img").src;
    // title
    document.querySelector(".pp-header h3").innerHTML = portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-title").innerHTML;
    // body
    document.querySelector(".pp-body").innerHTML = portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-details").innerHTML;
    // halaman
    document.querySelector(".pp-counter").innerHTML = `${portfolioItemIndex + 1} of ${portfolioItems.length} (<span title="category">${document.querySelector(".portfolio-filter-btn.active").innerHTML}</span>)`;
  }

  function updateNextPrevItem() {
    // left
    if (portfolioItemIndex !== 0) {
      document.querySelector(".pp-footer-left").classList.remove("hidden");
      document.querySelector(".pp-footer-left h3").innerHTML = portfolioItems[portfolioItemIndex - 1].querySelector("h3").innerHTML;

      document.querySelector(".pp-footer-left img").src = portfolioItems[portfolioItemIndex - 1].querySelector("img").src;
    } else {
      document.querySelector(".pp-footer-left").classList.add("hidden");
    }
    // right
    if (portfolioItemIndex !== portfolioItems.length - 1) {
      document.querySelector(".pp-footer-right").classList.remove("hidden");
      document.querySelector(".pp-footer-right h3").innerHTML = portfolioItems[portfolioItemIndex + 1].querySelector("h3").innerHTML;

      document.querySelector(".pp-footer-right img").src = portfolioItems[portfolioItemIndex + 1].querySelector("img").src;
    } else {
      document.querySelector(".pp-footer-right").classList.add("hidden");
    }
  }
  // button Next Prev
  document.querySelector(".pp-prev-btn").addEventListener("click", () => {
    changePortfolioItem("prev");
  });
  document.querySelector(".pp-next-btn").addEventListener("click", () => {
    changePortfolioItem("next");
  });
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
function sectionItem(item) {
  return `
  <div class="portfolio-item" data-category="${item.role}">
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
function pageLoader() {
  const pgLoader = document.querySelector(".page-loader");
  pgLoader.classList.add('"slide-out-right"');
  setTimeout(() => {
    pgLoader.style.display = "none";
    pgLoader.remove();
  }, 1000);
}
function bgAnimationItems() {
  const row = 7;
  const cols = 10;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < cols; j++) {
      const div = document.createElement("div");
      div.className = `col-${j + 1}`;
      document.querySelector(".bg-animation-effect").appendChild(div);
    }
  }
}
/*--------------------- Toggle Navbar --------------------- */
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", toggleNavbar);
function toggleNavbar() {
  navToggler.classList.toggle("active");
  document.querySelector(".nav").classList.toggle("open");
  togglOverlayEffect();
  toggleBodyScrolling();
}
/*---------------- Hide & Show Section -----------------------*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("link-item") && e.target.hash !== "") {
    const hash = e.target.hash;
    if (e.target.classList.contains("nav-item")) {
      activeSection(hash);
      toggleNavbar();
    } else {
      toggleBodyScrolling();
      togglOverlayEffect();
      navToggler.classList.add("toggle-hide");
      setTimeout(() => {
        activeSection(hash);
        toggleBodyScrolling();
        togglOverlayEffect();
        navToggler.classList.remove("toggle-hide");
      }, 950);
    }
  }
});
function activeSection(sectionId) {
  document.querySelector("section.active").classList.remove("active");
  document.querySelector(sectionId).classList.add("active");
  window.scrollTo(0, 0);
}
/* ------------------- Toggle OverlaY Effect ----------------*/
function togglOverlayEffect() {
  document.querySelector(".overlay-effect").classList.toggle("active");
}
/* ------------------- Toggle Body Scrolling ----------------*/
function toggleBodyScrolling() {
  document.body.classList.toggle("hide-scrolling");
}
/*-------------------- Toggle Contact Form -------------------- */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-contact-form-btn")) {
    document.querySelector(".contact-form").classList.toggle("open");
    toggleBodyScrolling();
  }
});
/*--------------------- Dark mode ------------------*/
const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
  const theme = document.body.getAttribute("data-theme");
  if (theme === null || theme === "dark") {
    document.body.setAttribute("data-theme", "light");
  } else {
    document.body.setAttribute("data-theme", "dark");
  }
});
