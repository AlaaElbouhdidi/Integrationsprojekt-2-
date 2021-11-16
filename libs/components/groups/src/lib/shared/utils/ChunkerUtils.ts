import {EventModel} from "../models/EventModel";

export class ChunkerUtils {

    public static Chunk<T>(arr: T[], amount: number): T[][]{
        const buckets : T[][] = [];
        for (let i = 0; i < arr.length; i += amount) {
            buckets[i] = [];
            for (let j = i; j < i + amount && j < arr.length; j++) {
                buckets[i].push(arr[j]);
            }
        }
        return buckets;
    }

}
