async function postData(data){

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


    return JSON.parse(text);

}
