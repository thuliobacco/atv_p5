let topoColorido = false;
let topoR = 0;
let topoG = 0;
let topoB = 0;

let esquerdaPreto = false;
let direitaPreto = false;
let baixoPreto = false;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(245);
  noStroke();

  const cx = width / 2;
  const cy = height / 2;
  const margem = 6;

  const topo = { x: cx, y: margem };
  const direita = { x: width - margem, y: cy };
  const baixo = { x: cx, y: height - margem };
  const esquerda = { x: margem, y: cy };

  const quadrado = {
    x1: 150,
    y1: 155,
    x2: 450,
    y2: 445
  };

  const supEsq = { x: quadrado.x1, y: quadrado.y1 };
  const supDir = { x: quadrado.x2, y: quadrado.y1 };
  const infDir = { x: quadrado.x2, y: quadrado.y2 };
  const infEsq = { x: quadrado.x1, y: quadrado.y2 };

  // Triângulo superior: preto ou cor RGB aleatória
  if (topoColorido) {
    fill(topoR, topoG, topoB);
  } else {
    fill(8, 8, 10);
  }

  beginShape();
  vertex(topo.x, topo.y);
  vertex(supDir.x, supDir.y);
  vertex(supEsq.x, supEsq.y);
  endShape(CLOSE);

  // Triângulo esquerdo
  if (esquerdaPreto) {
    fill(0);
  } else {
    fill(0, 75, 235);
  }

  beginShape();
  vertex(esquerda.x, esquerda.y);
  vertex(supEsq.x, supEsq.y);
  vertex(infEsq.x, infEsq.y);
  endShape(CLOSE);

  // Triângulo direito
  if (direitaPreto) {
    fill(0);
  } else {
    fill(235, 22, 22);
  }

  beginShape();
  vertex(direita.x, direita.y);
  vertex(infDir.x, infDir.y);
  vertex(supDir.x, supDir.y);
  endShape(CLOSE);

  // Triângulo inferior
  if (baixoPreto) {
    fill(0);
  } else {
    fill(255, 218, 0);
  }

  beginShape();
  vertex(baixo.x, baixo.y);
  vertex(infEsq.x, infEsq.y);
  vertex(infDir.x, infDir.y);
  endShape(CLOSE);

  // Quadrado central branco
  fill(246);
  rect(
    quadrado.x1,
    quadrado.y1,
    quadrado.x2 - quadrado.x1,
    quadrado.y2 - quadrado.y1
  );
}

function mousePressed() {
  const cx = width / 2;
  const cy = height / 2;
  const margem = 6;

  const topo = { x: cx, y: margem };
  const direita = { x: width - margem, y: cy };
  const baixo = { x: cx, y: height - margem };
  const esquerda = { x: margem, y: cy };

  const quadrado = {
    x1: 150,
    y1: 155,
    x2: 450,
    y2: 445
  };

  const supEsq = { x: quadrado.x1, y: quadrado.y1 };
  const supDir = { x: quadrado.x2, y: quadrado.y1 };
  const infDir = { x: quadrado.x2, y: quadrado.y2 };
  const infEsq = { x: quadrado.x1, y: quadrado.y2 };

  // Clicou no triângulo superior
  if (pontoDentroDoTriangulo(mouseX, mouseY, topo, supDir, supEsq)) {
    if (topoColorido) {
      topoColorido = false;
    } else {
      topoR = random(0, 255);
      topoG = random(0, 255);
      topoB = random(0, 255);
      topoColorido = true;
    }
  }

  // Os outros triângulos continuam com a interação anterior
  if (pontoDentroDoTriangulo(mouseX, mouseY, esquerda, supEsq, infEsq)) {
    esquerdaPreto = !esquerdaPreto;
  }

  if (pontoDentroDoTriangulo(mouseX, mouseY, direita, infDir, supDir)) {
    direitaPreto = !direitaPreto;
  }

  if (pontoDentroDoTriangulo(mouseX, mouseY, baixo, infEsq, infDir)) {
    baixoPreto = !baixoPreto;
  }
}

function pontoDentroDoTriangulo(px, py, a, b, c) {
  const areaOriginal = areaTriangulo(a.x, a.y, b.x, b.y, c.x, c.y);

  const area1 = areaTriangulo(px, py, b.x, b.y, c.x, c.y);
  const area2 = areaTriangulo(a.x, a.y, px, py, c.x, c.y);
  const area3 = areaTriangulo(a.x, a.y, b.x, b.y, px, py);

  return abs(areaOriginal - (area1 + area2 + area3)) < 0.5;
}

function areaTriangulo(x1, y1, x2, y2, x3, y3) {
  return abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
}