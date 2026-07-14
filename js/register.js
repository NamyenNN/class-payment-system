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

            "?action=getStudent&studentId=" +

            encodeURIComponent(studentID)

        );



        const studentText =
        await check.text();



        console.log(
            "Student response:",
            studentText
        );



        const student =
        JSON.parse(studentText);



        if(student.status !== "success"){


            alert(
                student.message ||
                "ไม่พบรหัสนักศึกษา"
            );


            return;

        }




        // ส่งข้อมูล LINE + StudentID

        const data = {

            action:"registerLine",

            lineUserID:user.lineUserID,

            displayName:user.displayName,

            pictureUrl:user.pictureUrl || "",

            studentID:studentID

        };



        console.log(
            "Send register:",
            data
        );



        const result =
        await postData(data);



        console.log(
            "Register result:",
            result
        );



        if(result.status === "success"){



            user.studentID = studentID;



            localStorage.setItem(

                "lineUser",

                JSON.stringify(user)

            );



            alert(
                "ลงทะเบียนสำเร็จ"
            );



            window.location.href =
            "home.html";


        }
        else{


            alert(

                result.message ||

                "ลงทะเบียนไม่สำเร็จ"

            );


        }



    }
    catch(err){


        console.error(
            "REGISTER ERROR:",
            err
        );


        alert(

            "ERROR:\n" +

            err.message

        );


    }


}
