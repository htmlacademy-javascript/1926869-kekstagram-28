const createComments = (comments) => {
  const commentList = document.querySelector('.social__comments');
  const commentListElement = commentList.querySelector('.social__comment');

  const commentListFragment = document.createDocumentFragment();
  commentList.innerHTML = '';

  comments.forEach((comment) => {
    const elementComment = commentListElement.cloneNode(true);
    elementComment.querySelector('.social__picture').src = comment.avatar;
    elementComment.querySelector('.social__picture').alt = comment.name;
    elementComment.querySelector('.social__text').textContent = comment.message;
    commentListFragment.append(elementComment);

  });
  commentList.append(commentListFragment);
};

export {createComments};
