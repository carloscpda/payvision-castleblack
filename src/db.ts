import fs from "fs";
import util from "util";
import { players, objects } from "./data";

const PATH = "./cache/data.json";

async function fetch(
  key: string
): Promise<{ ok: boolean; data: any; error: string }> {
  const readFile = util.promisify(fs.readFile);

  try {
    const raw = await readFile(PATH);
    const data = JSON.parse(raw.toString())[key];
    return { ok: true, data, error: "" };
  } catch (err) {
    return { ok: false, data: null, error: err };
  }
}

async function update(
  key: string,
  updatedData: any
): Promise<{ ok: boolean; error: string }> {
  const writeFile = util.promisify(fs.writeFile);

  let { ok, data, error } = await fetch(key);
  if (!ok) return { ok, error };
  const newData = { ...data, [key]: updatedData };
  const rawToSave = JSON.stringify(newData);

  try {
    await writeFile(PATH, rawToSave);
    return { ok: true, error: "" };
  } catch (err) {
    return { ok: false, error: err };
  }
}

function seed(): { ok: boolean; error: string } {
  const writeFile = util.promisify(fs.writeFile);

  var data = JSON.stringify({ players, objects });

  try {
    writeFile(PATH, data);
    return { ok: true, error: "" };
  } catch (err) {
    return { ok: false, error: err };
  }
}

export default { fetch, update, seed };
