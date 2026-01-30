class ApiResponse {
  constructor({ statusCode, message = "Success", total = null, data = null }) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    if (total !== null) {
      this.total = total;
    }
    this.data = data;
  }
}

export default ApiResponse;
