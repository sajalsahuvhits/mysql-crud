export const SendResponse = (res, status, message, data = [])=>{
    res.status(status).send({status, message, data})
}