// utils
const { ifSliced, normalizeDate } = require('../util')


module.exports = async function (req,res,next) {
    try {
        const now = new Date(normalizeDate(currentDate));
        const mulai = new Date(req.body.mulai);
        const akhir = new Date(req.body.akhir);
    
        // check status
        const ifGoingon = ifSliced(now, {mulai,akhir});
        const ifApproved = now < mulai;
        const ifDone = now > akhir
    
         // update peminjaman record status
         if(ifGoingon) {
            req.body.status = "ongoing"
        } else if(ifApproved) {
            req.body.status = "ongoing"
        } else if(ifDone) {
            req.body.status = "done"
        }
        next()
    } catch (error) {
        console.log('failed to adjust status: ',error)
        next()
    }
}