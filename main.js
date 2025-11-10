import { state } from "./state.js";
import { switcher } from "./switcher.js";
import { input } from "./input.js";
import { dropdown } from "./dropdown.js";
import { submitButton } from "./submitButton.js";
import { errorMessage } from "./errorMessage.js";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZKnffnWdLWeBA7WVC1c61u_gTtTOIeo79lJNR59KPZRq83SAuK99Iw7FOr60WX9RpMQ/exec";

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
        formData.append("type", "income");
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
    submitButton("income_submit_btn", onSubmitInc, "Ingreso");
    errorMessage("inc_result_p", "Ingreso");

    // Outcomes
    input("out_desc");
    dropdown("out_account", "account");
    input("out_amount");
    dropdown("out_category", "category");

    const onSubmitOut = () => {
        const currentState = state.getState();
        const { desc, account, amount, category } = currentState.forms.outcomes.form;

        if(!desc || !account || !amount || !category) return;

        const numericAmount = parseFloat(amount.replace('.', ','))
        const formData = new URLSearchParams();
        formData.append("type", "outcome");
        formData.append("desc", desc);
        formData.append("account", account);
        formData.append("amount", numericAmount);
        formData.append("category", category);

        state.setState({
            ...currentState,
            loading: true,
            result: null,
            errorMessage: ""
        })

        fetch(SCRIPT_URL, {method: "POST", body: formData})
            .then(res => res.json())
            .then(data => {
                const newState = state.getState();

                if(data.result == "success") {
                    state.setState({
                        ...newState,
                        result: "success",
                        loading: false
                    })
                } else {
                    state.setState({
                        ...state.getState(),
                        forms: {
                            ...state.getState().forms,
                            outcomes: {
                                form: {
                                    desc: "",
                                    account: "",
                                    amount: "",
                                    category: ""
                                }
                            },
                            loading: false
                        }
                    })
                }
            })
            .catch(error => {
                state.setState({
                    ...currentState,
                    result: "error",
                    errorMessage: "❌ Ocurrió un error al registrar el Gasto: " + error.message,
                    loading: false
                })
            })
    };
    submitButton("outcome_submit_btn", onSubmitOut, "Gasto");
    errorMessage("out_result_p", "Gasto")

    // Transfers
    dropdown("tra_source_account", "sourceAccount")
    dropdown("tra_dest_account", "destAccount")
    input("tra_desc")
    input("tra_amount")
    submitButton("transfers_submit_btn", () => {}, "Transferencia");
})