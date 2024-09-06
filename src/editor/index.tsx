import { useEffect } from 'react'
import './editor.css'
import { createDiv } from './core'


export default function Editor() {
    useEffect(() => {
        createDiv(0, 0, 600, 400)
    }, []);

    const onclick = (e: MouseEvent) => {
        if (!e.target) {
            return;
        }
        if (!(e.target instanceof HTMLElement)) {
            return;
        }
        if (e.target.classList.contains('cuttable')) {
            if (e.shiftKey) {
                if (selectedDiv) {
                    merge(selectedDiv, e.target);
                    selectedDiv.classList.remove('selected');
                    selectedDiv = null;
                } else {
                    selectedDiv = e.target;
                    selectedDiv.classList.add('selected');
                }
            } else {
                const isVertical = !e.ctrlKey;
                cut(e.target, isVertical, isVertical ? e.clientX : e.clientY);
            }
        }
    }

    const onKeyUp = () => {

    }



    return (
        <div className="container" id="main-container"></div>
    )
}
