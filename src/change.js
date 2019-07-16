const change2 = (data)=>{
// const data={
//     currency1:"JOD",
//     currency2:"ILS",
//     flag:true,
//     Amount:10,
//     USD2Currency1:7.09,
//     USD2Currency2:35.45,
// }
// let a=0;
// if(data.flag)
    return data.Amount*data.USD2Currency2/data.USD2Currency1;
// else
    // return data.Amount*data.USD2Currency1/data.USD2Currency2;
// {
//     a=data.Amount*data.USD2Currency2/data.USD2Currency1;
// }
// else
// {
//     a=data.Amount*data.USD2Currency1/data.USD2Currency2;
    
// }
// return a;
}
module.exports=change2;