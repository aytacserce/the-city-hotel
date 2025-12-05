import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getEntry(entryId) {
  try {
    const entry = await client.getEntry(entryId);
    return entry;
  } catch (error) {
    console.error("Error fetching entry:", error);
    return null;
  }
}
