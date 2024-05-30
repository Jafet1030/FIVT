import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'

//funcion para crear residencias
export const createResidency = asyncHandler(async(req,res)=>{
    const {title,description,price,address,country,city,facilities,image,
    userEmail,}= req.body.data;

    console.log(req.body.data);
    try{
        const residency = await prisma.residency.create({
            data:{
                title,
                description,
                price,
                address,
                country,
                city,
                facilities,
                image,
                owner:{connect : {email:userEmail}},
            },
        });
        res.send({message: "La residencia ha sido creado exitosamente",residency});

    }catch(err){
        if(err.code==="P2002"){
            throw new Error("Ya hay una residencia con esa direccion");
        }
        throw new Error(err.message);
    }
});

//funcion para obtener todas las residencias
export const getAllResidencies = asyncHandler(async(req,res)=>{
    const residencies = await prisma.residency.findMany({
        where: {
            sold: {
                not: true,
            },
        },
        orderBy: {
            createdAt:"desc",
        },
    });
    res.send(residencies);
});

//funcion para obtener una residencia especifica
export const getResidency = asyncHandler(async(req, res) => {
    const { id } = req.params;

    try {
        const residency = await prisma.residency.findUnique({
            where: { id },
        });
        res.send(residency);
    } catch (err) {
        throw new Error(err.message);
    }
});

export const getAllResidenciesSold = asyncHandler(async (req, res) => {
    const soldResidencies = await prisma.residency.findMany({
        where: {
            sold:  true,
            
        },
        orderBy: {
            createdAt:"desc",
        },
    });
    res.send(soldResidencies);
});

export const updateResidency = asyncHandler(async (req, res) => {
    const { propertyId } = req.body.data;
  
    try {
      const updatedResidency = await prisma.residency.update({
        where: { id: propertyId },
        data: { sold: true },
      });
  
      res.send({ message: "La propiedad ha sido actualizada exitosamente", updatedResidency });
    } catch (err) {
      throw new Error(err.message);
    }
  });

