import Case from"../models/CaseModel.js"

const addNewCase = async(req, res) => {
    const {title, officers, date} = req.body;
    console.log(req.body)
    try{
        const newCase = await Case.create({title, officers, date});
        res.status(200).json({
            message: "Successfully added a new case"
        })
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }

}

const getAllCases = async(req, res) => {
    try{
        const result = await Case.find({}).populate('officers', 'firstName lastName')
        res.status(200).json({
            message: "Successfully got all cases",
            results: result
        })
    } catch( err ) {
        res.status(500).json({
            message: err.message
        })
    }
}

const deleteCase = async(req, res) => {
    console.log(req.params.id);
    try{
        const result = await Case.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({
            message: "Successfully deleted a case",
            result: result
        })
    } catch( err ) {
        res.status(500).json({
            message: err.message
        })
    }
}

const updateCase = async(req, res) => {
    console.log(req.body);
    try {
        const newCase = await Case.findByIdAndUpdate(
            req.params.id,
            req.body,{
                new: true
            }
        );
        if(!newCase) throw Error("No case found!");
        res.status(200).json({
            status: "Successfully updated a case",
            data: newCase
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed to update a case",
            message: err.message
        })
    }
}
export { 
    addNewCase,
    getAllCases,
    deleteCase,
    updateCase
}