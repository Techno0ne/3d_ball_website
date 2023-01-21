// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

// Add the renderer's output to the HTML element that will hold the 3D ball
document.getElementById("ball-container").appendChild( renderer.domElement );

// Create a geometry for the ball
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Create a material for the ball
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );

// Create the ball
const ball = new THREE.Mesh( geometry, material );

// Add the ball to the scene
scene.add(ball);

// Position the camera
camera.position.z = 5;

// Animate function
function animate() {
    requestAnimationFrame( animate );
    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;
    renderer.render( scene, camera );
}
animate();