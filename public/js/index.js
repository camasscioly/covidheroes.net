var childCount = document.getElementById('scale').childElementCount;
for (i = 0; i < childCount; i++) {
  document.getElementById('scale').children[i].className = '';
  document.getElementById('scale').children[i].className = 'col-xs-' + 12 / childCount;
}
