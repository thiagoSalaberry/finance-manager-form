import { state } from "./state.js";

export function switcher() {
    // const accsBtn = document.getElementById("accs_switch_btn")
    const incBtn = document.getElementById("inc_switch_btn")
    const outBtn = document.getElementById("out_switch_btn")
    const traBtn = document.getElementById("tra_switch_btn")
    const creBtn = document.getElementById("cre_switch_btn")
    const incForm = document.getElementById("form_incomes_container")
    const outForm = document.getElementById("form_outcomes_container")
    const traForm = document.getElementById("form_transfers_container")
    const creForm = document.getElementById("form_credit_container")

    function setCurrent(type) {
        if (!["accounts", "incomes", "outcomes", "credit", "transfers"].includes(type.toLowerCase())) throw new Error(`Valor inválido. 'type' debe ser "accounts", "incomes", "outcomes", "credit" o "transfers". Recibido: ${type}`);
        state.setState({
            ...state.getState(),
            current: type
        })
    }
    
    // accsBtn.addEventListener("click", () => setCurrent("accounts"))
    incBtn.addEventListener("click", () => setCurrent("incomes"))
    outBtn.addEventListener("click", () => setCurrent("outcomes"))
    traBtn.addEventListener("click", () => setCurrent("transfers"))
    creBtn.addEventListener("click", () => setCurrent("credit"))

    state.subscribe(() => {
        const { current } = state.getState();
        // accsBtn.classList.toggle("current", current === "accounts");
        incBtn.classList.toggle("current", current === "incomes");
        outBtn.classList.toggle("current", current === "outcomes");
        traBtn.classList.toggle("current", current === "transfers");
        creBtn.classList.toggle("current", current === "credit");
        incForm.classList.toggle("current", current === "incomes");
        outForm.classList.toggle("current", current === "outcomes");
        traForm.classList.toggle("current", current === "transfers");
        creForm.classList.toggle("current", current === "credit");
    })
}