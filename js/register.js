async function registerStudent(){


    const studentID =
    document.getElementById("studentID").value.trim();



    if(!studentID){

        alert("กรอกรหัสนักศึกษา");

        return;

    }



    const user =
    JSON.parse(localStorage.getItem("lineUser"));



    if(!user){

        alert("ไม่พบข้อมูล LINE");

        return;

    }



    try{


        // เช็ก Student ใน Sheet

        const check = await fetch(

            CONFIG.GAS_URL +

            "?action=getStudent&studentID=" +

            encodeURIComponent(studentID)

        );


        const student =
        await check.json();



        if(student.status !== "success"){


            alert("ไม่พบรหัสนักศึกษา");


            return;

        }




        // บันทึก LINE + StudentID

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



            alert("ลงทะเบียนสำเร็จ");


            location.href="home.html";


        }
        else{


            alert(result.message);


        }



    }
    catch(err){


        console.error(err);


        alert("เกิดข้อผิดพลาด");


    }


}
