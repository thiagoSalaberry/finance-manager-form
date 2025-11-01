import { state } from "./state.js";

export function dropdown(id, field) {
    const dropdownEl = document.getElementById(id)
    const button = dropdownEl.querySelector(".dropdown_btn")
    const menu = dropdownEl.querySelector(".dropdown_menu")
    const label = dropdownEl.querySelector(".dropdown_label")

    button.addEventListener("click", (e) => {
        e.stopPropagation();

        const rect = button.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const menuMaxHeight = 220;

        menu.classList.toggle("up", spaceBelow < menuMaxHeight && spaceAbove > spaceBelow);
        menu.classList.toggle("active");
    });

    menu.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", () => {
            const value = li.textContent.trim();
            label.textContent = value;
            menu.classList.remove("active");

            const currentState = state.getState();
            const current = currentState.current;

            state.setState({
                ...currentState,
                forms: {
                    ...currentState.forms,
                    [current]: {
                        form: {
                            ...currentState.forms[current].form,
                            [field]: value
                        }
                    }
                }
            })
        })
    })

    window.addEventListener("click", () => menu.classList.remove("active"));
}