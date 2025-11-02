import { state } from "./state.js";

export function submitButton(id, onSubmit) {
    const buttonEl = document.getElementById(id)
    const loadingSpan = document.createElement("span")
    loadingSpan.className = "loading";
    for (let index = 0; index < 3; index++) {
        const loadingDot = document.createElement("span")
        loadingDot.className = "loading_dot";
        loadingSpan.appendChild(loadingDot);
    }
    function updateButtonState() {
        const currentState = state.getState();
        const form = currentState.forms[currentState.current].form;
        const full = Object.values(form).every(v => v !== "" && v != null);

        if(!full) {
            buttonEl.disabled = true;
            buttonEl.textContent = "Registrar Ingreso"
        } else if(full && currentState.loading) {
            buttonEl.textContent = "Registrando Ingreso"
            buttonEl.disabled = true;
            buttonEl.appendChild(loadingSpan);
        } else {
            buttonEl.textContent = "Registrar Ingreso"
            buttonEl.disabled = false;
        }
    }
    updateButtonState();
    state.subscribe(updateButtonState);

    buttonEl.addEventListener("click", (e) => {
        e.preventDefault();
        if(!buttonEl.disabled) {
            onSubmit(state.getState().forms[state.getState().current].form)
        };
    })
}