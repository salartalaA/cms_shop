const detailsModal = document.querySelector("#details-modal");
const deleteModal = document.querySelector("#delete-modal");
const deleteModalRejectBtn = document.querySelector(".delete-modal-reject-btn");
const deleteModalAcceptBtn = document.querySelector(".delete-modal-accept-btn");
const editUserInfoSubmit = document.querySelector(".edit-user-info-submit");
const updateModal = document.querySelector("#update-modal");

const userCityTd = document.querySelector("#user-city-td");
const userBuyTd = document.querySelector("#user-buy-td");
const userScoreTd = document.querySelector("#user-score-td");
let globalUserID = null;
let mainUrl = "http://localhost:4000/api/";

const updateModalFirstnameInput = document.querySelector(
  "#update-modal-firstname-input"
);
const updateModalLastnameInput = document.querySelector(
  "#update-modal-lastname-input"
);
const updateModalUsernameInput = document.querySelector(
  "#update-modal-username-input"
);

const updateModalPasswordInput = document.querySelector(
  "#update-modal-password-input"
);
const updateModalPhoneInput = document.querySelector(
  "#update-modal-phone-input"
);
const updateModalEmailInput = document.querySelector(
  "#update-modal-email-input"
);
const updateModalCityInput = document.querySelector("#update-modal-city-input");
const updateModalBuyInput = document.querySelector("#update-modal-buy-input");
const updateModalScoreInput = document.querySelector(
  "#update-modal-score-input"
);

function showDetailsModal(userInfo) {
  globalUserID = userInfo.id;
  detailsModal.classList.add("active");
  userCityTd.innerHTML = userInfo.city;
  userBuyTd.innerHTML = userInfo.buy;
  userScoreTd.innerHTML = userInfo.score;
}

function hideDetailsModal() {
  detailsModal.classList.remove("active");
}

function showDeleteModal(userInfo) {
  globalUserID = userInfo.id;
  deleteModal.classList.add("active");
}

function hideDeleteModal() {
  deleteModal.classList.remove("active");
}

function showUpdateModal(userInfo) {
  globalUserID = userInfo.id;
  updateModal.classList.add("active");

  updateModalFirstnameInput.value = userInfo.firstname;
  updateModalLastnameInput.value = userInfo.lastname;
  updateModalUsernameInput.value = userInfo.username;
  updateModalPasswordInput.value = userInfo.password;
  updateModalPhoneInput.value = userInfo.phone;
  updateModalEmailInput.value = userInfo.email;
  updateModalCityInput.value = userInfo.city;
  updateModalBuyInput.value = userInfo.buy;
  updateModalScoreInput.value = userInfo.score;
}

function hideUpdateModal() {
  updateModal.classList.remove("active");
}

window.addEventListener("load", () => {
  fetch(`${mainUrl}users`)
    .then((res) => res.json())
    .then((users) => {
      console.log(users);
      const usersWrapper = document.querySelector(".cms-main");
      if (users.length) {
        usersWrapper.insertAdjacentHTML(
          "beforeend",
          `<table class="cms-table users-table">
          <tr>
            <th>نام و نام خانوادگی</th>
            <th>یوزرنیم</th>
            <th>رمز عبور</th>
            <th>شماره تماس</th>
            <th>ایمیل</th>
          </tr>
        </table>`
        );
        const usersTableElem = document.querySelector(".users-table");
        users.forEach((user) => {
          usersTableElem.insertAdjacentHTML(
            "beforeend",
            `<tr>
              <td>${user.firstname} ${user.lastname}</td>
              <td>${user.username}</td>
              <td>${user.password}</td>
              <td>${user.phone}</td>
              <td>${user.email}</td>
              <td>
                <button onclick='showDeleteModal(${JSON.stringify(
                  user
                )})'>حذف</button>
                <button onclick='showDetailsModal(${JSON.stringify(
                  user
                )})'>جزییات</button>
                <button onclick='showUpdateModal(${JSON.stringify(
                  user
                )})'>ویرایش</button>
              </td>
            </tr>`
          );
        });
      } else {
        usersWrapper.insertAdjacentHTML(
          "beforeend",
          `<div class="cms-empty-err">کاربری یافت نشد!</div>`
        );
      }
    });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideDetailsModal();
    hideDeleteModal();
    hideUpdateModal();
  }
});

deleteModalRejectBtn.addEventListener("click", hideDeleteModal);

deleteModalAcceptBtn.addEventListener("click", () => {
  fetch(`${mainUrl}users/${globalUserID}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      hideDeleteModal();
      fetch(`${mainUrl}users`)
        .then((res) => res.json())
        .then((users) => {
          console.log(users);

          const usersTableElem = document.querySelector(".users-table");

          usersTableElem.innerHTML = "";

          usersTableElem.insertAdjacentHTML(
            "beforeend",
            ` <tr>
            <th>نام و نام خانوادگی</th>
            <th>یوزرنیم</th>
            <th>رمز عبور</th>
            <th>شماره تماس</th>
            <th>ایمیل</th>
          </tr>`
          );

          users.forEach((user) => {
            usersTableElem.insertAdjacentHTML(
              "beforeend",
              `<tr>
              <td>${user.firstname} ${user.lastname}</td>
              <td>${user.username}</td>
              <td>${user.password}</td>
              <td>${user.phone}</td>
              <td>${user.email}</td>
              <td>
                <button onclick='showDeleteModal(${JSON.stringify(
                  user
                )})'>حذف</button>
                <button onclick='showDetailsModal(${JSON.stringify(
                  user
                )})'>جزییات</button>
                <button onclick='showUpdateModal(${JSON.stringify(
                  user
                )})'>ویرایش</button>
              </td>
            </tr>`
            );
          });
        });
    });
});

editUserInfoSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  let mainUserNewInfos = {
    firstname: updateModalFirstnameInput.value,
    lastname: updateModalLastnameInput.value,
    username: updateModalUsernameInput.value,
    password: updateModalPasswordInput.value,
    phone: updateModalPhoneInput.value,
    city: updateModalCityInput.value,
    email: updateModalEmailInput.value,
    score: updateModalScoreInput.value,
    buy: updateModalBuyInput.value,
  };
  fetch(`${mainUrl}users/${globalUserID}`, {
    method: "PUT",
    body: JSON.stringify(mainUserNewInfos),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      hideUpdateModal();
      fetch(`${mainUrl}users`)
        .then((res) => res.json())
        .then((users) => {
          console.log(users);

          const usersTableElem = document.querySelector(".users-table");

          usersTableElem.innerHTML = "";

          usersTableElem.insertAdjacentHTML(
            "beforeend",
            ` <tr>
            <th>نام و نام خانوادگی</th>
            <th>یوزرنیم</th>
            <th>رمز عبور</th>
            <th>شماره تماس</th>
            <th>ایمیل</th>
          </tr>`
          );

          users.forEach((user) => {
            usersTableElem.insertAdjacentHTML(
              "beforeend",
              `<tr>
              <td>${user.firstname} ${user.lastname}</td>
              <td>${user.username}</td>
              <td>${user.password}</td>
              <td>${user.phone}</td>
              <td>${user.email}</td>
              <td>
                <button onclick='showDeleteModal(${JSON.stringify(
                  user
                )})'>حذف</button>
                <button onclick='showDetailsModal(${JSON.stringify(
                  user
                )})'>جزییات</button>
                <button onclick='showUpdateModal(${JSON.stringify(
                  user
                )})'>ویرایش</button>
              </td>
            </tr>`
            );
          });
        });
    });
});
