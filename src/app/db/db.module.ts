import { NgxIndexedDBModule } from 'ngx-indexed-db';
import {dbConfig} from './db.conf';

export var dbModule = NgxIndexedDBModule.forRoot(dbConfig);