import { TypeWallpaper } from "@shared/types";
import Database from "@tauri-apps/plugin-sql";

const dbConnection: () => Promise<Database> = async () => {
  const database = await Database.load("sqlite:db.db");
  database.execute(`CREATE TABLE IF NOT EXISTS wallpapers(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    src TEXT,
    title TEXT,
    volume TEXT,
    speed TEXT
  )`);
  database.execute("PRAGMA case_sensitive_like = true");
  return database;
};

export const addWallpaper = async (wallpaper: TypeWallpaper) => {
  const db = await dbConnection();
  await db.execute(
    "INSERT into wallpapers (title, src, volume, speed) VALUES(?,?,?,?)",
    [wallpaper.title, wallpaper.src, wallpaper.volume, wallpaper.speed]
  );
};

export const getWallpapers = async (
  title: string
): Promise<TypeWallpaper[]> => {
  const db = await dbConnection();
  let query = "SELECT * FROM wallpapers ";
  let params = [];
  let conditions = [];

  if (title !== "") {
    conditions.push(`WHERE title LIKE '%' || ? || '%'`);
    params.push(title);
  }
  if (conditions.length > 0) {
    query += conditions[0];
  }
  return await db.select(query, params);
};

export const deleteWallpaper = async (id: number) => {
  const db = await dbConnection();
  db.execute("DELETE FROM wallpapers WHERE id = ?", [id]);
};

export const getWallpaperById = async (id: number): Promise<TypeWallpaper> => {
  const db = await dbConnection();
  const res: TypeWallpaper[] = await db.select(
    "SELECT * FROM wallpapers WHERE id = ?",
    [id]
  );
  return res[0]!;
};
