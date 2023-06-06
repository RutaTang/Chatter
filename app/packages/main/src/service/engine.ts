import { ipcMain } from "electron"
import type { Channel } from "types";

/**
 * Represents a service.
 */
export class Service<T extends Channel> {
    /**
     * Placeholder method for processing service requests.
     */
    process?: (event: any, args: T['args']) => T['return'] | Promise<T['return']>
}

/**
 * Represents a service engine that handles IPC (Inter-Process Communication) events.
 */
class ServiceEngine {
    /**
     * Map to store channel-handle function pairs for IPCMain's handle function.
     */
    private handleMap: Map<string, (...args: any) => any> = new Map();

    /**
     * Creates an instance of ServiceEngine.
     */
    constructor() { }

    /**
     * Decorator for registering a channel-handle function pair for IPCMain's handle function.
     * @param channel - The channel to register.
     */
    handle<T extends Channel>(channel: T['name']) {
        return (target: typeof Service<T>) => {
            const instance = new target();
            if (!instance.process) {
                throw new Error("Service must implement process method");
            }
            this.handleMap.set(channel, instance.process);
        };
    }

    /**
     * Starts the service engine by registering the handle, on, and once functions with IPCMain.
     */
    start() {
        // Register IPCMain's handle function
        const handleArray = Array.from(this.handleMap);
        handleArray.forEach(([channel, func]) => {
            ipcMain.handle(channel, func);
        });
    }
}

export const serviceEngine = new ServiceEngine()
