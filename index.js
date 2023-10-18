const express = require("express");
const bodyParser = require("body-parser");
const htmlPdf = require("html-pdf");
const cors = require("cors");

const app = express();

app.use(cors({ allowHeaders: "Content-Type,Authorization" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.post("/generate-pdf", (req, res) => {
  const { htmlContent } = req.body;

  const options = {
    format: "Letter",
    border: "10mm",
  };

  htmlPdf.create(htmlContent, options).toBuffer((err, buffer) => {
    if (err) {
      console.error(err);
      res.status(500).send("PDF generation failed");
    } else {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="rich_text_editor_content.pdf"'
      );
      res.send(buffer);
    }
  });
});

const port = 80;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
