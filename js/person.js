function makeRequest(event, id){
    const Http = new XMLHttpRequest();
    const url='https://api.meetup.com/'+event+'/events/'+id+'/attendance?access_token=4c6be9c3a21d7722b50fa173a0e53d40';
    Http.open("GET", url, false);
    Http.send();
    return JSON.parse(Http.responseText)
}

function filterUrl(url){
    if (url == '') {
        M.toast({html: 'Ooops, parece que vc se esqueceu de colar o link do evento!', classes: 'rounded'});
    } else {
        url = url.replace('https://www.meetup.com', '')
        url = url.replace('/events/',' ')
        url = url.substring(0, url.length - 1)}
        console.log(url)
    return(url.split(" "))
}

function getRandomMember(members) {
    return members[Math.floor(Math.random() * members.length)];
}

function getSortingList(members) {
    const numberOfMembers = Math.floor(members.length / 10);
    const sortingList = [];

    let i = 0;
    while(numberOfMembers > i) {
        sortingList.push(getRandomMember(members));
        i++;
    }

    return sortingList;
}

function renderWinner(member) {
    const { photo = { photo_link: '0.png.png' } } = member;

    document.getElementById("teste").innerHTML = member['name'];
    document.getElementById("photo").src = photo.photo_link
    document.getElementById("photo").classList.remove("blured");
    document.getElementById("photo").height = "200"
    document.getElementById("photo").width = "200"
}

function renderMember(member) {
    const { photo = { photo_link: '0.png.png' } } = member;

    document.getElementById("teste").innerHTML =  'Sorteando...';
    document.getElementById("photo").src = photo.photo_link
    document.getElementById("photo").classList.add("blured");
    document.getElementById("photo").height = "200"
    document.getElementById("photo").width = "200"
}

async function renderSort(){
    url = filterUrl(document.getElementById("event").value)
    const members = makeRequest(url[0], url[1])

    const sortingList = getSortingList(members);
    const winner = getRandomMember(members);

    const { length } = sortingList;

    const timeout = Math.floor(3000 / length);

    for (let i = 0; i < sortingList.length; i++) {
        await promisefySorting(sortingList[i].member, timeout);
    }

    renderWinner(winner.member)
}

function promisefySorting(member, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            renderMember(member);
            resolve();
        }, timeout)
    });
}