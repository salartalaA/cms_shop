const offsMain = document.querySelector(".cms-main");
const deleteModalElem = document.querySelector("#delete-modal");
const deleteModalRejectBtn = document.querySelector(".delete-modal-reject-btn");
const deleteModalAcceptBtn = document.querySelector(".delete-modal-accept-btn");

let mainUrl = "http://localhost:3001/api/";

function showDeleteModal(offInfo) {
  globaloffID = offInfo.id;
  deleteModalElem.classList.add("active");
}

function hideDeleteModal() {
  deleteModalElem.classList.remove("active");
}

function offAcceptFunc(offInfo) {
  globaloffID = offInfo.id;
  console.log(offInfo);
  console.log(globaloffID);
  let isAccept = 1;
  fetch(`${mainUrl}offs/${globaloffID}/${isAccept}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      fetch(`${mainUrl}offs`)
        .then((res) => res.json())
        .then((offs) => {
          console.log(offs);
          const offsTable = document.querySelector(".offs-table");
          offsTable.innerHTML = "";
          offsTable.insertAdjacentHTML(
            "beforeend",
            `
              <table class="cms-table offs-table">
          <tr>
            <th>کد تخفیف</th>
            <th>درصد تخفیف</th>
            <th>تاریخ ثبت</th>
            <th>ثبت شده توسط</th>
            <th>ساخته شده برای</th>
          </tr>
        </table>`
          );
          offs.forEach((off) => {
            offsTable.insertAdjacentHTML(
              "beforeend",
              `  <tr>
            <td>${off.code}</td>
            <td>${off.percent}%</td>
            <td>${off.date}</td>
            <td>${off.adminID}</td>
            <td>${off.productID}</td>
            <td>  
            ${
              off.isAccept === 1
                ? `<button onclick='offRejectFunc(${JSON.stringify(
                    off
                  )})'>رد</button>`
                : `<button onclick='offAcceptFunc(${JSON.stringify(
                    off
                  )})'>تایید</button>`
            }
              <button onclick='showDeleteModal(${JSON.stringify(
                off
              )})'>حذف</button>
            </td>
          </tr>`
            );
          });
        });
    });
}

function offRejectFunc(offInfo) {
  globaloffID = offInfo.id;
  console.log(offInfo);
  console.log(globaloffID);
  let isAccept = 0;
  fetch(`${mainUrl}offs/${globaloffID}/${isAccept}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      fetch(`${mainUrl}offs`)
        .then((res) => res.json())
        .then((offs) => {
          console.log(offs);
          const offsTable = document.querySelector(".offs-table");
          offsTable.innerHTML = "";
          offsTable.insertAdjacentHTML(
            "beforeend",
            `
              <table class="cms-table offs-table">
          <tr>
            <th>کد تخفیف</th>
            <th>درصد تخفیف</th>
            <th>تاریخ ثبت</th>
            <th>ثبت شده توسط</th>
            <th>ساخته شده برای</th>
          </tr>
        </table>`
          );
          offs.forEach((off) => {
            offsTable.insertAdjacentHTML(
              "beforeend",
              `  <tr>
            <td>${off.code}</td>
            <td>${off.percent}%</td>
            <td>${off.date}</td>
            <td>${off.adminID}</td>
            <td>${off.productID}</td>
            <td>  
            ${
              off.isAccept === 1
                ? `<button onclick='offRejectFunc(${JSON.stringify(
                    off
                  )})'>رد</button>`
                : `<button onclick='offAcceptFunc(${JSON.stringify(
                    off
                  )})'>تایید</button>`
            }
              <button onclick='showDeleteModal(${JSON.stringify(
                off
              )})'>حذف</button>
            </td>
          </tr>`
            );
          });
        });
    });
}

window.addEventListener("load", () => {
  fetch(`${mainUrl}offs`)
    .then((res) => res.json())
    .then((offs) => {
      console.log(offs);
      if (offs.length) {
        offsMain.insertAdjacentHTML(
          "beforeend",
          `
              <table class="cms-table offs-table">
          <tr>
            <th>کد تخفیف</th>
            <th>درصد تخفیف</th>
            <th>تاریخ ثبت</th>
            <th>ثبت شده توسط</th>
            <th>ساخته شده برای</th>
          </tr>
        </table>`
        );
        const offsTable = document.querySelector(".offs-table");
        offs.forEach((off) => {
          offsTable.insertAdjacentHTML(
            "beforeend",
            `  <tr>
            <td>${off.code}</td>
            <td>${off.percent}%</td>
            <td>${off.date}</td>
            <td>${off.adminID}</td>
            <td>${off.productID}</td>
            <td>
            ${
              off.isAccept === 1
                ? `<button onclick='offRejectFunc(${JSON.stringify(
                    off
                  )})'>رد</button>`
                : `<button onclick='offAcceptFunc(${JSON.stringify(
                    off
                  )})'>تایید</button>`
            }
              <button onclick='showDeleteModal(${JSON.stringify(
                off
              )})'>حذف</button>
            </td>
          </tr>`
          );
        });
      } else {
        offsMain.insertAdjacentHTML(
          "beforeend",
          `<div class="cms-empty-err">کد تحفیفی یافت نشد!</div>`
        );
      }
    });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideDeleteModal();
  }
});

deleteModalRejectBtn.addEventListener("click", hideDeleteModal);

deleteModalAcceptBtn.addEventListener("click", () => {
  fetch(`${mainUrl}offs/${globaloffID}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      hideDeleteModal();
      fetch(`${mainUrl}offs`)
        .then((res) => res.json())
        .then((offs) => {
          console.log(offs);
          const offsTable = document.querySelector(".offs-table");
          offsTable.innerHTML = "";
          offsTable.insertAdjacentHTML(
            "beforeend",
            `
              <table class="cms-table offs-table">
          <tr>
            <th>کد تخفیف</th>
            <th>درصد تخفیف</th>
            <th>تاریخ ثبت</th>
            <th>ثبت شده توسط</th>
            <th>ساخته شده برای</th>
          </tr>
        </table>`
          );
          offs.forEach((off) => {
            offsTable.insertAdjacentHTML(
              "beforeend",
              `  <tr>
            <td>${off.code}</td>
            <td>${off.percent}%</td>
            <td>${off.date}</td>
            <td>${off.adminID}</td>
            <td>${off.productID}</td>
            <td>
                ${
                  off.isAccept === 1
                    ? `<button onclick='offRejectFunc(${JSON.stringify(
                        off
                      )})'>رد</button>`
                    : `<button onclick='offAcceptFunc(${JSON.stringify(
                        off
                      )})'>تایید</button>`
                }
              <button onclick='showDeleteModal(${JSON.stringify(
                off
              )})'>حذف</button>
            </td>
          </tr>`
            );
          });
        });
    });
});
