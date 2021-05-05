var context = new AudioContext();
var notas = [];
var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//var teclas = 27;
function jsNota(obj, frecuencia) {
  var o = context.createOscillator();
  g = context.createGain();
  o.connect(g);
  o.type = "sawtooth";
  o.frequency.value = frecuencia;
  g.connect(context.destination);
  o.start(0);
  g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1.5);

  var nota = obj.id;
  if (nota == "do") {
    console.log("Es dooo");
    document.getElementById("re").style.pointerEvents = "none";
  }
  
  if (nota == "re") {
    console.log("Es dooo");
    document.getElementById("mi").style.pointerEvents = "none";
  }

  if (nota == "mi") {
    console.log("Es dooo");
    document.getElementById("fa").style.pointerEvents = "none";
  }

  if (nota == "fa") {
    console.log("Es dooo");
    document.getElementById("sol").style.pointerEvents = "none";
  }

  if (nota == "sol") {
    console.log("Es dooo");
    document.getElementById("la").style.pointerEvents = "none";
  }

  if (nota == "la") {
    console.log("Es dooo");
    document.getElementById("si").style.pointerEvents = "none";
  }


  var cont = 0;
  notas.push(nota)

  var valor = "valor" + cont;
  document.getElementById(valor).innerHTML = num;
  cont = cont + 1;
  if (notas.length <= 4) {
    var num = Math.floor(Math.random() * nums.length);
    let pos = nums.indexOf('num');
    nums.splice(pos, 1);
    for (var i = 0; i < notas.length; i++) {
      var nota = "nota" + (i + 1);
      document.getElementById(nota).value = notas[i];
    }
    //teclas = teclas - 1;
    obj.style.visibility = "hidden";
    //piano.style.width = teclas+"em";
  }
}
