let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");
let btns = document.querySelectorAll(".buttons button");

function removeClassActive() {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
}

function nextUser() {
  if (i < 10) {
    i++;
    getResponse();
    removeClassActive();
    nextBtn.classList.add("active");
  } else {
    nextBtn.classList.add("disabled");
    return false;
  }
}

function previousUser() {
  if (i > 1) {
    i--;

    getResponse();
    removeClassActive();
    previousBtn.classList.add("active");
  } else {
    previousBtn.classList.add("disabled");
    return false;
  }
}
let i = 1;

function getUsers(url) {
  return new Promise((resolve) => {
    fetch(url).then((response) => {
      resolve(response.json());
    });
  });
}

function getResponse() {
  getUsers(`https://jsonplaceholder.typicode.com/users/${i}`)
    .then((data) => {
      let Name = data.name;
      let userName = data.username;
      let userEmail = data.email;
      let userAddressStreet = data.address.street;
      let userAddressSuite = data.address.suite;
      let city = data.address.city;
      let zipcode = data.address.zipcode;
      let phoneNumber = data.phone;
      let webSite = data.website;
      let companyName = data.company.name;
      let companyPhrase = data.company.catchPhrase;
      let companyBs = data.company.bs;

      let card = document.querySelector(".card");

      card.innerHTML = `
                        <h2 class="name"> ${Name}</h2>
                        <p class="userName"><span>userName</span> : ${userName}</p>
                        <p class="userEmail"><span>Email :</span>   ${userEmail}</p>
                        <p class=" userAddressStreet"><span>street :</span> ${userAddressStreet}</p>
                        <p class=" userAddressSuite"><span>suite :</span> ${userAddressSuite}</p>
                        <p class="city">  <span>city :</span>${city}</p>
                        <p class="zipcode"> <span>zipcode:</span> ${zipcode}</p>
                        <p class="zipcode"> <span>phone number:</span> ${phoneNumber}</p>
                        <p class="zipcode"> <span>web site:</span> <a href="http://www.${webSite}" target ="blank" > visit website</a></p>
                        <p class="zipcode"> <span>company:</span> ${companyName}</p>
                        <p class="zipcode"> <span>phrase:</span> ${companyPhrase}</p>
                        <p class="zipcode"> <span>bs:</span> ${companyBs}</p>
        `;
      return getUsers(`https://jsonplaceholder.typicode.com/posts`);
    })
    .then((data) => {
      let posts = document.querySelector(".posts");

      data.filter((post) => {
        if (post.userId === i) {
          let postId = post.id;
          let postTitle = post.title;
          let postBody = post.body;
          let postDiv = document.createElement("div");
          postDiv.className = "post";
          postDiv.innerHTML = ` 
             <span>${postId}</span> 
             <h3 class="title">${postTitle}</h3>
             <p class="postContent">${postBody}</p>`;
          posts.append(postDiv);
        }
      });
    })

    .catch((error) => {
      console.log(error);
    });
}
getResponse();
nextBtn.onclick = nextUser;
previousBtn.onclick = previousUser;
