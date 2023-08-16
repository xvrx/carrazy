import { createContext, useState } from "react"

export const UtilsContext = createContext()

export const UtilsProvider = props => {

  const [currentDate, setcurrentDate] = useState(new Date())

  const next30dayz = getDatesBetween(currentDate, new Date(new Date(currentDate).setDate(currentDate.getDate() + 59)))

    const bulanStr = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ]

    
  
    function checkIfWithin (tgl, somearray) {
      // console.log("check if within array: ", somearray.length)
      if (somearray.length === 0) {
        return false
      } else {
        for (let i = 0; i < somearray.length; i++) {
            const start = new Date(normalizeDate(new Date(somearray[i]?.mulai)) )
            const end = new Date(normalizeDate(new Date(somearray[i]?.akhir)))
            const rng = [start,end]
            if (ifSliced(tgl,rng)) {
                return [true, somearray[i]._id]
            } else if (!ifSliced(tgl,rng) && i !== somearray.length - 1 ) {
                // console.log('continuing...')
                continue
            } return false
      } }
  
  }

  // thank you chatGPT
  function getDatesBetween(startDate, endDate) {
      const dates = [];
      // Copy the start date
      let currentDate = new Date(normalizeDate(startDate));
    
      // Iterate while the current date is less than or equal to the end date
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
    
      return dates;
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

  function ifSliced(date, range) {
      const [start, end] = range
  
      if (date <= end && date >= start) return true
      return false
  }
          
//   function normalizeDate(x) {
//     if (x !== null) {
//       if (typeof x == 'string') {
//         const doo = new Date(x)
//         return ( new Date( doo.getTime() + Math.abs(doo.getTimezoneOffset()*60000) ).toISOString()  );
//       } else { return ( new Date( x.getTime() + Math.abs(x.getTimezoneOffset()*60000) ).toISOString() ) }
//     } else {
//       return ''
//     }
  
//     // Output: Sat Sep 24 2011 00:00:00 GMT-0400 (Eastern Daylight Time)
// }

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

    function formatDate(b) {
        if (b === "") return "";
        // const a = new Date(b);
        const a = new Date(b)
        const taun = a.getFullYear();
        const bulan = a.getMonth() + 1;
        const bulanidx = a.getMonth();
        const tanggal = a.getDate();
        const hari = a.toLocaleString('id-ID', {weekday: 'long'});
        const locale = [tanggal, bulan, taun].join("-");
        const localstr = `${tanggal} ${bulanStr[bulanidx]} ${taun}`  
        return [locale, localstr, `${hari}, ${tanggal} ${bulanStr[bulanidx]}`,`${tanggal}/${bulan}`];
      }



    return (
        <UtilsContext.Provider value={{
          setcurrentDate,currentDate,
            formatDate, normalizeDate,
            next30dayz, checkIfDateSliced,ifSliced,
            checkIfWithin,
            }}>
            {props.children}
        </UtilsContext.Provider>
    )
}