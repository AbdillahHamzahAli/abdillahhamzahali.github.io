const fs = require("node:fs");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tulispertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(`${pertanyaan} : `, (jawaban) => {
      resolve(jawaban);
    });
  });
};

const simpan = (title, description, created, teknologi, role, domain, img) => {
  const dataInput = { title, description, created, teknologi, role, domain, img: `./imgs/Contoh Project/${img}` };
  const file = fs.readFileSync("../data/projects.json", "utf8");
  const projects = JSON.parse(file);
  projects.push(dataInput);
  fs.writeFileSync("../data/projects.json", JSON.stringify(projects));
  console.log("terima kasih data sudah dimasukan");
  rl.close();
};

module.exports = { tulispertanyaan, simpan };
