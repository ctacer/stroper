var ModelLoader = function( callback, count ) {

  this.finishCallback = callback;

  this.loadedObjects = 0;
  this.totalObjects = count;
  
  this.textures = [];
  this.objects = [];
  
  this.load = function( params ) {

    var modelLoader = this;
    var loader = new THREE.JSONLoader();
    var callback = function( geometry ) {
      
      //geometry.materials[0].shading = THREE.SmoothShading;
      
      var object = {};
      object.material = geometry.materials[0];
      console.log(geometry.materials[0]);
      object.geometry = geometry;
      object.name = params.name;
      
      modelLoader.objects.push( object );
      
      modelLoader.loadedObjects++;
      if (modelLoader.totalObjects === modelLoader.loadedObjects)
        modelLoader.finishCallback();
    }
      
    loader.load( params.model, callback );

  }

  this.get = function( name ) {
    for ( var i = 0; i<this.objects.length; i++ ) {
      if ( this.objects[i].name === name )
        return this.objects[i];
    }
    
    return null;
  }
  
}