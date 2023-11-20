import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { setSuccess } from "../reducers/bookingSlice";

// Your generatePdfReceipt function
 const printReceipt = async (booking ) => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 400]);

      // Set the company name
      const companyName = "Smart Carshare";

      const { width, height } = page.getSize();
      const fontSize = 18;
      const textX = 50;
      const textY = height - 50;

      // Draw the company name
      page.drawText(companyName, {
        x: textX + 120,
        y: textY,
        size: fontSize,
        color: rgb(0, 0, 0),
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      });

      // Add receipt information
      const receiptInfo = [
        "Your Booking Receipt",
        `Car Name: ${booking.serviceOrItemBooked}`,
        `Price: $${booking.price}`,
        `Booking Date: ${booking.bookingDate}`,
      ];

      const receiptInfoX = 50;
      const receiptInfoY = textY - fontSize - 30;

      receiptInfo.forEach((info, index) => {
        page.drawText(info, {
          x: receiptInfoX,
          y: receiptInfoY - index * (fontSize + 10),
          size: fontSize,
          color: rgb(0, 0, 0),
        });
      });

      // Save the PDF to a file
      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the PDF data
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      // Create a download link and trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      const date = Date.now();
      link.download = `CarSharer${date}.pdf`;
      link.click();
      setSuccess();
   
    } catch (error) {
      console.error("Error generating PDF receipt:", error);
    }
  };

  export default printReceipt;