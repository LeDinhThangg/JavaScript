export default function generatePagination(currentPage, totalPages) {
    const pagination = [];
    const range = 2; // Number of pages to show before and after the current page

    // Add the first page if not in range
    if (currentPage > range + 1) {
        pagination.push(1);
    }

    // Add pages around the current page
    for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
        pagination.push(i);
    }

    // Add the last page if not in range
    if (currentPage < totalPages - range) {
        pagination.push(totalPages);
    }
    return pagination;
}