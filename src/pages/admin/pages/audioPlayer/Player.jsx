import { useEffect, useState } from "react";
import useSound from "use-sound";
import qala from "../../../../assets/gala.mp3";
import qalaJukebox from "../../../../assets/Qala_Jukebox.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import logo from '../../../../assets/qala.png'

export default function Player() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [whichSoundIsPlaying, setWhichSoundIsPlaying] = useState(qala)
    const [time, setTime] = useState({
        min: "",
        sec: ""
    });
    const [currTime, setCurrTime] = useState({
        min: "",
        sec: ""
    });

    const [seconds, setSeconds] = useState();

    // const [play, { pause, duration, sound }] = useSound(qala);
    const [play, { pause, duration, sound }] = useSound(qalaJukebox);

    useEffect(() => {
        if (duration) {
            const sec = duration / 1000;
            const min = Math.floor(sec / 60);
            const secRemain = Math.floor(sec % 60);
            setTime({
                min: min,
                sec: secRemain
            });
        }
    }, [isPlaying]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrTime({
                    min,
                    sec
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    const playingButton = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    };

    return (
        <div className='flex items-center justify-center w-screen h-screen to-slate-950 lg:to-sky-900 via-slate-950 from-slate-800 bg-gradient-to-r '>
        <div className="flex flex-col items-center justify-center w-auto h-auto gap-2 p-3 text-center text-white border-2 rounded-lg shadow-2xl border-sky-950 component bg-gradient-to-r from-sky-400/20 to-slate-400/20 ">
            <h2>Playing Now</h2>
            {/* <img className="musicCover" src="https://picsum.photos/200/200" /> */}
            <div>
                <img className=' h-[20rem] w-[20rem]  rounded-lg shadow-md' src={logo} alt="" />
            </div>
            <div className='flex flex-row items-start justify-between w-full h-auto gap-1'>
                <h3 className="title"><span>Song : </span>Rubaiyyan</h3>
                <p className="subTitle"><span>From : </span>Qala</p>
            </div>
            <div>
                <div className="flex flex-row items-center justify-between gap-10 time">
                    <p>
                        {currTime.min}:{currTime.sec}
                    </p>
                    <p>
                        {time.min}:{time.sec}
                    </p>
                </div>
                <input
                    type="range"
                    min="0"
                    max={duration / 1000}
                    default="0"
                    value={seconds}
                    className="timeline w-[20rem] "
                    onChange={(e) => {
                        sound.seek([e.target.value]);
                    }}
                />
            </div>
            <div>
                <button className="playButton">
                    <IconContext.Provider value={{ size: "3em", color: "#F4F6FF" }}>
                        <BiSkipPrevious />
                    </IconContext.Provider>
                </button>
                {!isPlaying ? (
                    <button className="playButton" onClick={playingButton}>
                        <IconContext.Provider value={{ size: "3em", color: "#F4F6FF" }}>
                            <AiFillPlayCircle />
                        </IconContext.Provider>
                    </button>
                ) : (
                    <button className="playButton" onClick={playingButton}>
                        <IconContext.Provider value={{ size: "3em", color: "#F4F6FF" }}>
                            <AiFillPauseCircle />
                        </IconContext.Provider>
                    </button>
                )}
                <button className="playButton">
                <IconContext.Provider value={{ size: "3em", color: "#F4F6FF" }}>
                        <BiSkipNext />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
        </div>
    );
}
