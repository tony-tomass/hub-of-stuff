const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const galleryItems = Array.from(document.querySelectorAll(".gallery-item")); // Convert to Array to use index

const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentIndex = 0;
let activeImages = [];
let activeTags = new Set();

// Toggles tags so it only shows certain images
function toggleTag(tagButton) {
	const category = tagButton.getAttribute("data-filter");

	// Toggle tags on click; if unactive, activate; and vice-versa
	if (activeTags.has(category)) {
		activeTags.delete(category);
		tagButton.classList.remove("active");
	}
	else {
		activeTags.add(category);
		tagButton.classList.add("active");
	}

	galleryItems.forEach(img => {
		// Single-tag system
		// const tag = img.getAttribute("data-tag");

		// Multi-tag system
		// Split the data-tag string by spaces into an array of separate tags
		const tags = img.getAttribute('data-tag').split(' ');

		// Check if the image contains AT LEAST ONE of the active filters
		const hasMatchingTag = tags.some(tag => activeTags.has(tag));

		// If no filters are selected, show everything; if the activeTags Set has the tag, then remove the "hide" class
		// Otherwise, check if the image"s tag matches any active filter.
		// Single-tag system
		// if (activeTags.size === 0 || activeTags.has(tag)) {
		//   img.classList.remove("hide");
		// } else {
		//   img.classList.add("hide");
		// }
		//Multi-tag system
		if (activeTags.size === 0 || hasMatchingTag) {
			img.classList.remove('hide');
		}
		else {
			img.classList.add('hide');
		}
	});
}


// Updates lightbox content based on current index OLD
// function updateLightbox(index) {

// 	// Filters out images if they have the "hide" class
// 	activeImages = galleryItems.filter(img => !img.classList.contains("hide"))
// 	//console.log(activeImages.length)

// 	currentIndex = index;
// 	//console.log(currentIndex);

// 	// Wrap around loops
// 	if (currentIndex < 0) currentIndex = activeImages.length - 1;
// 	if (currentIndex >= activeImages.length) currentIndex = 0;

// 	const currentImg = activeImages[currentIndex];
// 	lightboxImg.src = currentImg.src.replaceAll("_thumb", "");
// 	//console.log(lightboxImg.src)
// 	//lightboxImg.src = "/assets/img/hub_photo.jpg"
// 	lightboxCaption.textContent = currentImg.alt;
// }

// Open Lightbox OLD
// galleryItems.forEach((item, index) => {
// 	console.log(item)
// 	item.addEventListener("click", () => {
// 		lightbox.style.display = "flex";
// 		updateLightbox(index);
// 	});
// });

// Open Lightbox
function openLightbox(clickedImg) {
	// Find all images in the grid and filter for only visible ones
	activeImages = galleryItems.filter(img => !img.classList.contains('hide'));

	// Locate the current image's position relative to the active/visible list
	currentIndex = activeImages.indexOf(clickedImg);
	console.log(currentIndex);

	// Safety check: if the image isn't part of the visible set, abort
	if (currentIndex === -1) {
		return;
	}

	updateLightboxImage();
	lightbox.style.display = 'flex';
}

function updateLightboxImage() {
	const lightboxImg = document.getElementById('lightbox-img');
	//lightboxImg.src = activeImages[currentIndex].src;
	lightboxImg.src = activeImages[currentIndex].src.replaceAll("_thumb", "");
	lightboxCaption.textContent = activeImages[currentIndex].dataset.date;
}

// Navigation Click Events
// prevBtn.addEventListener("click", (e) => {
// 	e.stopPropagation(); // Prevents clicking the background and closing
// 	updateLightbox(currentIndex - 1);
// });

// nextBtn.addEventListener("click", (e) => {
// 	e.stopPropagation(); // Prevents clicking the background and closing
// 	updateLightbox(currentIndex + 1);
// });


function changeImage(direction) {
	// If there are no active images, abort
	if (activeImages.length === 0) {
		return;
	}
	// 1 to go to next image, -1 to go back to previous image
	currentIndex += direction;

	// If the index is higher than the length of activeImage array, cycle back to the first image
	if (currentIndex >= activeImages.length) {
		currentIndex = 0;
	}
	// No active images
	if (currentIndex < 0) {
		currentIndex = activeImages.length - 1;
	}

	updateLightboxImage();
}

// Close Lightbox
closeBtn.addEventListener("click", () => {
	lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
	// Close if clicking outside the image, caption, and navigation buttons
	if (e.target === lightbox) {
		lightbox.style.display = "none";
	}
});
