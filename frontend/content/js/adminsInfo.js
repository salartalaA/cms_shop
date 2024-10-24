const adminProfileElem = document.querySelector("#admin-profile");
const adminInfoElem = document.querySelector("#admin-info");
const adminTaskElem = document.querySelector("#admin-task");

window.addEventListener("load", () => {
  let adminToken = localStorage.getItem("admin-token");
  let mainUrl = "http://localhost:4000/api/";

  fetch(`${mainUrl}admins`, {
    headers: {
      authorization: adminToken,
    },
  })
    .then((res) => res.json())
    .then((adminInfo) => {
      console.log(adminInfo);
      adminProfileElem.setAttribute("src", adminInfo[0].img);
      adminInfoElem.innerHTML = `${adminInfo[0].firstname} ${adminInfo[0].lastname}`;
      adminTaskElem.innerHTML = adminInfo[0].task;
    });
});
