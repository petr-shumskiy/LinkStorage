class ControllerBase {
  setRequest(request) {
    this.request = request;
  }

  setResponse(response) {
    this.response = response;
  }
}

module.exports = { ControllerBase }