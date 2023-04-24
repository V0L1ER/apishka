const app = document.getElementById("app");

async function fetchQ() {
  const users = await fetch(
    "https://api.unsplash.com/photos/?client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9&page=1"
  );
  const json = await users.json();
  return json;
}

async function main() {
  const gUsers = await fetchQ();
  createListHTML(gUsers);
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
  const div = document.querySelectorAll(".names");
  const img = document.createElement("img");
  const app = document.querySelector("#app");
  const arrow = document.querySelector("#arrowleft");
  const titletext = document.querySelector(".titletext");
  const imgRegularArr = users.map((user) => user.urls.regular);
  const namesArr = users.map((user) => user.user.name);

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
    location.reload();
  });
  app.appendChild(img);
}

main();
