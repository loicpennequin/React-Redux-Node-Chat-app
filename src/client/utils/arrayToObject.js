const arrayToObject = (array, key = 'id') =>
    array.reduce(
        (acc, current) => ({
            ...acc,
            [current[key]]: current
        }),
        {}
    );

export default arrayToObject;
