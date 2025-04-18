const studentService = require("../services/auth.service");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const getAllStudents = catchAsync(async (req, res) => {
  const students = await studentService.getAllStudents();
  res.status(httpStatus.OK).json({
    status: "success",
    data: students,
  });
});

const getStudentByNIM = catchAsync(async (req, res) => {
  const { nim } = req.params;
  const student = await studentService.getStudentByNIM(nim);

  res.status(httpStatus.OK).json({
    status: "success",
    data: student,
  });
});

const createStudent = catchAsync(async (req, res) => {
  const { nim, name, faculty, password } = req.body;
  const newStudent = await studentService.createStudent(
    nim,
    name,
    faculty,
    password
  );

  res.status(httpStatus.CREATED).json({
    status: "success",
    message: "Student created successfully",
    data: newStudent,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { nim } = req.params;
  const updatedData = req.body;

  const updatedStudent = await studentService.updateStudent(nim, updatedData);

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Student updated successfully",
    data: updatedStudent,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { nim } = req.params;
  await studentService.deleteStudent(nim);

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Student deleted successfully",
  });
});

const login = catchAsync(async (req, res) => {
  const { nim, password } = req.body;
  
  const student = await studentService.loginStudent(nim, password);

  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Login berhasil",
    data: student,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const { nim, newPassword } = req.body;

  if (!nim || !newPassword) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "NIM dan password baru diperlukan."
    );
  }

  await studentService.resetPassword(nim, newPassword);

  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Password berhasil direset.",
  });
});

module.exports = {
  getAllStudents,
  getStudentByNIM,
  createStudent,
  updateStudent,
  deleteStudent,
  login,
  resetPassword,
};
