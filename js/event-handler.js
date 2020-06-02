function modeChange(ev){
  if(document.getElementById('mode').checked){
    //ANIMATION
    controls.enabled = true;
    document.getElementById("transform").style.display = "none";

    document.getElementById("animation-controls").style.display = "block";
    document.getElementById("edit-controls").style.display = "none";
    document.getElementById("edit-controls-2").style.display = "none";

    animationMode = true;
  } else {
    //EDITION
    controls.enabled = false;
    document.getElementById("transform").style.display = "inline";

    document.getElementById("animation-controls").style.display = "none";
    document.getElementById("edit-controls").style.display = "block";
    document.getElementById("edit-controls-2").style.display = "block";

    animationMode = false;
    stopAnimation(null)
  }
}


var renderer;
var start = false;

function startAnimation(event){
  if(!start){
    animate();
  }
  start = true;

  }

  function animate(){
    id = requestAnimationFrame( animate );
    molecule.rotation.y += .010;
    render();
  }


function stopAnimation(event){
  start = false;
  cancelAnimationFrame( id );
}

function resetAnimation(event) {
  for(var i = 0; i < animationObjects.length; i++){
    animationObjects[i].rotation.set(0., 0., 0.);
  }
  //start = false;
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
      
    }
    else if (evt == 2) {
      if (selectedObj != null) {
      }

      while(scene.children.length > 0){
        scene.remove(scene.children[0]);
      }
      molecule = new Molecule();
      objId = 0;
      document.getElementById("controlitos-2").innerHTML = "";
      document.getElementById("shape-name").innerText = "";
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
        // Restart scene
        scene = new THREE.Scene();
        scene.add(camera);
        scene.add(light);
        scene.add(directLight);
        objId = 0;
        document.getElementById("controlitos-2").innerHTML = "";

        // H2O molecule
         molecule = new Molecule();

        // Create atoms
        var oxigen = new Atom("oxigen", 1, [1, 0, 0])
        var hidrogen1 = new Atom("h1", 0.7, [1, 1, 1])
        var hidrogen2 = new Atom("h2", 0.7, [1, 1, 1])

        // Add atoms to molecule
        molecule.addAtom(oxigen, null, null);
        molecule.addAtom(hidrogen1, "oxigen", "up");
        molecule.addAtom(hidrogen2, "oxigen", "right");

        scene.add(molecule);
        molecule.name = "H2O";
        sceneReady = true;
    }

    else if (evt == 12) {
        // Restart scene
        scene = new THREE.Scene();
        scene.add(camera);
        scene.add(light);
        scene.add(directLight);
        objId = 0;
        document.getElementById("controlitos-2").innerHTML = "";

        // Alcohol molecule (CH3CH2OH)
        molecule = new Molecule();

        var carbon1 = new Atom("carbon1", 1, [0.25, 0.25, 0.25]);
        var carbon2 = new Atom("carbon2", 1, [0.25, 0.25, 0.25]);
        var hidrogen1 = new Atom("hidrogen1", 0.7, [1, 1, 1]);
        var hidrogen2 = new Atom("hidrogen2", 0.7, [1, 1, 1]);
        var hidrogen3 = new Atom("hidrogen3", 0.7, [1, 1, 1]);
        var hidrogen4 = new Atom("hidrogen4", 0.7, [1, 1, 1]);
        var hidrogen5 = new Atom("hidrogen5", 0.7, [1, 1, 1]);
        var hidrogen6 = new Atom("hidrogen6", 0.7, [1, 1, 1]);
        var oxigen1 = new Atom("oxigen1", 1.0, [1, 0, 0]);

        // Add atoms to molecule
        molecule.addAtom(carbon2, null, null);
        molecule.addAtom(hidrogen4, "carbon2", "up");
        molecule.addAtom(hidrogen5, "carbon2", "down");
        molecule.addAtom(carbon1, "carbon2", "left");
        molecule.addAtom(hidrogen1, "carbon1", "left");
        molecule.addAtom(hidrogen2, "carbon1", "up");
        molecule.addAtom(hidrogen3, "carbon1", "down");
        molecule.addAtom(oxigen1, "carbon2", "right");
        molecule.addAtom(hidrogen6, "oxigen1", "right");

        scene.add(molecule);
        molecule.name = "alcohol";
        sceneReady = true;
    }
    else if(evt == 13){
      
        // Restart scene
        scene = new THREE.Scene();
        scene.add(camera);
        scene.add(light);
        scene.add(directLight);
        objId = 0;
        document.getElementById("controlitos-2").innerHTML = "";

        // Urea molecule
        molecule = new Molecule();

        var carbon = new Atom("carbon", 1, [0.25, 0.25, 0.25]);
        var hidrogen1 = new Atom("hidrogen1", 0.7, [1, 1, 1]);
        var hidrogen2 = new Atom("hidrogen2", 0.7, [1, 1, 1]);
        var hidrogen3 = new Atom("hidrogen3", 0.7, [1, 1, 1]);
        var hidrogen4 = new Atom("hidrogen4", 0.7, [1, 1, 1]);
        var nitrogen1 = new Atom("nitrogen1", 1.0, [0, 0, 1]);
        var nitrogen2 = new Atom("nitrogen2", 1.0, [0, 0, 1]);
        var oxigen = new Atom("oxigen", 1, [1, 0, 0]);

        // Add atoms to molecule
        molecule.addAtom(carbon, null, null);
        molecule.addAtom(oxigen, "carbon", "up");
        molecule.addAtom(nitrogen1, "carbon", "right");
        molecule.addAtom(nitrogen2, "carbon", "left");
        molecule.addAtom(hidrogen1, "nitrogen1", "right");
        molecule.addAtom(hidrogen2, "nitrogen1", "down");
        molecule.addAtom(hidrogen3, "nitrogen2", "left");
        molecule.addAtom(hidrogen4, "nitrogen2", "down");

        scene.add(molecule);
        molecule.name = "urea";
        sceneReady = true;

        //molecule.rotation.y += 5000;
       // render();
          }

    var animate = document.getElementById("animated").checked;
    if (animate) {
      animationObjects.push(mesh);
    }

    objId++;
}

function doMouseDown(x, y) {
    var a = 2*x/canvas.width - 1;
    var b = 1 - 2*y/canvas.height;
    raycaster.setFromCamera( new THREE.Vector2(a,b), camera );

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        if (isPredefinedMolecule(intersects[0].object.parent.name)){
            document.getElementById("controlitos-2").innerHTML = getContent(intersects[0].object.parent.name);
        }
        document.getElementById("shape-name").innerHTML = intersects[0].object.name;
        console.log(intersects[0].object.name + " " + mouse.x + " " + mouse.y + " " +intersects[0].object.position.x);
        selectedObj = intersects[0].object;
    }
}

function isPredefinedMolecule(name) {
    if(name == 'H2O' || name == 'alcohol' || name == 'urea'){
        return true;
    }
    return false;
}

function getContent(name) {
    switch (name) {
        case('H2O'):
            return "<H4>Molecule: "+name+"</H4>\n" +
                "            <p>\n" +
                "              La molécula H2O es un compuesto químico inorgánico formado por dos átomos\n" +
                "              de hidrógeno (H) y uno de oxígeno (O).<br>\n" +
                "              Esta molécula es escencial para los seres vivos, al servir para el metabolísmo\n" +
                "              de biomoléculas. <br>\n" +
                "              Es descrita comúnmente como solvente universal, dado que disuelve muchos\n" +
                "              compuestos sólidos, acuosos y gaseosos conocidos.\n" +
                "              \n" +
                "            </p>";
        case('alcohol'):
            return "<H4>Molecule: "+name+"</H4>\n" + "<p>\n" +
                "              Compuesto orgánico <br>" +
                "              El compuesto químico etanol, conocido como alcohol etílico, es un alcohol\n" +
                "              que en condiciones normales de presión y temperatura se presenta como un\n" +
                "              líquido incoloro e inflamable con una temperatura de ebullición de 78.4 °C.\n" +
                "              <br>\n" +
                "              Es una sustancia psicoactiva y es el principal tipo de alcohol presente en\n" +
                "              las bebidas alcohólicas, como el vino (alrededor de un 13 %), la cerveza\n" +
                "              (5 %), los licores (hasta un 50 %) o los aguardientes (hasta un 70 %).\n" +
                "              <br>\n" +
                "              El etanol se utiliza ampliamente en muchos sectores industriales y en el\n" +
                "              sector farmacéutico, como excipiente de algunos medicamentos y cosméticos.\n" +
                "            </p>";
        case('urea'):
            return "<H4>Molecule: "+name+"</H4>\n" + "<p>\n" +
                "              Compuesto orgánico. <br>\n" +
                "              La urea es un compuesto químico cristalino e incoloro;\n" +
                "              de fórmula CO(NH2)2. Se encuentra en mayor proporción en la\n" +
                "              orina, en el sudor y en la materia fecal. Es el principal\n" +
                "              producto terminal del metabolismo de las proteínas en el humano\n" +
                "              y en los demás mamíferos.\n" +
                "              <br>\n" +
                "              Se obtuvo originalmente mediante la síntesis de Wöhler, que fue\n" +
                "              diseñada en 1828 por el químico alemán Friedrich Wöhler, y fue la\n" +
                "              segunda sustancia orgánica obtenida artificialmente, luego del\n" +
                "              oxalato de amonio.\n" +
                "            </p>";
    }
}

function doMouseMove(x, y, evt, prevX, prevY) {
    // Do something
    return false;
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
  document.getElementById("mode").addEventListener("input", modeChange, false);
  document.getElementById("tbutton").addEventListener("click", translateObject);
  document.getElementById("sbutton").addEventListener("click", scaleObject);
  document.getElementById("rbutton").addEventListener("click", rotateObject);
  document.getElementById("start").addEventListener("click", startAnimation);
  document.getElementById("stop").addEventListener("click", stopAnimation);
  document.getElementById("reset").addEventListener("click", resetAnimation);
  document.getElementById("degrees").addEventListener("input", updateLabel, false);
  document.getElementById("animated").addEventListener("input", animateObject, false);
  //document.addEventListener('click', onMouseMove, false);
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

function newAtom(identifier)
{
    var atomToInsert;
    switch (identifier) {
        case('oxygen'):
            atomToInsert = new OxygenAtom();
            break;
        case ('carbon'):
            atomToInsert = new CarbonAtom();
            break;
        case('hidrogen'):
            atomToInsert = new HidrogenAtom();
            break;
        case('nitrogen'):
            atomToInsert = new NitrogenAtom();
            break;
    }
    if(molecule == null || molecule.atoms.size() == 0){
        // Restart scene
        scene = new THREE.Scene();
        scene.add(camera);
        scene.add(light);
        scene.add(directLight);

        // Alcohol molecule (CH3CH2OH)
        molecule = new Molecule();

        /*
                    atomsDict
        is a dictionary that keeps track on
        atoms connections. Every atom name (key) leads
        to a boolean array  of size 4, where its
        elements are listed as follows:
        [up, down, right, left]
        If an atom has a connection to another atom on
        up, then up is true, or false if not.
         */
        atomsDict = new Dictionary();
        objId == 0;
        atomsDict.set(atomToInsert.getName(), [false, false, false, false])
        molecule.addAtom(atomToInsert, null, null);
        molecule.name = "newMolecule"+objId;
        scene.add(molecule);
        sceneReady = true;

    }else{
        var atomSelectedName = selectedObj.getName();

        var direction = getCheckedDirection();
        var arrayDir = atomsDict.get(atomSelectedName);
        if (!arrayDir[oppositeDirection(direction)]){
            // Sets direction as taken.
            arrayDir[oppositeDirection(direction)] = true;
            atomsDict.set(atomSelectedName, arrayDir);

            // Insert in atomsDict the new atom
            var atomToInsertArray = [false, false, false, false];
            atomToInsertArray[direction] = true;
            atomsDict.set(atomToInsert.getName(), atomToInsertArray);

            molecule.addAtom(atomToInsert, atomSelectedName, directionName(direction));
        }
    }
    objId++;
}

function getCheckedDirection() {
    if(document.getElementById("dir1").checked){
        return 0;
    }else if(document.getElementById("dir2").checked){
        return 1;
    }else if(document.getElementById("dir3").checked){
        return 2;
    }else if(document.getElementById("dir4").checked){
        return 3;
    }else{
        return 0;
    }
}

function directionName(direction) {
    switch (direction) {
        case(0):
            return "up";
        case(1):
            return "down";
        case(2):
            return "right";
        case (3):
            return "left";
    }
}

function oppositeDirection(direction) {
    if (direction == 0){
        return 1
    }else if (direction == 1){
        return 0;
    }else if (direction == 2){
        return 3;
    }else{
        return 2;
    }
}

class Molecule extends THREE.Group{
    constructor() {
        super();
        this.atoms = new Dictionary();
    }

    addAtom(atom, connectionTo, direction){
        /**
         * @param {Atom}
         * atom to insert.
         * @param {string}
         * connectionTo: Name of an existent atom in Molecule. Leave empty if is first one.
         * @param {string}
         * direcction: means up, down, right or left, relative to connectionTo atom
         */
        if(connectionTo == null){
            this.atoms.set(atom.getName(), atom);
            this.add(atom);
        }else{
            var existentAtom = this.atoms.get(connectionTo);
            switch (direction) {
                case "up":
                    atom.position.x = existentAtom.position.x;
                    atom.position.y = existentAtom.position.y + existentAtom.size*2 + atom.size;
                    break;
                case "down":
                    atom.position.x = existentAtom.position.x;
                    atom.position.y = existentAtom.position.y - existentAtom.size*2 - atom.size;
                    break;
                case "right":
                    atom.position.x = existentAtom.position.x + existentAtom.size*2 + atom.size;
                    atom.position.y = existentAtom.position.y;
                    break;
                case "left":
                    atom.position.x = existentAtom.position.x - existentAtom.size*2 - atom.size;
                    atom.position.y = existentAtom.position.y;
                    break;
            }
            this.atoms.set(atom.getName(), atom);
            this.add(atom);
            this.add(new Connection(atom, existentAtom));
        }
    }
}

class Atom extends THREE.Mesh{
    constructor(name, size, rgbColor) {
        /**
         * @param {string}
            * name: unique name for the atom
         * @param {float}
            * size: Size of the Atom. Default size is 1
         * @param {array}
            * rgbColor: Colors in format 0-1. Ex: White = [1, 1, 1]
         */
        super(new THREE.SphereGeometry(0.5, 50, 50), new THREE.MeshBasicMaterial);
        this.material.color.setRGB(rgbColor[0], rgbColor[1], rgbColor[2]);
        this.name = name;
        this.size = size/2;
        this.scale.set(size, size, size);
    }

    getName(){
        return this.name;
    }
}

class OxygenAtom extends Atom{
    constructor() {
        super("oxygen"+objId, 1.0, [1, 0, 0]);
    }
}

class CarbonAtom extends Atom{
    constructor() {
        super("carbon"+objId, 1.0, [0.25, 0.25, 0.25]);
    }
}

class HidrogenAtom extends Atom{
    constructor() {
        super("hidrogen"+objId, 0.7, [1, 1, 1]);
    }

}

class NitrogenAtom extends Atom{
    constructor() {
        super("nitrogen1", 1.0, [0, 0, 1]);
    }
}

class Connection extends THREE.Mesh{
    constructor(obj1, obj2) {
        var connection1Geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
        super(connection1Geometry, new THREE.MeshBasicMaterial);
        this.material.color.setRGB(0.5, 0.5, 0.5);
        this.translateX((obj1.position.x+obj2.position.x)/2);
        this.translateY((obj1.position.y+obj2.position.y)/2);
        var escala = (obj1.size + obj2.size)
        this.scale.set(0.3, escala, 0.3);
        if(obj1.position.x == obj2.position.x)
        {
            this.rotation.set(0, 0, 0);
        }
        else if(obj1.position.x > obj2.position.x)
        {
            this.rotation.set(0, 0, -Math.PI/2);
        }
        else
        {
            this.rotation.set(0, 0, Math.PI/2);
        }
        if(obj1.position.z > obj2.position.z)
        {
            this.rotation.set(0, 0, -Math.PI/2);
        }
        else if(obj1.position.z < obj2.position.z)
        {
            this.rotation.set(0, 0, Math.PI/2);
        }
    }
}

class Dictionary {
        // Tomado de:
        // https://medium.com/@rodrwan/dictionaries-en-js-e2abd196f720

    constructor (){
        this.items = {}
    }

    has (key) {
        return this.items.hasOwnProperty(key)
    }

    set (key, value) {
        this.items[key] = value
    }

    remove (key) {
        if (this.has(key)) {
            delete this.items[key]
            return true
        }

        return false
    }

    get (key) {
        return this.has(key) ? this.items[key] : undefined
    }

    values () {
        const values = []
        for (let key in this.items) {
            if (this.has(key)) {
                values.push(this.items[key])
            }
        }
        return values
    }

    size () {
        return Object.keys(this.items).length
    }

    keys () {
        const keys = []
        for (let key in this.items) {
            keys.push(keys)
        }
        return keys

        // La forma corta de hacer esto y abusando de las bondades de javascript
        // es así:
        // return Object.keys(this.items)
    }

    getItems () {
        return this.items
    }
}
