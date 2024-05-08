export default function compareSequence(a, b) {
    // a should come before b in the sorted order
    if (a.sequence < b.sequence) {
        return -1;
        // a should come after b in the sorted order
    } else if (a.sequence > b.sequence) {
        return 1;
        // a and b are the same
    } else {
        return 0;
    }
}
export function sortDropdown(array, property) {
    // a should come before b in the sorted order
    const sortedArray = array?.sort((a, b) => {
        if (a && a[`${property}`] && b && b[`${property}`]) {
            let fa = a[`${property}`]?.toLowerCase();
            let fb = b[`${property}`]?.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
        }
        return 0;
    });
    return sortedArray;
}
