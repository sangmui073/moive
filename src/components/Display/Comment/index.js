import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Avatar, Backdrop, Box, Button, Fade, Grid, Modal, Paper, TextField, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from "./style";
import { Rating } from "@material-ui/lab";
import Swal from "sweetalert2"
import { GET_COMMENT_SAGA } from "../../../redux/saga/Constants/blogs-constance";
import { useHistory } from "react-router";
import { CHECK_LOGIN } from "../../../redux/reducer/Constants/auth-constants";

CommentBlogs.propTypes = {
    handleComment: PropTypes.func,
    handleLike: PropTypes.func,
    url: PropTypes.string
};
CommentBlogs.defaultProps = {
    handleComment: null,
    handleLike: null,

}
function CommentBlogs(props) {
    const { handleComment, handleLike, url } = props;

    const history = useHistory();
    const { user } = useSelector((state) => state.auth)


    const classes = useStyles();;
    const [post, setPots] = useState({
        rate: 1,
        text: ""
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_COMMENT_SAGA,
            payload: {
                source: url
            }
        })

        if (user) {
            dispatch({
                type: CHECK_LOGIN,
                payload: user
            })
        }
    }, [url])
    const [error, setError] = useState("*Bạn Chưa bình luận!")
    const [open, setOpen] = useState(false);
    const handleModal = (bool) => {
        setOpen(bool);
        setPots({
            rate: 1,
            text: ""
        });
        setError("*Bạn Chưa bình luận!")
    }
    const { comment } = useSelector((state) => state.blogs);

    const renderLike = (commentList) => {
        const taiKhoan = user ? user.taiKhoan : "";
        const indexUser = commentList.like.indexOf(taiKhoan);

        if (indexUser !== -1) {
            return <span style={{ cursor: "pointer" }} onClick={() => {
                handleLike(commentList, user)
            }}>
                <FavoriteIcon style={{ fill: "red" }} />
                <i>{commentList.like.length}</i>
            </span>
        }
        return (<span style={{ cursor: "pointer" }} onClick={() => {
            handleLike(commentList, user)

        }}>
            <FavoriteIcon className="icon-like" />
            <i>{commentList.like.length}</i>
        </span>

        )
    }

    const renderComment = () => {
        return comment.map((cm, index) => {
            return (
                <Paper
                    style={{
                        margin:
                            index % 2 === 0 ? "15px auto 15px 10px" : "15px 10px 15px auto",
                    }}
                    className="cm-child"
                    elevation={3}
                    key={index}
                >
                    <Grid alignItems="center" spacing={2} container>
                        <Grid item xs={7} sm={6} md={6}>
                            <span style={{ marginLeft: "5px" }}>{cm.userName}</span>
                        </Grid>
                        <Grid item xs={5} sm={6} md={6}>
                            <Rating
                                name="half-rating"
                                defaultValue={2.5}
                                precision={cm.rate}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Grid spacing={2} alignItems="center" container>
                        <Grid item md={2}>
                            <Avatar
                                style={{ marginLeft: "5px" }}
                                src={
                                    user?.taiKhoan === cm.userName
                                        ? user?.hinhAnh
                                        : `https://i.pravatar.cc/150?u=${cm.userName}`
                                }
                            />
                        </Grid>
                        <Grid item md={10}>
                            <span>{cm.text}</span>
                            {renderLike(cm)}
                        </Grid>
                    </Grid>
                </Paper>
            );
        });
    };

    if (comment && comment.length > 0)
        return (
            <div className={classes.root}>
                <Paper
                    elevation={1}
                    style={{ background: "rgb(239, 239, 239)", padding: "10px" }}
                >
                    <Grid
                        alignItems="center"
                        spacing={2}
                        style={{ background: "#efefef" }}
                        container
                    >
                        <Grid
                            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                            item
                            xs={7}
                            sm={8}
                            md={9}
                        >
                            <Avatar style={{ marginLeft: "10px" }} src="/broken-image.jpg" />
                            <p
                                style={{
                                    margin: "0px 0px 0px 15px",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    background: "#fff",
                                }}
                                onClick={() => {

                                    user && user.taiKhoan ? handleModal(true) : Swal.fire({
                                        title: 'Đăng Nhập Để Bình Luận',
                                        showCancelButton: true,
                                        confirmButtonText: `Đồng Ý`,
                                        cancelButtonText: `Không`,
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            history.push("/Sig-In")
                                        }
                                    })
                                }}
                            >
                                "Bình Luận..."
                            </p>

                        </Grid>
                        <Grid item xs={5} sm={4} md={3}>
                            <Rating name="disabled" value={5} disabled />
                        </Grid>
                    </Grid>
                    <div className="container-wapcomment">
                        {renderComment()}
                    </div>

                </Paper>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={() => {
                        handleModal(false)
                    }}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography style={{ color: "rgb(254, 121, 0)", textAlign: "center" }} variant="h4">{post.rate}</Typography>
                                <p style={{ textAlign: "center" }}>
                                    <Rating
                                        value={post.rate}
                                        name="simple-controlled"
                                        onChange={(event, newValue) => {
                                            setPots({
                                                ...post,
                                                rate: newValue ? newValue : post.rate
                                            });
                                        }}
                                    />
                                </p>

                                <TextField value={post.text} placeholder="Bình Luận Của Bạn" type="textarea" id="standard-basic"
                                    onChange={(event) => {
                                        const { value } = event.currentTarget;
                                        const newPost = {
                                            ...post,
                                            text: value
                                        }
                                        if (value !== "") {
                                            setError("")
                                        } else {
                                            setError("*Bạn chưa bình luận")
                                        }
                                        setPots(newPost)

                                    }}
                                />
                                <p style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ color: "red" }}>{error}</span>
                                    <Button onClick={() => {
                                        if (error !== "") return;
                                        if (!handleComment) return;
                                        handleComment(post, user)
                                        handleModal(false)
                                    }} style={{ color: "#fff", background: "rgb(254, 121, 0)" }} variant="contained">
                                        Đăng
                                    </Button>
                                </p>
                            </Box>
                            <div onClick={() => {
                                handleModal(false)
                            }} className="icon-close">
                                <CloseIcon />
                            </div>
                        </div>
                    </Fade>
                </Modal>

            </div>
        );
    return (
        <div className={classes.root}>
            <Paper elevation={1}
                style={{ background: "rgb(239, 239, 239)", padding: "10px" }}>
                <Grid
                    alignItems="center"
                    spacing={2}
                    style={{ background: "#efefef" }}
                    container
                >
                    <Grid
                        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                        item
                        xs={7}
                        sm={8}
                        md={9}
                    >
                        <Avatar style={{ marginLeft: "10px" }} src="/broken-image.jpg" />
                        <p
                            style={{
                                margin: "0px 0px 0px 15px",
                                padding: "10px",
                                borderRadius: "5px",
                                background: "#fff",
                            }}
                            onClick={() => {
                                user ? handleModal(true) : Swal.fire({
                                    title: 'Đăng Nhập Để Bình Luận',
                                    showCancelButton: true,
                                    confirmButtonText: `Đồng Ý`,
                                    cancelButtonText: `Không`,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        history.push("/Sig-In")
                                    }
                                })
                            }}
                        >
                            "Bình Luận..."
                        </p>

                    </Grid>
                    <Grid item xs={5} sm={4} md={3}>
                        <Rating name="disabled" value={5} disabled />
                    </Grid>
                </Grid>

                <Paper
                    style={{
                        margin: "10px 0"
                    }}
                    elevation={3}
                >
                    <Grid alignItems="center" justify="center" spacing={2} container>
                        <Grid item xs={12}>
                            <h3 style={{ color: "rgb(254, 121, 0)", textAlign: "center" }}>Hiện Chưa Có Bình Luận Nào!...</h3>
                        </Grid>

                    </Grid>
                </Paper>
            </Paper>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => {
                    handleModal(false)
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography style={{ color: "rgb(254, 121, 0)", textAlign: "center" }} variant="h4">{post.rate}</Typography>
                            <p style={{ textAlign: "center" }}>
                                <Rating
                                    value={post.rate}
                                    name="simple-controlled"
                                    onChange={(event, newValue) => {
                                        setPots({
                                            ...post,
                                            rate: newValue ? newValue : post.rate
                                        });
                                    }}
                                />
                            </p>

                            <TextField value={post.text} placeholder="Bình Luận Của Bạn" type="textarea" id="standard-basic"
                                onChange={(event) => {
                                    const { value } = event.currentTarget;
                                    const newPost = {
                                        ...post,
                                        text: value
                                    }
                                    if (value !== "") {
                                        setError("")
                                    } else {
                                        setError("*Bạn chưa bình luận")
                                    }
                                    setPots(newPost)

                                }}
                            />
                            <p style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "red" }}>{error}</span>
                                <Button onClick={() => {
                                    if (error !== "") return;
                                    if (!handleComment) return;
                                    handleComment(post, user)
                                    handleModal(false)
                                }} style={{ color: "#fff", background: "rgb(254, 121, 0)" }} variant="contained">
                                    Đăng
                                </Button>
                            </p>
                        </Box>
                        <div onClick={() => {
                            handleModal(false)
                        }} className="icon-close">
                            <CloseIcon />
                        </div>
                    </div>
                </Fade>
            </Modal>

        </div>
    );
}

export default CommentBlogs
