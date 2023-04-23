export default function getIndex(currentIndex, data) {
    return currentIndex === data.length ? 0 : currentIndex < 0 ? data.length - 1 : currentIndex;
}
