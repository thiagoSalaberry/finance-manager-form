import { state } from "./state.js";
import { switcher } from "./switcher.js";
import { input } from "./input.js";
import { dropdown } from "./dropdown.js";
import { submitButton } from "./submitButton.js";
import { errorMessage } from "./errorMessage.js";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwu9oG8btuOI2zWKk2olJqt4rA_0q8NQJKDaoRLXTvtlDjH7KbX9vHC4NxmuPzBBvQVfQ/exec"

document.addEventListener("DOMContentLoaded", () => {
    
    // Incomes
    switcher();
    input("inc_desc"); 
    input("inc_amount"); 
    dropdown("inc_category", "category");
    
    const onSubmitInc = () => {
        const currentState = state.getState()
        const { desc, amount, category } = currentState.forms.incomes.form

        if (!desc || !amount || !category) return;

        const numericAmount = parseFloat(amount.replace('.', ',')); 
        const formData = new URLSearchParams()
        formData.append("desc", desc);
        formData.append("amount", numericAmount);
        formData.append("category", category);
        
        state.setState({
            ...currentState,
            loading: true,
            result: null,
            errorMessage: ""
        });

        fetch(SCRIPT_URL, {method: "POST",body: formData})
            .then(res => res.json())
            .then(data => {
                const newState = state.getState();
                
                if (data.result == "success") {
                    state.setState({
                        ...newState,
                        result: "success",
                        loading: false
                    });
                } else {
                    state.setState({
                        ...newState,
                        result: "error",
                        errorMessage: "❌ Ocurrió un error al registrar el Ingreso.",
                        loading: false
                    })
                }

                state.setState({
                    ...state.getState(),
                    forms: {
                        ...state.getState().forms,
                        incomes: {
                            form: {
                                desc: "",
                                amount: "",
                                category: ""
                            }
                        }
                    },
                    loading: false
                })
            })
            .catch(error => {
                state.setState({
                    ...currentState,
                    result: "error",
                    errorMessage: "❌ Ocurrió un error al registrar el Ingreso: " + error.message,
                    loading: false
                })
            })
    };
    submitButton("income_submit_btn", onSubmitInc);
    errorMessage("inc_result_p")

    // Outcomes
    input("out_desc");
    dropdown("out_account", "account");
    input("out_amount");
    dropdown("out_category", "category");

    const onSubmitOut = () => console.log(state.getState().forms.outcomes.form);
    submitButton("outcome_submit_btn", onSubmitOut);
})