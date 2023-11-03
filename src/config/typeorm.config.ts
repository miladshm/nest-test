import {DataSource, DataSourceOptions} from "typeorm";
import appConfig from "./app.config";


const config = appConfig().database;

export default new DataSource(config as DataSourceOptions);