import { Request, Response, NextFunction } from 'express';
import dataSource from '../config/ormconfig';
import { Sale } from '../entities/sales.entity';
import { SaleService } from './../services/SaleService';
import { ISales } from '../interfaces/sales.interface';


export class SaleController {
    private readonly saleService: SaleService;

    constructor() {
        const saleRepository = dataSource.getRepository(Sale);
        this.saleService = new SaleService(saleRepository);
    }

    async createSale(req: Request, res: Response, next: NextFunction) {
        try {
            const saleData = req.body as unknown as ISales;
            const newSale = await this.saleService.createSale(saleData);
            
            if(!newSale) {
                return res.error("No sale created.", 400);
            }
            return res.success(newSale);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}