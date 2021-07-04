import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, NativeSelect } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos, SkipPrevious, SkipNext } from '@material-ui/icons';
import { useStyles } from "./style"
PaginationAdmin.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func
};
PaginationAdmin.defaultProps = {
    onPageChange: null
}
function PaginationAdmin(props) {
    const classes = useStyles();
    const { pagination, onPageChange } = props;
    const { currentPage, totalCount, count, totalPages } = pagination;

    const lastPage = currentPage >= totalPages ? totalCount : currentPage * count;

    const fistPage = (lastPage - count) + 1;
    const NewslastPage = currentPage * count;

    const handlePageChange = (newPage) => {
        if (onPageChange) {
            onPageChange(newPage)
        }
    }
    return (
        <div className={classes.root}>
            <span>
                Items per page:
                <FormControl >
                    <NativeSelect onChange={(e) => {

                        const rows = parseInt(e.target.value);
                        console.log(NewslastPage, totalCount)
                        if (rows > totalCount - lastPage) {
                            const newCurrentPage = parseInt(totalCount / rows);

                            handlePageChange({
                                currentPage: newCurrentPage === 0 ? 1 : newCurrentPage,
                                count: rows
                            });
                            return
                        };
                        handlePageChange({
                            count: rows
                        })
                    }}
                        defaultValue={count}
                        inputProps={{
                            name: 'name',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </NativeSelect>
                </FormControl>
            </span>
            <span>
                {fistPage} - {lastPage}    of {totalCount}
            </span>
            <Button disabled={currentPage <= 1}
                onClick={() => {
                    handlePageChange({
                        currentPage: 1,
                    })
                }}
            >
                <SkipPrevious />
            </Button>
            <Button disabled={currentPage <= 1}
                onClick={() => {
                    handlePageChange({
                        currentPage: currentPage - 1,
                    })
                }}
            >
                <ArrowBackIos />
            </Button>
            <Button disabled={currentPage >= totalPages || lastPage >= totalCount}
                onClick={() => {
                    handlePageChange({
                        currentPage: currentPage + 1,
                    })
                }}
            >
                <ArrowForwardIos />
            </Button>
            <Button disabled={currentPage >= totalPages || lastPage >= totalCount}
                onClick={() => {
                    if (totalCount % count === 0) {
                        console.log()
                        handlePageChange({
                            currentPage: totalPages - 1,
                        })
                    } else {
                        handlePageChange({
                            currentPage: totalPages,
                        })
                    }

                }}
            >
                <SkipNext />
            </Button>
        </div>
    );
}

export default PaginationAdmin;