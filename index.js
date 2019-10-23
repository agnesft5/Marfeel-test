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


function getUser(objJSON) {
    let userNameInput = document.querySelector(".user__input1");
    let userName = userNameInput.value;

    let imgCard = document.querySelector(".card__img");
    let userCard = document.querySelector(".card__username");
    let userTitle = document.querySelector(".card__title");
    let cardBio = document.querySelector(".card__bio");

    imgCard.src =objJSON["avatar_url"];
    userCard.innerHTML =`@${objJSON["login"]}`;
    userTitle.innerHTML =objJSON["name"];
    cardBio.innerHTML = objJSON["bio"];

    let userLink = `https://api.github.com/users/${userName}/repos`;
    httpGet(userLink, imprimir);
};


//////////// CALLBACK 1 -> Aconsegueixo les dades de dins del primer link////////////

function getLink() {
    let userNameInput = document.querySelector(".user__input1");
    let userName = userNameInput.value;
    let link = `https://api.github.com/users/${userName}`;
    httpGet(link, getUser)
};

function imprimir(objRepo) {
    console.log(objRepo);
    let likes = document.querySelector(".repo__likes");
    let forks = document.querySelector(".repo__forks");
    for (i=0; i<objRepo.length;i++){
        let repo = objRepo[i];
        let tr = `<tr><th scope="row" class="table__row">${repo["name"]}</th><td class="w-100 text-right"><i class="fas fa-star"></i><span class="repo__likes"> ${repo["watchers_count"]} </span><i class="fas fa-code-branch"></i><span class="repo__forks">${objRepo[0]["forks_count"]}</span></td></tr>`

        document.querySelector("#tablaEspecial tbody").innerHTML += tr;
    }

};


//////////////////// EVENT LISTENER /////////////////////


let botonEnviar1 = document.querySelector(".send__button1");
botonEnviar1.addEventListener("click", () => {
    getLink()
    let banner1 = document.querySelector(".banner1__body");
    let banner2 = document.querySelector(".banner2__body");  
    banner1.className = "banner banner1__body d-none";
    banner2.className = "banner banner2__body";
});

