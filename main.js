// Conecto el html con el js
const printRandom = document.getElementById("acordeRandom");
const botones = document.querySelectorAll(".botonNotas");
const respuesta = document.getElementById("rta");
const Resultado = document.getElementById("resultado");
const keys = document.querySelectorAll(".key");
const Reiniciar = document.getElementById("reiniciar");
const Empezar = document.getElementById("empezar");

const sound_do = new Audio();
sound_do.src = "notes/Acorde_do.mp3";

const sound_re = new Audio();
sound_re.src = "notes/Acorde_re.mp3";

const sound_mi = new Audio();
sound_mi.src = "notes/Acorde_mi.mp3";

const sound_sol = new Audio();
sound_sol.src = "notes/Acorde_sol.mp3";

const sound_la = new Audio();
sound_la.src = "notes/Acorde_la.mp3";

const sound_fa = new Audio();
sound_fa.src = "notes/Acorde_fa.mp3";

const sound_si = new Audio();
sound_si.src = "notes/Acorde_si.mp3";

const sound_ganar = new Audio();
sound_ganar.src = "notes/ganador.mp3";

const sound_perder = new Audio();
sound_perder.src = "notes/perder.mp3";

let todasLasNotas = [];

// Funcion constructor
class Acordes {
  constructor(primera, tercera, quinta, id) {
    this.primera = primera;
    this.tercera = tercera;
    this.quinta = quinta;
    this.id = id;
  }
}

const acordes = [];
const Do = acordes.push(new Acordes("do", "mi", "sol", "Do"));
const Dom = acordes.push(new Acordes("do", "re#", "sol", "Dom"));
const Re = acordes.push(new Acordes("re", "fa#", "la", "Re"));
const Rem = acordes.push(new Acordes("re", "fa", "la", "Rem"));
const Mi = acordes.push(new Acordes("mi", "sol#", "si", "Mi"));
const Mim = acordes.push(new Acordes("mi", "sol", "si", "Mim"));
const Fa = acordes.push(new Acordes("fa", "la", "do", "Fa"));
const Fam = acordes.push(new Acordes("fa", "sol#", "do", "Fam"));
const Sol = acordes.push(new Acordes("sol", "si", "re", "Sol"));
const Solm = acordes.push(new Acordes("sol", "la#", "re", "Solm"));
const La = acordes.push(new Acordes("la", "do#", "mi", "La"));
const Lam = acordes.push(new Acordes("la", "do", "mi", "Lam"));
const Si = acordes.push(new Acordes("si", "re#", "fa#", "Si"));
const Sim = acordes.push(new Acordes("si", "re", "fa#", "Sim"));


// Función que devuelve un acorde random
const randomStart = () => {
  let random = acordes[Math.floor(Math.random() * acordes.length)];
  return random;
};
let randomName = randomStart();


// El juego propiamente dicho
function juego() {
  // Botón que empieza el juego llamando a la funcion random
  Empezar.addEventListener("click", gameStart);
  function gameStart() {
    randomStart();
    playAcorde();
    Empezar.disabled = true
    printRandom.textContent = randomName.id;
    console.log(randomName)
  }

  // Función que escucha los botones y los deshabilita luego del tercer intento o si quiere oprimir dos veces el mismo.
  botones.forEach((boton) => {
    boton.addEventListener("click", function () {
      todasLasNotas.push(boton.innerHTML);
      this.disabled = true;
      let valor = boton.innerHTML;
      displayNote(valor);
      disableButton()
    });
  });

  const disableButton = () => {
   if (todasLasNotas.length === 3) {
    for (let i = 0; i < botones.length; i++) {
      botones[i].disabled =true;
    }
    }
  }

  // Función que imprime las notas que va eligiendo el jugador

  const displayNote = (boton) => {
    const Lista = document.getElementById("lista");
    let li = document.createElement("li");
    let valor = boton;
    li.innerHTML = `La nota que eligió es ${valor}`;
    Lista.appendChild(li);
  };
}

juego();

// verifica que el acorde ingresado sea correcto.

const coincidence = () => {
 
  const coincidenTodas = todasLasNotas.includes(randomName.primera) && todasLasNotas.includes(randomName.tercera) && todasLasNotas.includes(randomName.quinta)
  if(coincidenTodas) { 
  Resultado.textContent = "Usted ha acertado las tres notas. Ha ganado el juego!";
  sound_ganar.play();
} else {
  Resultado.textContent = "No, esas no son las notas del acorde";
  sound_perder.play();
}

};

respuesta.addEventListener("click", coincidence);
Reiniciar.addEventListener("click", reiniciar);

function reiniciar() {
  document.location.href = "";
}

// Llama al sonido de cada nota.

keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
});

function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.play();
}

// Llama al sonido del acorde random.

function playAcorde() {
  if (randomName.primera === "do") {
    sound_do.play();
  } else if (randomName.primera === "re") {
    sound_re.play();
  } else if (randomName.primera === "mi") {
    sound_mi.play();
  } else if (randomName.primera === "fa") {
    sound_fa.play();
  } else if (randomName.primera === "sol") {
    sound_sol.play();
  } else if (randomName.primera === "la") {
    sound_la.play();
  } else if (randomName.primera === "si") {
    sound_si.play();
  }
}
