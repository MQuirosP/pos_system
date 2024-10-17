// Archivo: providers.interface.ts
import { IPurchases } from "@interfaces/purchases.interface";

export interface IProviders {
  provider_id: number;
  provider_name: string;
  provider_address: string;
  provider_phone: string;
  provider_email: string;
  provider_dni: string;
  created_at: Date;
  updated_at: Date;
  purchases: IPurchases[]; // Relación uno a muchos con Purchase
}
