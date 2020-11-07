export default {
    async loadEntries(context) {
        fetch('https://the-red-book-jd.firebaseio.com/entries.json')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          const results = [];
          for (const id in data) {
            results.push({
                entry: {
                    id: id,
                    scene: data[id].scene,
                    lines: data[id].lines
                }
            }
            );
          }
        context.commit("setAllEntries",results);
        });
      }
}