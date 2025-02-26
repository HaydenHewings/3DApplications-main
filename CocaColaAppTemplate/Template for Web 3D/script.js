var scene, camera, renderer, clock, mixer, actions = [], mode, isWireframe = false;
let loadedModel;
let secondModelMixer, secondModelActions = [];

init();

function init() {
  const assetPath = './'; // Path to assets
  

clock = new THREE.Clock();
  

// Create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x00aaff);
  
  // Set up the camera
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(-5, 25, 20);

  
// Add lighting
  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(ambient);
  
  const light = new THREE.DirectionalLight(0xFFFFFF, 2);
  light.position.set(0, 10, 2);
  scene.add(light);
  
  // Set up the renderer
  const canvas = document.getElementById('threeContainer');
  renderer = new THREE.WebGLRenderer({ canvas: canvas});
  renderer.setPixelRatio(window.devicePixelRatio);
  resize();


  // Add OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(1, 2, 0);
  controls.update();
  
  // Button to control animations
  mode = 'open';
  const btn = document.getElementById("btn");
  btn.addEventListener('click', function() {
    if (actions.length === 2) {
      if (mode === "open") {
        actions.forEach(action => {
          action.timeScale = 1;
          action.reset();
          action.play();
        });
      }
    }
  });
  
  const wireframeBtn = document.getElementById("toggleWireframe");
  wireframeBtn.addEventListener('click', function () {
isWireframe = !isWireframe;
toggleWireframe(isWireframe);

  });

  const playSecondModelAnimationBtn = document.getElementById("playSecondModelAnimation");
  playSecondModelAnimationBtn.addEventListener('click', function () {

if(secondModelActions.length>0){
secondModelActions.forEach(action => {
  action.reset();
  action.setLoop(THREE.LoopOnce);
  action.clampWhenFinished = true;
  action.play();
});

} else {
  console.warn('No animation available for the second model');
}

});

const loader = new THREE.GLTFLoader();
function loadModel(modelPath) {
if(loadedModel) {
  scene.remove(loadedModel);
}

loader.load(modelPath, function (gltf) {
const model = gltf.scene;

model.position.set(0, 0, 0);

scene.add(model);

loadedModel = model;

mixer = newTHREE.AnimationMixer(model);
const animations = gltf.animations;
action = [];

animations.forEach(clip=>{
const action = mixer.clipAction(clip);
actions.push(actions);

});

if(modelPath === 'assets/models/CanModelCrush.glb') {
secondModelMixer = mixer;
secondModelActions = actions;

}

});

}

loadModel('assets/models/CanModel.glb');

const switchBtn = document.getElementById("switchModel");
switchBtn.addEventListener('click', function () {
loadModel('assets/models/CanModelCrush.glb')

});

 
  // Handle resizing
  window.addEventListener('resize', resize, false);
  
  // Start the animation loop
  animate();
}

function toggleWireframe(enable) {
  scene.traverse(function (object) {
if (object.isMesh) {
  object.material.wireframe = enable;
}

  })
}


function animate() {
  requestAnimationFrame(animate);

  // Update animations
  if (mixer) {
    mixer.update(clock.getDelta());
    if (secondModelMixer) secondModelMixer.update(clock.getDelta());
  }

  renderer.render(scene, camera);
}

function resize() {
  const canvas = document.getElementById('threeContainer');
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

