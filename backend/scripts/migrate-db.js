/**
 * Copy all portfolio collections from one MongoDB cluster to another.
 *
 * Usage (from backend/):
 *   SOURCE_MONGODB_URI="mongodb://..." MONGODB_URI="mongodb+srv://..." node scripts/migrate-db.js
 *
 * Or set both URIs in .env:
 *   SOURCE_MONGODB_URI=...   (old cluster)
 *   MONGODB_URI=...          (new cluster)
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mongoose = require("mongoose");

const COLLECTIONS = ["abouts", "projects", "contacts"];
const DB_NAME = process.env.DB_NAME || "portfolio";

const sourceUri =
  process.env.SOURCE_MONGODB_URI || "mongodb://localhost:27017/portfolio";
const targetUri = process.env.MONGODB_URI;

if (!targetUri) {
  console.error("❌ MONGODB_URI (target cluster) is required in .env");
  process.exit(1);
}

function withDbName(uri, dbName) {
  const trimmed = uri.replace(/\/$/, "");
  if (trimmed.includes("?")) {
    return trimmed.replace(/\?/, `/${dbName}?`);
  }
  if (/mongodb(\+srv)?:\/\/[^/]+\/[^/?]+/.test(trimmed)) {
    return trimmed;
  }
  return `${trimmed}/${dbName}`;
}

async function migrate() {
  const source = withDbName(sourceUri, DB_NAME);
  const target = withDbName(targetUri, DB_NAME);

  console.log("Source:", source.replace(/\/\/([^:]+):([^@]+)@/, "//$1:***@"));
  console.log("Target:", target.replace(/\/\/([^:]+):([^@]+)@/, "//$1:***@"));
  console.log("Database:", DB_NAME);
  console.log("");

  const sourceConn = await mongoose.createConnection(source).asPromise();
  const targetConn = await mongoose.createConnection(target).asPromise();

  let totalCopied = 0;

  for (const name of COLLECTIONS) {
    const sourceCol = sourceConn.db.collection(name);
    const targetCol = targetConn.db.collection(name);

    const docs = await sourceCol.find({}).toArray();
    const existing = await targetCol.countDocuments();

    if (docs.length === 0) {
      console.log(`⏭  ${name}: no documents in source (target has ${existing})`);
      continue;
    }

    if (existing > 0) {
      const result = await targetCol.deleteMany({});
      console.log(`🗑  ${name}: cleared ${result.deletedCount} existing document(s) on target`);
    }

    await targetCol.insertMany(docs, { ordered: false });
    totalCopied += docs.length;
    console.log(`✅ ${name}: copied ${docs.length} document(s)`);
  }

  await sourceConn.close();
  await targetConn.close();

  console.log("");
  console.log(`Done. Migrated ${totalCopied} document(s) to the new cluster.`);
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err.message);
  process.exit(1);
});
