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



        // เก็บข้อมูล LINE ไว้ก่อน
        const user = {

            lineUserID: profile.userId,

            displayName: profile.displayName,

            pictureUrl: profile.pictureUrl

        };



        localStorage.setItem(
            "lineUser",
            JSON.stringify(user)
        );



        // ไปหน้ากรอกรหัสนักศึกษา
        window.location.href =
            "register.html";



    } catch (err) {


        console.error(err);


        document.getElementById("status").innerHTML =
            "❌ " + err.message;


    }

}
