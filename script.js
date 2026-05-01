let selectedMat = null, selectedShape = null, currentUnit = 'mm';

function selectMat(el) {
  document.querySelectorAll('.mat-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  selectedMat = { name: el.dataset.mat, density: parseFloat(el.dataset.density), rate: parseFloat(el.dataset.rate) };
}

function selectShape(el) {
  document.querySelectorAll('.shape-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  selectedShape = el.dataset.shape;
}

function toMM(value) {
  return value;
}

function calculate() {
  if (!selectedMat) { showFlash('Select steel grade'); return; }
  if (!selectedShape) { showFlash('Select shape'); return; }

  let D = parseFloat(document.getElementById('rD').value) || 0;
  let L = parseFloat(document.getElementById('rL').value) || 0;
  let qty = Math.max(1, parseFloat(document.getElementById('qty').value) || 1);

  if (!D || !L) { showFlash('Enter diameter and length'); return; }

  let volumeMm3 = Math.PI * Math.pow(D / 2, 2) * L;
  let weightPerPiece = (volumeMm3 / 1e9) * selectedMat.density;
  let totalWeight = weightPerPiece * qty;
  let rate = selectedMat.rate;
  let matCost = totalWeight * rate;

  document.getElementById('resGrid').innerHTML = 
    '<div class="res-cell" style="grid-column: span 2;"><div class="res-lbl">Total Weight</div><div class="res-val total">' + totalWeight.toFixed(2) + ' kg</div></div>' +
    '<div class="res-cell" style="grid-column: span 2;"><div class="res-lbl">Material Cost</div><div class="res-val total">₹ ' + Math.round(matCost).toLocaleString('en-IN') + '</div></div>';

  document.getElementById('resNote').textContent = '';
  document.getElementById('resultBox').style.display = 'block';
  document.getElementById('resultBox').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function showFlash(msg) {
  let existing = document.querySelector('.flash-msg');
  if (existing) existing.remove();
  let el = document.createElement('div');
  el.className = 'flash-msg';
  el.textContent = '⚠ ' + msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}
