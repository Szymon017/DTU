import CrimeOrg from "../models/CrimeOrgModel.js";

const addCrime = async(req,res) => {
    const {name, color, dangerLevel, photo, orgAreaPhoto} = req.body;
    console.log(req.body);
    try {
        if(!name){
            throw Error("Nie podano nazwy organizacji przestępczej")
        }
        if( !color){
            throw Error("Nie wybrano kolorystyki organizacji")
        }
        const newOrg = await CrimeOrg.create({
            name, 
            color,
            dangerLevel,
            photo,
            orgAreaPhoto
        })
        res.status(200).json({
            message: "Successfully added new crime organization",
            object: newOrg
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getAllCrimeOrgs = async(req,res) => {
    let query = {}
    if(req.query.name){
        query.name = req.query.name
    }
    if(req.query.archived){
        query.archived = req.query.archived
    }
    console.log(query.name);
    try {
        if(req.query){
            const result = await CrimeOrg.find(query).populate("members")
            if(result.length < 1) {
                res.status(200).json({
                    message: "Brak organizacji o podanej nazwie",
                    results: result
                })
            }else{
                res.status(200).json({
                    message: "success",
                    results: result
                })
            }
        }else{
            const result = await CrimeOrg.find().populate("members")
            res.status(200).json({
                message: "success",
                results: result
            })
        }
        
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

const updateCrimeOrg = async(req,res) => {
    console.log("Updating crimeOrg");
    console.log(req.body);
    try {
        const newCrimeOrg = await CrimeOrg.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!newCrimeOrg) {
            throw Error("No person found!")
        }
        res.status(200).json({
            status: "Successfully updated a person",
            data: newCrimeOrg
        })
    } catch (error) {
        res.status(200).json({
            status: "Failed to update a person",
            error: error.message
        })
    }
}

const deleteOrg = async(req, res) => {

}

export{
    addCrime,
    getAllCrimeOrgs,
    updateCrimeOrg,
    deleteOrg
}