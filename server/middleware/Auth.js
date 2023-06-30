import express from "express";
import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).json({message: "No token found"});
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err){
            console.log("bad token");
            return res.status(403).json({message:"Bad token"});
        } 
        next();
    })
}

const authOfficer = (req, res, next) => {
    console.log(req.headers);

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.status(401).json({message: "No token found"});
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err){
            console.log("bad token");
            return res.status(403).json({message:"Bad token"});
        } 
        return res.status(200).json({authorization: true})
    })
}

export {
    authenticateToken,
    authOfficer
}
