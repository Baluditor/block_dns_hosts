fs = require("fs");
path = require("path");
const { JSDOM } = require("jsdom");

const HTMLString = fs.readFileSync(
  path.resolve(__dirname, "page.html"),
  "utf8",
);

function extractDataFromHTML(htmlString) {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  const tests = document.querySelectorAll(".test");

  const piHoleHostList = [];

  tests.forEach((element) => {
    const spans = element.querySelectorAll("span");

    spans.forEach((span, i) => {
      if (i === 0) {
        return;
      }
      const host = `0.0.0.0 ${span.textContent}`;
      piHoleHostList.push(host);
    });
  });

  fs.writeFileSync(
    path.resolve(__dirname, "pi-hole-hosts.txt"),
    piHoleHostList.join("\n"),
  );
}

extractDataFromHTML(HTMLString);
console.log("Data extracted from HTML");
