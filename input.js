const fs = require("node:fs");
const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = () => {
  console.log("Jangan gunakan spasi pada saat memasukan Role!!");
  rl.question("Judul : ", (title) => {
    rl.question("dekripsi : ", (description) => {
      rl.question("tanggal dibuat : ", (created) => {
        rl.question("teknologi : ", (teknologi) => {
          rl.question("role : ", (role) => {
            rl.question("domain : ", (domain) => {
              rl.question("img : ", (img) => {
                const dataInput = { title, description, created, teknologi, role, domain, img: `./imgs/Contoh Project/${img}` };
                const file = fs.readFileSync("data/projects.json", "utf8");
                const projects = JSON.parse(file);
                projects.push(dataInput);
                fs.writeFileSync("data/projects.json", JSON.stringify(projects));
                console.log("terima kasih data sudah dimasukan");
                rl.close();
              });
            });
          });
        });
      });
    });
  });
};
input();
