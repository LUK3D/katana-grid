const container = document.getElementById('main-container');
let divId = 0;
let selectedDiv = null;

export function createDiv(left: number, top: number, width: number, height: number) {
    const div = document.createElement('div');
    div.className = 'cuttable';
    div.id = `div-${divId++}`;
    div.style.left = `${left}px`;
    div.style.top = `${top}px`;
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.backgroundColor = getRandomColor();
    return div;
}

export function getRandomColor() {
    return `hsl(${Math.random() * 360}, 100%, 75%)`;
}

export function cut(div, isVertical, position) {
    const rect = div.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    if (isVertical) {
        const leftWidth = position - rect.left;
        const rightWidth = rect.right - position;

        const leftDiv = createDiv(rect.left - containerRect.left, rect.top - containerRect.top, leftWidth, rect.height);
        const rightDiv = createDiv(position - containerRect.left, rect.top - containerRect.top, rightWidth, rect.height);

        container.appendChild(leftDiv);
        container.appendChild(rightDiv);

        const cutLine = document.createElement('div');
        cutLine.className = 'cut vertical-cut';
        cutLine.style.left = `${position - containerRect.left}px`;
        cutLine.style.top = `${rect.top - containerRect.top}px`;
        cutLine.style.height = `${rect.height}px`;
        container.appendChild(cutLine);
    } else {
        const topHeight = position - rect.top;
        const bottomHeight = rect.bottom - position;

        const topDiv = createDiv(rect.left - containerRect.left, rect.top - containerRect.top, rect.width, topHeight);
        const bottomDiv = createDiv(rect.left - containerRect.left, position - containerRect.top, rect.width, bottomHeight);

        container.appendChild(topDiv);
        container.appendChild(bottomDiv);

        const cutLine = document.createElement('div');
        cutLine.className = 'cut horizontal-cut';
        cutLine.style.left = `${rect.left - containerRect.left}px`;
        cutLine.style.top = `${position - containerRect.top}px`;
        cutLine.style.width = `${rect.width}px`;
        container.appendChild(cutLine);
    }

    container.removeChild(div);
}

export function merge(div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const left = Math.min(rect1.left, rect2.left);
    const top = Math.min(rect1.top, rect2.top);
    const right = Math.max(rect1.right, rect2.right);
    const bottom = Math.max(rect1.bottom, rect2.bottom);

    const mergedDiv = createDiv(
        left - containerRect.left,
        top - containerRect.top,
        right - left,
        bottom - top
    );

    container.appendChild(mergedDiv);
    container.removeChild(div1);
    container.removeChild(div2);

    // Remove any cut lines that were between the merged divs
    const cuts = container.querySelectorAll('.cut');
    cuts.forEach(cut => {
        const cutRect = cut.getBoundingClientRect();
        if (
            cutRect.left >= left && cutRect.right <= right &&
            cutRect.top >= top && cutRect.bottom <= bottom
        ) {
            container.removeChild(cut);
        }
    });
}



document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift' && selectedDiv) {
        selectedDiv.classList.remove('selected');
        selectedDiv = null;
    }
});

