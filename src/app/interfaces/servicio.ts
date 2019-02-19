export interface Servicio {
    mensaje: String;
    origen: String[];
    destino: String[];
    cantidad:  number[];
    concepto: String[];
    encomienda: String[];
    nocturno: String[];
    recorrido: number[];
    ODC: String;
    bono_fin_semana: String;
    cantCorreos: number;
    cantHoras: number;
    cantPernocta: number;
    fechaServicio: String;
    realizado_por: number;
    monto_nocturno?: number;
    monto_encomienda?: number;
    monto_espera?: number;
    monto_general?: number;
    r_tabulador?: any;
    totalMonto?: number;
    idCorreos?: Number
}
