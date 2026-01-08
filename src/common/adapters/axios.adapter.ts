import axios, { AxiosInstance } from "axios";
import * as https from 'https'; // 1. Import https

import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements HttpAdapter {
// 2. Configure the instance to ignore unauthorized certificates
  private readonly axios: AxiosInstance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });


    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>( url );
            return data;
        } catch (error) {
           throw new Error("Error - Check logs."); 
        }
        
    }
}