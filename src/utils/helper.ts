/**
 * Capitaliza una palabra. @example hola -> Hola | panel -> Panel 
 * 
 * @param string Palabra
 * @returns 
 */
export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}