
export function openPopup(popupNode) {
    document.addEventListener('keydown', handleKeyDown);
    popupNode.classList.add('popup_opened');
}

export function closePopup(popupNode) {
    document.removeEventListener('keydown',handleKeyDown);
    popupNode.classList.remove('popup_opened');
};

const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
        const popupActive = document.querySelector('.popup_opened')
        closePopup(popupActive)
        console.log('presed')
         } 
}

const popupList = Array.from(document.querySelectorAll(".popup"));
popupList.forEach((popupElement) => {
popupElement.addEventListener("click",function(event) {
 if (event.target == popupElement) {
    closePopup(popupElement);
    }
 });
});

