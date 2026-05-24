import express from "express";
import ATSAnalysis from "../models/ATSAnalysis.js";

export const getATSHistory = async(req, res)=>{
    try {
        const analyses = await ATSAnalysis.find({
            userId: req.user_id,
        })
        .sort({createdAt: -1});
        res.json(analyses);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getATSById = async (req, res)=>{
    try {
        const analysis = await ATSAnalysis.findById({
            _id: req.params.id,
            userId: req.user._id,
        });

        if(!analysis){
            return res.status(404).json({error: "Analysis not found"});
        }
        res.json(analysis);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const deleteATSAnalysis =
  async (req, res) => {

  try {

    await ATSAnalysis.findOneAndDelete({

      _id:
        req.params.id,

      userId:
        req.user._id,
    });

    res.json({
      message:
        "Deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      error:
        error.message,
    });
  }
};