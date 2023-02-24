import axios from "axios";

class GetServiceComponent {
  getResponse() {
    return axios.get("http://localhost:8080/hello-world");
  }
  getBeanResponse() {
    return axios.get("http://localhost:8080/hello-world-bean");
  }
}

const objectGetServiceComponent = new GetServiceComponent();
export default objectGetServiceComponent;
