
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import styles from "./TodolistSkeleton.module.css"
import {paperStyle} from "@/features/todolists/ui/Todolists/Todolists.styles.ts";
import {containerSx} from "@/common/styles";

export const TodolistSkeleton = () => (
    <Paper className={styles.container} sx={paperStyle}>
        <div className={styles.title}>
            <Skeleton width={150} height={50} />
            <Skeleton width={20} height={40} />
        </div>
        <div className={styles.createItemForm}>
            <Skeleton width={210} height={60} />
            <Skeleton width={20} height={40} />
        </div>
        {Array(4)
            .fill(null)
            .map((_, id) => (
                <Box key={id} sx={containerSx}>
                    <div className={styles.tasks}>
                        <Skeleton width={20} height={40} />
                        <Skeleton width={150} height={40} />
                    </div>
                    <Skeleton width={20} height={40} />
                </Box>
            ))}
        <Box sx ={containerSx}>
            {Array(3)
                .fill(null)
                .map((_, id) => (
                    <Skeleton key={id} width={80} height={60} />
                ))}
        </Box>
    </Paper>
)