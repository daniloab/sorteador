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

function sortMember(){
    url = filterUrl(document.getElementById("event").value)
    console.log(url)
    const members = makeRequest(url[0], url[1])
    random_number = Math.floor(Math.random() * members.length);
    document.getElementById("teste").innerHTML = members[random_number]['member']['name'];
    document.getElementById("photo").src = members[random_number]['member']['photo']['photo_link']
    document.getElementById("photo").height = "200"
    document.getElementById("photo").width = "200"
}