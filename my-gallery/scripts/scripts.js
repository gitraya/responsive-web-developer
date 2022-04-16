const images = document.querySelectorAll('.user-images img');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.img');
const closeButton = document.querySelector('.material-icons');

function showImageModal() {
    modal.style.display = 'flex';
    modalImage.src = this.src;
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'scroll';
}

images.forEach(image => {
    image.addEventListener('click', showImageModal);
});

closeButton.addEventListener('click', closeImageModal);