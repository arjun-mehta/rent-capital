import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else {
      // Redirect directly to established dashboard
      navigate("/dashboard-established");
    }
  }, [isAuthenticated, navigate]);

  // Return null while redirecting
  return null;
};

export default Dashboard;
