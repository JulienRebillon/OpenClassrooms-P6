export function sortGallery(photographerMedia, sortBy) {
    if (sortBy === 'popularity') {
        return photographerMedia.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'date') {
        return photographerMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'title') {
        return photographerMedia.sort((a, b) => a.title.localeCompare(b.title));
    }
    return photographerMedia;
}
