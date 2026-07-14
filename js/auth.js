async function initLINE(){


try{


await liff.init({

liffId: CONFIG.LIFF_ID

});



if(!liff.isLoggedIn()){

liff.login();

return;

}



const profile = await liff.getProfile();



document.getElementById("status").innerHTML =
"สวัสดี "+profile.displayName;



const data = {

action:"registerLine",

lineUserID:profile.userId,

displayName:profile.displayName,

studentID:""

};



await postData(data);



localStorage.setItem(
"lineUser",
JSON.stringify(data)
);



setTimeout(()=>{

location.href="home.html";

},1000);



}catch(err){


document.getElementById("status").innerHTML =
err;


}



}
