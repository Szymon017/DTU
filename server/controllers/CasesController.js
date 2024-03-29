import Case from "../models/CaseModel.js"

const addNewCase = async (req, res) => {
    const { title, officers, date } = req.body;
    try {
        const newCase = await Case.create({ title, officers, date });
        res.status(200).json({
            message: "Successfully added a new case"
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}

const getAllCases = async (req, res) => {
    const query = {}
    if (req.query.archived) {
        query.archived = req.query.archived
    }
    if (req.query.persons) {
        query.persons = req.query.persons
    }
    if (req.query.orgs) {
        query.orgs = req.query.orgs
    }

    try {
        if (query.persons || query.orgs) {
            console.log("this is query: " + query);
            const result = await Case.find(query)
            res.status(200).json({
                message: "Successfully got all cases",
                results: result
            })
        } else {
            const result = await Case.find(query).populate('officers orgs persons', 'firstName lastName name photo')
            res.status(200).json({
                message: "Successfully got all cases",
                results: result
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const deleteCase = async (req, res) => {
    try {
        const result = await Case.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({
            message: "Successfully deleted a case",
            result: result
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const updateCase = async (req, res) => {
    try {
        const newCase = await Case.findByIdAndUpdate(
            req.params.id,
            req.body, {
            new: true
        }
        );
        if (!newCase) throw Error("No case found!");
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