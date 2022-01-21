import axios from 'axios';
import fs from 'fs';
import { Agent } from 'https';
import jsyaml from 'js-yaml';
import { homedir } from 'os';
import path from 'path';
import { Config } from '../types/Config.js';
import { Response } from './Response.js';

export interface ClientOptions {
    host: string;
    port: number;
    protocol: 'http' | 'https';
    keyPath: string;
    certPath: string;
    caCertPath: string;
}

export abstract class Client {
    public host: string;
    public port: number | null;
    public protocol: 'http' | 'https';
    public keyPath: string;
    public certPath: string;
    public caCertPath: string | boolean;
    public agent: Agent;
    public config: Config | null;
    public options: ClientOptions | null;

    public get baseUrl(): string {
        return `${this.protocol}://${this.host}:${this.port}`;
    }

    constructor(
        options: ClientOptions | string = path.resolve(
            homedir(),
            '.chia',
            'mainnet'
        )
    ) {
        if (typeof options === 'string') {
            const rootPath = path.resolve(options);
            this.config = jsyaml.load(
                fs.readFileSync(
                    path.join(rootPath, 'config', 'config.yaml'),
                    'utf-8'
                )
            ) as Config;
            this.options = null;
            this.keyPath = path.join(
                options,
                this.config.daemon_ssl.private_key
            );
            this.certPath = path.join(
                options,
                this.config.daemon_ssl.private_crt
            );
            this.caCertPath = path.join(
                options,
                this.config.private_ssl_ca.crt
            );
            this.host = this.config.self_hostname;
            this.port = null;
            this.protocol = 'https';
        } else {
            this.config = null;
            this.options = options;
            this.keyPath = options.keyPath;
            this.certPath = options.certPath;
            this.caCertPath = options.caCertPath;
            this.host = options.host;
            this.port = options.port;
            this.protocol = options.protocol;
        }
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
