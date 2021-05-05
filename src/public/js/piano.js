var context = new AudioContext();
var notas = [];
var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//var teclas = 27;
function jsNota(obj, frecuencia) {
<<<<<<< HEAD
    var o = context.createOscillator();
    g = context.createGain();
    o.connect(g);
    o.type = "sawtooth";
    o.frequency.value = frecuencia;
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1.5);

    var nota = obj.id;
    if(nota=="do"){
        console.log("Es dooo");
        document.getElementById("re").style.pointerEvents="none";

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
=======
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

>>>>>>> 9382b48f73f118b24d8969f1c6027b93fc3398f0
