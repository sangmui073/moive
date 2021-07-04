
import React, { useRef, useState } from 'react';
import { useStyles } from "./style"
import { Search, Close } from '@material-ui/icons';
import PropTypes from 'prop-types';

SearchTemp.propTypes = {
    onSubmit: PropTypes.func
};
SearchTemp.defaultProps = {
    onSubmit: null
}
function SearchTemp(props) {
    const classes = useStyles()
    const { onSubmit } = props;
    const [searchTerm, SetSearchTerm] = useState("");
    const typingTimeOutRef = useRef(null)
    const handleChange = (e) => {
        SetSearchTerm(e.target.value)
        const newTerm = e.target.value;
        if (!onSubmit) return;
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        }
        typingTimeOutRef.current = setTimeout(() => {
            onSubmit(newTerm)
        }, 500);
    }
    return (
        <form className={classes.search}>
            <input type="text" required value={searchTerm} onChange={handleChange} />
            <label className="glass">
                <Search />
                <span></span>
                <span>Tìm Kiếm</span>
            </label>
            <label className="close" onClick={() => {
                SetSearchTerm("");
                if (!onSubmit) return;

                onSubmit("")
            }}>
                <Close />
            </label>
        </form>
    );
}

export default SearchTemp;



