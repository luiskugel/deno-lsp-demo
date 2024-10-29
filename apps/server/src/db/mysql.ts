import MySQL from "mysql2/promise";

export default async function (
  connectionUrl: string,
  connectionLimit = 5,
): Promise<MySQL.Pool> {
  const connection = await MySQL.createConnection(connectionUrl);

  const connectionOptions = structuredClone(connection.config);

  await connection.end();

  const mysql = MySQL.createPool({
    ...connectionOptions,
    connectionLimit,
    waitForConnections: true,
  });

  return mysql;
}
