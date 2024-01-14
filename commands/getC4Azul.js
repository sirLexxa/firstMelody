const { fichaC4Azul } = require("../services/apis");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const path = require("path");

module.exports = (bot) => {
  bot.onText(/\/c4a (.+)/, async (msg, match) => {
    const dni = match[1];
    const chatId = msg.chat.id;

    try {
      const imageBuffer = await fichaC4Azul(dni);

      const pdfsFolder = path.join(__dirname, "../documments");

      if (!fs.existsSync(pdfsFolder)) {
        fs.mkdirSync(pdfsFolder);
      }

      const pdfPath = path.join(pdfsFolder, `${dni}.pdf`);

      // Crear el documento PDF
      const pdfDoc = new PDFDocument({
        size: [622, 909],
      });

      // Agregar la imagen al PDF sin ajustar su tamaño
      pdfDoc.image(imageBuffer, 0, 0);

      // Crear una Promesa para manejar la finalización de la escritura del PDF
      const pdfPromise = new Promise((resolve, reject) => {
        const stream = pdfDoc.pipe(fs.createWriteStream(pdfPath));
        stream.on("finish", () => {
          resolve(pdfPath);
        });
        stream.on("error", reject);
        pdfDoc.end();
      });

      // Esperar a que la Promesa se resuelva antes de enviar el documento
      const savedPdfPath = await pdfPromise;

      bot.sendDocument(chatId, savedPdfPath, {
        parse_mode: "Markdown",
        reply_to_message_id: msg.message_id,
      });
    } catch (error) {
      console.log(error);
    }
  });
};
