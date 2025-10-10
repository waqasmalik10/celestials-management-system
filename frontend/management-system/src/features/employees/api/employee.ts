import axios from "../../../features/api/axios";

type ApiResponse = {
  ok: boolean;
  data: any;
};

export async function getAllEmployeesData() {
  try {
    const response = await axios.get("/users");
    const data = await response.data;
    return {
      ok: response.status >= 200,
      data: { success: true, users: data.users },
    };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Network error. Please try again." } };
  }
}

export async function singlEmployeeDetails(id: string): Promise<ApiResponse> {
  try {
    const response = await axios.get(`/users/${id}`);
    const data = await response.data;
    return {
      ok: response.status >= 200,
      data: { success: true, user: data },
    };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Network error. Please try again." } };
  }
}

export async function addingEmployee(
  name: string,
  image: string,
  email: string,
  password: string | number,
  date: string | number | Date,
  employeeId: number,
  mySelectField?: string,
  employeeInformation?: string
) {
  try {
    const response = await axios.post("/user/add", {
      name,
      image,
      email,
      password,
      employeeId,
      mySelectField,
      employeeInformation,
      date,
    });
    const data = response.data;
    return { ok: response.status >= 200 && response.status < 300, data };
  } catch (err) {
    console.error(err);
    return { ok: false, data: { message: "Network error. Please try again." } };
  }
}
