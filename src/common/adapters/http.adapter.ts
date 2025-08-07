import axios from "axios";
import { HttpAdapterInterface } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HttpAdapter implements HttpAdapterInterface {
    async get<T>(url: string): Promise<T> {
        try {
            // Use axios to fetch data from the provided URL
            // If we need to work with a different HTTP client, we can easily swap it out here
            const { data } = await axios.get<T>(url);
            return data;
        }
        catch (error) {
            throw new Error(`Error fetching ${url}: ${error}`);
        }
    }
}