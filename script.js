// declare APi
const api = {
    base: "https://api.lyrics.ovh"
}
const output = document.getElementById('output');
const getLyric = document.getElementById('getLyrics');
//search button handler
const searchbtn = document.getElementById('searchbtn').addEventListener('click',
    function () {
        const searchName = document.getElementById('searchName').value.trim();
        if (!searchName) {
            alert("input valid song name")
        }
        else {
            getResults(searchName);
        }
    }
)


function getResults(query) {
    fetch(`${api.base}/suggest/${query}`)
        .then(res => res.json())
        .then(data => displayResult(data))

}


function displayResult(data) {

    for (let i = 0; i < 10; i++) {
        const element = data.data[i];
        const title = element.album.title;

        const artist = element.artist.name;
        output.classList.add("search-result", "col-md-8", "mx-auto", "py-4")

        const child = ` <div class="single-result row align-items-center my-3 p-3"> <div class="col-md-9"> <h3 class="lyrics-name">${title}</h3>- <p class="author lead">Album by <span>${artist}</span></p>
    </div>
    <div class="col-md-3 text-md-right text-center">
    <button data-artist="${artist}" data-songtitle="${title}" class="btn  btn-success">Get Lyrics</button>
                   
    </div> 
    </div>
    </div>
        `
        output.innerHTML += child;
    }

    output.addEventListener('click', e => {
        const clickedElement = e.target;

        if (clickedElement.tagName === 'BUTTON') {
            const artist = clickedElement.getAttribute('data-artist');
            const songTitle = clickedElement.getAttribute('data-songtitle');
            getLyrics(artist, songTitle)
        }

    })
    async function getLyrics(artist, songTitle) {
        const res = await fetch(`${api.base}/v1/${artist}/${songTitle}`);
        const data = await res.json();
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

        getLyric.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
             <p>${lyrics}</p>`;

    }
}

