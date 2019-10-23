//////////////////FUNCIÓ PETICIÓ ///////////////////////

function httpGet(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(JSON.parse(xmlHttp.responseText));
        } else if (xmlHttp.readyState == 4) {
            error(xmlHttp.status);
        }
    }
    xmlHttp.open("GET", theUrl);
    xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xmlHttp.send();

};

///////////////// IMPRESIÓ TERCER BANNER ///////////////////

function error(status) {
    let banner1 = document.querySelector(".banner1__body");
    let banner2 = document.querySelector(".banner2__body");
    let banner3 = document.querySelector(".banner3__body");
    banner1.className = "banner banner1__body d-none";
    banner2.className = "banner banner2__body d-none";
    banner3.className = "banner banner3__body";
}

/////////////////////   CALLBACK 2      ///////////////////////

function imprimir(objRepo) {
    console.log(objRepo);
    for (i = 0; i < objRepo.length; i++) {
        let repo = objRepo[i];
        let tr = `<tr><th scope="row" class="table__row">${repo["name"]}</th><td class="w-100 text-right"><i class="fas fa-star"></i><span class="repo__likes"> ${repo["watchers_count"]} </span><i class="fas fa-code-branch"></i><span class="repo__forks">${objRepo[0]["forks_count"]}</span></td></tr>`

        document.querySelector("#tablaEspecial tbody").innerHTML += tr;
    }

};

//////////// CALLBACK 1 -> Aconsegueixo les dades de dins del primer link////////////

function getLink() {
    let userNameInput = document.querySelector(".user__input1");
    let userName = userNameInput.value;
    let link = `https://api.github.com/users/${userName}`;
    httpGet(link, getUser)
};

function getUser(objJSON) {
    let userNameInput = document.querySelector(".user__input1");
    let userName = userNameInput.value;

    let imgCard = document.querySelector(".card__img");
    let userCard = document.querySelector(".card__username");
    let userTitle = document.querySelector(".card__title");
    let cardBio = document.querySelector(".card__bio");

    imgCard.src = objJSON["avatar_url"];
    userCard.innerHTML = `@${objJSON["login"]}`;
    userTitle.innerHTML = objJSON["name"];
    cardBio.innerHTML = objJSON["bio"];

    let userLink = `https://api.github.com/users/${userName}/repos`;
    httpGet(userLink, imprimir);
};


/////////////// EVENT LISTENER //////////////////
//////////////////// BOTÓ 1 /////////////////////


let botonEnviar1 = document.querySelector(".send__button1");
botonEnviar1.addEventListener("click", () => {
    getLink()
    let banner1 = document.querySelector(".banner1__body");
    let banner2 = document.querySelector(".banner2__body");
    banner1.className = "banner banner1__body d-none";
    banner2.className = "banner banner2__body";
});

let botonEnviar3 = document.querySelector(".send__button3");
botonEnviar3.addEventListener("click", () => {
    let banner1 = document.querySelector(".banner1__body");
    let banner3 = document.querySelector(".banner3__body");
    banner1.className = "banner banner1__body";
    banner3.className = "banner banner3__body d-none";
});


////////////////// BOTÓ 2 /////////////////////
function ereseValue() {
    let userNameInput = document.querySelector(".user__input1");
    userNameInput.value = null;
}

function ereseData() {
    document.querySelector("#tablaEspecial tbody").innerHTML = null;
};


let botonEnviar2 = document.querySelector(".send__button2");
botonEnviar2.addEventListener("click", () => {
    ereseValue();
    let banner1 = document.querySelector(".banner1__body");
    let banner2 = document.querySelector(".banner2__body");
    banner1.className = "banner banner1__body";
    banner2.className = "banner banner2__body d-none";
    ereseData();
});