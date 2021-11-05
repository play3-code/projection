// svg_export

let geodata;
let treeData;

let projection;
let zoom = 1000000;

function preload() {
  geodata = loadJSON("lucerne-trees.json");
}

function setup() {
  createCanvas(900, 650);

  treeData = geodata.features;
  console.log(treeData.length);

  projection = d3
    .geoMercator()
    .center([8.30801, 47.04554])
    .translate([width / 2, height / 2])
    .scale(zoom);

  noLoop();
}

function draw() {
  background(255);
  drawTrees();
}

function keyTyped() {
  if (key == "1") {
    zoom -= 100000;
  }
  if (key == "2") {
    zoom += 100000;
  }
  projection.scale(zoom);
  redraw();
}

function drawTrees() {
  for (let i = 0; i < treeData.length; i++) {
    let treeObject = treeData[i];

    let coordinates = treeObject.geometry.coordinates;
    let lat = coordinates[1];
    let lon = coordinates[0];

    let projcoords = projection(coordinates);
    // console.log("projcoords", projcoords);

    let x = projcoords[0];
    let y = projcoords[1];

    // let x = map(lon, bounds.left, bounds.right, 0, width);
    // let y = map(lat, bounds.top, bounds.bottom, 0, height);

    fill(0);
    noStroke();
    ellipse(x, y, 3, 3);
  }
}
