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
const material = new THREE.MeshPhongMaterial( {color: 0xffff00, shininess: 100} );

// Create the ball
const ball = new THREE.Mesh( geometry, material );

// Add the ball to the scene
scene.add(ball);

// Position the camera
camera.position.z = 5;

// Create a light source
const light = new THREE.PointLight(0xFFFFFF);
light.position.set(10, 10, 10);
scene.add(light);

// Create a red strip material
const stripMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});

// Create the strips
const stripGeometry = new THREE.BoxGeometry(0.1, 1, 1);
const strips = [];

for (let i = 0; i < 36; i++) {
    const strip = new THREE.Mesh(stripGeometry, stripMaterial);
    strip.position.x = Math.sin(i * 10 * Math.PI / 180) * 0.8;
    strip.position.y = Math.cos(i * 10 * Math.PI / 180) * 0.8;
    strip.position.z = 0;
    strip.rotation.z = i * 10 * Math.PI / 180;
    strip.updateMatrix();
    geometry.merge(strip.geometry, strip.matrix);
    strips.push(strip);
}

// Update the ball's geometry
ball.geometry = geometry;

// Animate function
function animate() {
    requestAnimationFrame( animate );
    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;
    renderer.render( scene, camera );
}
animate();
