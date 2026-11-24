// Courier for a meme post.
//
// The actual judging happens elsewhere: the house opens the X post
// listed in POST.json and scores the meme by the engagement on that
// post itself. This little program has no opinion about the meme at
// all. Its only job is to hand over the address reliably, copying
// POST.json from the bot directory into the output directory exactly
// as written, byte for byte, so the reader downstream finds it in
// the one place it expects to look.

import { copyFile, mkdir, stat } from "node:fs/promises";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "POST.json");
const destination = join(outputDir, "POST.json");

try {
  await mkdir(outputDir, { recursive: true });
  await copyFile(source, destination);
  const delivered = await stat(destination);
  console.log(`delivered POST.json to ${destination} (${delivered.size} bytes)`);
} catch {
  console.error(`error: could not copy the post address file ${source} to ${destination}`);
  process.exit(1);
}
