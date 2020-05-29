import fs from "fs";
import util from "util";
import { players, objects } from "./data";

const PATH = "./cache/data.json";

// Read all databse
async function fetchAll(): Promise<{ ok: boolean; data: any; error: string }> {
  const readFile = util.promisify(fs.readFile);

  try {
    const raw = await readFile(PATH);
    const data = JSON.parse(raw.toString());
    return { ok: true, data, error: "" };
  } catch (err) {
    return { ok: false, data: null, error: err };
  }
}

// Read an attribute
async function fetch(
  key: string
): Promise<{ ok: boolean; data: any; error: string }> {
  const { ok, data, error } = await fetchAll();
  if (ok) return { ok, data: data[key], error };
  else return { ok, data, error };
}

// Update an attribute
async function update(
  key: string,
  updatedData: any
): Promise<{ ok: boolean; error: string }> {
  const writeFile = util.promisify(fs.writeFile);

  let { ok, data, error } = await fetchAll();
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

// Seed database with default data
async function seed(): Promise<{ ok: boolean; error: string }> {
  const writeFile = util.promisify(fs.writeFile);

  var data = JSON.stringify({ players, objects });

  try {
    await writeFile(PATH, data);
    return { ok: true, error: "" };
  } catch (err) {
    return { ok: false, error: err };
  }
}

export default { fetch, update, seed };
