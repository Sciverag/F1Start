const body = document.querySelector("body"); //Elemento HTML que apunta al body
const textoTiempo = document.getElementById("tiempo"); //Elemento HTML que apunta al h1 donde se mostrara el contador
const textoRecord = document.getElementById("record"); //Elemento HTML que apunta al p donde se muestra el record del usuario
let semaforo; //Elemento HTML que almacena un div con una id especifica
let idSemaforo = 1; //Variable que almacena la id del Semaforo
let milisegundos = 0; //Variable que almacena los milisegundos
let segundos = 0; //Variable que almacena los segundos
let encender; //Variable que almacena el Interval para encender las luces del semaforo
let contador; //Variable que almacena el Interval del contador
let activado = false; //Variable booleana que indica si se ha iniciado el juego
let contadorIniciado = false; //Variable booleana que indica si se ha iniciado el contador
let record = 1000000; //Variable que almacena el record del usuario

//Cuando se haga click al body del HTML sucederá lo siguiente
body.addEventListener("click", () => {
    //Si no se ha iniciado el juego se inicia
    if(!activado){
        //Se apagan las luces del semaforo
        apagarLuces();
        //Se devuelve el texto al tamaño normal
        textoTiempo.style.transition = "all 0.2s";
        textoTiempo.style.transform = "scale(100%)";
        //Se reinicia el contador
        textoTiempo.innerText = "00.000";
        //Se indica que se ha iniciado el juego
        activado = true;
        //Inicia la id del Semaforo en 1
        idSemaforo = 1;
        //Se crera un Interval para encender las luces de un semaforo cada segundo
        encender = setInterval(encenderLuz, 1000);
    //Si ya se ha iniciado el juego pueden suceder dos cosas
    }else{
        //Se indica que se ha acabado el juego
        activado = false;
        //Si no se ha iniciado el contador, es decir, el usuario ha hecho click con alguna luz encendida sucede los siguiente:
        if(!contadorIniciado){
            //Se limpia el Interval que enciende las luces
            clearInterval(encender);
            //Se aumenta de tamaño el texto
            textoTiempo.style.transition = "all 0.2s";
            textoTiempo.style.transform = "scale(110%)";
            //Se indica al usuario de que se ha adelantado
            textoTiempo.innerText = "JUMP START!";
        //Si ya se ha iniciado el contador sucede lo siguiente:
        }else{
            //Se finaliza el contador llamando a este metodo
            finalizarTiempo();
            //Aumenta de tamaño el texto
            textoTiempo.style.transition = "all 0.2s";
            textoTiempo.style.transform = "scale(110%)";
        }
    }
})

//Metodo que sirve para encender las luces de un semaforo
function encenderLuz(){;
    let luzP; //Elemento HTML que apunta al div con clase luz en la penultima posición
    let luzF; //Elemento HTML que apunta al div con clase luz en la ultima posición

    //Se selecciona el semaforo en la id seleccionada y su ultima y penultima luz
    semaforo = document.querySelector("div:is( #id" + idSemaforo + ")");
    luzP = semaforo.querySelector(".luz:nth-child(3)");
    luzF = semaforo.querySelector(".luz:nth-child(4)");

    //Se encienden las luces del semaforo añadiendoles el atributo encendido
    luzP.setAttribute("encendido","true");
    luzF.setAttribute("encendido","true");
    //Se aumenta en 1 la id del Semaforo, para en la siguiente iteración, encender las luces del siguiente semaforo
    idSemaforo++;
    //Se comprueba si se han encendido todas las luces
    acabar();
}

//Metodo que comprueba si se han recorrido todos los semaforos, en caso afirmativo, inicia el contador
function acabar(){
    //Si la id del Semaforo supera a 5 (es 6)
    if(idSemaforo == 6){
        //Se limpia el Interval
        clearInterval(encender);

        //Se crea una variable que almacena un tiempo aleatorio
        let iniciarTiempo = parseInt(Math.random() * 6000);

        //Se crea un Timeout que iniciará el metodo iniciarContador con un retraso del tiempo aleatorio antes creado
        setTimeout(iniciarContador, iniciarTiempo);
    }
}

//Metodo que recoge todas las luces y las apaga
function apagarLuces(){
    let luces = Array.prototype.slice.call(document.querySelectorAll(".luz")); //Array que almacena todos los elementos HTML que contengan la clase luz
    //Se recorren todas las luces y se les elimina el atributo encendido
    for(let luz of luces){
        luz.style.transition = "all 0.1s";
        luz.removeAttribute("encendido");
    }
}

//Metodo que inicia el contador
function iniciarContador(){
    //Se apagan las luces de los semaforos
    apagarLuces();
    //Se reinician los segundos y los milisegundos
    segundos = 0;
    milisegundos = 0;
    //Se indica que se ha iniciado el contador
    contadorIniciado = true;
    //Se inicia un Interval que funcionara como cronometro para el juego
    contador = setInterval(tiempoUsuario, 0);
}

//Metodo que finaliza el cronometro y comprueba si se ha superado el record
function finalizarTiempo(){
    //Se limpia el Interval del cronometro
    clearInterval(contador);
    //Se indica que se ha acabado el contador
    contadorIniciado = false;
    //Se crea un nuevo Record
    nuevoRecord = (segundos * 1000) + milisegundos;

    //Si el nuevo record es un menor tiempo que el record actual, se sobreescribe el antiguo con el nuevo y se muestra en el elemento HTML textoRecord
    if(nuevoRecord < record){
        record = nuevoRecord;
        textoRecord.innerText = "Tu record: " + textoTiempo.innerText;
    }
}

//Metodo que funciona como cronometro
function tiempoUsuario(){
    let textoMilisegundos; //Variable que almacena el texto a mostrar de los milisegundos
    let textoSegundos; //Variable que alamcena el texto a mostrar de los segundos

    milisegundos++; //Se aumentan los milisegundos

    //Si los milisegundos son iguales o superan a 1000, se restan 1000 a milisegundos y añade un segundo
    if(milisegundos >= 1000){
        milisegundos -= 1000;
        segundos++;
    }

    //Se ajusta el texto de los milisegundos para que siempre ocupe 3 cifras
    if(milisegundos < 100){
        if(milisegundos < 10){
            textoMilisegundos = "00"+milisegundos;
        }else{
            textoMilisegundos = "0"+milisegundos;
        }
    }else{
        textoMilisegundos = milisegundos;
    }

    //Se ajusta el texto de los segundos para que ocupe 2 cifras
    if(segundos < 10){
        textoSegundos = "0"+segundos;
    }else{
        textoSegundos = segundos;
    }

    

    //Se actualiza el texto del contador con el tiempo actual
    textoTiempo.innerText = textoSegundos + "." + textoMilisegundos;

}