var context = new AudioContext();
var notas = [];
var teclas = 27;
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
  notas.push(nota);
  if (notas.length <= 4) {
    for (var i = 0; i < notas.length; i++) {
      var palabra = "nota";
      var orden = "orden";
      palabra = palabra + "" + i;
      orden = orden + "" + i;
      document.getElementById(orden).innerHTML = i + 1;
      document.getElementById(palabra).innerHTML = notas[i];
    }
    teclas = teclas - 1;
    obj.style.visibility = "hidden";
    //piano.style.width = teclas+"em";
  } else {
  }
}

