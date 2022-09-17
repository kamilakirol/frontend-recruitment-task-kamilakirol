const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const spanCounter = document.querySelector('span.counter')
const resetButtons = document.querySelectorAll('[data-reset-button]')

let boxClickCount = 0

if (localStorage.getItem('boxClickCountStorage') != null) {
     boxClickCount = Number(localStorage.getItem('boxClickCountStorage'))
}

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
} )

openModalButtons.forEach (button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
        boxClickCount += 1
        spanCounter.textContent = boxClickCount
        if (boxClickCount > 5) {
           const openRestButton = modal.querySelector('[data-reset-button]')
           openRestButton.classList.add('active')
           }
        localStorage.setItem('boxClickCountStorage', boxClickCount)

    })
})


closeModalButtons.forEach (button => {
    button.addEventListener('click', () => {
        const modal = button.closest ('.modal.active')
        closeModal(modal)
    })
})

resetButtons.forEach (button => {
    button.addEventListener('click', () => {
        reset()
        button.classList.remove('active')
    })
})

function openModal(modal) {
    if (modal == null) return 
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return 
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

function reset() {
    if (boxClickCount > 5) {
        boxClickCount = 0
        spanCounter.textContent = boxClickCount
        localStorage.setItem('boxClickCountStorage', boxClickCount)
    }
}
