import { BEServerHealth } from "./utils/enums";


export interface IBackendServerDetails {
    url : string;
    serverWeight : number;
    getStatus() : BEServerHealth;
    setStatus(status : BEServerHealth) : void;
    incrementRequestsServerd() : void;
    readMetrics() : void;
}

export class BackendServerDetails implements IBackendServerDetails {
    public url : string;
    public serverWeight: number;
    public requestsServerdCount = 0;
    private status : BEServerHealth = BEServerHealth.UNHEALTHY;

    constructor(url : string, weight : number) {
        this.url = url;
        this.serverWeight = weight;
    }

    getStatus() : BEServerHealth {
        return this.status;
    }

    setStatus(status : BEServerHealth) : void {
        this.status = status;
    }

    incrementRequestsServerd() : void {
        this.requestsServerdCount++;
    }

    readMetrics(): void {
        this.requestsServerdCount = 0;
    }
} 