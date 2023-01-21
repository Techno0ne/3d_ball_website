// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer();

//change size of the renderer
renderer.setSize( window.innerWidth, window.innerHeight );

// Add the renderer's output to the HTML element that will hold the 3D ball
document.getElementById("ball-container").appendChild( renderer.domElement );

// Create a texture for the background
const textureLoader = new THREE.TextureLoader();
textureLoader.load('https://picsum.photos/200/300', function (texture) {
    // Create a plane for the background
    const planeGeometry = new THREE.PlaneGeometry(6, 6, 0);
    const planeMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const backgroundPlane = new THREE.Mesh(planeGeometry, planeMaterial);

    // Set the position of the plane
    backgroundPlane.position.z = -1;

    // Add the background plane to the scene
    scene.add(backgroundPlane);
});

// Create a geometry for the ball
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Create a material for the ball
const material = new THREE.MeshPhongMaterial( {color: 0xffff00, shininess: 100} );

// Create the ball
const ball = new THREE.Mesh( geometry, material );

// Position the camera
camera.position.z = 5;

// Create a light source
const light = new THREE.PointLight(0xFFFFFF);
light.position.set(10, 10, 10);
scene.add(light);

// Add the ball to the scene
scene.add(ball);

// Add the background plane to the scene
//scene.add(backgroundPlane);

// Create a small sphere geometry
const dotGeometry = new THREE.SphereGeometry(0.1, 32, 32);

// Create a red material for the dots
const dotMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

// Create an array to store the dots
const dots = [];

// Create the dots
for (let i = 0; i < 36; i++) {
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    dot.position.x = Math.sin(i * 10 * Math.PI / 180) * 1;
    dot.position.y = Math.cos(i * 10 * Math.PI / 180) * 1;
    dot.position.z = 1;
    ball.add(dot);
    dots.push(dot);
}

// This will ensure that the animation starts only after the page has fully loaded, which should give the browser enough time to set up the canvas correctly.
window.onload = function() {

// Animate function
function animate() {
    requestAnimationFrame( animate );
    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;

    // Update the position of the dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].position.x = ball.position.x + Math.sin(i * 10 * Math.PI / 180 + Date.now() * 0.001) * 1.2;
        dots[i].position.y = ball.position.y + Math.cos(i * 10 * Math.PI / 180 + Date.now() * 0.001) * 1.2;
        dots[i].position.z = ball.position.z - 0;
        dots[i].scale.set(1.5, 1.5, 1.5);
        dots[i].lookAt(ball.position);
    }

    renderer.render( scene, camera );
}

// animate the ball
animate();
}
