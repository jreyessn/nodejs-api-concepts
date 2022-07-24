export interface ValidationError {
    value: string | null;
    msg: string;
    param?: string; 
    location?: string;
}