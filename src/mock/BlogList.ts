const genList = () => {
  const rows = []
  for (let i = 0; i < 20; i++) {
    rows.push({
        id: i,
        title: `blog_${i}`,
        state: i % 2 ? 'pubilshed' : 'wait',
        order: i,
        tags: [{
          id: 1,
          name: 'Vue'
        },
        {
        id: 2,
          name: 'React'
        }],
        admireCount: i,
        visitCount: i,
        publishDate: Date.now(),
        updateDate: Date.now(),
    })
  }
  return {
    rows: rows,
    total: 20
  }
}

const data = genList()

export default data