function inputRadioSquareEventListener(evt){
  
  if(document.getElementById('animation').checked){
    //ANIMATION
    controls.enabled = true;
    document.getElementById("transform").style.display = "none";
    animationMode = true;
  }else{
    //EDITION
    controls.enabled = false;
    document.getElementById("transform").style.display = "block";
    animationMode = false;
  }
  
}

function startAnimation(event){
  start = true;
}

function stopAnimation(event){
  start = false;
}

function resetAnimation(event) {
  for(var i = 0; i < animationObjects.length; i++){
    animationObjects[i].rotation.set(0., 0., 0.);
  }
}

function toolsEvent(evt) 
{
	// MODEL
    // GEOMETRY

    if (animationMode) {
      return;
    }

    if (evt == 1) {

      // CUBE
      var geometry = new THREE.BoxGeometry();   

      // MESH (GEOMETRY + MATERIAL)
      mesh = new THREE.Mesh(geometry, material);
      mesh.name = "cube"+objId;
      scene.add(mesh);
      sceneReady = true;
      
    } else if (evt == 2) {
      if (selectedObj != null) {
        scene.remove(selectedObj);
      }
    }
    
    else if (evt == 3) {

      // PLANE
      var planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
      var plane = new THREE.Mesh(planeGeometry, material);
      plane.name = "piso";
      plane.rotation.x = -1.3;// * Math.PI;

      scene.add(plane);
      sceneReady = true;
    } 

    else if (evt == 4) {

      Swal.fire({
        title: 'Select a material',
        imageUrl: './imgs/materials.png',
        imageHeight: 123,
        imageWidth: 600,
        html:
          '<input type="radio" id="wireframe" name="material" onclick="ChangeMaterial(0)"><label for="male">Wireframe</label>' +
          '<input type="radio" id="normal" name="material" onclick="ChangeMaterial(1)"><label for="male">Normal</label>' +
          '<input type="radio" id="basic" name="material" onclick="ChangeMaterial(2)"><label for="male">Basic</label>' +
          '<input type="radio" id="lambert" name="material" onclick="ChangeMaterial(3)"><label for="female">Lambert</label>' +
          '<input type="radio" id="phong" name="material" onclick="ChangeMaterial(4)"><label for="other">Phong</label>' +
          '<input type="radio" id="texture" name="material" onclick="ChangeMaterial(5)"><label for="other">Image Texture</label>',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Done',
      });

    } 

    else if (evt == 5) {

      // CONE
      var geometry = new THREE.ConeGeometry(1, 2, 50);
       
      mesh = new THREE.Mesh(geometry, material);
      mesh.name = "cono"+objId;

      scene.add(mesh); 
      sceneReady = true;


    }

    else if (evt == 6) {

      Swal.fire({
        title: 'Select a camera',
        html:
          '<input type="radio" id="wireframe" name="camera" onclick="changeCamera(0)"><label for="male">Perspective</label>' +
          '<input type="radio" id="texture" name="camera" onclick="changeCamera(1)"><label for="other">Ortographic</label>',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Done',
      });

    }
    
    else if (evt == 7) {

      // CYLINDER
      var geometry = new THREE.CylinderGeometry( 0.5, 0.5, 1,32);
      //var material = material;

      mesh = new THREE.Mesh(geometry, material);
      mesh.name = "cilindro"+objId;

      scene.add(mesh);
      sceneReady = true;
    }
    else if (evt == 8) {
      var bigSphereGeometry = new THREE.SphereGeometry(1., 10, 10);
    var bigSphere = new THREE.Mesh(bigSphereGeometry, material);
    bigSphere.name = "bigS";
    // LITTLE SPHERE
    var littleSphereGeometry = new THREE.SphereGeometry(1., 10, 10);
    var littleSphere = new THREE.Mesh(littleSphereGeometry, material);
    littleSphere.name = "lilS";

    // MODEL TRANSFORM
    bigSphere.position.set(0., 0., 0.);
    // LITTLE SPHERE
    littleSphere.position.set(0., 1.5, 0.);
    littleSphere.scale.set(0.5, 0.5, 0.5);

    // GROUP
    snowMan= new THREE.Group();
    snowMan.add(bigSphere);
    snowMan.add(littleSphere);
    snowMan.name = "snowman";
    snowMans.push(snowMan);

    scene.add(snowMan);
    sceneReady = true;
    }

    else if (evt == 9) {

      //SPHERE
      var geometry = new THREE.SphereGeometry(0.5, 50, 50);

      mesh = new THREE.Mesh(geometry, material);
      mesh.name = "sphere"+objId;
      scene.add(mesh); 
      sceneReady = true;
    }

    else if (evt == 11) {

      // PYRAMID
      var geometry = new THREE.ConeGeometry(1.5, 2, 3);     

      mesh = new THREE.Mesh(geometry, material);
      mesh.name = "pyramid"+objId;

      scene.add(mesh); 
      sceneReady = true;
    }

    var animate = document.getElementById("animated").checked;
    if (animate) {
      animationObjects.push(mesh);
    }

    objId++;
}

function onMouseMove( event ) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );

  if (intersects.length > 0) {
    document.getElementById("shape-name").innerHTML = intersects[0].object.name;
    console.log(intersects[0].object.name);
    selectedObj = intersects[0].object;
    
  }

}

function animateObject(event) {
  if (selectedObj != null) {
    var animate = document.getElementById("animated").checked;

    if (animate) {
      var found = false;
      for(var i = 0; i<animationObjects.length; i++) {
        if( animationObjects[i].name == selectedObj.name){
          found = true;
          break;
        }
      }
      if (!found) {
        animationObjects.push(selectedObj);
      }
    } else {
      for(var i = 0; i<animationObjects.length; i++) {
        if( animationObjects[i].name == selectedObj.name){
          animationObjects.splice(i,1);
          break;
        }
      }
    }
  }
}

function translateObject(event) {
  if (selectedObj != null) {
    var x = document.getElementById("tx").value;
    var y = document.getElementById("ty").value;
    var z = document.getElementById("tz").value;

    selectedObj.position.set(x, y , z);
  }
}

function scaleObject(event) {
  if (selectedObj != null) {
    var x = document.getElementById("sx").value;
    var y = document.getElementById("sy").value;
    var z = document.getElementById("sz").value;

    selectedObj.scale.set(x, y, z);
  }
}

function updateLabel(event) {
  document.getElementById("ldeg").innerHTML = document.getElementById("degrees").value;
}

function rotateObject(event) {
  if (selectedObj != null) {
    var deg = document.getElementById("degrees").value
    selectedObj.rotation.set(0., 0., Math.PI*deg);
  }
}


function initEventHandler(evt)
{
  document.getElementById("animation").addEventListener("input", inputRadioSquareEventListener, false);
  document.getElementById("edition").addEventListener("input", inputRadioSquareEventListener, false);
  document.getElementById("tbutton").addEventListener("click", translateObject);
  document.getElementById("sbutton").addEventListener("click", scaleObject);
  document.getElementById("rbutton").addEventListener("click", rotateObject);
  document.getElementById("start").addEventListener("click", startAnimation);
  document.getElementById("stop").addEventListener("click", stopAnimation);
  document.getElementById("reset").addEventListener("click", resetAnimation);
  document.getElementById("degrees").addEventListener("input", updateLabel, false);
  document.getElementById("animated").addEventListener("input", animateObject, false);
  document.addEventListener('click', onMouseMove, false);
}

function ChangeMaterial(value)
{
  if (value == 0){
    material = new THREE.MeshBasicMaterial({color: color, wireframe: true});
  } else if (value == 1){
    material = new THREE.MeshNormalMaterial(); 
  } else if (value == 2){
    material = new THREE.MeshBasicMaterial({color: color}); 
  } else if (value == 3){
    material = new THREE.MeshLambertMaterial({color: color}); 
  } else if (value == 4){
    material = new THREE.MeshPhongMaterial({color: color, shininess: 100}); 
  } else if (value == 5){
    var loader = new THREE.TextureLoader();
    material = new THREE.MeshPhongMaterial({map: loader.load('../imgs/texture.jpg'), shininess: 100}); 
  }
  materialNum = value;
}

function colorPaletteEvent() {
  color = document.getElementById("vertexColour").colorValue.value;
  ChangeMaterial(materialNum);
}

function changeCamera(value) {
  if (value == 0){
    camera = cameraP;   
  } else if (value == 1){
    camera = cameraO;  
  }
}
