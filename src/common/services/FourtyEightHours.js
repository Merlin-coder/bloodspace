const hours_48_From_Now = (dt = new Date()) => {
    return new Date(dt.setDate(dt.getDate() + 2));
};
export default hours_48_From_Now;
