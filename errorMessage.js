import { state } from "./state.js";

export function errorMessage(id) {
    const pEl = document.getElementById(id)
    let timeoutId = null;

    function updatePState() {
        const currentState = state.getState();

        if(timeoutId) clearInterval(timeoutId);

        if(currentState.result == "success") {
            pEl.classList.add("success");
            pEl.textContent = "¡✅ Ingreso registrado con éxito!"
            timeoutId = setTimeout(() => {
                pEl.classList.remove("success");
                state.setState({ ...state.getState(), result: null })
            }, 4000);
        } else if (currentState.result == "error") {
            pEl.classList.add("error");
            pEl.textContent = currentState.errorMessage || "❌ Ocurrió un error."
            timeoutId = setTimeout(() => {
                pEl.classList.remove("error")
                state.setState({...state.getState(), result: null})
            }, 4000);
        }
    }

    state.subscribe(updatePState)
    updatePState();
}