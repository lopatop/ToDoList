import Pagination from "@mui/material/Pagination";
import {ChangeEvent} from "react";
import Typography from "@mui/material/Typography";
import styles from "./TaskPagination.module.css"
import {COUNT_SIZE} from "@/common/constant";

type TaskPaginationProps={
    totalCount: number,
    page:number,
    setPage: (page:number) => void,


};

export const TaskPagination = ({totalCount,page,setPage}: TaskPaginationProps) => {


    const onChangePageHandler = (_e:ChangeEvent<unknown>, page:number) => {
        setPage(page)
    }

    return(
        <>
            { totalCount > COUNT_SIZE &&
                <Pagination
                    count={Math.ceil(totalCount/COUNT_SIZE)}
                    page={page}
                    onChange={onChangePageHandler}
                    shape="rounded"
                    color="primary"
                    className={styles.pagination}
                />
            }

            <div className={styles.totalCount}>
                <Typography variant='caption'>Total: {totalCount}</Typography>
            </div>
        </>
    )


}