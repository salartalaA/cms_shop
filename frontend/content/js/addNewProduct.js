const productTitle = document.querySelector("#product-title");
const productPrice = document.querySelector("#product-price");
const productCount = document.querySelector("#product-count");
const productImg = document.querySelector("#product-image");
const productPopularity = document.querySelector("#product-popularity");
const productSale = document.querySelector("#product-sale");
const productColors = document.querySelector("#product-colors");
const addNewProductBtn = document.querySelector("#add-new-product-btn");

function cleanInputs() {
  productTitle.value = "";
  productPrice.value = "";
  productCount.value = "";
  productImg.value = "";
  productPopularity.value = "";
  productSale.value = "";
  productColors.value = "";
}

window.addEventListener("load", () => {
  addNewProductBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let mainUrl = "http://localhost:4000/api/";

    let newProductInfoObj = {
      title: productTitle.value,
      price: productPrice.value,
      count: productCount.value,
      img: productImg.value,
      popularity: productPopularity.value,
      sale: productSale.value,
      colors: productColors.value,
    };

    fetch(`${mainUrl}products`, {
      method: "POST",
      body: JSON.stringify(newProductInfoObj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

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
              <button class="products-table-button">جزییات</button>
              <button class="products-table-button" onclick=showDeleteModal(${product.id})>حذف</button>
              <button class="products-table-button" onclick='showEditModal(${JSON.stringify(product)})'>ویرایش</button>
            </td>
          </tr>
            `
              );
            });
          });
        cleanInputs();
      });
  });
});
