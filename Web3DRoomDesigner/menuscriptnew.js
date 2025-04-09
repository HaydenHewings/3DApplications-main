var loader = new THREE.Loader(); // Whichever ThreeJS loader you are using
var modelPaths = ['assets/models/BedroomBaseA.glb', 'assets/models/BedroomBaseB.glb', 'assets/models/BedroomBaseC.glb']; // Array to store all model paths
var currentPathIndex = 0; // index in the path array of the currently showing model
var currentModel; // stores the model that is currently displaying
loadModel(currentPathIndex);

function loadModel(index){
	if(currentModel){
		scene.remove(currentModel); //remove the current model
	}

	loader.load(modelPaths[index], (result) => {
		currentModel = result;
		scene.add(result);
	} );
}

function next(){
  currentPathIndex ++;
  loadModel(currentPathIndex);
}