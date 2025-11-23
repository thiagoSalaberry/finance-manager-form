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
        
        let value = e.target.value;
        let rawValue = value;

        if(inputEl.id.includes("amount") || inputEl.id.includes("interest") || inputEl.id.includes("quotes")) {
            rawValue = value.replace(/\D/g, "");

            const formatted = rawValue
                ? rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : "";

            inputEl.value = inputEl.id.includes("amount") ? "$ " + formatted : formatted;
        }

        state.setState({
            ...currentState,
            forms: {
                ...currentState.forms,
                [current]: {
                    form: {
                        ...currentState.forms[current].form,
                        [inputEl.name]: rawValue
                    }
                }
            }
        })
    })
}
