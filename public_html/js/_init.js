
window.onload = init;

Mine = {};

function init(){

	loadModels();
	addEvents();
}

function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

}


function addEvents(){

	window.addEventListener( 'resize', onWindowResize, false );
	
	document.addEventListener('keydown', function( ev ) {
					switch ( ev.keyCode ) {
						case 37: // left
							Mine.left();
							break;

						case 38: // up
							Mine.up();
							break;

						case 39: // right
							Mine.right();
							break;

						case 40: // down
							Mine.down();
							break;
					}
				}, false );
				document.addEventListener('keyup', function( ev ) {
					switch ( ev.keyCode ) {
						case 37: // left
							
							break;

						case 38: // forward
							
							break;

						case 39: // right
							
							break;

						case 40: // back
							
							break;
					}
				}, false );
}