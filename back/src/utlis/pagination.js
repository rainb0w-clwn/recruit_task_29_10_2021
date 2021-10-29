const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? (page - 1) * limit : 0;

    return {limit, offset};
};
const getPagingData = (query_data, page, limit) => {
    const {count: totalItems, rows: data} = query_data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    const itemCount = data.length;
    return {data, meta: {totalItems, totalPages, currentPage, itemCount, pageSize: limit}};
};
module.exports = {
    getPagination,
    getPagingData,
}
