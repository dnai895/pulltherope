var interval;
var cuerda;
var contador=0;
var POSICION_GLOBAL;
var cuentaAtras;
var intCuentAtras;

function preparate(){
	$('#start').hide();
	$('#end').hide();
	$('#game').hide();
	$('#cuentaAtras').show();
	var i = 3;
	$('#tiempo').html(i);
	intCuentAtras = setInterval(function(){
		$('#tiempo').html(i-1);
		i-=1;
		if(i==0){
			play();
		}
		console.log(i);
	},1000);
};

function moverConTecla() {
    	var a = ($('#cuerdaSuperior').css('left'));
     	a = a.split('p');
     	document.getElementById('cuerdaSuperior').style.left = (a[0] - 6) + 'px';
     	contador -= 1;
     	console.log(contador);
     	if(contador<=(-15)){fin(contador);}
	};

function restart(){
	contador = 0;
	console.log(POSICION_GLOBAL);
	$('#cuerdaSuperior').css('left', POSICION_GLOBAL);
		$('#end').hide();
		$('#game').show();
		preparate();
};

function teclaListener(tecla){
		console.log(tecla);
		if (tecla.keyCode == 74) { 
			moverConTecla();
		};
};

function fin(resultado){
	$(document).unbind("keyup",teclaListener);	
	clearInterval(interval);		
	var mensaje;
	if(resultado>0){
		mensaje = 'PERDIDO';
	}else{mensaje='GANADO';}
	$('#textoRes').html('HAS '+mensaje);
	$('#game').hide();
	$('#end').show();
};

function play(){
	clearInterval(intCuentAtras);
	$('#cuentaAtras').hide();
	$('#game').show();

	$(document).keyup(teclaListener);
	interval = setInterval(function() {
 		var a = ($('#cuerdaSuperior').css('left'));
 		a = a.split('p');
 		console.log(a[0]);
     	document.getElementById('cuerdaSuperior').style.left = (parseInt(a[0]) + 6) + 'px';
     	contador += 1;
     	console.log(contador);
     	if(contador>=15){fin(contador);}
	},280);
};		

$( document ).ready(function(){
	POSICION_GLOBAL = ($('#cuerdaSuperior').css('left'));
	$('#cuentaAtras').hide();
	$('#game').hide();
	$('#end').hide();
});<