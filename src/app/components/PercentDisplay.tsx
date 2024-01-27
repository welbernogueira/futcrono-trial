export const PercentDisplay: React.FC<{
    possessionTime: number;
    fullTime: number;
}> = ({ possessionTime, fullTime }) => {
    const percent = ((100 * possessionTime) / fullTime).toFixed(0);
    return <>{percent !== "NaN" ? percent : 0}%</>;
};
