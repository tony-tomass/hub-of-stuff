const lightbox = document.getElementById('lightbox');
const comicPage = document.getElementById('comic-pg');
const pgNumDisplay = document.getElementById('pg-number');
const pgNumDisplayBot = document.getElementById('pg-number-bot');
const loadedPages = Array.from(document.querySelectorAll('.loaded-pg')); // Convert to Array to use index

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

function updateReader(index) {
    currentIndex = index;
    console.log(currentIndex)

    const currentPg = loadedPages[currentIndex];
    comicPage.src = currentPg.src;
    
	pgNumDisplay.textContent = `${currentIndex + 1} / ${loadedPages.length}`;
    pgNumDisplayBot.textContent = `${currentIndex + 1} / ${loadedPages.length}`;
}

console.log(loadedPages.length);
updateReader(currentIndex);

// Navigation Click Events
// prevBtn.addEventListener('click', (e) => {
//     if (currentIndex > 0) {
//         updateReader(currentIndex - 1);
//     }
// });

// nextBtn.addEventListener('click', (e) => {
//     if (currentIndex < loadedPages.length-1) {
//         updateReader(currentIndex + 1);
//     }
// });

function changePage(direction) {
    // Checks if your 
    if ((direction == -1 && currentIndex == 0) || (direction == 1 && currentIndex == loadedPages.length-1)) {
        return;
    };
    currentIndex += direction;
    updateReader(currentIndex);
	// 1 to go to next page, -1 to go back to previous page
    // if (currentIndex >= 0 && currentIndex < loadedPages.length-1) {
	//     currentIndex += direction;
	//     updateReader(currentIndex);
    // }
    
    goToTop();

}

// When the user clicks on the button, scroll to the top of the document
function goToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}