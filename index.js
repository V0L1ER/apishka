const app = document.getElementById("app");

async function fetchQ(countPage) {
  const users = await fetch(
    `https://api.unsplash.com/photos/?client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9&page=${
      countPage === undefined ? "1" : countPage
    }`
  );
  const json = await users.json();
  return json;
}

async function main(Page) {
  const gUsers = await fetchQ(Page);
  createListHTML(gUsers);
  paginationHTML();
}

function createListHTML(users) {
  const namesArr = users.map((user) => user.user.username);
  const profImageArr = users.map((user) => user.user.profile_image.medium);
  const id = users.map((user) => user.user.id);

  namesArr.forEach((item, index) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = profImageArr[index];
    img.classList.add("profileImg");
    div.classList.add("names");
    div.id = id[index];
    div.textContent = item;
    app.appendChild(div);
    div.appendChild(img);

    div.addEventListener("click", () => openUserProfile(users, index));
  });
}

function openUserProfile(users, index) {
  const paginateEl = document.querySelector(".paginateList");
  const div = document.querySelectorAll(".names");
  const img = document.createElement("img");
  const app = document.querySelector("#app");
  const arrow = document.querySelector("#arrowleft");
  const titletext = document.querySelector(".titletext");
  const imgRegularArr = users.map((user) => user.urls.regular);
  const namesArr = users.map((user) => user.user.name);

  paginateEl.remove();

  div.forEach((item) => {
    item.classList.remove("names");
    item.classList.add("hide");
  });
  arrow.classList.remove("hide");
  arrow.classList.add("arrowblock");
  titletext.style["justify-content"] = "flex-start";
  titletext.textContent = namesArr[index];
  img.src = imgRegularArr[index];
  img.classList.add("imgRegular");
  arrow.addEventListener("click", () => {
    const imgRegular = document.querySelector(".imgRegular");
    imgRegular.remove();
    const div = document.querySelectorAll(".hide");
    div.forEach((item) => {
      item.classList.add("names");
      item.classList.remove("hide");
    });
    const paginateEl = document.createElement("div");
    paginateEl.classList.add("paginateList");
    paginationHTML();
    const titletext = document.querySelector(".titletext");
    titletext.textContent = "Users List";
  });
  app.appendChild(img);
}

function paginationHTML() {
  const pagesNums = Array.from(Array(10), (_, i) => i + 1);
  const app = document.querySelector("#app");
  const divPaginate = document.createElement("div");
  divPaginate.classList.add("paginateList");

  pagesNums.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    div.classList.add("paginateElement");
    div.addEventListener("click", () => {
      main(item);
    });
    divPaginate.appendChild(div);
  });
  divPaginate.addEventListener("click", () => {
    const namesElements = document.querySelectorAll(".names");
    const paginateEl = document.querySelector(".paginateList");
    namesElements.forEach((el) => el.remove());
    paginateEl.remove();
  });

  app.appendChild(divPaginate);
}

main();
