import axios from "axios";
import REACT_APP_URL from "../components/GlobalVarsFrontEnd";

class GetServiceComponent {
  getResponse() {
    return axios.get("http://localhost:8080/hello-world");
  }
  getBeanResponse() {
    return axios.get("http://localhost:8080/hello-world-bean");
  }
  getSignupResponse(values) {
    return axios.post(`${REACT_APP_URL}/api/v1/signup`, values);
  }
}

const objectGetServiceComponent = new GetServiceComponent();
export default objectGetServiceComponent;
