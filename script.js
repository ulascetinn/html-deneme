// Ensure the DOM is fully loaded before adding the event listener
document.addEventListener("DOMContentLoaded", () => {
    const downloadButton = document.getElementById("download-button");
    if (downloadButton) {
        downloadButton.addEventListener("click", downloadSelectedPdf);
    } else {
        console.error("Download button not found in the DOM.");
    }
});

// Function to fetch and download the selected PDF
async function downloadSelectedPdf() {
    // Get user selections
    const drawingType = document.getElementById("drawing_type").value.slice(0, 2); // Get first two letters
    const valveType = document.getElementById("valve_type").value;
    const dn = document.getElementById("dn").value;
    const pressureClass = document.getElementById("pressure_class").value;

    // Construct the file path dynamically
    const pdfPath = `../PDF/Technical_Drawings/${drawingType}_${valveType}_DN${dn}_${pressureClass}.pdf`;

    try {
        // Log the constructed path for debugging
        console.log("Constructed Path:", pdfPath);

        // Fetch the PDF
        const response = await fetch(pdfPath);
        if (!response.ok) {
            throw new Error(`Failed to fetch PDF. Status: ${response.status}`);
        }
        const pdfBlob = await response.blob();

        // Trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(pdfBlob);
        link.download = `${drawingType}_${valveType}_DN${dn}_PN${pressureClass}.pdf`;
        link.click();
    } catch (error) {
        // Display error to the user
        console.error(error);
        alert("Error: " + error.message);
    }
}
