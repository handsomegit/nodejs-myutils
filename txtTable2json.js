const fs = require("fs");

const readline = require("readline");

async function start(params) {
  let fileStream = await fs.createReadStream("dat/oct55i.dat");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // 注意：我们使用 crlfDelay 选项将 input.txt 中的所有 CR LF 实例（'\r\n'）识别为单个换行符。

  let i = 0;

  let head = {};
  let data = [];
  for await (const line of rl) {
    // input.txt 中的每一行在这里将会被连续地用作 `line`。

    let cols = line.split(/\s+/);

    if (i === 0) {
      head = Object.fromEntries(cols.map(col => [col, undefined]));
    } else {
      let row = {};
      Object.keys(head).forEach((th, i) => {
        row[th] = cols[i];
      });
      data.push(row);
    }

    i++;
  }

  console.log(data);
}

start();
