export enum Backend {
    Electron = "electron",
    Cloud = "cloud",
    None = "none",
}

/**
 * Conditionally integrates a backend based on the current environment.
 * 
 * @template ReturnType - The return type of the function being integrated.
 * @param {Object.<Backend, Function>} map - An object mapping each supported backend to its corresponding function.
 * @returns {Promise<ReturnType> | ReturnType} - The result of the integrated function.
 * @throws {Error} - If the current backend is not supported or does not have a corresponding function.
 */
export function integrateBackendConditionally<ReturnType>(
    map: {
        [value in Backend]?: () => (Promise<ReturnType> | ReturnType)
    }
): Promise<ReturnType> | ReturnType {
    // Get the current backend from the environment variables
    const backend = (import.meta.env.MODE || "none") as Backend

    // Check if the backend is supported
    if (!Object.values(Backend).includes(backend)) {
        throw new Error(`Backend ${backend} is not supported`)
    }

    // Get the corresponding function for the backend
    const fn = map[backend]

    // Check if the backend has a corresponding function
    if (!fn) {
        throw new Error(`Backend ${backend} does not have a corresponding function`)
    }

    // Call the function and return the result
    return fn()
}

