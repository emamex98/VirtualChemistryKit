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
  
    //THREE.Axes;
    
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

    setUpMouseHander(canvas,doMouseDown,doMouseMove);
    setUpTouchHander(canvas,doMouseDown,doMouseMove);

    // ACTION
    requestAnimationFrame(renderLoop);              // RENDER LOOP

    document.getElementById("animation-controls").style.display = "none";
    
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

function setUpMouseHander(element, mouseDownFunc, mouseDragFunc, mouseUpFunc) {
    /*
        element -- either the element itself or a string with the id of the element
        mouseDownFunc(x,y,evt) -- should return a boolean to indicate whether to start a drag operation
        mouseDragFunc(x,y,evt,prevX,prevY,startX,startY)
        mouseUpFunc(x,y,evt,prevX,prevY,startX,startY)
    */
    if (!element || ! mouseDownFunc || !(typeof mouseDownFunc == "function")) {
        throw "Illegal arguments in setUpMouseHander";
    }
    if (typeof element == "string") {
        element = document.getElementById(element);
    }
    if (!element || !element.addEventListener) {
        throw "first argument in setUpMouseHander is not a valid element";
    }
    var dragging = false;
    var startX, startY;
    var prevX, prevY;
    function doMouseDown(evt) {
        if (dragging) {
            return;
        }
        var r = element.getBoundingClientRect();
        var x = evt.clientX - r.left;
        var y = evt.clientY - r.top;
        prevX = startX = x;
        prevY = startY = y;
        dragging = mouseDownFunc(x,y,evt);
        if (dragging) {
            document.addEventListener("mousemove",doMouseMove);
            document.addEventListener("mouseup",doMouseUp);
        }
    }
    function doMouseMove(evt) {
        if (dragging) {
            if (mouseDragFunc) {
                var r = element.getBoundingClientRect();
                var x = evt.clientX - r.left;
                var y = evt.clientY - r.top;
                mouseDragFunc(x,y,evt,prevX,prevY,startX,startY);
            }
            prevX = x;
            prevY = y;
        }
    }
    function doMouseUp(evt) {
        if (dragging) {
            document.removeEventListener("mousemove",doMouseMove);
            document.removeEventListener("mouseup",doMouseUp);
            if (mouseUpFunc) {
                var r = element.getBoundingClientRect();
                var x = evt.clientX - r.left;
                var y = evt.clientY - r.top;
                mouseUpFunc(x,y,evt,prevX,prevY,startX,startY);
            }
            dragging = false;
        }
    }
    element.addEventListener("mousedown",doMouseDown);
}

function setUpTouchHander(element, touchStartFunc, touchMoveFunc, touchEndFunc, touchCancelFunc) {
    /*
        element -- either the element itself or a string with the id of the element
        touchStartFunc(x,y,evt) -- should return a boolean to indicate whether to start a drag operation
        touchMoveFunc(x,y,evt,prevX,prevY,startX,startY)
        touchEndFunc(evt,prevX,prevY,startX,startY)
        touchCancelFunc()   // no parameters
    */
    if (!element || ! touchStartFunc || !(typeof touchStartFunc == "function")) {
        throw "Illegal arguments in setUpTouchHander";
    }
    if (typeof element == "string") {
        element = document.getElementById(element);
    }
    if (!element || !element.addEventListener) {
        throw "first argument in setUpTouchHander is not a valid element";
    }
    var dragging = false;
    var startX, startY;
    var prevX, prevY;
    function doTouchStart(evt) {
        if (evt.touches.length != 1) {
            doTouchEnd(evt);
            return;
        }
        evt.preventDefault();
        if (dragging) {
            doTouchEnd();
        }
        var r = element.getBoundingClientRect();
        var x = evt.touches[0].clientX - r.left;
        var y = evt.touches[0].clientY - r.top;
        prevX = startX = x;
        prevY = startY = y;
        dragging = touchStartFunc(x,y,evt);
        if (dragging) {
            element.addEventListener("touchmove",doTouchMove);
            element.addEventListener("touchend",doTouchEnd);
            element.addEventListener("touchcancel",doTouchCancel);
        }
    }
    function doTouchMove(evt) {
        if (dragging) {
            if (evt.touches.length != 1) {
                doTouchEnd(evt);
                return;
            }
            evt.preventDefault();
            if (touchMoveFunc) {
                var r = element.getBoundingClientRect();
                var x = evt.touches[0].clientX - r.left;
                var y = evt.touches[0].clientY - r.top;
                touchMoveFunc(x,y,evt,prevX,prevY,startX,startY);
            }
            prevX = x;
            prevY = y;
        }
    }
    function doTouchCancel() {
        if (touchCancelFunc) {
            touchCancelFunc();
        }
    }
    function doTouchEnd(evt) {
        if (dragging) {
            dragging = false;
            element.removeEventListener("touchmove",doTouchMove);
            element.removeEventListener("touchend",doTouchEnd);
            element.removeEventListener("touchcancel",doTouchCancel);
            if (touchEndFunc) {
                touchEndFunc(evt,prevX,prevY,startX,startY);
            }
        }
    }
    element.addEventListener("touchstart",doTouchStart);
}