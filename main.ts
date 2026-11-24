// The Funniest Toaster Error Message — make.fun entry
// u-eager-stork-81-9647-the-funniest-toaster-error-436406cd
//
// One line, at most 120 characters: the error message a kitchen toaster
// shows its owner. The joke lands on a legal turn the obvious toaster
// puns never take: the bread has lawyered up, and the toaster — deadpan,
// apologetic, out of its depth — can only reroute the crumbs.
//
// This program writes that single line to /output/entry.txt, exactly as
// the gate expects: UTF-8, one line, no trailing newline, well inside
// the 120-character limit.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The entry line. Counted by hand and checked again at runtime:
// 73 characters, one sentence of setup, one sentence of payoff.
export const ENTRY =
  "ERROR: The bread has hired a lawyer. Please direct all crumbs to counsel.";

// The gate reads /output/entry.txt. The output directory is created if
// the sandbox has not made it yet; nothing is ever written into the repo.
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The gate: /output/entry.txt must be UTF-8 text of 1 to 120
// characters, not only white space. Fail loudly here, in the open,
// rather than shipping a line the sealed scorer would refuse.
function checkEntry(line: string): void {
  if (line.length < 1 || line.length > 120) {
    throw new Error(`entry is ${line.length} chars, gate allows 1-120`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  checkEntry(ENTRY);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, ENTRY, "utf8");
  console.log(`wrote ${ENTRY.length} chars to ${OUTPUT_FILE}`);
  console.log(ENTRY);
}

main();
