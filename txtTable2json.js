const fs = require("fs");

const readline = require("readline");

async function txtTable2json(path) {
  let fileStream = await fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // 注意：我们使用 crlfDelay 选项将 input.txt 中的所有 CR LF 实例（'\r\n'）识别为单个换行符。

  let i = 0;

  let titles = [];
  let data = [];

  for await (const line of rl) {
    let cols = line.split(/\s+/);

    if (i === 0) {
      titles = cols;
    } else {
      let row = {};
      titles.forEach((tit, i) => {
        row[tit] = cols[i];
      });
      data.push(row);
    }

    i++;
  }

  console.log(data);
  return data;
}
