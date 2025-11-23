import { state } from "./state.js";

const order = ["incomes", "outcomes", "credit", "transfers"]

export function enableSwipe() {
    const main = document.querySelector("main")

    let startX = 0
    let endX = 0
    const threshold = 50;

    main.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX
    }) 

    main.addEventListener("touchmove", e => {
        endX = e.touches[0].clientX;
    })

    main.addEventListener("touchend", e => {
        const diff = startX - endX;

        if (Math.abs(diff) < threshold) return

        const current = state.getState().current;
        const index = order.indexOf(current)

        if(diff > 0 && index < order.length - 1) {
            changeForm(order[index + 1])
        }

        if (diff < 0 && index > 0) {
            changeForm(order[index - 1])
        }
    })
}

function changeForm(type) {
    state.setState({
        ...state.getState(),
        current: type
    })
}