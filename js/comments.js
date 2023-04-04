const createComments = (comments) => {
  const commentList = document.querySelector('.social__comments');
  const commentListElement = commentList.querySelector('.social__comment');

  const commentListFragment = document.createDocumentFragment();
  commentList.innerHTML = '';

  comments.forEach((comment) => {
    const commentElement = commentListElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentListFragment.append(commentElement);

  });
  commentList.append(commentListFragment);
};

export {createComments};
