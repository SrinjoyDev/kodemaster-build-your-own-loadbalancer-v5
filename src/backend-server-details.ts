import { BEServerHealth } from "./utils/enums";
import { HttpClient } from "./utils/http-client";


export interface IBackendServerDetails {
    url : string;
    serverWeight : number;
    getStatus() : BEServerHealth;
    setStatus(status : BEServerHealth) : void;
    incrementRequestsServed() : void;
    resetMetrics() : void;
    ping() : Promise<boolean>;
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

    resetMetrics(): void {
        this.requestsServedCount = 0;
    }

    async ping() : Promise<boolean> {
        try{
            const response = await HttpClient.get(`${this.url}/ping`);
            //treat only 200 as helath
            if(response.status >= 200 && response.status) {
                this.setStatus(BEServerHealth.HEALTHY);
                return true;
            }

            //non 2xx means unhalrehyy>
            this.setStatus(BEServerHealth.UNHEALTHY);
            return false;
        } catch{
            this.setStatus(BEServerHealth.UNHEALTHY);
            return false;
        }
    }
} 