const tagsLink = document.querySelectorAll('.tag-link');
const tagsList = ['html', 'css', 'javascript', 'responsive', 'line'];
const totalProjects = document.querySelector('#total-project-value');
let listenClick = '';

// Function to filter by tag
function filterByTags() {
    let query, filterTags, tagsHidden, tagsShow, hideProject, showProject;
    query = this.id;
    filterTags = tagsList.filter(tag => {return !tag.includes(query)});
    tagsShow = document.querySelectorAll(`.${query}`);
    totalProjects.innerHTML = tagsShow.length;

    // Hide all untagged elements
    filterTags.forEach(hide => {
        tagsHidden = document.querySelectorAll(`.${hide}`);
        tagsHidden.forEach(element => {
            hideProject = element.parentElement.parentElement;
            hideProject.style.display = 'none';
        })
    });

    // Displays all tagged elements
    tagsShow.forEach(show => {
        showProject = show.parentElement.parentElement;
        showProject.style.display = 'unset';
    });

    // Change button style
    tagsLink.forEach(tagLink => {
        tagLink.classList.remove('select');
    });
    this.classList.add('select');
};

// Function to remove filters based on tag
function unfilterByTags() {
    let query = this.id;
    const allProjects = document.querySelectorAll('.projectcard');

    if (listenClick === '') {
        listenClick = query;
    } else if (listenClick !== query) {
        listenClick = query
    } else {
        listenClick = '';

        // Clear all filters
        totalProjects.innerHTML = allProjects.length;
        allProjects.forEach(element => {
            element.style.display = 'unset';
        });
        this.classList.remove('select');
    }
};

// Event listener
tagsLink.forEach(tagLink => {
    tagLink.addEventListener('click', filterByTags);
    tagLink.addEventListener('click', unfilterByTags);
})