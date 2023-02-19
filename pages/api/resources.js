export async function fetchResourcesMongoDB() {
    const res = await fetch('https://cors-anywhere.herokuapp.com/https://us-west-2.aws.data.mongodb-api.com/app/data-ejhjf/endpoint/data/v1/action/find', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'pKkhRJGJaQ3NdJyDt69u4GPGQTDUIhHlx4a3lrKUNx2hxuc8uba8NrP3IVRvlzlo',
            'Access-Control-Request-Headers': '*',
            'origin': 'https://gem5vision.github.io',
        },
        body: JSON.stringify({
            "dataSource": "gem5-vision",
            "database": "gem5-vision",
            "collection": "resources",
        })
    }).catch(err => console.log(err));
    const resources = await res.json();
    return resources['documents']
}

export async function fetchResources() {
    return fetch('https://raw.githubusercontent.com/Gem5Vision/json-to-mongodb/main/resources.json')
        .then(res => res.json())
}

export default async function handler(req, res) {
    const resources = await fetchResourcesMongoDB();

    res.status(200).json(resources);
}