import fs from "fs";
import Joi from "joi";
import path from "path";

//interface for backend entry in config.json
export interface IBackendServerConfig {
    domain : string;
    weight : number;
}

//type for full applicaiton config
export interface IConfig {
    lbPORT : number;
    lbAlgo : "rand" | "rr" | "wrr";
    be_servers : IBackendServerConfig[];
}

export class Config {
    private static config : IConfig | undefined;

    private static schema = Joi.object<IConfig>({
        lbPORT : Joi.number().port().required(),
        lbAlgo : Joi.string().valid("rand", "rr", "wrr").required(),
        be_servers : Joi.array().items(
            Joi.object({
                domain : Joi.string().uri().required(),
                weight : Joi.number().integer().min(1).required()
            })
        )
        .min(1)
        .required()
    }).required();

    //load config file once
    public static load(configPath : string = "./config.json") : void {
        try{
            const fullPath = path.resolve(process.cwd() , configPath);
            const raw = fs.readFileSync(fullPath, "utf-8");

            const parsed = JSON.parse(raw);
            const { error, value } = this.schema.validate(parsed , {
                abortEarly : false,
                allowUnknown : false
            });

            if (error) {
                throw new Error(`Invalid config: ${error.message}`);
            }

            this.config = value;
        } catch (err : any) {
            console.error(`Failed to load config: ${err.message}`);
            process.exit(1);
        }
    }

    public static getConfig() : IConfig {
        if (!this.config) {
            throw new Error("Config not loaded");
        }
        return this.config;
    }
}