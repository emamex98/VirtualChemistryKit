"use strict"
var canvas;
var renderer;
var scene;
var camera, cameraP, cameraO;
var light, directLight;
var mesh;
var sceneReady = false;
var material, materialNum;
var controls;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var selectedObj;
var color;
var animationObjects;
var animationMode = false;
var start = false;
var objId;
var snowMan;
var snowMans;

function main()
{
    // RENDERER
    canvas = document.getElementById("canvas");
    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize(canvas.width, canvas.height);
    renderer.setClearColor("black");
    
    animationObjects = [];
    snowMans = [];
    objId = 0;

    // LIGHTS
    light = new THREE.AmbientLight();    
    directLight = new THREE.DirectionalLight( 0xffffff );
    directLight.position.set( 0, 1, 1 ).normalize();

    // CAMERAS
    const left = -1;
    const right = 1;
    const top = 1;
    const bottom = -1;
    const near = 10;
    const far = -30;

    cameraP = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    cameraO = new THREE.OrthographicCamera(left, right, top, bottom, near, far);

    camera = cameraP;
    camera.position.set(0., 3., 5.);   
  
    THREE.Axes;
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    
    // SCENE
    scene = new THREE.Scene();                                 
    scene.add(camera);
    scene.add(light);
    scene.add(directLight);

    material = new THREE.MeshNormalMaterial(); 
    materialNum = 1;
    color = 0x6134eb;

    // EVENTS
    initEventHandler();

    // ACTION
    requestAnimationFrame(renderLoop);              // RENDER LOOP
    
}
       
function renderLoop() {
    if(sceneReady)
    {
         renderer.render(scene, camera);
         if (mesh!=null && animationMode && start){
             for(var i=0;i<animationObjects.length;i++){
                 animationObjects[i].rotation.x = animationObjects[i].rotation.x + 0.01;
                 animationObjects[i].rotation.y = animationObjects[i].rotation.y + 0.01;
             }
            //mesh.rotation.x = mesh.rotation.x + 0.01;
            //mesh.rotation.y = mesh.rotation.y + 0.01;
         }
    }
    requestAnimationFrame(renderLoop);
}