const audioIngreso = new Audio("./ingreso.mp3")
const audioGasto = new Audio("./gasto.mp3")

export function reproducirAudio(tipo) {
    let audio;
    if(tipo == "ingreso") {
        audio = audioIngreso
    } else if (tipo == "gasto") {
        audio = audioGasto
    }
    audio.currentTime = 0;
    audio.volume = 0.3
    audio.play()
        .catch(error => console.log(error));
}