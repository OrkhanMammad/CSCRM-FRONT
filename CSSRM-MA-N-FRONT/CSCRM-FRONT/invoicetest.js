
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    console.log("333")
    // Input değerlerini güncelle


    html2canvas(document.getElementById('section-to-print'), { allowTaint: true, useCORS: true }).then(canvas => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save("download.pdf");

        // Input değerlerini geri yükle
        document.querySelectorAll('input').forEach(input => {
            input.style.visibility = 'visible';
            const span = input.parentElement.querySelector('span');
            if (span) {
                span.remove();
            }
        });
    });
}
