var context = new AudioContext();
var notas = [];
var miarray = [1,2,3,4,5,6,7,8,9];
miarray = miarray.sort(function() {return Math.random() - 0.5});

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
  notas.push(nota)

  if (nota == "do") {
    document.getElementById("re").style.pointerEvents = "none";
    document.getElementById("re").style.background = "#FFB2B2";
  }

  if (nota == "re") {
    document.getElementById("mi").style.pointerEvents = "none";
    document.getElementById("mi").style.background = "#FFB2B2";
  }

  if (nota == "mi") {
    document.getElementById("fa").style.pointerEvents = "none";
    document.getElementById("fa").style.background = "#FFB2B2";
    document.getElementById("re").style.pointerEvents = "all";
    document.getElementById("re").style.background = "#FFFFFF";
  }

  if (nota == "sol") {
    document.getElementById("la").style.pointerEvents = "none";
    document.getElementById("la").style.background = "#FFB2B2";
  }

  if (notas.length <= 4) {

    for (var i = 0; i < notas.length; i++) {
      var nota = "nota" + (i + 1);
      var valor = "valor" + i;
      document.getElementById(nota).value = notas[i];
      document.getElementById(valor).value = miarray[i];
    }
    obj.style.pointerEvents = "none";
    obj.style.background = "#CFE2CA";
  }
}