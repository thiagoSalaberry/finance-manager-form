import { state } from "./state.js";

export function switcher() {
    // const accsBtn = document.getElementById("accs_switch_btn")
    const incBtn = document.getElementById("inc_switch_btn")
    const outBtn = document.getElementById("out_switch_btn")
    const traBtn = document.getElementById("tra_switch_btn")
    const incForm = document.getElementById("form_incomes_container")
    const outForm = document.getElementById("form_outcomes_container")
    const traForm = document.getElementById("form_transfers_container")

    function setCurrent(type) {
        if (!["accounts", "incomes", "outcomes", "transfers"].includes(type.toLowerCase())) throw new Error(`Valor inválido. 'type' debe ser "accounts", "incomes", "outcomes" o "transfers". Recibido: ${type}`);
        state.setState({
            ...state.getState(),
            current: type
        })
    }
    
    // accsBtn.addEventListener("click", () => setCurrent("accounts"))
    incBtn.addEventListener("click", () => setCurrent("incomes"))
    outBtn.addEventListener("click", () => setCurrent("outcomes"))
    traBtn.addEventListener("click", () => setCurrent("transfers"))

    state.subscribe(() => {
        const { current } = state.getState();
        // accsBtn.classList.toggle("current", current === "accounts");
        incBtn.classList.toggle("current", current === "incomes");
        outBtn.classList.toggle("current", current === "outcomes");
        traBtn.classList.toggle("current", current === "transfers");
        incForm.classList.toggle("current", current === "incomes");
        outForm.classList.toggle("current", current === "outcomes");
        traForm.classList.toggle("current", current === "transfers");
    })
}