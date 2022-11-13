console.log(GOODS);

let activeTabId = "goods";

const initialTab = getActiveTab();
initialTab.classList.add("active");

renderTabContentById(activeTabId);

//-------

const goodsInCart = [];

const tabWithCounter = document.querySelector("button[data-goods-count]");

const tabs = document.querySelectorAll("button.tab");

addClickListeners(tabs, clickHandler);

//-------

function clickHandler(event) {
  const activeTab = getActiveTab();
  activeTab.classList.remove("active");
  event.target.classList.add("active");

  activeTabId = event.target.dataset.tabId;

  removeActiveTabContent();

  renderTabContentById(activeTabId);
}

function addInCartHandler() {
  const product = createProduct();
  goodsInCart.push(product);

  tabWithCounter.dataset.goodsCount = goodsInCart.length;
}

function addClickListeners(elements, callback) {
  for (let i = 0; i < tabs.length; i++) {
    const element = elements[i];

    element.addEventListener("click", callback);
  }
}

function createProduct() {
  return {
    name: "бодік для хлопчика",
    price: 150,
  };
}

function getActiveTab() {
  return document.querySelector(`button[data-tab-id="${activeTabId}"]`);
}

function removeActiveTabContent() {
  const activeContent = document.querySelector(
    `[data-active-tab-content="true"]`
  );

  activeContent.remove();
}

function renderTabContentById(tabId) {
  const tabsContainer = document.querySelector(".tabs");
  if (tabId === "goods") {
    const html = renderGoods();
    tabsContainer.after(html);
  } else {
    const html = renderCart();
    tabsContainer.insertAdjacentHTML("afterend", html);
  }
}

function renderGoods() {
  const div = document.createElement("div");
  div.dataset.activeTabContent = "true";
  div.classname = "product-items";
  for (let i = 0; i < GOODS.length; i++) {
    const product = GOODS[i];

    div.insertAdjacentHTML(
      "beforeend",
      `
<div class="product-item">
<img src="${product.imgSrc}" />
<div class="product-list">
  <h3>${product.name}</h3>
  <p class="${product.price}"</p>
  <button data-add-in-cart="true" class="button">В кошик</button>
</div>
</div>
`
    );
  }
  return div;
}

function renderCart() {
  return `
    <div data-active-tab-content="true" class="cart-items">
      <div class="cart-item">
        <div class="cart-item-title">Бодік для хлопчика</div>
        <div class="cart-item-count">4шт</div>
        <div class="cart-item-price">235грн</div>
      </div>

      <div class="cart-item">
        <div class="cart-item-title">Бодік для дівчинки</div>
        <div class="cart-item-count">2шт</div>
        <div class="cart-item-price">135грн</div>
      </div>
    </div> 
    `;
}
