import { CreateEmailPayload } from "../types/email";
import { axiosInstance } from "./axios-instance";

export const fetchEmails = async ({
  page = 1,
  limit = 10,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const response = await axiosInstance.get(
    `/emails?page=${page ?? 1}&limit=${limit ?? 10}&search=${search}`
  );
  return response.data;
};

export const fetchEmailById = async (id: string) => {
  const response = await axiosInstance.get(`/emails/${id}`);
  return response.data;
};

export const sendEmail = async (data: CreateEmailPayload) => {
  const response = await axiosInstance.post("/emails", data);
  return response.data;
};

export const markEmailAsRead = async (id: string, read: boolean) => {
  const response = await axiosInstance.put(`/emails/${id}`, { read });
  return response.data;
};
