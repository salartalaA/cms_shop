const ordersMain = document.querySelector(".cms-main");
const detailsModalElem = document.querySelector("#details-modal");
const deleteModal = document.querySelector("#delete-modal");
const deleteModalRejectBtn = document.querySelector(".delete-modal-reject-btn");
const deleteModalAcceptBtn = document.querySelector(".delete-modal-accept-btn");
const popularityTd = document.querySelector("#popularity-td");
const saleTd = document.querySelector("#sale-td");
const countTd = document.querySelector("#count-td");
let mainUrl = "http://localhost:4000/api/";
let globalorderID = null;

function showDetailsModal(orderInfo) {
  console.log(orderInfo);
  detailsModalElem.classList.add("active");
  popularityTd.innerHTML = orderInfo.popularity;
  saleTd.innerHTML = orderInfo.sale;
  countTd.innerHTML = orderInfo.count;
}

function hideDetailsModal() {
  detailsModalElem.classList.remove("active");
}

function showDeleteModal(orderID) {
  globalorderID = orderID;
  deleteModal.classList.add("active");
}

function hideDeleteModal() {
  deleteModal.classList.remove("active");
}

function orderAcceptFunc(orderInfo) {
  globalorderID = orderInfo.id;
  console.log(orderInfo);
  console.log(globalorderID);
  let isAccept = 1;
  fetch(`${mainUrl}orders/${globalorderID}/${isAccept}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      fetch(`${mainUrl}orders`)
        .then((res) => res.json())
        .then((allorders) => {
          console.log(allorders);

          const ordersTable = document.querySelector(".cms-table");

          ordersTable.innerHTML = "";

          ordersTable.insertAdjacentHTML(
            "beforeend",
            ` <table class="cms-table">
              <tr>
              <th>نام محصول خریداری شده</th>
              <th>نام خریدار</th>
              <th>تاریخ سفارش</th>
              <th>ساعت سفارش</th>
              <th>مبلغ کل</th>
              <th>تخفیف اعمال شده</th>
              <th>مبلغ پایانی</th>
              </tr>
              </table>`
          );
          allorders.forEach((order) => {
            ordersTable.insertAdjacentHTML(
              "beforeend",
              `  <tr>
            <td>
              <a href="#">${order.productID}</a>
            </td>
            <td>
              <a href="#">${order.userID}</a>
            </td>
            <td>${order.date}</td>
            <td>${order.hour}</td>
            <td>${order.price}</td>
            <td>${order.off}</td>
            <td>${(order.price * order.off) / 100}</td>
            <td>
              <button onclick='showDetailsModal(${JSON.stringify(
                order
              )})'>جزییات</button>
              <button onclick='showDeleteModal(${JSON.stringify(
                order.id
              )})'>حذف</button>
           
             ${
               order.isChecked === 1
                 ? `<button onclick='checkAcceptFunc(${JSON.stringify(
                     order
                   )})'>بررسی شده</button>`
                 : `<button onclick='checkRejectFunc(${JSON.stringify(
                     order
                   )})'>بررسی شود</button>`
             }
               ${
                 order.isAccept === 1
                   ? `<button onclick='orderRejectFunc(${JSON.stringify(
                       order
                     )})'>رد</button>`
                   : `<button onclick='orderAcceptFunc(${JSON.stringify(
                       order
                     )})'>تایید</button>`
               }
            </td>
          </tr>`
            );
          });
        });
    });
}

function orderRejectFunc(orderInfo) {
  globalorderID = orderInfo.id;
  console.log(orderInfo);
  console.log(globalorderID);
  let isAccept = 0;
  fetch(`${mainUrl}orders/${globalorderID}/${isAccept}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      fetch(`${mainUrl}orders`)
        .then((res) => res.json())
        .then((allorders) => {
          console.log(allorders);

          const ordersTable = document.querySelector(".cms-table");

          ordersTable.innerHTML = "";

          ordersTable.insertAdjacentHTML(
            "beforeend",
            ` <table class="cms-table">
              <tr>
              <th>نام محصول خریداری شده</th>
              <th>نام خریدار</th>
              <th>تاریخ سفارش</th>
              <th>ساعت سفارش</th>
              <th>مبلغ کل</th>
              <th>تخفیف اعمال شده</th>
              <th>مبلغ پایانی</th>
              </tr>
              </table>`
          );
          allorders.forEach((order) => {
            ordersTable.insertAdjacentHTML(
              "beforeend",
              `  <tr>
            <td>
              <a href="#">${order.productID}</a>
            </td>
            <td>
              <a href="#">${order.userID}</a>
            </td>
            <td>${order.date}</td>
            <td>${order.hour}</td>
            <td>${order.price}</td>
            <td>${order.off}</td>
            <td>${(order.price * order.off) / 100}</td>
            <td>
              <button onclick='showDetailsModal(${JSON.stringify(
                order
              )})'>جزییات</button>
              <button onclick='showDeleteModal(${JSON.stringify(
                order.id
              )})'>حذف</button>
             
             ${
               order.isChecked === 1
                 ? `<button onclick='checkAcceptFunc(${JSON.stringify(
                     order
                   )})'>بررسی شده</button>`
                 : `<button onclick='checkRejectFunc(${JSON.stringify(
                     order
                   )})'>بررسی شود</button>`
             }
               ${
                 order.isAccept === 1
                   ? `<button onclick='orderRejectFunc(${JSON.stringify(
                       order
                     )})'>رد</button>`
                   : `<button onclick='orderAcceptFunc(${JSON.stringify(
                       order
                     )})'>تایید</button>`
               }
            </td>
          </tr>`
            );
          });
        });
    });
}

function checkAcceptFunc(orderInfo) {
  globalorderID = orderInfo.id;
  console.log(orderInfo);
  console.log(globalorderID);
  let isChecked = 0;
  fetch(`${mainUrl}orders/check/${globalorderID}/${isChecked}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      fetch(`${mainUrl}orders`)
        .then((res) => res.json())
        .then((allorders) => {
          console.log(allorders);

          const ordersTable = document.querySelector(".cms-table");

          ordersTable.innerHTML = "";

          ordersTable.insertAdjacentHTML(
            "beforeend",
            ` <table class="cms-table">
              <tr>
              <th>نام محصول خریداری شده</th>
              <th>نام خریدار</th>
              <th>تاریخ سفارش</th>
              <th>ساعت سفارش</th>
              <th>مبلغ کل</th>
              <th>تخفیف اعمال شده</th>
              <th>مبلغ پایانی</th>
              </tr>
              </table>`
          );
          allorders.forEach((order) => {
            ordersTable.insertAdjacentHTML(
              "beforeend",
              `  <tr>
            <td>
              <a href="#">${order.productID}</a>
            </td>
            <td>
              <a href="#">${order.userID}</a>
            </td>
            <td>${order.date}</td>
            <td>${order.hour}</td>
            <td>${order.price}</td>
            <td>${order.off}</td>
            <td>${(order.price * order.off) / 100}</td>
            <td>
              <button onclick='showDetailsModal(${JSON.stringify(
                order
              )})'>جزییات</button>
              <button onclick='showDeleteModal(${JSON.stringify(
                order.id
              )})'>حذف</button>
           
             ${
               order.isChecked === 1
                 ? `<button onclick='checkAcceptFunc(${JSON.stringify(
                     order
                   )})'>بررسی شده</button>`
                 : `<button onclick='checkRejectFunc(${JSON.stringify(
                     order
                   )})'>بررسی شود</button>`
             }
               ${
                 order.isAccept === 1
                   ? `<button onclick='orderRejectFunc(${JSON.stringify(
                       order
                     )})'>رد</button>`
                   : `<button onclick='orderAcceptFunc(${JSON.stringify(
                       order
                     )})'>تایید</button>`
               }
            </td>
          </tr>`
            );
          });
        });
    });
}

function checkRejectFunc(orderInfo) {
  globalorderID = orderInfo.id;
  console.log(orderInfo);
  console.log(globalorderID);
  let isChecked = 1;
  fetch(`${mainUrl}orders/check/${globalorderID}/${isChecked}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      fetch(`${mainUrl}orders`)
        .then((res) => res.json())
        .then((allorders) => {
          console.log(allorders);

          const ordersTable = document.querySelector(".cms-table");

          ordersTable.innerHTML = "";

          ordersTable.insertAdjacentHTML(
            "beforeend",
            ` <table class="cms-table">
              <tr>
              <th>نام محصول خریداری شده</th>
              <th>نام خریدار</th>
              <th>تاریخ سفارش</th>
              <th>ساعت سفارش</th>
              <th>مبلغ کل</th>
              <th>تخفیف اعمال شده</th>
              <th>مبلغ پایانی</th>
              </tr>
              </table>`
          );
          allorders.forEach((order) => {
            ordersTable.insertAdjacentHTML(
              "beforeend",
              `  <tr>
            <td>
              <a href="#">${order.productID}</a>
            </td>
            <td>
              <a href="#">${order.userID}</a>
            </td>
            <td>${order.date}</td>
            <td>${order.hour}</td>
            <td>${order.price}</td>
            <td>${order.off}</td>
            <td>${(order.price * order.off) / 100}</td>
            <td>
              <button onclick='showDetailsModal(${JSON.stringify(
                order
              )})'>جزییات</button>
              <button onclick='showDeleteModal(${JSON.stringify(
                order.id
              )})'>حذف</button>
             
             ${
               order.isChecked === 1
                 ? `<button onclick='checkAcceptFunc(${JSON.stringify(
                     order
                   )})'>بررسی شده</button>`
                 : `<button onclick='checkRejectFunc(${JSON.stringify(
                     order
                   )})'>بررسی شود</button>`
             }
               ${
                 order.isAccept === 1
                   ? `<button onclick='orderRejectFunc(${JSON.stringify(
                       order
                     )})'>رد</button>`
                   : `<button onclick='orderAcceptFunc(${JSON.stringify(
                       order
                     )})'>تایید</button>`
               }
            </td>
          </tr>`
            );
          });
        });
    });
}

window.addEventListener("load", () => {
  fetch(`${mainUrl}orders`)
    .then((res) => res.json())
    .then((allorders) => {
      console.log(allorders);
      if (allorders.length) {
        ordersMain.insertAdjacentHTML(
          "beforeend",
          ` <table class="cms-table">
              <tr>
              <th>نام محصول خریداری شده</th>
              <th>نام خریدار</th>
              <th>تاریخ سفارش</th>
              <th>ساعت سفارش</th>
              <th>مبلغ کل</th>
              <th>تخفیف اعمال شده</th>
              <th>مبلغ پایانی</th>
              </tr>
              </table>`
        );
        const ordersTable = document.querySelector(".cms-table");
        allorders.forEach((order) => {
          ordersTable.insertAdjacentHTML(
            "beforeend",
            `  <tr>
            <td>
              <a href="#">${order.productID}</a>
            </td>
            <td>
              <a href="#">${order.userID}</a>
            </td>
            <td>${order.date}</td>
            <td>${order.hour}</td>
            <td>${order.price}</td>
            <td>${order.off}</td>
            <td>${(order.price * order.off) / 100}</td>
            <td>
              <button onclick='showDetailsModal(${JSON.stringify(
                order
              )})'>جزییات</button>
              <button onclick='showDeleteModal(${JSON.stringify(
                order.id
              )})'>حذف</button>
              
             ${
               order.isChecked === 1
                 ? `<button onclick='checkAcceptFunc(${JSON.stringify(
                     order
                   )})'>بررسی شده</button>`
                 : `<button onclick='checkRejectFunc(${JSON.stringify(
                     order
                   )})'>بررسی شود</button>`
             }
              ${
                order.isAccept === 1
                  ? `<button onclick='orderRejectFunc(${JSON.stringify(
                      order
                    )})'>رد</button>`
                  : `<button onclick='orderAcceptFunc(${JSON.stringify(
                      order
                    )})'>تایید</button>`
              }
            </td>
          </tr>`
          );
        });
      } else {
        ordersMain.insertAdjacentHTML(
          "beforeend",
          `<div class="cms-empty-err">سفارشی یافت نشد!</div>`
        );
      }
    });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideDetailsModal();
    hideDeleteModal();
  }
});

deleteModalRejectBtn.addEventListener("click", hideDeleteModal);

deleteModalAcceptBtn.addEventListener("click", () => {
  fetch(`${mainUrl}orders/${globalorderID}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      hideDeleteModal();
      fetch(`${mainUrl}orders`)
        .then((res) => res.json())
        .then((allorders) => {
          console.log(allorders);

          const ordersTable = document.querySelector(".cms-table");

          ordersTable.innerHTML = "";

          ordersTable.insertAdjacentHTML(
            "beforeend",
            ` <table class="cms-table">
              <tr>
              <th>نام محصول خریداری شده</th>
              <th>نام خریدار</th>
              <th>تاریخ سفارش</th>
              <th>ساعت سفارش</th>
              <th>مبلغ کل</th>
              <th>تخفیف اعمال شده</th>
              <th>مبلغ پایانی</th>
              </tr>
              </table>`
          );
          allorders.forEach((order) => {
            ordersTable.insertAdjacentHTML(
              "beforeend",
              `  <tr>
            <td>
              <a href="#">${order.productID}</a>
            </td>
            <td>
              <a href="#">${order.userID}</a>
            </td>
            <td>${order.date}</td>
            <td>${order.hour}</td>
            <td>${order.price}</td>
            <td>${order.off}</td>
            <td>${(order.price * order.off) / 100}</td>
            <td>
              <button onclick='showDetailsModal(${JSON.stringify(
                order
              )})'>جزییات</button>
              <button onclick='showDeleteModal(${JSON.stringify(
                order.id
              )})'>حذف</button>
              ${
                order.isChecked === 1
                  ? `<button onclick='checkAcceptFunc(${JSON.stringify(
                      order
                    )})'>بررسی شده</button>`
                  : `<button onclick='checkRejectFunc(${JSON.stringify(
                      order
                    )})'>بررسی شود</button>`
              }
               ${
                 order.isAccept === 1
                   ? `<button onclick='orderRejectFunc(${JSON.stringify(
                       order
                     )})'>رد</button>`
                   : `<button onclick='orderAcceptFunc(${JSON.stringify(
                       order
                     )})'>تایید</button>`
               }
            </td>
          </tr>`
            );
          });
        });
    });
});
