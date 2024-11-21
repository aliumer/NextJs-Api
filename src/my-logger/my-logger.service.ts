import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {

    log(message: unknown, context?: unknown): void {
        const entry = `${context}\t${message}`;
        this.logToFile(entry);
        super.log(message, context);
    }

    error(message: unknown, stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`;
        this.logToFile(entry);
        super.error(message, stackOrContext);
    }

    async logToFile(entry) {
        const formattedDate = Intl.DateTimeFormat('en-US',
            {
                dateStyle: 'short',
                timeStyle: 'short',
                timeZone: 'America/Chicago'
            }
        ).format(new Date());
        const formattedEntry = `${formattedDate}\t${entry}\r\n`;

        try {
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'))
            }
            await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'), formattedEntry);
        } catch (error) {
            console.error(error.message);
        }

    }
}
