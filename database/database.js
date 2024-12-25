const { CosmosClient } = require("@azure/cosmos");

// Cosmos DB Configuration
const config = {
    endpoint: process.env.COSMOSDB_ENDPOINT, // Replace with your Cosmos DB URI
    key: process.env.COSMOSDB_KEY,       // Replace with your Cosmos DB Primary Key
    databaseId: "BlogStore", // Replace with your Database ID
    containerId: "Posts" // Replace with your Container ID
};

// Initialize Cosmos Client
const client = new CosmosClient({ endpoint: config.endpoint, key: config.key });

// Function to get the container
async function getContainer() {
    const database = client.database("BlogStore");
    const container = database.container("Posts");
    return container;
}

module.exports = { getContainer };