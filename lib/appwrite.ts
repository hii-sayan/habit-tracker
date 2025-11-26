import { Account, Client, Databases } from "react-native-appwrite";

export const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
    .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME!);

export const account = new Account(client);
export const databases = new Databases(client);

export const HABIT_DATABASE_ID = process.env.EXPO_PUBLIC_DB!;
export const HABIT_COLLECTION_ID = process.env.EXPO_PUBLIC_HABITS_COLLECTION_ID!;
export const COMPLETIONS_COLLECTION_ID = process.env.EXPO_PUBLIC_COMPLETIONS_COLLECTION_ID!;

if (!HABIT_DATABASE_ID || !HABIT_COLLECTION_ID || !COMPLETIONS_COLLECTION_ID) {
    throw new Error("Missing Appwrite configuration: EXPO_PUBLIC_DB_ID or EXPO_PUBLIC_COLLECTION_ID is not defined. Please check your .env.local file.");
}

export interface RealtimeResponse {
    events: string[];
    payload: any;
}