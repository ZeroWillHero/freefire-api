const express = require('express');
const router = express.Router();
const User = require('../models/user');
const postData = require('../API/thirdPartyapi');
const axios = require('axios');


router.post('/getuser', async (req, res) => {

    const { login_id } = req.body;
    const user = await User.findOne({ login_id });
    if (user) {
        console.log("user from DB")
        res.status(200).send(user);
    }
    else {
        
            const headers = {
                'Accept-Language': 'en-US,en;q=0.9,si;q=0.8',
                'Connection': 'keep-alive',
                'Cookie': 'MicrosoftApplicationsTelemetryDeviceId=dcad078d-3b53-4a56-978a-7d40d4fcef05; MicrosoftApplicationsTelemetryFirstLaunchTime=2024-05-03T16:23:37.128Z; source=pc; session_key=6j9wxkqy1vt739e1fpswngz9trjf1075; datadome=PSWQBrj~SEKHBxzThQwJZZ0dLP6fcrWEeDsPAovUCdXYzqNuY5lWDi_lTLzPwnnI8xXzsQexANZUfstnI94hVHLQ_DYL3szCmXWlr_Cvu4G~jYsBV_ThxF4fiQI4OnWe',
                'Origin': 'https://shop.garena.ph',
                'Referer': 'https://shop.garena.ph/app',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
                'accept': 'application/json',
                'content-type': 'application/json',
                'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
                'x-datadome-clientid': '9y7jAdQl0FLuafGEyvj5TnXlxm3HXQVS66NWnglxJNTQGtcznlOBeh5I9B3EsqCldQnpnK2Cb_zv4Znog2TFSof6DvuB1fSh8yfNSynczMDpmlkxB1M6jsrEBTTlz29b'
            };

            const data = { "app_id": 100067, "login_id": login_id, "app_server_id": 0 }

            axios.post('https://shop.garena.ph/api/auth/player_id_login', data, { headers })
                .then(response => {
                    // console.log('Response:', response.data);
                    res.send(response.data);
                    const newUser = new User({
                        login_id,
                        nickname: response.data.nickname
                    });


                    newUser.save();
                })
                .catch(error => {
                    res.status(400).send('Error: ' + error);
                });



    }

}
)

module.exports = router;