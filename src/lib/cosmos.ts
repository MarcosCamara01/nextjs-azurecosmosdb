import { CosmosClient, Database, Container } from "@azure/cosmos";

class CosmosSingleton {
  database: Database | null;
  container: Container | null;

  constructor() {
    this.database = null;
    this.container = null;
  }

  async initialize(containerName = "Items") {
    if (!this.database || !this.container) {
      const databaseName = process.env.COSMOSDB_DATABASE_NAME || "NextTodo";
      const client = new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING!);
      const database = client.database(databaseName);
      const container = database.container(containerName);
      await client.databases.createIfNotExists({
        id: databaseName,
      });
      await database.containers.createIfNotExists({
        id: containerName,
        partitionKey: "/id",
      });
      this.database = database;
      this.container = container;

      console.log(`Initialized CosmosDB database: ${databaseName}`);
    }
  }

  getDatabase() {
    return this.database;
  }

  getContainer() {
    return this.container;
  }
}

const cosmosSingleton = new CosmosSingleton();
export default cosmosSingleton;
