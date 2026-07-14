async function registerStudent(){


const studentID =
document.getElementById("studentID").value;



if(!studentID){

alert("กรอกรหัสนักศึกษา");

return;

}



const user =
JSON.parse(localStorage.getItem("lineUser"));



const data = {

action:"registerLine",

lineUserID:user.lineUserID,

displayName:user.displayName,

studentID:studentID

};



const result =
await postData(data);



if(result.status==="success"){


user.studentID = studentID;


localStorage.setItem(
"lineUser",
JSON.stringify(user)
);



location.href="home.html";


}
else{


alert(result.message);


}


}
