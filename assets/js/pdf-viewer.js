/* Minimal PDF viewer using PDF.js
   Expects a container element with attribute data-pdf="/path/to/file.pdf"
*/
(function(){
  if (typeof pdfjsLib === 'undefined') return;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js';

  function renderPDF(container, url) {
    const controls = document.createElement('div');
    controls.className = 'pdf-controls';
    controls.innerHTML = '<button class="btn-prev">◀</button> <button class="btn-next">▶</button> <span class="page-info"></span> <button class="btn-zoom-in">＋</button> <button class="btn-zoom-out">－</button> <a class="btn-download" href="'+url+'" target="_blank">Download</a>';

    const canvas = document.createElement('canvas');
    canvas.className = 'pdf-canvas';
    container.appendChild(controls);
    container.appendChild(canvas);

    let pdfDoc = null;
    let pageNum = 1;
    let scale = 1.0;

    function renderPage(num) {
      pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({ scale: scale });
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext).promise.then(function(){
          controls.querySelector('.page-info').textContent = num + ' / ' + pdfDoc.numPages;
        });
      });
    }

    pdfjsLib.getDocument(url).promise.then(function(pdf) {
      pdfDoc = pdf;
      renderPage(pageNum);
    }).catch(function(err){
      container.innerHTML = '<div class="pdf-error">Could not load PDF.</div>';
    });

    controls.querySelector('.btn-next').addEventListener('click', function(){
      if (pageNum >= pdfDoc.numPages) return;
      pageNum++; renderPage(pageNum);
    });
    controls.querySelector('.btn-prev').addEventListener('click', function(){
      if (pageNum <= 1) return;
      pageNum--; renderPage(pageNum);
    });
    controls.querySelector('.btn-zoom-in').addEventListener('click', function(){ scale += 0.2; renderPage(pageNum); });
    controls.querySelector('.btn-zoom-out').addEventListener('click', function(){ scale = Math.max(0.4, scale - 0.2); renderPage(pageNum); });
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.pdf-container').forEach(function(container){
      const url = container.getAttribute('data-pdf');
      if (url) renderPDF(container, url);
    });
  });
})();
