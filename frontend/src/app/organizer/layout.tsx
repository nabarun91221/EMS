"use client";

import { styled, Container, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "@/components/dashboard/header/Header";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:7777/api/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.user.role == "ATTENDEE") {
            return router.push("/attendee/dashboard")
          }
          setUser(data.user);
        }
      } catch (err) {
        console.log("Failed to fetch user");
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, setUser]);

  return (
    <MainWrapper>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />

      <PageWrapper>
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />

        <Container sx={{ paddingTop: "20px", maxWidth: "1200px" }}>
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            {children}
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}