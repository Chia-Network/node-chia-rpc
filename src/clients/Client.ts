import { Config } from '../types/Config.js';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { Response } from './Response.js';
import { Agent } from 'https';
import jsyaml from 'js-yaml';
import { homedir } from 'os';

export abstract class Client {
    public abstract port: number;
    public config: Config;
    public rootPath: string;
    public host: string;
    public keyPath: string;
    public certPath: string;
    public caCertPath: string | boolean;
    public agent: Agent;
    public get baseUrl(): string {
        return `https://${this.host}:${this.port}`;
    }

    constructor(root: string = path.resolve(homedir(), '.chia', 'mainnet')) {
        this.rootPath = path.resolve(root);
        this.config = jsyaml.load(
            fs.readFileSync(path.join(root, 'config', 'config.yaml'), 'utf-8')
        ) as Config;
        this.keyPath = path.join(root, this.config.daemon_ssl.private_key);
        this.certPath = path.join(root, this.config.daemon_ssl.private_crt);
        this.caCertPath = path.join(root, this.config.private_ssl_ca.crt);
        this.host = this.config.self_hostname;
        this.agent = new Agent({
            ...(typeof this.caCertPath !== 'boolean'
                ? { ca: fs.readFileSync(this.caCertPath) }
                : {}),
            cert: fs.readFileSync(this.certPath),
            key: fs.readFileSync(this.keyPath),
            rejectUnauthorized: this.host !== 'localhost',
        });
    }

    public async request<T>(
        route: string,
        body: unknown = {}
    ): Promise<Response<T>> {
        return (
            await axios.post<Response<T>>(`${this.baseUrl}/${route}`, body, {
                httpsAgent: this.agent,
            })
        ).data;
    }
}
