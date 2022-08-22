const { tulispertanyaan, simpan } = require("./app");

const main = async () => {
  const title = await tulispertanyaan("judul");
  const description = await tulispertanyaan("deskripsi");
  const created = await tulispertanyaan("tanggal dibuat");
  const teknologi = await tulispertanyaan("teknologi");
  const role = await tulispertanyaan("role");
  const domain = await tulispertanyaan("domain");
  const img = await tulispertanyaan("img");

  simpan(title, description, created, teknologi, role, domain, img);
};

main();
