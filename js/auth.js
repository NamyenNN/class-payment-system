async function initLINE() {

    try {

        await liff.init({
            liffId: CONFIG.LIFF_ID
        });


        if (!liff.isLoggedIn()) {

            liff.login();

            return;

        }


        const profile = await liff.getProfile();


        document.getElementById("status").innerHTML =
            "สวัสดี " + profile.displayName;



        const data = {

            action: "registerLine",

            lineUserID: profile.userId,

            displayName: profile.displayName,

            pictureUrl: profile.pictureUrl,

            studentID: ""

        };



        // ส่งข้อมูลเข้า GAS
        const result = await postData(data);



        if (result.status !== "success") {

            throw new Error(result.message);

        }



        // เก็บข้อมูล LINE
        localStorage.setItem(
            "lineUser",
            JSON.stringify(data)
        );



        /*
            เช็กว่ามีรหัสนักศึกษาหรือยัง

            ตอนนี้ยังไม่มี
            ให้ไปหน้ากรอกเลข นศ.
        */


        window.location.href = "register.html";



    } catch (err) {


        console.error(err);


        document.getElementById("status").innerHTML =
            "❌ " + err.message;


    }

}
