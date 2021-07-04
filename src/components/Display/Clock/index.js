import React from 'react'
import { memo } from 'react';
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';

const Clock = (props) => {

    const { setValue } = props;
    const [minutes, setMinutes] = useState(4);
    const [seconds, setSeconds] = useState(60);


    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'hết giờ đặt vé',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        console.log(setValue)
                        if (result.isConfirmed || result.isDismissed) {
                            setValue(0)
                        }
                    })
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }

        }, 1000)
        return () => {

            clearInterval(myInterval);

        };
    });
    return (
        <div style={{ color: "#fb4226" }} >
            {minutes === 0 && seconds === 0
                ? (null)
                : <h2 style={{ margin: "5px 0px", textAlign: "center" }} > {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} </h2>
            }
        </div>
    )
}
export default memo(Clock)