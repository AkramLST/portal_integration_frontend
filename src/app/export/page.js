"use client";
import React from "react";
import { useState, useEffect } from "react";
import "./export.css";

const page = () => {
  const [filterType, setFilterType] = useState("default");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const getCookie = (name) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      if (match) return match[2];
      return null;
    };
    const t = getCookie("authToken");
    if (!t) {
      alert("Session expired. Please login again.");
      window.location.href = "/";
      return;
    }
    setToken(t);
  }, []);

  const handleInvalidToken = () => {
    alert("Invalid or expired token. Please login again.");
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // clear cookie
    window.location.href = "/"; // redirect to login
  };

  const handleExport = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Export type:", filterType);

    if (filterType === "custom") {
      const fromDateTime = startDate;
      const toDateTime = endDate;

      try {
        // 🔹 1st download — main dat file
        const response = await fetch(
          `https://portal-integration-project-lst.vercel.app/export/dat?from=${fromDateTime}&to=${toDateTime}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 401 || response.status === 403) {
          handleInvalidToken();
          return;
        }
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "exported-data.dat";
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);

        // 🔹 2nd download — summary dat file
        // const response2 = await fetch(
        //   `https://portal-integration-project-lst.vercel.app/export/summary?from=${fromDateTime}&to=${toDateTime}`,
        //   {
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        // const blob2 = await response2.blob();
        // const downloadUrl2 = window.URL.createObjectURL(blob2);
        // const a2 = document.createElement("a");
        // a2.href = downloadUrl2;
        // a2.download = "school-summary.dat";
        // a2.click();
        // a2.remove();
        // window.URL.revokeObjectURL(downloadUrl2);

        setIsLoading(false);
      } catch (err) {
        console.error("Export failed:", err);
        setIsLoading(false);
      }
    } else if (filterType === "default") {
      try {
        const now = new Date();
        const toDateTime = now.toISOString().split(".")[0];
        const fromDateTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
          .toISOString()
          .split(".")[0];

        // 🔹 1st download — main dat file
        const response = await fetch(
          `https://portal-integration-project-lst.vercel.app/export/dat?from=${fromDateTime}&to=${toDateTime}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401 || response.status === 403) {
          handleInvalidToken();
          return;
        }
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "exported-data.dat";
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);

        // 🔹 2nd download — summary dat file
        // const response2 = await fetch(
        //   `https://portal-integration-project-lst.vercel.app/export/summary?from=${fromDateTime}&to=${toDateTime}`,
        //   {
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        // const blob2 = await response2.blob();
        // const downloadUrl2 = window.URL.createObjectURL(blob2);
        // const a2 = document.createElement("a");
        // a2.href = downloadUrl2;
        // a2.download = "school-summary.dat";
        // a2.click();
        // a2.remove();
        // window.URL.revokeObjectURL(downloadUrl2);

        setIsLoading(false);
      } catch (err) {
        console.error("Export failed:", err);
        setIsLoading(false);
      }
    } else {
      try {
        // 🔹 1st download — main dat file
        const response = await fetch(
          `https://portal-integration-project-lst.vercel.app/export/dat`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401 || response.status === 403) {
          handleInvalidToken();
          return;
        }
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "exported-data.dat";
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);

        // 🔹 2nd download — summary dat file
        // const response2 = await fetch(
        //   `https://portal-integration-project-lst.vercel.app/export/summary`,
        //   {
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        // const blob2 = await response2.blob();
        // const downloadUrl2 = window.URL.createObjectURL(blob2);
        // const a2 = document.createElement("a");
        // a2.href = downloadUrl2;
        // a2.download = "school-summary.dat";
        // a2.click();
        // a2.remove();
        // window.URL.revokeObjectURL(downloadUrl2);

        setIsLoading(false);
      } catch (err) {
        console.error("Export failed:", err);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="export-page">
      <div className="export-container">
        <h2>Export Data</h2>
        <form onSubmit={handleExport}>
          <div className="filter-options">
            <label>
              <input
                type="radio"
                name="filter"
                value="custom"
                checked={filterType === "custom"}
                onChange={() => setFilterType("custom")}
              />
              Custom Date Range
            </label>

            {filterType === "custom" && (
              <div className="date-range">
                <div>
                  <label>From:</label>
                  <input
                    type="date"
                    value={startDate}
                    max={today}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label>To:</label>
                  <input
                    type="date"
                    value={endDate}
                    max={today}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            <label>
              <input
                type="radio"
                name="filter"
                value="full"
                checked={filterType === "full"}
                onChange={() => setFilterType("full")}
              />
              Full Dataset Export
            </label>

            <label>
              <input
                type="radio"
                name="filter"
                value="default"
                checked={filterType === "default"}
                onChange={() => setFilterType("default")}
              />
              Default (Last 24 Hours)
            </label>
          </div>

          <button type="submit" disabled={isLoading}>
            Export Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
