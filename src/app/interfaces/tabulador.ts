export interface Tabulador {
    id?: number;
    activo: String;
    por_bono_nocturno: number;
    por_encomienda:  number;
    monto_pernocta: number;
    monto_horas: number;
    por_fin_semana: number;
    monto_desv_inter: number;
    monto_desv_exter: number;
    fecha_inicio: String;
    deleted_at?: String;
    created_at?: String;
    updated_at?: String;
}
