async function postData(data){


const res = await fetch(
CONFIG.GAS_URL,
{

method:"POST",

body:JSON.stringify(data)

}

);


return await res.json();


}
