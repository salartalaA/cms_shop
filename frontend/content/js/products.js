const editModalElem = document.querySelector("#edit-modal");
const editModalSubmit = document.querySelector("#edit-modal-submit");
const detailsModalElem = document.querySelector("#details-modal");
const deleteModalElem = document.querySelector("#delete-modal");
const cancelDeleteProduct = document.querySelector("#cancel-delete-product");
const confirmDeleteProduct = document.querySelector("#confirm-delete-product");

const editProductTitle = document.querySelector("#edit-product-title");
const editProductPrice = document.querySelector("#edit-product-price");
const editProductCount = document.querySelector("#edit-product-count");
const editProductImage = document.querySelector("#edit-product-image");
const editProductPopularity = document.querySelector(
  "#edit-product-popularity"
);

const editProductSale = document.querySelector("#edit-product-sale");
const editProductColors = document.querySelector("#edit-product-colors");

const popularityTd = document.querySelector("#popularity-td");
const saleTd = document.querySelector("#sale-td");
const colorTd = document.querySelector("#color-td");

let mainUrl = "http://localhost:4000/api/";
let globalproductID = null;

function showDeleteModal(productID) {
  globalproductID = productID;
  deleteModalElem.classList.add("active");
}

function hideDeleteModal() {
  deleteModalElem.classList.remove("active");
}

function showEditModal(product) {
  globalproductID = product.id;
  console.log(product);
  editModalElem.classList.add("active");
  showMainProductsInfos(product);
}

function hideEditModal() {
  editModalElem.classList.remove("active");
}

function showDetailsModal(product) {
  console.log(product);
  detailsModalElem.classList.add("active");
  popularityTd.innerHTML = product.popularity;
  saleTd.innerHTML = product.sale;
  colorTd.innerHTML = product.colors;
}

function hideDetailsModal() {
  detailsModalElem.classList.remove("active");
}

function showMainProductsInfos(product) {
  editProductTitle.value = product.title;
  editProductPrice.value = product.price;
  editProductCount.value = product.count;
  editProductImage.value = product.img;
  editProductPopularity.value = product.popularity;
  editProductSale.value = product.sale;
  editProductColors.value = product.colors;
}

cancelDeleteProduct.addEventListener("click", hideDeleteModal);

confirmDeleteProduct.addEventListener("click", () => {
  fetch(`${mainUrl}products/${globalproductID}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      hideDeleteModal();

      fetch(`${mainUrl}products`)
        .then((res) => res.json())
        .then((allProducts) => {
          console.log(allProducts);

          const productsContent = document.querySelector(".products-content");
          productsContent.innerHTML = "";

          productsContent.insertAdjacentHTML(
            "beforeend",
            `  <tr class="products-table-heading-tr">
            <th>عکس</th>
            <th>نام</th>
            <th>قیمت</th>
            <th>موجودی</th>
          </tr>`
          );

          allProducts.forEach((product) => {
            productsContent.insertAdjacentHTML(
              "beforeend",
              `
          <tr class="products-table-tr">
            <td>
              <img
                src="${product.img}"
                alt="Product Image"
                class="products-table-img"
              />
            </td>
            <td>${product.title}</td>
            <td>${product.price} تومان</td>
            <td>${product.count} عدد</td>

            <td>
               <button class="products-table-button" onclick='showDetailsModal(${JSON.stringify(
                 product
               )})'>جزییات</button>
              <button class="products-table-button" onclick=showDeleteModal(${JSON.stringify(
                product.id
              )})>حذف</button>
              <button class="products-table-button" onclick=showEditModal(${JSON.stringify(
                product
              )})>ویرایش</button>
            </td>
          </tr>
            `
            );
          });
        });
    });
});

window.addEventListener("load", () => {
  const productsMainElem = document.querySelector(".products-main");

  fetch(`${mainUrl}products`)
    .then((res) => res.json())
    .then((allProducts) => {
      console.log(allProducts);
      if (allProducts.length) {
        productsMainElem.insertAdjacentHTML(
          "beforeend",
          ` <table class="products-table products-content">
          <tr class="products-table-heading-tr">
            <th>عکس</th>
            <th>نام</th>
            <th>قیمت</th>
            <th>موجودی</th>
          </tr>

        </table>`
        );
        const productsContent = document.querySelector(".products-content");
        allProducts.forEach((product) => {
          productsContent.insertAdjacentHTML(
            "beforeend",
            `
          <tr class="products-table-tr">
            <td>
              <img
                src="${product.img}"
                alt="Product Image"
                class="products-table-img"
              />
            </td>
            <td>${product.title}</td>
            <td>${product.price} تومان</td>
            <td>${product.count} عدد</td>

            <td>
              <button class="products-table-button" onclick='showDetailsModal(${JSON.stringify(
                product
              )})'>جزییات</button>
              <button class="products-table-button" onclick="showDeleteModal(${JSON.stringify(
                product.id
              )})">حذف</button>
              <button class="products-table-button" onclick='showEditModal(${JSON.stringify(
                product
              )})'>ویرایش</button>
            </td>
          </tr>
            `
          );
        });
      } else {
        productsMainElem.insertAdjacentElement(
          "beforeend",
          `<div class="cms-empty-err">محصولی یافت نشد!</div>`
        );
      }
    });
});

editModalSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  let mainProductNewInfos = {
    title: editProductTitle.value,
    price: editProductPrice.value,
    count: editProductCount.value,
    img: editProductImage.value,
    popularity: editProductPopularity.value,
    sale: editProductSale.value,
    colors: editProductColors.value,
  };
  fetch(`${mainUrl}products/${globalproductID}`, {
    method: "PUT",
    body: JSON.stringify(mainProductNewInfos),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      hideEditModal();
      fetch(`${mainUrl}products`)
        .then((res) => res.json())
        .then((allProducts) => {
          console.log(allProducts);

          const productsContent = document.querySelector(".products-content");
          productsContent.innerHTML = "";

          productsContent.insertAdjacentHTML(
            "beforeend",
            `  <tr class="products-table-heading-tr">
            <th>عکس</th>
            <th>نام</th>
            <th>قیمت</th>
            <th>موجودی</th>
          </tr>`
          );

          allProducts.forEach((product) => {
            productsContent.insertAdjacentHTML(
              "beforeend",
              `
          <tr class="products-table-tr">
            <td>
              <img
                src="${product.img}"
                alt="Product Image"
                class="products-table-img"
              />
            </td>
            <td>${product.title}</td>
            <td>${product.price} تومان</td>
            <td>${product.count} عدد</td>

            <td>
          <button class="products-table-button" onclick='showDetailsModal(${JSON.stringify(
            product
          )})'>جزییات</button>
              <button class="products-table-button" onclick=showDeleteModal(${JSON.stringify(
                product.id
              )})>حذف</button>
              <button class="products-table-button" onclick='showEditModal(${JSON.stringify(
                product
              )})'>ویرایش</button>
            </td>
          </tr>
            `
            );
          });
        });
    });
});

window.addEventListener("click", (event) => {
  if (event.target.id === "delete-modal") {
    hideDeleteModal();
  }
  if (event.target.id === "edit-modal") {
    hideEditModal();
  }
  if (event.target.id === "details-modal") {
    hideDetailsModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideDeleteModal();
    hideEditModal();
    hideDetailsModal();
  }
});
