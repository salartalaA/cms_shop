const commentsMain = document.querySelector(".cms-main");
const detailsModal = document.querySelector("#details-modal");
const detailsModalCloseBtn = document.querySelector(".text-modal-close-btn");
const commentBodyElem = document.querySelector("#comment-body");
const answerEditModal = document.querySelector("#answer-edit-modal");
const answerEditModalTextArea = document.querySelector(
  "#answer-edit-modal-textarea"
);
const answerEditSubmitBtn = document.querySelector(".answer-submit-btn");

const deleteModalElem = document.querySelector("#delete-modal");

const deleteModalRejectBtn = document.querySelector(".delete-modal-reject-btn");

const deleteModalBtn = document.querySelector(".delete-modal-accept-btn");

let answerEditModalMode = null;
let globalCommentID = null;
let mainUrl = "http://localhost:4000/api/";

function showDetailsModal(commentBody) {
  detailsModal.classList.add("active");
  commentBodyElem.innerHTML = commentBody;
}

function hideDetailsModal() {
  detailsModal.classList.remove("active");
}

function showEditModal(commentInfo) {
  answerEditModalMode = "edit";
  globalCommentID = commentInfo.id;
  console.log(commentInfo);
  answerEditModal.classList.add("active");
  answerEditSubmitBtn.innerHTML = "ویرایش نظر کاربر";
  answerEditModalTextArea.value = commentInfo.body;
}

function hideAnswerEditModal() {
  answerEditModal.classList.remove("active");
  answerEditModalTextArea.value = "";
}

function showAnswerModal(commentInfo) {
  answerEditModalMode = "close";
  answerEditSubmitBtn.innerHTML = "بستن ESC";
  answerEditModal.classList.add("active");
  let AnswerCommentID = commentInfo.id;
  fetch(`${mainUrl}comments/replay/${AnswerCommentID}`)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      answerEditModalTextArea.value = result[0].body;
    });
}

function showDeleteModal(commentID) {
  deleteModalElem.classList.add("active");
  globalCommentID = commentID;
  console.log(globalCommentID);
}

function hideDeleteModal() {
  deleteModalElem.classList.remove("active");
}

function commentAcceptFunc(commentInfo) {
  globalCommentID = commentInfo.id;
  console.log(commentInfo);
  console.log(globalCommentID);
  let isAccept = 1;
  fetch(`${mainUrl}comments/${globalCommentID}/${isAccept}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      fetch(`${mainUrl}comments`)
        .then((res) => res.json())
        .then((comments) => {
          console.log(comments);

          const commentsTable = document.querySelector(".comments-table");

          commentsTable.innerHTML = "";

          commentsTable.insertAdjacentHTML(
            "beforeend",
            `<table class="cms-table">
          <tr>
            <th>نام کاربر</th>
            <th>محصول</th>
            <th>کامنت</th>
            <th>تاریخ</th>
            <th>ساعت</th>
          </tr>
        </table>`
          );
          comments.forEach((comment) => {
            if (comment.isReplay === 0) {
              commentsTable.insertAdjacentHTML(
                "beforeend",
                `<tr>
            <td>${comment.userID}</td>
            <td>${comment.productID}</td>
            <td>
              <button onclick='showDetailsModal(${JSON.stringify(
                comment.body
              )})'>دیدن متن</button>
            </td>
            <td>${comment.date}</td>
            <td>${comment.hour}</td>
            <td>
              <button onclick="showDeleteModal(${comment.id})">حذف</button>
            
           ${
             comment.isAccept === 1
               ? `<button onclick='commentRejectFunc(${JSON.stringify(
                   comment
                 )})'>رد</button>`
               : `<button onclick='commentAcceptFunc(${JSON.stringify(
                   comment
                 )})'>تایید</button>`
           }
              <button onclick='showAnswerModal(${JSON.stringify(
                comment
              )})'>دیدن پاسخ</button>
              <button onclick='showEditModal(${JSON.stringify(
                comment
              )})'>ویرایش</button>
            </td>
          </tr>`
              );
            }
          });
        });
    });
}

function commentRejectFunc(commentInfo) {
  globalCommentID = commentInfo.id;
  console.log(commentInfo);
  console.log(globalCommentID);
  let isAccept = 0;
  fetch(`${mainUrl}comments/${globalCommentID}/${isAccept}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      fetch(`${mainUrl}comments`)
        .then((res) => res.json())
        .then((comments) => {
          console.log(comments);

          const commentsTable = document.querySelector(".comments-table");

          commentsTable.innerHTML = "";

          commentsTable.insertAdjacentHTML(
            "beforeend",
            `<table class="cms-table">
          <tr>
            <th>نام کاربر</th>
            <th>محصول</th>
            <th>کامنت</th>
            <th>تاریخ</th>
            <th>ساعت</th>
          </tr>
        </table>`
          );
          comments.forEach((comment) => {
            if (comment.isReplay === 0) {
              commentsTable.insertAdjacentHTML(
                "beforeend",
                `<tr>
            <td>${comment.userID}</td>
            <td>${comment.productID}</td>
            <td>
              <button onclick='showDetailsModal(${JSON.stringify(
                comment.body
              )})'>دیدن متن</button>
            </td>
            <td>${comment.date}</td>
            <td>${comment.hour}</td>
            <td>
              <button onclick="showDeleteModal(${comment.id})">حذف</button>
            
             ${
               comment.isAccept === 1
                 ? `<button onclick='commentRejectFunc(${JSON.stringify(
                     comment
                   )})'>رد</button>`
                 : `<button onclick='commentAcceptFunc(${JSON.stringify(
                     comment
                   )})'>تایید</button>`
             }
              <button onclick='showAnswerModal(${JSON.stringify(
                comment
              )})'>دیدن پاسخ</button>
              <button onclick='showEditModal(${JSON.stringify(
                comment
              )})'>ویرایش</button>
            </td>
          </tr>`
              );
            }
          });
        });
    });
}

window.addEventListener("load", () => {
  fetch(`${mainUrl}comments`)
    .then((res) => res.json())
    .then((comments) => {
      console.log(comments);
      if (comments.length) {
        commentsMain.insertAdjacentHTML(
          "beforeend",
          `<table class="cms-table comments-table">
          <tr>
            <th>نام کاربر</th>
            <th>محصول</th>
            <th>کامنت</th>
            <th>تاریخ</th>
            <th>ساعت</th>
          </tr>
        </table>`
        );
        const commentsTable = document.querySelector(".cms-table");
        comments.forEach((comment) => {
          if (comment.isReplay === 0) {
            commentsTable.insertAdjacentHTML(
              "beforeend",
              `<tr>
            <td>${comment.userID}</td>
            <td>${comment.productID}</td>
            <td>
              <button onclick='showDetailsModal(${JSON.stringify(
                comment.body
              )})'>دیدن متن</button>
            </td>
            <td>${comment.date}</td>
            <td>${comment.hour}</td>
            <td>
              <button onclick="showDeleteModal(${comment.id})">حذف</button>
              ${
                comment.isAccept === 1
                  ? `<button onclick='commentRejectFunc(${JSON.stringify(
                      comment
                    )})'>رد</button>`
                  : `<button onclick='commentAcceptFunc(${JSON.stringify(
                      comment
                    )})'>تایید</button>`
              }
              <button onclick='showAnswerModal(${JSON.stringify(
                comment
              )})'>دیدن پاسخ</button>
              <button onclick='showEditModal(${JSON.stringify(
                comment
              )})'>ویرایش</button>
            </td>
          </tr>`
            );
          }
        });
      } else {
        commentsMain.insertAdjacentHTML(
          "beforeend",
          `
        <div class="cms-empty-err">کامنتی یافت نشد!</div>`
        );
      }
    });
});

window.addEventListener("click", (event) => {
  if (event.target.id === "details-modal") {
    hideDetailsModal();
  }
  if (event.target.id === "answer-edit-modal") {
    hideAnswerEditModal();
  }
  if (event.target.id === "delete-modal") {
    hideDeleteModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideDetailsModal();
    hideAnswerEditModal();
    hideDeleteModal();
  }
});

detailsModalCloseBtn.addEventListener("click", () => {
  hideDetailsModal();
});

answerEditSubmitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (answerEditModalMode === "edit") {
    let commentUpdateObj = {
      body: answerEditModalTextArea.value,
    };

    fetch(`${mainUrl}comments/${globalCommentID}`, {
      method: "PUT",
      body: JSON.stringify(commentUpdateObj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        hideAnswerEditModal();
        fetch(`${mainUrl}comments`)
          .then((res) => res.json())
          .then((comments) => {
            console.log(comments);

            const commentsTable = document.querySelector(".comments-table");

            commentsTable.innerHTML = "";

            commentsTable.insertAdjacentHTML(
              "beforeend",
              `<table class="cms-table">
          <tr>
            <th>نام کاربر</th>
            <th>محصول</th>
            <th>کامنت</th>
            <th>تاریخ</th>
            <th>ساعت</th>
          </tr>
        </table>`
            );
            comments.forEach((comment) => {
              if (comment.isReplay === 0) {
                commentsTable.insertAdjacentHTML(
                  "beforeend",
                  `<tr>
            <td>${comment.userID}</td>
            <td>${comment.productID}</td>
            <td>
              <button onclick='showDetailsModal(${JSON.stringify(
                comment.body
              )})'>دیدن متن</button>
            </td>
            <td>${comment.date}</td>
            <td>${comment.hour}</td>
            <td>
              <button onclick="showDeleteModal(${comment.id})">حذف</button>
             ${
               comment.isAccept === 1
                 ? `<button onclick='commentRejectFunc(${JSON.stringify(
                     comment
                   )})'>رد</button>`
                 : `<button onclick='commentAcceptFunc(${JSON.stringify(
                     comment
                   )})'>تایید</button>`
             }
              <button onclick='showAnswerModal(${JSON.stringify(
                comment
              )})'>دیدن پاسخ</button>
              <button onclick='showEditModal(${JSON.stringify(
                comment
              )})'>ویرایش</button>
            </td>
          </tr>`
                );
              }
            });
          });
      });
  }
});

deleteModalBtn.addEventListener("click", (event) => {
  event.preventDefault();
  fetch(`${mainUrl}comments/${globalCommentID}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      hideDeleteModal();
      fetch(`${mainUrl}comments`)
        .then((res) => res.json())
        .then((comments) => {
          console.log(comments);

          const commentsTable = document.querySelector(".comments-table");

          commentsTable.innerHTML = "";

          commentsTable.insertAdjacentHTML(
            "beforeend",
            `<table class="cms-table">
          <tr>
            <th>نام کاربر</th>
            <th>محصول</th>
            <th>کامنت</th>
            <th>تاریخ</th>
            <th>ساعت</th>
          </tr>
        </table>`
          );
          comments.forEach((comment) => {
            if (comment.isReplay === 0) {
              commentsTable.insertAdjacentHTML(
                "beforeend",
                `<tr>
            <td>${comment.userID}</td>
            <td>${comment.productID}</td>
            <td>
              <button onclick='showDetailsModal(${JSON.stringify(
                comment.body
              )})'>دیدن متن</button>
            </td>
            <td>${comment.date}</td>
            <td>${comment.hour}</td>
            <td>
              <button onclick="showDeleteModal(${comment.id})">حذف</button>
           
              ${
                comment.isAccept === 1
                  ? `<button onclick='commentRejectFunc(${JSON.stringify(
                      comment
                    )})'>رد</button>`
                  : `<button onclick='commentAcceptFunc(${JSON.stringify(
                      comment
                    )})'>تایید</button>`
              }
              <button onclick='showAnswerModal(${JSON.stringify(
                comment
              )})'>دیدن پاسخ</button>
              <button onclick='showEditModal(${JSON.stringify(
                comment
              )})'>ویرایش</button>
            </td>
          </tr>`
              );
            }
          });
        });
    });
});

deleteModalRejectBtn.addEventListener("click", hideDeleteModal);
