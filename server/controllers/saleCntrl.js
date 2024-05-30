import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'

// Crear una venta
export const createSale = asyncHandler(async (req, res) => {
    const { seller, propertyId, commission,userEmailRegistered } = req.body.data
    console.log(req.body.data)
    try{
        const sale = await prisma.sale.create({
            data:{seller, residency:{connect:{id:propertyId}}, commission, userSale:{connect : {email:userEmailRegistered}},}
        });
        res.send({message: "La venta ha sido creado exitosamente",sale});
    }catch(err){
        if(err.code==="P2002"){
            throw new Error("Ya hay una venta con esa propiedad");
        }
        throw new Error(err.message);
    }
});

// Obtener todas las ventas
export const getAllSales = asyncHandler(async (req, res) => {
    const sales = await prisma.sale.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    res.send(sales);

});


