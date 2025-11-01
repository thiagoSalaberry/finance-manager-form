import { state } from "./state.js";

export function submitButton(id, onSubmit) {
    const buttonEl = document.getElementById(id)

    function validate() {
        const currentState = state.getState();
        const form = currentState.forms[currentState.current].form;
        const full = Object.values(form).every(v => v !== "" && v != null);
        buttonEl.disabled = !full;
    }

    state.subscribe(validate);
    validate();

    buttonEl.addEventListener("click", (e) => {
        e.preventDefault();
        if(!buttonEl.disabled) onSubmit(state.getState().forms[state.getState().current].form);
    })
}