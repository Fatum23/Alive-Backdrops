import { createRequire } from "node:module";
import { Database } from "sqlite3";
const require = createRequire(import.meta.url);

const sqlite = require("sqlite3");

const db: Database = new sqlite.Database("wallpapers.db");

const init = () => {
  db.run(`CREATE TABLE IF NOT EXISTS wallpapers(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    src TEXT,
    title TEXT,
    volume TEXT,
    speed TEXT
  )`);
  db.run("PRAGMA case_sensitive_like = true");
};

init();
