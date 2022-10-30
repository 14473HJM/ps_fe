import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ProjectItemCard from "../card";

const EmptyProjectsAlert = () => {
    return (
        <>
            <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                {/* This is an info alert — <strong>check it out!</strong> */}
                The project list is empty.
            </Alert>
        </>
    );
};

export default function ProjectList({ projecs }) {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem 0",
            }}
        >
            {projecs.map((project) => (
                <ProjectItemCard key={project.id} {...project} />
            ))}

            {!projecs.length && <EmptyProjectsAlert />}
        </Box>
    );
}