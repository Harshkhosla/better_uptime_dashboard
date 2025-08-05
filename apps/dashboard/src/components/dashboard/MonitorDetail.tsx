import React from "react";
import { useGetwebsitebyIdQuery } from "../../redux/api/authApi";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";

export const MonitorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    data: websiteData,
    isLoading,
    error,
  } = useGetwebsitebyIdQuery({ websiteId: id! });
  console.log(websiteData);
  return <div>MonitorDetail</div>;
};
