export const TimerDisplay: React.FC<{ label?: string; time: number }> = ({
    label,
    time,
}) => {
    return (
        <>
            {label ? <span className="me-2">{label}</span> : null}
            <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        </>
    );
};
