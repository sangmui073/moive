import React, { memo } from "react";
import PropTypes from 'prop-types';
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { useStyles } from "./style";
import { useHistory } from "react-router";
const textTitle = [
  {
    id: "navCarousel",
    label: "Trang Chủ",
  },
  {
    id: "carouselHot",
    label: "Lịch Chiếu",
  }, {
    id: "thearter",
    label: "Cụm Rạp",
  },
  {
    id: "news",
    label: "Tin Tức"
  }
];
const cls = {
  color: "#fff",
  margin: "5px",
  whiteSpace: "nowrap",
};
SimpleBottomNavigation.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func
};
SimpleBottomNavigation.defaultProps = {
  title: "navCarousel",
  onChange: null
}
function SimpleBottomNavigation(props) {

  const classes = useStyles();
  const { title, onChange } = props;
  const history = useHistory();
  const handleScroll = (event, id) => {
    const anchor = (event.target.ownerDocument || document).querySelector(`#${id}`);
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  return (
    <BottomNavigation
      value={title}
      onChange={(event, newValue) => {
        if (!onChange) return
        onChange(newValue);
        handleScroll(event, newValue)
      }}
      showLabels
      className={classes.root}
    >
      {textTitle.map((txt, index) => {
        return (
          <BottomNavigationAction
            onClick={() => {
              history.push("/");
            }}

            style={cls}
            key={index}
            label={txt.label}
            value={txt.id}
          />
        );
      })}
    </BottomNavigation>
  );
}
export default memo(SimpleBottomNavigation);
