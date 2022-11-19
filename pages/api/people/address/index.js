import axios from "axios";

export function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            return axios({
                method: 'get',
                url: 'http://localhost:8080/ps/users/3/address',
                headers: {
                    'accept': '*/*',
                    'charset': 'UTF-8',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*'
                },
                mode: 'no-cors',
            }).then(function (response) {
                console.log(response);
                res.status(200).json(response);
            }).catch(function (error) {
                console.log(error);
                res.status(500).json(error);
            });
            break;
        case "POST":
            return axios({
                method: 'post',
                url: 'http://localhost:8080/ps/users/3/address',
                data: req.body,
                headers: {
                    'accept': '*/*',
                    'charset': 'UTF-8',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*'
                },
                mode: 'no-cors',
            }).then(function (response) {
                console.log(response);
                res.status(201).json(response);
            }).catch(function (error) {
                console.log(error);
                res.status(500).json(error);
            });
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}