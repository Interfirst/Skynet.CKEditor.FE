import { Logger, LoggerSettings, LoggingLevel, LogLevel } from '@interfirst/utils';

/**
 * Global logger settings singleton
 *
 * @example
 * // Set the new settings for the logger
 * GlobalLoggerSettings.setSettings(oldSettings => ({
 *    ...oldSettings,
 *    expandError: true
 * }));
 *
 * // Set the log aggregator
 * GlobalLoggerSettings.setAggregator({
 *    send: async message => {
 *      console.log('aggregator', message);
 *    },
 * });
 */
export const GlobalLoggerSettings = new LoggerSettings({
  expand: {
    [LogLevel.INFO]: true,
    [LogLevel.LOG]: true,
    [LogLevel.WARN]: true,
    [LogLevel.ERROR]: true,
  },
  loggingLevel: LoggingLevel.VERBOSE,
  internalLogger: window.console,
});

export class LoggerInstance extends Logger {
  constructor(name) {
    super(name, GlobalLoggerSettings);
  }
}

export const logger = new LoggerInstance('CKEDITOR');
export const createLogger = name => new LoggerInstance(name);
