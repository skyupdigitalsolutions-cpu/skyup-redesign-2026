// NOTE: switched from 'html2canvas' to 'html2canvas-pro'.
// Tailwind v4 emits colors as oklch(); the old html2canvas@1.4.1 (2021)
// cannot parse oklch/oklab/lab/lch/color() and throws, which is what
// triggered the "Failed to generate PDF" alert. html2canvas-pro is a
// drop-in fork with the same API that supports these modern color functions.
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export const generatePDF = async (element, invoiceNumber) => {
  if (!element) {
    console.error('Element not found for PDF generation');
    return;
  }

  try {
    // Create canvas from HTML element with better quality
    const canvas = await html2canvas(element, {
      scale: 3,  // Higher scale for better quality
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      allowTaint: true,
      x: 0, // Start from x = 0
      y: 0, // Start from y = 0
      width: element.offsetWidth,  // Ensure it matches the container width
      height: element.offsetHeight, // Ensure it matches the container height
    });

    // Get image data from canvas
    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF in A4 size
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      compress: true,
    });

    // Real A4 dimensions in mm (previously hardcoded to 271x316, which is
    // larger than an actual A4 page and stretched/distorted the layout).
    const pdfWidth = 210;
    // Derive height from the canvas's own aspect ratio so the invoice is
    // never stretched, even if content pushes it past a single page.
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add image to PDF - fit to A4 width, preserving aspect ratio
    pdf.addImage(
      imgData, 
      'PNG', 
      0,  // x position
      0,  // y position
      pdfWidth,  // width - full A4 width
      pdfHeight  // height - proportional to actual content, no distortion
    );

    // Generate filename
    const filename = `Invoice_${invoiceNumber.replace(/\//g, '_')}.pdf`;
    
    // Save PDF
    pdf.save(filename);
    
    console.log(`PDF generated successfully: ${filename}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};
