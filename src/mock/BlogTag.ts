const genList = () => {
  const rows = []
  for (let i = 0; i < 20; i++) {
    rows.push({
        id: i,
        name: `Tag_${i}`,
        createDate: Date.now(),
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