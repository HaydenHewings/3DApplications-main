var scene, camera, renderer, clock, mixer, actions = [], mode, isWireframe = false;

init();

function init() {
  const assetPath = './'; // Path to assets
  

clock = new THREE.Clock();
  

// Create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(c4f5f5);
  
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
  
  const wireframeBtn = document.getElementById("toggleWireframe");
  wireframeBtn.addEventListener('click', function () {
isWireframe = !isWireframe;
toggleWireframe(isWireframe);

  });

    // Load the glTF model
  const loader = new THREE.GLTFLoader();
  loader.load(assetPath + 'assets/models/RoomAAA.glb', function(gltf) {
    const model = gltf.scene;
    scene.add(model);

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