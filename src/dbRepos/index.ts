import fs from "fs";
import csv from "csv-parser";

/**
 * This assignment uses csv-parser
 * Use csv as mock DB services
 *
 * In actual implementation, replace this with a real database service
 *
 * @param filePath
 * @returns 
 */

const readCsvToArray = async (filePath: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const results: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", (err) => reject(err));
    });
}

export {
    readCsvToArray
}