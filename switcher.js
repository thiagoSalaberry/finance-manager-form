import { state } from "./state.js";

export function switcher() {
    const incBtn = document.getElementById("inc_switch_btn")
    const outBtn = document.getElementById("out_switch_btn")
    const incForm = document.getElementById("form_incomes_container")
    const outForm = document.getElementById("form_outcomes_container")

    function setCurrent(type) {
        if (type != "incomes" && type != "outcomes") throw new Error(`Valor inválido. 'type' debe ser "incomes" o "outcomes". Recibido: ${type}`);
        state.setState({
            ...state.getState(),
            current: type
        })
    }
    
    incBtn.addEventListener("click", () => setCurrent("incomes"))
    outBtn.addEventListener("click", () => setCurrent("outcomes"))

    state.subscribe(() => {
        const { current } = state.getState();
        incBtn.classList.toggle("current", current === "incomes");
        outBtn.classList.toggle("current", current === "outcomes");
        incForm.classList.toggle("current", current === "incomes");
        outForm.classList.toggle("current", current === "outcomes");
    })
}