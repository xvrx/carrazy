function ifSliced(date, range) {
    const start = new Date(range.mulai)
    const akhir = new Date(range.akhir)
    

    if (date <= akhir && date >= start) return true
    return false
}

function checkIfDateSliced(range1, range2) {
  const [start1, end1] = range1
  const [start2, end2] = range2
  
  // check if any date in range 1 exists in range 2 and vice versa
  if (start1 >= start2 && start1 <= end2) return true
  if (end1 >= start2 && end1 <= end2) return true
  if (start2 >= start1 && start2 <= end1) return true
  if (end2 >= start1 && end2 <= end1) return true
  
  return false
}

function normalizeDate(x) {
    if (x !== null) {
      if (typeof x == 'string') {
        const doo = new Date(x)
        const b = ( new Date( doo.getTime() + Math.abs(doo.getTimezoneOffset()*60000) ).toISOString()  );
        const a = b.split('T')[0]
        return a
      } else { 
        const b = ( new Date( x.getTime() + Math.abs(x.getTimezoneOffset()*60000) ).toISOString() ) 
        const a = b.split('T')[0]
        return a
      }
    } else {
      return ''
    }
  }


module.exports = { ifSliced, normalizeDate,checkIfDateSliced }