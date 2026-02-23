import { BEServerHealth } from "./utils/enums";


export interface IBackendServerDetails {
    url : string;
    serverWeight : number;
    getStatus() : BEServerHealth;
    setStatus(status : BEServerHealth) : void;
    incrementRequestsServed() : void;
    readMetrics() : void;
}

export class BackendServerDetails implements IBackendServerDetails {
    public url : string;
    public serverWeight: number;
    public requestsServedCount = 0;
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

    incrementRequestsServed() : void {
        this.requestsServedCount++;
    }

    readMetrics(): void {
        this.requestsServedCount = 0;
    }
} 