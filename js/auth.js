async function initLINE(){

  await liff.init({
    liffId: CONFIG.LIFF_ID
  });


  if(!liff.isLoggedIn()){

    liff.login();

    return;

  }


  const profile = await liff.getProfile();



  const user = {

    action:"registerLine",

    lineUserID: profile.userId,

    displayName: profile.displayName,

    studentID:""

  };



  await fetch(CONFIG.GAS_URL,{

    method:"POST",

    body:JSON.stringify(user)

  });



  localStorage.setItem(
    "lineUser",
    JSON.stringify(user)
  );



  window.location.href="home.html";


}
