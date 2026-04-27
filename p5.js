function setup() {
  createCanvas(600, 600);
  noLoop();
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

  // Parte superior preta
  fill(8, 8, 10);
  beginShape();
  vertex(topo.x, topo.y);
  vertex(supDir.x, supDir.y);
  vertex(supEsq.x, supEsq.y);
  endShape(CLOSE);

  // Parte esquerda azul
  fill(0, 75, 235);
  beginShape();
  vertex(esquerda.x, esquerda.y);
  vertex(supEsq.x, supEsq.y);
  vertex(infEsq.x, infEsq.y);
  endShape(CLOSE);

  // Parte direita vermelha
  fill(235, 22, 22);
  beginShape();
  vertex(direita.x, direita.y);
  vertex(infDir.x, infDir.y);
  vertex(supDir.x, supDir.y);
  endShape(CLOSE);

  // Parte inferior amarela
  fill(255, 218, 0);
  beginShape();
  vertex(baixo.x, baixo.y);
  vertex(infEsq.x, infEsq.y);
  vertex(infDir.x, infDir.y);
  endShape(CLOSE);

  // Quadrado central branco
  fill(246);
  rect(quadrado.x1, quadrado.y1, quadrado.x2 - quadrado.x1, quadrado.y2 - quadrado.y1);
}