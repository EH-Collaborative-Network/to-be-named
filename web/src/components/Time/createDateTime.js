function createDateTime (date, time, offset) {
   let dateString = date + "T" + time + ":00.000" + offset;
   let d = new Date(dateString)
   return d
}

export default createDateTime