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

        // ส่งข้อมูลไป GAS
        const result = await postData(data);

        if (result.status !== "success") {
            throw new Error(result.message);
        }

        // เก็บข้อมูลไว้ใช้ในหน้าถัดไป
        localStorage.setItem("lineUser", JSON.stringify({
            lineUserID: profile.userId,
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
            studentID: ""
        }));

        // ไปหน้า Home
        window.location.href = "home.html";

    } catch (err) {

        console.error(err);

        document.getElementById("status").innerHTML =
            "❌ " + err.message;

    }

}
