import { state } from "./state.js";

export function input(id) {
    const inputEl = document.getElementById(id);

    function updateInputState() {
        const currentState = state.getState();
        inputEl.disabled = currentState.loading;
        if(currentState.result == "success") {
            inputEl.value = "";
        }
    }
    updateInputState();
    state.subscribe(updateInputState);

    inputEl.addEventListener("input", (e) => {
        const currentState = state.getState();
        const current = currentState.current;
        state.setState({
            ...currentState,
            forms: {
                ...currentState.forms,
                [current]: {
                    form: {
                        ...currentState.forms[current].form,
                        [inputEl.name]: e.target.value
                    }
                }
            }
        })
    })
}
