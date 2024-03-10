import axios from "axios";
import config from "../../config";

const getProduct = async () => {
    return await axios.get(`${config.api_host}/api/products`)
};

export default {getProduct};