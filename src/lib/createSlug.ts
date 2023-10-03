export default function (title: string) {
    return (
      title
        // remove leading & trailing whitespace
        .trim()
        // output lowercase
         .toLowerCase()
        // replace spaces
        .replace(/\s+/g, '-')
        // remove special characters
        .replace(/[^\w-]/g, '')
        // remove leading & trailing separtors
        .replace(/^-+|-+$/g, '')
    )
  }
