import { state } from "./state.js";
import { switcher } from "./switcher.js";
import { input } from "./input.js";
import { dropdown } from "./dropdown.js";
import { submitButton } from "./submitButton.js";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwGghGMxmWfqG3wd-tokevYw0oRxEfJTUUmjuTSYY0DiVudrT9I1zjxhIgEqnARTK9U9Q/exec"

document.addEventListener("DOMContentLoaded", () => {
    
    // Incomes
    switcher();
    input("inc_desc"); 
    input("inc_amount"); 
    dropdown("inc_category", "category");
    
    const onSubmitInc = () => {
        const { desc, amount, category } = state.getState().forms.incomes.form
        const formData = {
            desc,
            amount: parseFloat(amount),
            category
        }
        
        fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.result == "success") {
                    alert("¡Ingreso guardado con éxito!")
                } else {
                    alert("Error: " + data.message)
                }
            })
            .catch(error => {
                alert("Error de red: " + error.message)
            })
    };
    submitButton("income_submit_btn", onSubmitInc);
    
    // Outcomes
    input("out_desc");
    dropdown("out_account", "account");
    input("out_amount");
    dropdown("out_category", "category");

    const onSubmitOut = () => console.log(state.getState().forms.outcomes.form);
    submitButton("outcome_submit_btn", onSubmitOut);

})