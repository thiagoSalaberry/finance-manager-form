export const state = {
    data: {
        current: "incomes",
        forms: {
            incomes: {
                form: {
                    desc: "",
                    amount: null,
                    category: ""
                }
            },
            outcomes: {
                form: {
                    desc: "",
                    account: "",
                    amount: null,
                    category: ""
                }
            }
        }
    },
    listeners: [],
    getState() {
        return this.data;
    },
    setState(newState) {
        this.data = newState;
        this.listeners.forEach(l => l());
    },
    subscribe(cb) {
        this.listeners.push(cb);
    }
};