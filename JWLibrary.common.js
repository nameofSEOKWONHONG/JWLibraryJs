///*****************************************************************
//string extensions
Number.prototype.setComma = function () {
    return String(this).setComma();
}

String.prototype.setComma = function () {
    return this.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

Number.prototype.unComma = function () {
    return String(this).unComma();
}

String.prototype.unComma = function () {
    return this.replace(/[^\d]+/g, '');
}
//*****************************************************************/

function getDateNow() {
   var today = new Date();
   var dd = today.getDate();
   var mm = today.getMonth() + 1;
   var yyyy = today.getFullYear();
   
   if(dd < 10) dd = '0' + dd;
   if(mm < 10) mm = '0' + mm;
   
   return yyyy + '-' + mm + '-' + dd;
}
