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
        
    return(url.split(" "))
}

function getRandomMember(members) {
    return members[Math.floor(Math.random() * members.length)].member;
}

function getFakeSortingList(members) {
    const numberOfMembers = Math.floor(members.length / 5);
    const list = [];

    let i = 0;
    while(numberOfMembers > i) {
        list.push(getRandomMember(members));
        i++;
    }

    return list;
}

function renderFakeWinner(member) {
    document.getElementById("teste").innerHTML =  'Sorteando...';
    document.getElementById("photo").classList.add("blured");

    renderMember(member);
}

function renderWinner(member) {
    document.getElementById("teste").innerHTML = member['name'];
    document.getElementById("photo").classList.remove("blured");

    renderMember(member);
}

function renderMember(member) {
    const { photo = { photo_link: '0.png.png' } } = member;

    document.getElementById("photo").src = photo.photo_link
    document.getElementById("photo").height = "200"
    document.getElementById("photo").width = "200"
}

async function renderFakeSort(list) {
    const { length } = list;
    const timeout = Math.floor(4000 / length);

    for (let i = 0; i < list.length; i++) {
        await promisefyFakeSorting(list[i], timeout);
    }
}

function promisefyFakeSorting(member, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            renderFakeWinner(member);
            resolve();
        }, timeout)
    });
}

async function sort(){
    url = filterUrl(document.getElementById("event").value)
    const members = makeRequest(url[0], url[1])

    const fakeSortingList = getFakeSortingList(members);
    const winner = getRandomMember(members);

    await renderFakeSort(fakeSortingList);
    renderWinner(winner)
}
