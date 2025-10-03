import axios from "../../../../features/api/axios";

type ApiResponse = {
  ok: boolean;
  data: any;
};

export async function getAllDepartments() {
  try {
    const response = await axios.get("/products");
    const data = await response.data;
    return {
      ok: response.status >= 200 && response.status < 300,
      data: { success: true, departments: data.products },
    };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Network error. Please try again." } };
  }
}
export async function addingDepartment(name: string) {
  try {
    const response = await axios.post("/products/add", {
      name,
    });
    const data = response.data;
    return { ok: response.status >= 200 && response.status < 300, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Network error. Please try again." } };
  }
}

export async function singlDepartmentDetails(id: string): Promise<ApiResponse> {
  try {
    const response = await axios.get(`/products/${id}`);
    const data = await response.data;
    return {
      ok: response.status >= 200,
      data: { success: true, department: data },
    };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Network error. Please try again." } };
  }
}
