const { PrismaClient } = require("@prisma/client");
const pg_db = new PrismaClient();

module.exports = {
  pg_db,
};
