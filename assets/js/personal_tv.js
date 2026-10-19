const tv = document.getElementById("tv");
const tvContainer = document.getElementById("tv_container");

function updateTV(video_id) {
    //tv.src = `https://www.youtube.com/embed/${video_id}?autoplay=1&mute=1`;
    tv.src = `https://www.youtube.com/embed/${video_id}`;
    tvContainer.scrollIntoView({
        behavior: "instant",
        block: "start"
    });

}

function resetTV() {
    tv.src = "";
}