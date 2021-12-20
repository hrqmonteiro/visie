exports.getPeople = (req, res, next) => {
  res.status(200).json({
    people: [{ title: 'First person', content: 'this is the first person!' }],
  })
}

exports.postPeople = (req, res, next) => {
  const title = req.body.title
  const content = req.body.content
  res.status(201).json({
    message: 'Post created succesfully!',
    post: { id: new Date().toISOString(), title: title, content: content },
  })
}
