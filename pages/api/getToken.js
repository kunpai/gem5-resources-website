export default async function getToken() {
    let token = await fetch('https://realm.mongodb.com/api/client/v2.0/app/data-ejhjf/auth/providers/api-key/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
        },
        body: JSON.stringify({
            "key": 'pKkhRJGJaQ3NdJyDt69u4GPGQTDUIhHlx4a3lrKUNx2hxuc8uba8NrP3IVRvlzlo'
        })
    }).catch(err => console.log(err));
    let tokenJson = await token.json();
    let accessToken = tokenJson['access_token'];
    if (accessToken)
        console.log("Successfully got access token");
    else
        console.log("Failed to get access token");
    return accessToken;
}