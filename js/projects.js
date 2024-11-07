const categories = document.querySelector('.categories')
const projectContainer = document.querySelector('.projects')
const projects = document.querySelectorAll('.proect')

categories.addEventListener('click', (e) => {
    const filter = e.target.dataset.category
    // console.log(filter)
    if (filter == null) {
        return
    }
    activeSelection(e.target)
    filterProjects(filter)
})

function activeSelection(target) {
    const active = document.querySelector('.category--selected')
    active.classList.remove('category--selected')
    target.classList.add('category--selected')
}

// 요소.target.dataset.type
function filterProjects(filter) {
    projects.forEach((project) => {
        if (filter === 'all' || filter === project.dataset.type) {
            project.style.display = 'block'
        } else {
            project.style.display = 'none'
        }
    })
    projectContainer.classList.add('anim-out')
    setTimeout(() => {
        projectContainer.classList.remove('anim-out')
    }, 300)
}