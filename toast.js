function formatMoney(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function showToast(type, amount, category) {
    let toast = document.createElement("div");
    toast.className = `toast_container ${type}`;
    toast.innerHTML = `<p class="toast_p">${category}: <strong>$${formatMoney(amount)}</strong></p>`;
    document.body.appendChild(toast);

    // Mostrar con animación inicial
    requestAnimationFrame(() => toast.classList.add("show"));

    // Ocultar después de X tiempo
    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hide");
    }, 2200);

    // Cuando termine la animación final, eliminarlo
    toast.addEventListener("animationend", () => {
        if (toast.classList.contains("hide")) toast.remove();
    });
}