// search.js
export function searchTasksByName(searchTerm) {
    const taskRows = document.querySelectorAll('table tbody tr');
    taskRows.forEach(row => {
        const taskNameCell = row.querySelector('td:first-child');
        const taskName = taskNameCell.textContent.toLowerCase();
        if (taskName.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}