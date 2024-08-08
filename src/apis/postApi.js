const uploadPost = async (title, content, price, extraPrice, endDate, token) => {
  const res = await fetch(import.meta.env.VITE_APP_API_URL + '/api/posts', {
    method: 'POST',
    headers: {
      'authorization': 'Bearer ' + token,
      'content-type': 'application/json;'
    },
    body: JSON.stringify({
      title: title,
      content: content,
      price: price,
      extraPrice: extraPrice,
      endDate: endDate
    })
  });

  if (!res.ok) {
    const message = (await res.json()).statusMsg;
    throw new Error(message);
  }

  return res.json();
}

const getPostList = async (page, size, sort) => {
  let sortStr = "";
  if (sort.length > 0) {
    sort.forEach(item => {
      sortStr += `&sort=${item}`;
    });
  }

  const res = await fetch(import.meta.env.VITE_APP_API_URL + `/api/posts?page=${page}&size=${size}${sortStr}`);

  if (!res.ok) {
    const message = (await res.json()).statusMsg;
    throw new Error(message);
  }

  return res.json();
}

export { uploadPost, getPostList };