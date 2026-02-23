const routes = {
    "/": {
        viewId: "form_incomes_container",
        navId: "nav_incomes"
    },
    "/outcomes": {
        viewId: "form_incomes_container",
        navId: "nav_incomes"
    },
    "/credit": {
        viewId: "form_incomes_container",
        navId: "nav_incomes"
    },
    "/transfers": {
        viewId: "form_incomes_container",
        navId: "nav_incomes"
    }
}

const handleLocation = async () => {
    let path = window.location.pathname;

    if (path.endsWith("index.html")) path = "/";

    const route = routes[path] || routes["/"]

    document.querySelectorAll(".form_container").forEach(el => el.classList.remove("current"))
    document.querySelectorAll(".link_icon").forEach(el => el.classList.remove("current"))

    const viewToShow = document.getElementById(route.viewId)
    if (viewToShow) viewToShow.classList.add("current");

    const navToActivate = document.getElementById(route.navId)
    if (navToActivate) navToActivate.classList.add("current")
}

export const route = (event) => {
    event = event || window.event
    event.preventDefault();

    const href = event.currentTarget.href;

    window.history.pushState({}, "", href)

    handleLocation()
}

export const initRouter = () => {
    window.onpopstate = handleLocation;

    handleLocation();

    document.querySelectorAll("a[data-link]").forEach(link => {
        link.addEventListener("click", e => route(e))
    })
}