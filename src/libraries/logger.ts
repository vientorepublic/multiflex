import { utilities, WinstonModule } from 'nest-winston';
import winstonDaily from 'winston-daily-rotate-file';
import { transports, format } from 'winston';

const dailyOptions = (
  level: string,
): winstonDaily.DailyRotateFileTransportOptions => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: './logs',
    filename: `%DATE%.${level}.log`,
    maxFiles: 30,
    zippedArchive: true,
  };
};

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new transports.Console({
      level: 'http',
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        utilities.format.nestLike('MultiFlex', {
          prettyPrint: true,
        }),
      ),
    }),
    new winstonDaily(dailyOptions('info')),
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
});
