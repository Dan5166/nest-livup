// Dejar este archivo como en el curso, tuve que usar un https agent por el firewall de la empresa
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as https from 'https'; // 1. Import https
import { PokeResponse } from './interfaces/poke-response.iterfaces';

@Injectable()
export class SeedService {

  // 2. Configure the instance to ignore unauthorized certificates
  private readonly axios: AxiosInstance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
  
  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2]

      console.log({name, no})
    })

    return data.results;
  }
}