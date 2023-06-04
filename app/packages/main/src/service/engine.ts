import { ipcMain } from "electron"

/**
 * Represents a service.
 */
export class Service {
    /**
     * Placeholder method for processing service requests.
     * @param _args - Arguments for the service request.
     * @returns The result of processing the service request.
     * @throws {Error} - This method should be implemented in a derived class.
     */
    process(..._args: any[]): any {
        throw new Error("Method not implemented.");
    }
}

/**
 * Represents a service engine that handles IPC (Inter-Process Communication) events.
 */
class ServiceEngine {
    /**
     * Map to store channel-handle function pairs for IPCMain's handle function.
     */
    private handleMap: Map<string, () => any> = new Map();

    /**
     * Map to store channel-on function pairs for IPCMain's on function.
     */
    private onMap: Map<string, () => any> = new Map();

    /**
     * Map to store channel-once function pairs for IPCMain's once function.
     */
    private onceMap: Map<string, () => any> = new Map();

    /**
     * Creates an instance of ServiceEngine.
     */
    constructor() { }

    /**
     * Decorator for registering a channel-handle function pair for IPCMain's handle function.
     * @param channel - The channel to register.
     */
    handle<T extends string>(channel: T) {
        return (target: typeof Service) => {
            const instance = new target();
            this.handleMap.set(channel, instance.process);
        };
    }

    /**
     * Decorator for registering a channel-on function pair for IPCMain's on function.
     * @param channel - The channel to register.
     */
    on<T extends string>(channel: T) {
        return (target: typeof Service) => {
            const instance = new target();
            this.onMap.set(channel, instance.process);
        };
    }

    /**
     * Decorator for registering a channel-once function pair for IPCMain's once function.
     * @param channel - The channel to register.
     */
    once<T extends string>(channel: T) {
        return (target: typeof Service) => {
            const instance = new target();
            this.onceMap.set(channel, instance.process);
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

        // Register IPCMain's on function
        const onArray = Array.from(this.onMap);
        onArray.forEach(([channel, func]) => {
            ipcMain.on(channel, func);
        });

        // Register IPCMain's once function
        const onceArray = Array.from(this.onceMap);
        onceArray.forEach(([channel, func]) => {
            ipcMain.once(channel, func);
        });
    }
}

export const serviceEngine = new ServiceEngine()
