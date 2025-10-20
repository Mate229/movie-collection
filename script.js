const addMovieBtn = document.querySelector(".add-new");
const dialogForm = document.querySelector("dialog");
const moviesContainer = document.querySelector("section");
const plusButton = document.querySelector(".add-new");

const movieForm = document.querySelector("form");
const titleInput = document.querySelector("#name");
const prodInput = document.querySelector("#producer");
const yearInput = document.querySelector("#year");
const statusInput = document.querySelector("#status");
const cancelFormButton = document.querySelector("#cancel");
const submitFormButton = document.querySelector("#submit");

const movieCollection = [];

function Movie(title, producer, year, watched) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.producer = producer;
    this.year = year;
    this.watched = watched;
};

function addMovieToCollection(title, producer, year, watched) {
    const movie = new Movie(title, producer, year, watched);
    movieCollection.push(movie);
};

Movie.prototype.toggleWatched = function() {
    if(this.watched === false) {
        this.watched = true;
    } else {
        this.watched = false;
    };
};

function displayMovie() {
    for(let movie of movieCollection) {
        if(document.querySelector(`[data-id="${movie.id}"]`) === null) {

            const card = document.createElement("div");
            card.setAttribute("data-id", movie.id);

            const movieTitle = document.createElement("h2");
            const movieProducer = document.createElement("h4");
            const movieYear = document.createElement("p");

            movieTitle.textContent = movie.title;
            movieProducer.textContent = `Prod by ${movie.producer}`;
            if(movie.year == 2025) {
                movieYear.textContent = `Released this year`;
            } else {
                movieYear.textContent = `Released in ${movie.year}`;
            };

            card.append(movieTitle, movieProducer, movieYear);

            const delMovie = document.createElement("button");
            delMovie.textContent = "❌";
            delMovie.setAttribute("title", "Delete movie")
            delMovie.addEventListener("click", () => {
                const confirmDelete = confirm(`Are you sure you want to delete ${movie.title} by ${movie.producer} ?`);
                if(!confirmDelete) {
                    return
                }

                card.remove();

                const movieIndex = movieCollection.findIndex(obj => obj.id === card.getAttribute("data-id"));
                if(movieIndex !== -1) {
                    movieCollection.splice(movieIndex, 1);
                };
                countMovie();
                alert(`${movie.title} by ${movie.producer} is removed successfully from your collection`)
            });
            card.appendChild(delMovie);

            let watchCount = 0;

            const markWatched = document.createElement("button");
            markWatched.textContent = `Mark Watched`;
            markWatched.addEventListener("click", () => {
                watchCount++;
                movie.toggleWatched();
                if(markWatched.textContent === `Mark Watched`) {
                    markWatched.textContent = `Watch again`;
                } else {
                    markWatched.textContent = `Mark Watched`;
                };

                watchTime.textContent = `Watched ${watchCount} time`;
            });
            card.appendChild(markWatched);
            const watchTime = document.createElement("p");
            card.appendChild(watchTime);

            moviesContainer.insertBefore(card, plusButton);
        };
    };
};

addMovieBtn.addEventListener("click", () => {
    dialogForm.showModal();
});

cancelFormButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialogForm.close();
});

submitFormButton.addEventListener("click", (e) => {
    if(titleInput.value === "" || prodInput.value === "" || yearInput.value === "") {
        return;
    } else {
        e.preventDefault();

        addMovieToCollection(titleInput.value, prodInput.value, yearInput.value, statusInput.checked);
        displayMovie();
        countMovie();

        alert(`The movie ${titleInput.value} by ${prodInput.value} is added to your collecion. Enjoy watching!`)

        movieForm.reset();

        dialogForm.close();
    };
});

const totalMovie = document.querySelector(".total");
function countMovie() {
    totalMovie.textContent = `${movieCollection.length}`
}