export async function downloadPDF(element: HTMLElement, filename: string): Promise<void> {
  try {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Failed to open print window. Please allow popups for this site.');
    }

    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;

    // Get all stylesheets from the parent document
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n');
        } catch (e) {
          // Handle CORS issues with external stylesheets
          return '';
        }
      })
      .join('\n');

    // Build the print document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${filename}</title>
          <style>
            ${styles}
            
            @page {
              size: A4;
              margin: 0;
            }
            
            body {
              margin: 0;
              padding: 0;
              background: white;
            }
            
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          ${clonedElement.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();

    // Wait for content and images to load before printing
    printWindow.onload = () => {
      // Additional wait for any dynamic content or fonts
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        // Close the window after printing (user can cancel)
        setTimeout(() => {
          printWindow.close();
        }, 100);
      }, 500);
    };
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}
