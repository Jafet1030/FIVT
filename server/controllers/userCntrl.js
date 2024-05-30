import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'

//funcion para crear un usuario
export const createUser = asyncHandler(async(req,res)=>{
    console.log("Creando un usuario");
    let {email} = req.body;
    const userExist = await prisma.user.findUnique({where:{email:email}})
    if(!userExist){
        const user = await prisma.user.create({data:req.body});
        res.send({
            message:"Usuario creado exitosamente",
            user:user,
        });
    } else res.status(201).send({message:'Este usuario ya ha sido registrado'});
});

//funcion para reservar una visita una residencia
export const bookVisit = asyncHandler(async(req,res)=>{
    const {email, date}=req.body
    const {id}=req.params

    try{
        const alreadyBooked=await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: true}
        })
        if(alreadyBooked.bookedVisits.some((visit)=>visit.id === id)){
            res.status(400).json({message:"Esta residencia ya esta reservada por ti"});
        }
        else{
            await prisma.user.update({
                where:{email:email},
                data: {
                    bookedVisits:{push:{id,date}}
                },
            });
            res.send("Tu visita ha sido reservada exitosamente");
        }
    }catch(err){
        throw new Error(err.message)
    }
});

//funcion para ver todas las reservaciones de un usuario
export const getAllBookings=asyncHandler(async(req,res)=>{
    const {email} = req.body
    try{
        const bookings = await prisma.user.findUnique({
            where:{email},
            select:{bookedVisits:true}
        })
        res.status(200).send(bookings)
    }catch(err){
        throw new Error(err.message);
    }
});

//funcion para cancelar una visita
export const cancelBooking = asyncHandler(async(req,res)=>{

    const {email}= req.body;
    const {id}=req.params
    try{
        const user = await prisma.user.findUnique({
            where: {email:email},
            select: {bookedVisits:true}
        })

        const index = user.bookedVisits.findIndex((visit)=>visit.id===id)
        if(index===-1){
            res.status(404).json({message:"Reserva no encontrada"})
        }else{
            user.bookedVisits.splice(index,1)
            await prisma.user.update({
                where: {email},
                data: {
                    bookedVisits: user.bookedVisits
                }
            })
            res.send("Reserva cancelada exitosamente")
        }

    }catch(err){
        throw new Error(err.message)
    }
});

//funcion para agregar una residencia en lista de favoritos de un usuario
export const toFav = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { rid } = req.params;
  
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (user.favResidenciesID.includes(rid)) {
        const updateUser = await prisma.user.update({
          where: { email },
          data: {
            favResidenciesID: {
              set: user.favResidenciesID.filter((id) => id !== rid),
            },
          },
        });
  
        res.send({ message: "Removed from favorites", user: updateUser });
      } else {
        const updateUser = await prisma.user.update({
          where: { email },
          data: {
            favResidenciesID: {
              push: rid,
            },
          },
        });
        res.send({ message: "Updated favorites", user: updateUser });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });

    
// funcion para ver todos los favoritos
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(favResd);
  } catch (err) {
    throw new Error(err.message);
  }
});