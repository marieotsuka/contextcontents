
  const ref = new Firebase("https://frog-a8b63.firebaseio.com/type/");
  const form = document.querySelector("form");

  form.addEventListener("submit", postComment);

  const timeStamp = () => {
    let options = {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute:'2-digit'
    };
    let now = new Date().toLocaleString('en-US', options);
    return now;
  };

  function postComment(e) {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let medium = document.getElementById("medium").value;
    let description = document.getElementById("description").value;

    ref.push({
      title: title,
      medium: medium,
      description: description,
      time: timeStamp()
    });


    document.getElementById("title").value = '';
    document.getElementById("medium").value = '';
    document.getElementById("description").value = '';
  };

  ref.on("child_added", function(snapshot) {
    let comment = snapshot.val();
    addComment(comment.title, comment.medium, comment.description, comment.time);
  });

  const addComment = (title, medium, description, timeStamp) => {
    comments.innerHTML = `<div class="post"><div class="title">${title}</div><div class="medium">${medium}</div><div class="description">${description}</div><div class="time">${timeStamp}</div></div>${comments.innerHTML}`;
  }

