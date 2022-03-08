import { useEffect, useState } from 'react';

export interface Output {
    start: () => void,
    stop: () => void,
    isRunning: boolean
}

export interface useIntervalProps {
    callBack: () => void;
    ms: number;
}

export const useInterval = (props: useIntervalProps) : Output => {

    const [timer, setTimer] = useState<NodeJS.Timer|null>(null);
    const isRunning = timer != null;

    const start = () =>
    { 
        if (!isRunning)
        {
            setTimer(setInterval(props.callBack, props.ms))
        }       
    }

    const stop = () =>
    { 
        if (isRunning) {
            clearInterval(timer);
            setTimer(null);
        }   
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => stop, [])

    return { start, stop, isRunning };
}