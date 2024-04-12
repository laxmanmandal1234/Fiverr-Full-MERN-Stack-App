// define and export all the callback functions for gig routes inside here

import Gig from "../models/gig.js";
import { ErrorHandler } from "../middleware/error.js";

const createGig = async (req, res, next) => {
    if(!req.isSeller){
        return next(new ErrorHandler(403, "Only Seller can create a Gig!"));
    }

    const newGig = new Gig({
        userId: req.userId,
        ...req.body,
    });

    try {
        const savedGig = await newGig.save();
        res.status(201).json({
            success: true,
            message: "Gig added successfully",
            savedGig: savedGig
        });
        
    } catch (error) {
        next(error);
    }
}

const deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if(!gig){
            return next(new ErrorHandler(404, "Gig not found"));
        }

        if(gig.userId !== req.userId){
            return next(new ErrorHandler(403, "You can delete only your gig."));
        }

        //delete the gig
        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).json({
            succes: true,
            message: "Gig has been deleted."
        });
        
    } catch (error) {
        next(error);
    }
}

const getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);

        if(!gig) {
            return next(new ErrorHandler(404, "Gig not found"));
        }

        res.status(200).json({
            succes: true,
            gig: gig
        });

    } catch (error) {
        next(error);
    }
}

const getGigs = async (req, res, next) => {
    try {
        const query = req.query;
        const filters = {
            ...(query.userId && {userId: query.userId}),
            ...(query.cat && {category: query.cat}),
            ...(query.search && {title: {$regex: query.search, $options: "i"}}),
            ...((query.min || query.max) && {price: {...(query.min && {$gt: query.min}), ...(query.max && {$lt: query.max})}})
        };
        const gigs = await Gig.find(filters).sort({ [query.sort]: -1 });

        if(!gigs) {
            return next(new ErrorHandler(404, "Gig not found"));
        }

        res.status(200).json({
            succes: true,
            gigs: gigs
        });

    } catch (error) {
        next(error);
    }
}

export { getGig, getGigs, createGig, deleteGig };