async function postData(data){

    try {

        const res = await fetch(

            CONFIG.GAS_URL,

            {
                method:"POST",

                headers:{
                    "Content-Type":"text/plain;charset=utf-8"
                },

                body:JSON.stringify(data)

            }

        );


        const text = await res.text();


        console.log(
            "GAS RESPONSE:",
            text
        );


        if(!text){

            throw new Error(
                "GAS ไม่ส่งข้อมูลกลับมา"
            );

        }



        return JSON.parse(text);



    }
    catch(err){

        console.error(
            "POST ERROR:",
            err
        );


        throw err;

    }

}
